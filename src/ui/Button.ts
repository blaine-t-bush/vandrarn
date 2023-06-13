import { Container, Graphics } from 'pixi.js'

export class Button extends Container {
  constructor(width: number, height: number, color?: number | undefined) {
    super();
    this.interactive = true;
    // this.position.set(x, y);

    let obj: Graphics = new Graphics();
    if (typeof color !== "undefined") {
      obj.beginFill(color);
    } else {
      obj.beginFill(0x8a725f);
    }
    obj.drawRect(0, 0, width, height);
    this.addChild(obj);
  }
}