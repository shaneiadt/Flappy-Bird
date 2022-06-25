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
        y: 400,
      },
    },
  },
  scene: {
    preload,
    create,
    update,
  },
};

let bird: Phaser.Physics.Arcade.Sprite;
const FLAP_VELOCITY = 250;
const VELOCITY = 200;

function preload() {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
}

function create() {
  this.add.image(0, 0, 'sky').setOrigin(0);

  bird = this.physics.add
    .sprite((gameConfig.width as number) / 10, (gameConfig.height as number) / 2, 'bird')
    .setOrigin(0);
  bird.body.velocity.x = VELOCITY;

  this.input.keyboard.on('keyup-SPACE', flap);
}

function update() {
  //
}

function flap() {
  bird.body.velocity.y = -FLAP_VELOCITY;
}

export const game = new Phaser.Game(gameConfig);

window.addEventListener('resize', () => {
  game.scale.refresh();
});
