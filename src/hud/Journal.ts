import { TextBox } from "./TextBox";

export class Journal extends TextBox {
  private static nameJournal: string = "journal";
  private static spritePath: string = "hud/GUI_label_2x.png";

  constructor(x: number, y: number, zIndex: number) {
    super(Journal.nameJournal, Journal.spritePath, x, y, zIndex);
    this.updateText("Default journal entry");
  }
}