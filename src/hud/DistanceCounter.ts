import { TextBox } from "./TextBox";

export class DistanceCounter extends TextBox {
  private static nameDistanceCounter: string = "journal";
  private static spritePath: string = "hud/GUI_label_2x.png";

  constructor(x: number, y: number, zIndex: number) {
    super(DistanceCounter.nameDistanceCounter, DistanceCounter.spritePath, x, y, zIndex);
    this.updateText("0");
  }

  public updateCount(count: number) {
    this.text.text = new Intl.NumberFormat("sv-SE", {
      maximumFractionDigits: 0,
    }).format(count);
  }
}