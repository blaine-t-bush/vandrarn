import { Container, Graphics, Text } from "pixi.js";
import { Button } from "./Button";

const journalWidth: number = 200;
const journalPadding: number = 8;
const buttonSize: number = 20;
const buttonScreenSpacing: number = 8;
const buttonJournalSpacing: number = 8;

type Page = {
  index: number;
  text: string;
}

export class Journal extends Container {
  public journal: Graphics;
  public openButton: Button;
  public prevButton: Button;
  public nextButton: Button;
  public pageCount: Text;
  public pages: Array<Page>;

  public currentPageText: string = "";
  public currentPageIndex: number = 0;

  public static maxPageCount: number = 8;

  constructor(screenWidth: number, screenHeight: number) {
    super();

    this.zIndex = 1000;

    // Center it.
    this.position.set(screenWidth - journalWidth - buttonSize - buttonJournalSpacing - buttonScreenSpacing, buttonScreenSpacing);

    // Load in sprite.
    this.journal = new Graphics();
    this.journal.beginFill(0xf1dbc9);
    this.journal.drawRect(0, 0, journalWidth, screenHeight - 2*buttonScreenSpacing);
    this.journal.position.set(0, 0);
    this.journal.visible = false;

    // Create properties.
    this.openButton = this.createOpenButton();
    this.prevButton = this.createPrevButton();
    this.nextButton = this.createNextButton();
    this.pageCount = this.createPageCount();
    
    // Add children.
    this.addChild(this.openButton);
    this.addChild(this.journal);
    this.journal.addChild(this.prevButton);
    this.journal.addChild(this.nextButton);
    this.journal.addChild(this.pageCount);

    // Create page data.
    this.pages = this.initPages();
    this.changePage(0);
  }

  private createOpenButton(): Button {
    let openButton: Button = new Button(buttonSize, buttonSize, 0xe09c60);
    openButton.position.set(journalWidth + buttonJournalSpacing, 0);
    openButton.on('pointerup', () => {
      this.toggleJournal();
    });
    openButton.cursor = "pointer";

    return openButton;
  }

  private createPrevButton(): Button {
    let prevButton: Button = new Button(buttonSize, buttonSize, 0xe09c60);
    prevButton.position.set(buttonJournalSpacing/2, this.getJournalSizes().height - buttonSize + journalPadding/2);
    prevButton.on('pointerup', () => {
      this.changePage(this.currentPageIndex-1);
    });
    prevButton.visible = false;
    prevButton.cursor = "pointer";

    return prevButton;
  }

  private createNextButton(): Button {
    let nextButton: Button = new Button(buttonSize, buttonSize, 0xe09c60);
    nextButton.position.set(this.getJournalSizes().width - buttonSize + journalPadding/2, this.getJournalSizes().height - buttonSize + journalPadding/2);
    nextButton.on('pointerup', () => {
      this.changePage(this.currentPageIndex+1);
    });
    nextButton.visible = false;
    nextButton.cursor = "pointer";

    return nextButton;
  }

  private createPageCount(): Text {
    let pageCount: Text = new Text('0', {
      fontFamily: 'Arial',
      fontSize: '24',
      fill: 0x8a725f,
      align: 'center'
    });
    pageCount.position.set(journalWidth/2, this.getJournalSizes().height - buttonSize + journalPadding/2)

    return pageCount;
  }

  private initPages(): Array<Page> {
    let pages: Array<Page> = [];
    for (let i: number = 0; i < Journal.maxPageCount; i++) {
      pages.push({ index: i, text: ""});
    }

    return pages;
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
    this.moveTextBox();
  }

  public isOpen(): boolean {
    return this.journal.visible;
  }

  public updatePageText(text: string): void {
    this.pages[this.currentPageIndex].text = text;
  }

  public changePage(index: number): void {
    // Make sure current page is updated.
    let textBoxInput: HTMLInputElement | null = document.getElementById("journal") as HTMLInputElement;
    if (typeof textBoxInput !== "undefined" && textBoxInput !== null) {
      this.updatePageText(textBoxInput.value);
    }

    // Move to desired page.
    this.changePageIndex(index);
    this.changePageText();
  }

  public changePageIndex(index: number) {
    this.nextButton.visible = true;
    this.prevButton.visible = true;

    if (index >= Journal.maxPageCount - 1) {
      this.currentPageIndex = Journal.maxPageCount - 1;
      this.nextButton.visible = false;
    } else if (index <= 0) {
      this.currentPageIndex = 0;
      this.prevButton.visible = false;
    } else {
      this.nextButton.visible = true;
      this.prevButton.visible = true;
      this.currentPageIndex = index;
    }

    this.pageCount.text = (this.currentPageIndex + 1).toString();
  }

  public changePageText(): void {
    this.currentPageText = this.pages[this.currentPageIndex].text;
    let textBoxInput: HTMLInputElement | null = document.getElementById("journal") as HTMLInputElement;
    if (typeof textBoxInput !== "undefined" && textBoxInput !== null) {
      textBoxInput.value = this.currentPageText;
    }
  }
}