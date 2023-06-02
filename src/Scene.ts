import { Container, Texture, TilingSprite } from "pixi.js";

export class Scene extends Container {
  public speedMultiplier: number;

  constructor(z: number, speedMultiplier: number) {
    super();
    this.sortableChildren = true;
    this.zIndex = z;
    this.speedMultiplier = speedMultiplier;
  }

  public addLayer(path: string, x: number, y: number, z: number): TilingSprite {
    let texture: Texture = Texture.from(path);
    let sprite: TilingSprite = new TilingSprite(texture, texture.width, texture.height);
    sprite.position.set(x, y)
    sprite.zIndex = z;
    this.addChild(sprite);
    this.sortChildren();

    return sprite;
  }

  public moveLayers(delta: number, speedMultiplier: number) {
    for (let child of this.children) {
      if (child instanceof TilingSprite) {
        child.tilePosition.x -= delta * speedMultiplier * this.speedMultiplier;
      }
    }
  }

  public static createScenes(backgrounds: Array<{z: number, paths: Array<string>}>, baseLayerSpeed: number): Array<Scene> {
    let scenes: Array<Scene> = [];
    for (let i = 0; i < backgrounds.length; i++) {
      scenes.push(new Scene(backgrounds[i].z, baseLayerSpeed / (2**i)));
      for (let j = 0; j < backgrounds[i].paths.length; j++) {
        scenes[i].addLayer(backgrounds[i].paths[j], 0, -355, -j);
      }
    }

    return scenes;
  }

  public static moveScenes(delta: number, moveSpeed: number, scenes: Array<Scene>): void {
    for (let scene of scenes.values()) {
      scene.moveLayers(delta, moveSpeed);
    }
  }
}