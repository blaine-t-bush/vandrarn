import { Container, Sprite, Text } from "pixi.js"

export class TextBox extends Container {
  private static nameSprite: string = "sprite";
  private static nameText: string = "text";
  
  public nameTextBox: string;
  public sprite: Sprite;
  public text: Text;

  constructor(name: string, spritePath: string, x: number, y: number, zIndex: number) {
    super();

    this.visible = false;
    this.nameTextBox = name;

    // Add graphic.
    let sprite: Sprite = Sprite.from(spritePath);
    sprite.anchor.set(0.5);
    sprite.name = TextBox.nameSprite;
    this.sprite = sprite;
    this.addChild(this.sprite);

    // Add text.
    let text: Text = new Text('', {
      fontFamily: 'Courier New',
      fontSize: 14,
      fill: 0xff1010,
      align: 'center',
    });
    text.anchor.set(0.5);
    text.zIndex = sprite.zIndex + 1;
    text.name = TextBox.nameText;
    this.text = text;
    this.addChild(this.text);

    // Add container parameters.
    this.x = x;
    this.y = y;
    this.zIndex = zIndex;
    this.name = this.nameTextBox;

    this.sortChildren();
  }

  public updateText(newText: string) {
    this.text.text = newText;
  }

  public hide() {
    this.visible = false;
  }

  public show() {
    this.visible = true;
  }
}