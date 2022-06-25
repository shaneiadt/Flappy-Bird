const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'PlayScene',
};

const gameConfig = {
  width: 800,
  height: 600,
};

class PlayScene extends Phaser.Scene {
  bird: Phaser.Physics.Arcade.Sprite;
  pipes: Phaser.Physics.Arcade.Group;

  PIPES_TO_RENDER = 4;
  PIPE_VERITCAL_DISTANCE_RANGE = [150, 250];
  PIPE_HORIZONTAL_DISTANCE_RANGE = [500, 550];
  FLAP_VELOCITY = 250;
  config: {
    width: number;
    height: number;
    startPos: {
      x: number;
      y: number;
    };
  };

  constructor(config: { width: number; height: number; startPos: { x: number; y: number } }) {
    super(sceneConfig);

    this.config = config;
  }

  preload = (): void => {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('bird', 'assets/bird.png');
    this.load.image('pipe', 'assets/pipe.png');
  };

  create = (): void => {
    this.createBg();
    this.createPipes();
    this.createBird();
    this.createColliders();
    this.handleInputs();
  };

  placePipe = (pipe1: Phaser.Physics.Arcade.Sprite, pipe2: Phaser.Physics.Arcade.Sprite): void => {
    const rightMostX = this.getRightMostPipe();
    const pipeVerticalDistance = Phaser.Math.Between(
      this.PIPE_VERITCAL_DISTANCE_RANGE[0],
      this.PIPE_VERITCAL_DISTANCE_RANGE[1],
    );
    const pipeVerticalPosition = Phaser.Math.Between(0 + 20, (gameConfig.height as number) - 20 - pipeVerticalDistance);

    const pipeHorizontalDistance = Phaser.Math.Between(
      this.PIPE_HORIZONTAL_DISTANCE_RANGE[0],
      this.PIPE_HORIZONTAL_DISTANCE_RANGE[1],
    );

    pipe1.x = rightMostX + pipeHorizontalDistance;
    pipe1.y = pipeVerticalPosition;

    pipe2.x = pipe1.x;
    pipe2.y = pipe1.y + pipeVerticalDistance;
  };

  update = (): void => {
    this.checkGameStatus();
    this.recyclePipes();
  };

  checkGameStatus = (): void => {
    if (this.bird.y < -this.bird.height || this.bird.y > (gameConfig.height as number)) {
      this.gameOver();
    }
  };

  createColliders = (): void => {
    this.physics.add.collider(this.bird, this.pipes, this.gameOver);
  };

  createBg = (): void => {
    this.add.image(0, 0, 'sky').setOrigin(0);
  };

  createBird = (): void => {
    this.bird = this.physics.add.sprite(this.config.startPos.x, this.config.startPos.y, 'bird').setOrigin(0);
    this.bird.body.gravity.y = 400;
  };

  createPipes = (): void => {
    this.pipes = this.physics.add.group();

    for (let index = 0; index < this.PIPES_TO_RENDER; index++) {
      const upperPipe: Phaser.Physics.Arcade.Sprite = this.pipes.create(0, 0, 'pipe').setOrigin(0, 1);
      const lowerPipe: Phaser.Physics.Arcade.Sprite = this.pipes.create(0, 0, 'pipe').setOrigin(0, 0);

      this.placePipe(upperPipe, lowerPipe);
    }

    this.pipes.setVelocityX(-200);
  };

  handleInputs = (): void => {
    this.input.keyboard.on('keyup-SPACE', this.flap);
  };

  gameOver = (): void => {
    this.bird.x = this.config.startPos.x;
    this.bird.y = this.config.startPos.y;
    this.bird.body.velocity.y = 0;
  };

  flap = (): void => {
    this.bird.body.velocity.y = -this.FLAP_VELOCITY;
  };

  recyclePipes = (): void => {
    this.pipes.getChildren().forEach((pipe: Phaser.Physics.Arcade.Sprite, i) => {
      if (pipe.getBounds().right < 0) {
        const pipe2: Phaser.Physics.Arcade.Sprite = this.pipes.getChildren()[i + 1] as Phaser.Physics.Arcade.Sprite;
        this.placePipe(pipe, pipe2);
      }
    });
  };

  getRightMostPipe = (): number => {
    const children: Phaser.Physics.Arcade.Sprite[] = this.pipes.getChildren() as Phaser.Physics.Arcade.Sprite[];

    let rightMostX = 0;

    for (const child of children) {
      rightMostX = Math.max(child.x, rightMostX);
    }

    return rightMostX;
  };
}

export default PlayScene;