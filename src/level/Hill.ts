import { Level } from "./Level";

export class Hill extends Level {
  constructor() {
    super();
    this.groundOffset = 57;
    this.addBackgrounds({z: 1, paths: [
        "backgrounds/hill/layer_0006.png",
        "backgrounds/hill/layer_0005.png",
    ]});
    this.addBackgrounds({z: -1, paths: [	
        "backgrounds/hill/layer_0004.png",
    ]});
    this.addBackgrounds({z: -2, paths: [	
        "backgrounds/hill/layer_0003.png",
    ]});
    this.addBackgrounds({z: -3, paths: [	
        "backgrounds/hill/layer_0001.png",
    ]});
  }
}