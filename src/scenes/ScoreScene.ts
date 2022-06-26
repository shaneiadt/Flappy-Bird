import BaseScene from './BaseScene';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'ScoreScene',
};

class ScoreScene extends BaseScene {
  constructor(config: { width: number; height: number; startPos: { x: number; y: number } }) {
    super(sceneConfig.key, { ...config, displayBackBtn: true });
  }

  create = (): void => {
    super.create();

    const bestScore = localStorage.getItem('bestScore');

    this.add
      .text(this.config.width / 2, this.config.height / 2, `Best Score: ${bestScore || 0}`, {
        fontSize: '32px',
        color: 'white',
      })
      .setOrigin(0.5, 1);
  };
}

export default ScoreScene;
