gsap.registerPlugin(PixiPlugin);
let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas";
}
console.log(type);

const app = new PIXI.Application({
    width: 360,
    height: 240,
    antialias: true,
    transparent: true
});

//Add the canvas that Pixi automatically created for you to the HTML document
document.getElementById("cunt").appendChild(app.view);
//PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
PIXI.Loader.shared.add(["images/icon.png", "images/arrow.svg"]).load(setup);

//This `setup` function will run when the image has loaded
let folder;
function setup() {
    //Create the cat sprite
    folder = new PIXI.Sprite(PIXI.Loader.shared.resources["images/arrow.svg"].texture);

    //   folder.x = 30;
    //   folder.y = 30;
    //folder.position.set(180, 120);
    //folder.scale.set(0.6, 0.6);
    //folder.anchor.set(0.5, 0.5);
    //folder.angle = 270;
    folder.vx = 0;
    folder.vy = 0;

    //Add the cat to the stage
    app.stage.addChild(folder);

    //app.ticker.add((delta) => gameLoop(delta));

    gsap.to(folder, 1, {
        pixi: { scaleX: 2 },
        yoyo: true,
        repeat: -1
    });
}

function gameLoop(delta) {
    let speed = 2;
    folder.vx = speed;
    folder.vy = 0; //speed;

    //Apply the velocity values to the cat's
    //position to make it move
    folder.x += folder.vx;
    folder.y += folder.vy;

    folder.x %= 360;
    folder.y %= 240;
}
