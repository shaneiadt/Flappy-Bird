import * as Phaser from 'phaser';

import MenuScene from './scenes/MenuScene';
import PlayScene from './scenes/PlayScene';
import PreloadScene from './scenes/PreloadScene';
import ScoreScene from './scenes/ScoreScene';

const WIDTH = 800;
const HEIGHT = 600;
const BIRD_POSITION = { x: WIDTH / 10, y: HEIGHT / 2 };

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  startPos: BIRD_POSITION,
};

const Scenes = [PreloadScene, MenuScene, PlayScene, ScoreScene];

const initScenes = () => Scenes.map((Scene) => new Scene(SHARED_CONFIG));

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
  scene: initScenes(),
};

export const game = new Phaser.Game(gameConfig);

window.addEventListener('resize', () => {
  game.scale.refresh();
});
