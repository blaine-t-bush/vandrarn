import { Container, Graphics } from "pixi.js";
import { Button } from "./Button";

const journalWidth: number = 200;
const buttonSize: number = 20;
const buttonScreenSpacing: number = 8;
const buttonJournalSpacing: number = 8;

type Page = {
  text: string;
}

export class Journal extends Container {
  public static pageCount: number = 20;

  public pages: Array<Page> = [];
  public currentPageIndex: number = 0;

  public journal: Graphics;
  public button: Button;

  constructor(screenWidth: number, screenHeight: number) {
    super();

    this.zIndex = 1000;

    // Fill journal with empty pages.
    for (let i: number = 0; i < Journal.pageCount; i++) {
      this.pages.push({
        text: "",
      })
    }

    // Load in sprite.
    this.journal = new Graphics();
    this.journal.beginFill(0xfff2f2);
    this.journal.drawRect(0, 0, journalWidth, screenHeight - 2*buttonScreenSpacing);
    this.journal.position.set(0, 0);
    this.journal.visible = false;
    this.addChild(this.journal);

    // Button for opening/closing.
    this.button = new Button(buttonSize, buttonSize);
    this.button.position.set(journalWidth + buttonJournalSpacing, 0);
    this.button.on('pointerup', () => {
      this.journal.visible = !this.journal.visible;
    });
    this.button.cursor = "pointer";
    this.addChild(this.button);

    // Center it.
    console.log(screenWidth);
    console.log(screenHeight);
    this.position.set(screenWidth - journalWidth - buttonSize - buttonJournalSpacing - buttonScreenSpacing, buttonScreenSpacing);
  }

  public updatePage(index: number, text: string): void {
    this.pages[index].text = text;
  }

  public advancePage(): void {
    if (this.currentPageIndex > Journal.pageCount - 1) {
      this.currentPageIndex = Journal.pageCount - 1;
    } else {
      this.currentPageIndex += 1;
    }
  }
}