import { Container, Graphics } from "pixi.js";
import { Button } from "./Button";

const journalWidth: number = 200;
const journalPadding: number = 8;
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

    // Center it.
    this.position.set(screenWidth - journalWidth - buttonSize - buttonJournalSpacing - buttonScreenSpacing, buttonScreenSpacing);

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
      this.toggleJournal();
    });
    this.button.cursor = "pointer";
    this.addChild(this.button);
  }

  public moveTextBox(): void {
    let textBox: HTMLElement | null = document.getElementById("journal");
    if (typeof textBox !== "undefined" && textBox !== null) {
      if (this.journal.visible) {
        textBox.style.display = "block";
      } else {
        textBox.style.display = "none";
      }
      
      let journalSizes = this.getJournalSizes();
      textBox.style.left = journalSizes.left.toString();
      textBox.style.top = journalSizes.top.toString();
      textBox.style.width = journalSizes.width.toString();
      textBox.style.height = journalSizes.height.toString();
    }
  }

  public getJournalSizes(): {left: number, top: number, width: number, height: number} {
    return {
      left: this.position.x + this.journal.position.x + journalPadding/2,
      top: this.position.y + this.journal.position.y + journalPadding/2,
      width: this.journal.width - journalPadding,
      height: this.journal.height - journalPadding,
    }
  }

  public toggleJournal(): void {
    this.journal.visible = !this.journal.visible;
    this.moveTextBox();
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