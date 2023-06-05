type Background = {z: number, paths: Array<string>};

export class Level {
  public backgrounds: Array<Background> = [];
  public groundOffset: number = 0;

  public addBackgrounds(background: Background): void {
    let existingBackgrounds: Background | undefined = this.backgrounds.find((val) => val.z === background.z);
    if (existingBackgrounds !== undefined) {
      for (let path of background.paths) {
        existingBackgrounds.paths.push(path)
      }
    } else {
      this.backgrounds.push(background);
    }
  }
}