import { Container, Graphics } from 'pixi.js'

export class Button extends Container {
  constructor(width: number, height: number) {
    super();
    this.interactive = true;
    // this.position.set(x, y);

    let obj: Graphics = new Graphics();
    obj.beginFill(0xff0000);
    obj.drawRect(0, 0, width, height);
    this.addChild(obj);
  }
}