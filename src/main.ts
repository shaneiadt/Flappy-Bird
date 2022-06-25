import * as Phaser from 'phaser';

const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: {
        // y: 400,
      },
    },
  },
  scene: {
    preload,
    create,
    update,
  },
};

const FLAP_VELOCITY = 250;
const initialPos = {
  x: (gameConfig.width as number) / 10,
  y: (gameConfig.height as number) / 2,
};
const PIPES_TO_RENDER = 4;

let bird: Phaser.Physics.Arcade.Sprite;
let pipes;

const PIPE_VERITCAL_DISTANCE_RANGE = [150, 250];
const PIPE_HORIZONTAL_DISTANCE_RANGE = [500, 550];

function preload() {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
  this.load.image('pipe', 'assets/pipe.png');
}

function create() {
  this.add.image(0, 0, 'sky').setOrigin(0);

  pipes = this.physics.add.group();

  for (let index = 0; index < PIPES_TO_RENDER; index++) {
    const upperPipe: Phaser.Physics.Arcade.Sprite = pipes.create(0, 0, 'pipe').setOrigin(0, 1);
    const lowerPipe: Phaser.Physics.Arcade.Sprite = pipes.create(0, 0, 'pipe').setOrigin(0, 0);

    placePipe(upperPipe, lowerPipe);
  }

  pipes.setVelocityX(-200);

  bird = this.physics.add.sprite(initialPos.x, initialPos.y, 'bird').setOrigin(0);
  bird.body.gravity.y = 400;

  this.input.keyboard.on('keyup-SPACE', flap);
}

function placePipe(pipe1: Phaser.Physics.Arcade.Sprite, pipe2: Phaser.Physics.Arcade.Sprite) {
  const rightMostX = getRightMostPipe();
  const pipeVerticalDistance = Phaser.Math.Between(PIPE_VERITCAL_DISTANCE_RANGE[0], PIPE_VERITCAL_DISTANCE_RANGE[1]);
  const pipeVerticalPosition = Phaser.Math.Between(0 + 20, (gameConfig.height as number) - 20 - pipeVerticalDistance);

  const pipeHorizontalDistance = Phaser.Math.Between(
    PIPE_HORIZONTAL_DISTANCE_RANGE[0],
    PIPE_HORIZONTAL_DISTANCE_RANGE[1],
  );

  pipe1.x = rightMostX + pipeHorizontalDistance;
  pipe1.y = pipeVerticalPosition;

  pipe2.x = pipe1.x;
  pipe2.y = pipe1.y + pipeVerticalDistance;
}

function getRightMostPipe() {
  const children = pipes.getChildren();

  let rightMostX = 0;

  for (const child of children) {
    rightMostX = Math.max(child.x, rightMostX);
  }

  return rightMostX;
}

function update() {
  if (bird.y < -bird.height || bird.y > (gameConfig.height as number)) {
    restart();
  }
}

function restart() {
  bird.x = initialPos.x;
  bird.y = initialPos.y;
  bird.body.velocity.y = 0;
}

function flap() {
  bird.body.velocity.y = -FLAP_VELOCITY;
}

export const game = new Phaser.Game(gameConfig);

window.addEventListener('resize', () => {
  game.scale.refresh();
});
