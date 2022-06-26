class BaseScene extends Phaser.Scene {
  config: {
    width: number;
    height: number;
    startPos: {
      x: number;
      y: number;
    };
  };
  sceneCenter: number[];

  constructor(key: string, config: { width: number; height: number; startPos: { x: number; y: number } }) {
    super(key);
    this.config = config;
    this.sceneCenter = [config.width / 2, config.height / 2];
  }

  create(): void {
    this.add.image(0, 0, 'sky').setOrigin(0);
  }

  createMenu(
    menu: {
      scene: string;
      text: string;
    }[],
    setupMenuEvents: (menuItem: { text: string; scene: string }, text: Phaser.GameObjects.Text) => void,
  ): void {
    menu.forEach((menuItem, i) => {
      const text = this.add
        .text(this.sceneCenter[0], this.sceneCenter[1] + i * 40, menuItem.text, {
          fontSize: '32px',
          color: '#FFF',
        })
        .setInteractive()
        .setOrigin(0.5, 1);

      setupMenuEvents(menuItem, text);
    });
  }
}

export default BaseScene;
