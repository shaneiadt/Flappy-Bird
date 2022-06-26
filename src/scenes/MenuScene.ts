import BaseScene from './BaseScene';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'MenuScene',
};

class MenuScene extends BaseScene {
  menu: {
    scene: string;
    text: string;
  }[] = [];

  constructor(config: { width: number; height: number; startPos: { x: number; y: number } }) {
    super(sceneConfig.key, config);

    this.menu = [
      {
        scene: 'PlayScene',
        text: 'Play',
      },
      {
        scene: 'ScoreScene',
        text: 'Score',
      },
      {
        scene: null,
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
      menuItem.scene && this.scene.start(menuItem.scene);

      if (menuItem.text === 'Exit') {
        this.game.destroy(true);
      }
    });
  };
}

export default MenuScene;
