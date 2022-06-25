import * as Phaser from 'phaser';

import PlayScene from './scenes/PlayScene';

const WIDTH = 800;
const HEIGHT = 600;
const BIRD_POSITION = { x: WIDTH / 10, y: HEIGHT / 2 };

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  startPos: BIRD_POSITION,
};

const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: {
        // y: 400,
      },
    },
  },
  scene: [new PlayScene(SHARED_CONFIG)],
};

export const game = new Phaser.Game(gameConfig);

window.addEventListener('resize', () => {
  game.scale.refresh();
});
