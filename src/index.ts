import { Application, Assets } from 'pixi.js'
import { Character } from './Character'
import { Hud } from './hud/Hud'
import { Keyboard } from './Keyboard'
import { WinterForest } from './level/WinterForest'
import { Scene } from './Scene'

const baseLayerSpeed = 1.5;
const screenWidth = 512;
const screenHeight = 256;
const characterHorizontalOffset = 50;

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: screenWidth,
	height: screenHeight
});

let level = new WinterForest();
let character = new Character(characterHorizontalOffset, screenHeight-level.groundOffset, 6);
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
	"backgrounds/dark_forest/layer_0000.png",
	"backgrounds/dark_forest/layer_0001.png",
	"backgrounds/dark_forest/layer_0002.png",
	"backgrounds/dark_forest/layer_0003.png",
	"backgrounds/dark_forest/layer_0004.png",
	"backgrounds/dark_forest/layer_0005.png",
	"backgrounds/dark_forest/layer_0006.png",
	"backgrounds/dark_forest/layer_0007.png",
	"backgrounds/dark_forest/layer_0008.png",
	"backgrounds/dark_forest/layer_0009.png",
	"backgrounds/winter_forest/layer_0001.png",
	"backgrounds/winter_forest/layer_0002.png",
	"backgrounds/winter_forest/layer_0003.png",
	"backgrounds/winter_forest/layer_0004.png",
	"backgrounds/winter_forest/layer_0005.png",
	"backgrounds/winter_forest/layer_0006.png",
	"backgrounds/winter_forest/layer_0007.png",
	"backgrounds/winter_forest/layer_0008.png",
	"backgrounds/winter_forest/layer_0009.png",
	"backgrounds/winter_forest/layer_0010.png",
	"backgrounds/winter_forest/layer_0011.png",
	"backgrounds/winter_forest/layer_0012.png",
	"backgrounds/winter_forest/layer_0013.png",
	"backgrounds/winter_forest/layer_0014.png",
	"backgrounds/winter_forest/layer_0015.png",
	"backgrounds/winter_forest/layer_0016.png",
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
	scenes = Scene.createScenes(screenWidth, screenHeight, level.backgrounds, baseLayerSpeed);
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