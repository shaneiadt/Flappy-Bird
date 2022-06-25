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

let upperPipe: Phaser.Physics.Arcade.Sprite;
let lowerPipe: Phaser.Physics.Arcade.Sprite;
let bird: Phaser.Physics.Arcade.Sprite;
let pipeHorizontalDistance = 0;

const PIPE_DISTANCE_RANGE = [150, 250];

function preload() {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
  this.load.image('pipe', 'assets/pipe.png');
}

function create() {
  this.add.image(0, 0, 'sky').setOrigin(0);

  for (let index = 0; index < PIPES_TO_RENDER; index++) {
    pipeHorizontalDistance += 400;
    const pipeVerticalDistance = Phaser.Math.Between(PIPE_DISTANCE_RANGE[0], PIPE_DISTANCE_RANGE[1]);
    const pipeVerticalPosition = Phaser.Math.Between(0 + 20, (gameConfig.height as number) - 20 - pipeVerticalDistance);

    upperPipe = this.physics.add.sprite(pipeHorizontalDistance, pipeVerticalPosition, 'pipe').setOrigin(0, 1);
    lowerPipe = this.physics.add
      .sprite(pipeHorizontalDistance, upperPipe.y + pipeVerticalDistance, 'pipe')
      .setOrigin(0, 0);

    upperPipe.body.velocity.x = -150;
    lowerPipe.body.velocity.x = -150;
  }

  bird = this.physics.add.sprite(initialPos.x, initialPos.y, 'bird').setOrigin(0);
  bird.body.gravity.y = 400;

  this.input.keyboard.on('keyup-SPACE', flap);
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
