import { Level } from './Level'

export class DarkForest extends Level {
  constructor() {
    super();
    this.groundOffset = 66;
    this.addBackgrounds({z: 1, paths: [
        "backgrounds/dark_forest/layer_0000.png",
        "backgrounds/dark_forest/layer_0001.png",
        "backgrounds/dark_forest/layer_0002.png",
        "backgrounds/dark_forest/layer_0003.png",
        "backgrounds/dark_forest/layer_0004.png",
    ]});
    this.addBackgrounds({z: -1, paths: [	
        "backgrounds/dark_forest/layer_0005.png",
    ]});
    this.addBackgrounds({z: -2, paths: [	
        "backgrounds/dark_forest/layer_0006.png",
        "backgrounds/dark_forest/layer_0007.png",
    ]});
    this.addBackgrounds({z: -3, paths: [
        "backgrounds/dark_forest/layer_0008.png",
    ]});
    this.addBackgrounds({z: -4, paths: [	
        "backgrounds/dark_forest/layer_0009.png",
    ]});
  }
}