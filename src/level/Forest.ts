import { Level } from './Level'

export class Forest extends Level {
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