type Background = {z: number, paths: Array<string>};

class Level {
  public backgrounds: Array<Background> = [];

  public addBackgrounds(background: Background): void {
    let existingBackgrounds: Background | undefined = this.backgrounds.find((val) => val.z === background.z);
    if (existingBackgrounds !== undefined) {
      for (let path of background.paths) {
        existingBackgrounds.paths.push(path)
      }
    } else {
      this.backgrounds.push(background);
    }
  }
}

export class LevelForest extends Level {
  constructor() {
    super();
      this.addBackgrounds({z: 1, paths: [
          "backgrounds/forest/layer_0000.png",
          "backgrounds/forest/layer_0001.png",
          "backgrounds/forest/layer_0002.png",
          "backgrounds/forest/layer_0003.png",
          "backgrounds/forest/layer_0004.png",
      ]});
      this.addBackgrounds({z: -1, paths: [	
          "backgrounds/forest/layer_0005.png",
      ]});
      this.addBackgrounds({z: -2, paths: [	
          "backgrounds/forest/layer_0006.png",
          "backgrounds/forest/layer_0007.png",
      ]});
      this.addBackgrounds({z: -3, paths: [
          "backgrounds/forest/layer_0008.png",
      ]});
      this.addBackgrounds({z: -4, paths: [	
          "backgrounds/forest/layer_0009.png",
      ]});
      this.addBackgrounds({z: -5, paths: [	
          "backgrounds/forest/layer_0010.png",
          "backgrounds/forest/layer_0011.png",
      ]});
  }
}