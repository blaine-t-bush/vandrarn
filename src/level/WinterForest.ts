import { Level } from './Level'

export class WinterForest extends Level {
  constructor() {
    super();
    this.groundOffset = 52;
    this.addBackgrounds({z: 1, paths: [
        "backgrounds/winter_forest/layer_0016.png",
        "backgrounds/winter_forest/layer_0015.png",
        "backgrounds/winter_forest/layer_0014.png",
    ]});
    this.addBackgrounds({z: -1, paths: [	
        "backgrounds/winter_forest/layer_0013.png",
        "backgrounds/winter_forest/layer_0012.png",
        "backgrounds/winter_forest/layer_0011.png",
    ]});
    this.addBackgrounds({z: -2, paths: [	
        "backgrounds/winter_forest/layer_0010.png",
        "backgrounds/winter_forest/layer_0009.png",
    ]});
    this.addBackgrounds({z: -3, paths: [
        "backgrounds/winter_forest/layer_0008.png",
        "backgrounds/winter_forest/layer_0007.png",
    ]});
    this.addBackgrounds({z: -4, paths: [	
        "backgrounds/winter_forest/layer_0006.png",
        "backgrounds/winter_forest/layer_0005.png",
    ]});
    this.addBackgrounds({z: -5, paths: [	
        "backgrounds/winter_forest/layer_0004.png",
        "backgrounds/winter_forest/layer_0003.png",
    ]});
    this.addBackgrounds({z: -6, paths: [	
        "backgrounds/winter_forest/layer_0002.png",
    ]});
    this.addBackgrounds({z: -7, paths: [	
        "backgrounds/winter_forest/layer_0001.png",
    ]});
    // this.addBackgrounds({z: -5, paths: [	
    //     "backgrounds/winter_forest/layer_0010.png",
    //     "backgrounds/winter_forest/layer_0011.png",
    // ]});
  }
}