import * as Phaser from 'phaser';

import PlayScene from './scenes/PlayScene';

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
  scene: [PlayScene],
};

export const game = new Phaser.Game(gameConfig);

window.addEventListener('resize', () => {
  game.scale.refresh();
});
