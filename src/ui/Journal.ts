import { Container, Graphics } from "pixi.js";
import { Button } from "./Button";

const journalWidth: number = 200;
const journalPadding: number = 8;
const buttonSize: number = 20;
const buttonScreenSpacing: number = 8;
const buttonJournalSpacing: number = 8;

export class Journal extends Container {
  public text: string = "";
  public journal: Graphics;
  public openButton: Button;
  public prevButton: Button;
  public nextButton: Button;

  constructor(screenWidth: number, screenHeight: number) {
    super();

    this.zIndex = 1000;

    // Center it.
    this.position.set(screenWidth - journalWidth - buttonSize - buttonJournalSpacing - buttonScreenSpacing, buttonScreenSpacing);

    // Load in sprite.
    this.journal = new Graphics();
    this.journal.beginFill(0xfff8f8);
    this.journal.drawRect(0, 0, journalWidth, screenHeight - 2*buttonScreenSpacing);
    this.journal.position.set(0, 0);
    this.journal.visible = false;
    this.addChild(this.journal);

    // Button for opening/closing.
    this.openButton = this.createOpenButton();
    this.addChild(this.openButton);

    // Button for navigating pages.
    this.prevButton = this.createPrevButton();
    this.addChild(this.prevButton);
    this.nextButton = this.createNextButton();
    this.addChild(this.nextButton);
  }

  private createOpenButton(): Button {
    let openButton = new Button(buttonSize, buttonSize);
    openButton.position.set(journalWidth + buttonJournalSpacing, 0);
    openButton.on('pointerup', () => {
      this.toggleJournal();
    });
    openButton.cursor = "pointer";

    return openButton;
  }

  private createPrevButton(): Button {
    let prevButton = new Button(buttonSize, buttonSize);
    prevButton.position.set(buttonJournalSpacing/2, this.getJournalSizes().height - buttonSize + journalPadding/2);
    prevButton.on('pointerup', () => {
      console.log("prev");
    });
    prevButton.visible = false;
    prevButton.cursor = "pointer";

    return prevButton;
  }

  private createNextButton(): Button {
    let nextButton = new Button(buttonSize, buttonSize);
    nextButton.position.set(this.getJournalSizes().width - buttonSize + journalPadding/2, this.getJournalSizes().height - buttonSize + journalPadding/2);
    nextButton.on('pointerup', () => {
      console.log("next");
    });
    nextButton.visible = false;
    nextButton.cursor = "pointer";

    return nextButton;
  }

  public moveTextBox(): void {
    let textBox: HTMLElement | null = document.getElementById("journal-container");
    if (typeof textBox !== "undefined" && textBox !== null) {
      if (this.journal.visible) {
        textBox.style.display = "flex";
      } else {
        textBox.style.display = "none";
      }
      
      let journalSizes = this.getJournalSizes();
      textBox.style.left = journalSizes.left.toString();
      textBox.style.top = journalSizes.top.toString();
      textBox.style.width = journalSizes.width.toString();
      textBox.style.height = (journalSizes.height - buttonSize - journalPadding/2).toString();
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
    this.prevButton.visible = !this.prevButton.visible;
    this.nextButton.visible = !this.nextButton.visible;
    this.moveTextBox();
  }

  public isOpen(): boolean {
    return this.journal.visible;
  }

  public appendText(text: string): void {
    this.text = text;
  }
}