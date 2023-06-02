import { Container } from "pixi.js";
import { DistanceCounter } from "./DistanceCounter";
import { Journal } from "./Journal";

export class Hud extends Container {
  public distanceCounter: DistanceCounter;
  public journal: Journal;

  constructor(width: number, height: number) {
    super();

    // Set container parameters.
    this.width = width;
    this.height = height;
    this.zIndex = 999;
    this.sortableChildren = true;

    // Add distance counter.
    this.distanceCounter = new DistanceCounter(30, 30, 0);
    this.addChild(this.distanceCounter);

    // Add journal.
    this.journal = new Journal(480, 30, 0);
    this.addChild(this.journal);
  }
}