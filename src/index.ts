import { Application, Assets } from 'pixi.js'
import { Character } from './Character'
import { Hud } from './hud/Hud'
import { Keyboard } from './Keyboard'
import { Forest } from './level/Forest'
import { Scene } from './Scene'

const baseLayerSpeed = 1.5;

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 600,
	height: 400
});

let level = new Forest();
let character = new Character(150, 335, 6);
let scenes: Array<Scene> = [];
let hud = new Hud(app.stage.width, app.stage.height);

function gameLoop(delta: number): void {
	if (Keyboard.state.has("ShiftLeft") && Keyboard.state.get("ShiftLeft") && Keyboard.state.has("ArrowRight") && Keyboard.state.get("ArrowRight")) {
		// Run right
		character.setState("runRight");
		character.addSteps(delta);
		Scene.moveScenes(delta, character.moveSpeed, scenes);
	} else if (Keyboard.state.has("ArrowRight") && Keyboard.state.get("ArrowRight")) {
		// Walk right
		character.setState("walkRight");
		character.addSteps(delta);
		Scene.moveScenes(delta, character.moveSpeed, scenes);
	} else {
		// Idle
		character.playAnimation("idle");
	}

	hud.distanceCounter.updateCount(character.stepCount);

	if (character.stepCount >= 100) {
		hud.journal.show();
	}
}

app.stage.sortableChildren = true;
Keyboard.initialize();

Assets.load([
	// HUD
	"hud/GUI_label_2x.png",
	// Backgrounds
	"backgrounds/forest/layer_0000.png",
	"backgrounds/forest/layer_0001.png",
	"backgrounds/forest/layer_0002.png",
	"backgrounds/forest/layer_0003.png",
	"backgrounds/forest/layer_0004.png",
	"backgrounds/forest/layer_0005.png",
	"backgrounds/forest/layer_0006.png",
	"backgrounds/forest/layer_0007.png",
	"backgrounds/forest/layer_0008.png",
	"backgrounds/forest/layer_0009.png",
	"backgrounds/forest/layer_0010.png",
	"backgrounds/forest/layer_0011.png",
	"backgrounds/hill/layer_0001.png",
	"backgrounds/hill/layer_0002.png",
	"backgrounds/hill/layer_0003.png",
	"backgrounds/hill/layer_0004.png",
	"backgrounds/hill/layer_0005.png",
	"backgrounds/hill/layer_0006.png",
	// Character animations
	"spritesheets/character/idle.json",
	"spritesheets/character/walk.json",
	"spritesheets/character/run.json"
]).then(() => {
	// Instantiate level.
	// Create TilingSprites for each background.
	console.log(level.backgrounds);
	scenes = Scene.createScenes(level.backgrounds, baseLayerSpeed);
	console.log(scenes);
	for (let i = 0; i < scenes.length; i++) {
		app.stage.addChild(scenes[i]);
	}
	
	// Load character animations.
	app.stage.addChild(character);

	// Load HUD.
	app.stage.addChild(hud);
	hud.distanceCounter.show();

	app.stage.sortChildren();
	app.ticker.add(gameLoop);
});