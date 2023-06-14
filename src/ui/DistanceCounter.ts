import { Container, Graphics, Text } from "pixi.js"

const counterPadding: number = 8;
const screenPadding: number = 8;

export class DistanceCounter extends Container {
  public background: Graphics;
  public counter: Text;
  public count: number = 0;

  constructor() {
    super();

    this.zIndex = 1000;
    this.position.set(screenPadding, screenPadding);

    this.background = new Graphics();
    this.background.beginFill(0xf1dbc9);
    this.background.drawRect(0, 0, 0, 0);
    this.background.position.set(0, 0);

    this.counter = new Text(this.count.toString(), {
      fontFamily: 'Arial',
      fontSize: '24',
      fill: 0x8a725f,
      align: 'center'
    });
    this.counter.position.set((this.background.width - this.counter.width)/2, (this.background.height - this.counter.height)/2);

    this.updateSize();
    
    this.addChild(this.background);
    this.addChild(this.counter);
  }

  public updateText(count: number): void {
    let oldLength = this.counter.text.length;
    this.counter.text = new Intl.NumberFormat("sv-SE", {
      maximumFractionDigits: 0,
    }).format(count);
    let newLength = this.counter.text.length;

    // Resize box only if needed.
    if (newLength !== oldLength) {
      console.log("new length detected");
      this.updateSize();
    }
  }

  public updateSize(): void {
    this.background.clear();
    this.background.beginFill(0xf1dbc9);
    this.background.drawRect(0, 0, this.counter.width + counterPadding, this.counter.height + counterPadding);
    this.counter.position.set((this.background.width - this.counter.width)/2, (this.background.height - this.counter.height)/2);
  }
}