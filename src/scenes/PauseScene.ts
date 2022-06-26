import BaseScene from './BaseScene';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'PauseScene',
};

class PauseScene extends BaseScene {
  menu: {
    scene: string;
    text: string;
  }[] = [];

  constructor(config: { width: number; height: number; startPos: { x: number; y: number } }) {
    super(sceneConfig.key, config);

    this.menu = [
      {
        scene: 'PlayScene',
        text: 'Continue',
      },
      {
        scene: 'MenuScene',
        text: 'Exit',
      },
    ];
  }

  create = (): void => {
    super.create();

    this.createMenu(this.menu, this.setupMenuEvents);
  };

  setupMenuEvents = (menuItem: { text: string; scene: string }, text: Phaser.GameObjects.Text): void => {
    text.on('pointerover', () => text.setColor('yellow'));
    text.on('pointerout', () => text.setColor('white'));
    text.on('pointerup', () => {
      if (menuItem.scene && menuItem.text === 'Continue') {
        this.scene.stop();
        this.scene.resume(menuItem.scene);
      } else {
        this.scene.stop('PlayScene');
        this.scene.start(menuItem.scene);
      }
    });
  };
}

export default PauseScene;
