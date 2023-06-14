export class Keyboard {
  public static state: Map<string, boolean> = new Map<string, boolean>();

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
}