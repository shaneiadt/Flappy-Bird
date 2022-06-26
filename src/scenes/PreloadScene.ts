const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'PreloadScene',
};

class PreloadScene extends Phaser.Scene {
  constructor() {
    super(sceneConfig);
  }

  preload = (): void => {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('bird', 'assets/bird.png');
    this.load.image('pipe', 'assets/pipe.png');
    this.load.image('pause', 'assets/pause.png');
  };

  create = (): void => {
    this.scene.start('MenuScene');
  };
}

export default PreloadScene;
