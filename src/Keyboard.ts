export class Keyboard {
  public static state: Map<string, boolean> = new Map<string, boolean>();

  public static eventCodes: Map<string, string> = new Map<string, string>([
    ["KeyA", "a"],
    ["KeyB", "b"],
    ["KeyC", "c"],
    ["KeyD", "d"],
    ["KeyE", "e"],
    ["KeyF", "f"],
    ["KeyG", "g"],
    ["KeyH", "h"],
    ["KeyI", "i"],
    ["KeyJ", "j"],
    ["KeyK", "k"],
    ["KeyL", "l"],
    ["KeyM", "m"],
    ["KeyN", "n"],
    ["KeyO", "o"],
    ["KeyP", "p"],
    ["KeyQ", "q"],
    ["KeyR", "r"],
    ["KeyS", "s"],
    ["KeyT", "t"],
    ["KeyU", "u"],
    ["KeyV", "v"],
    ["KeyW", "w"],
    ["KeyX", "x"],
    ["KeyY", "y"],
    ["KeyZ", "z"],
  ]);

  public static initialize(): void {
    document.addEventListener("keydown", Keyboard.keyDown);
    document.addEventListener("keyup", Keyboard.keyUp);
  }

  private static keyDown(e: KeyboardEvent): void {
    Keyboard.state.set(e.code, true);
  }

  private static keyUp(e: KeyboardEvent): void {
    Keyboard.state.set(e.code, false);
  }

  public static getCurrentLetter(): string {
    let letter: string = "";
    for (let [key, value] of Keyboard.eventCodes) {
      if (Keyboard.state.has(key) && Keyboard.state.get(key)) {
        letter = value;
      }
    }
    return letter;
  }
}