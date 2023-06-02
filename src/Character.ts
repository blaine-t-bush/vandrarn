import { AnimatedSprite, Assets, Container } from "pixi.js";

const speedRun: number = 2;
const speedWalk: number = 1;

export class Character extends Container {
  private animations: Map<string, AnimatedSprite>;
  private animationSpeed: number;
  public moveSpeed: number;
  public stepCount: number;
	public static spritePathIdle = "spritesheets/character/idle.json";
	public static spritePathWalk = "spritesheets/character/walk.json";
	public static spritePathRun = "spritesheets/character/run.json";

  constructor(x: number, y: number, animationSpeed: number) {
    super();

    this.animations = new Map<string, AnimatedSprite>();
    this.position.set(x, y)
    this.animationSpeed = animationSpeed;
    this.moveSpeed = 0;
    this.stepCount = 0;

	  this.addAnimations();
  }

  public setState(key: string): void {
    this.playAnimation(key);

    if (key === "runRight") {
      this.moveSpeed = speedRun;
    } else if (key === "runLeft") {
      this.moveSpeed = -speedRun;
    } else if (key === "walkRight") {
      this.moveSpeed = speedWalk;
    } else if (key === "walkLeft") {
      this.moveSpeed = -speedWalk;
    } else {
      this.moveSpeed = 0;
    }
  }

  public async addAnimations() {
    Assets.load("spritesheets/character/idle.json").then((val) => {
      this.addAnimation("idle", AnimatedSprite.fromFrames(val.data.animations["idle"]))
    });
    Assets.load("spritesheets/character/walk.json").then((val) => {
      this.addAnimation("walkRight", AnimatedSprite.fromFrames(val.data.animations["walk"]))
    });
    Assets.load("spritesheets/character/run.json").then((val) => {
      this.addAnimation("runRight", AnimatedSprite.fromFrames(val.data.animations["run"]))
    });
  }

  public addAnimation(key: string, animatedSprite: AnimatedSprite): void {
    if (!this.animations.has(key)) {
      animatedSprite.visible = false;
      animatedSprite.animationSpeed = 1 / this.animationSpeed;
      this.animations.set(key, animatedSprite);
      this.addChild(animatedSprite);
    }
  }

  public playAnimation(key: string): void {
    this.stopAnimations();
    let animatedSprite = this.animations.get(key);
    if (animatedSprite !== undefined) {
      animatedSprite.visible = true;
      animatedSprite.play();
    }
  }

  public stopAnimations(): void {
    for (let animatedSprite of this.animations.values()) {
      animatedSprite.visible = false;
    }
  }

  public addSteps(multiplier: number): void {
    this.stepCount += multiplier * this.moveSpeed;
  }
}