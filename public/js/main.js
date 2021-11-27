gsap.registerPlugin(PixiPlugin);
gsap.registerPlugin(MotionPathPlugin);

let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas";
}
//PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
let dpr = window.devicePixelRatio;
PIXI.settings.RESOLUTION = dpr < 2 ? 2 : dpr;
//PIXI.settings.ANISOTROPIC_LEVEL = 0;
console.log(type);

const cw = 960;
const ch = 602;

const app = new PIXI.Application({
    width: 960,
    height: 602,
    antialias: true,
    transparent: true
});

//Add the canvas that Pixi automatically created for you to the HTML document
document.getElementById("cunt").appendChild(app.view);
//PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
PIXI.Loader.shared.add(["images/logo.png", "images/arrow.svg"]).load(setup);

//This `setup` function will run when the image has loaded

let createIconTextGroupItem = (textStr, textureName) => {
    let container = new PIXI.Container();

    let containerW = 125;
    let containerH = 50;

    const rectangle = new PIXI.Graphics();
    rectangle.beginFill(0xfc9f3c);
    rectangle.drawRoundedRect(0, 0, containerW, containerH, 7);
    rectangle.endFill();
    container.addChild(rectangle);

    let icon = new PIXI.Sprite(PIXI.Loader.shared.resources[textureName].texture);
    icon.anchor.set(0.5, 0.5);
    icon.width = 25;
    icon.height = 25;
    icon.position.set(20, containerH / 2);
    container.addChild(icon);

    const textLabel = new PIXI.Text(textStr, {
        fontFamily: "Arial",
        fontSize: 13,
        fill: "#000000",
        wordWrap: true,
        wordWrapWidth: 90,
        align: "left"
    });
    textLabel.anchor.set(0, 0.5);
    textLabel.position.set(icon.x + icon.width / 2 + 5, containerH / 2);
    container.addChild(textLabel);

    app.stage.addChild(container);
    return container;
};

let createCircle = (fill, radius, x = 10, y = 10, lineFill = 0xffffff, lineWidth = 0) => {
    const circle = new PIXI.Graphics();
    circle.lineStyle({ width: lineWidth, color: lineFill, alpha: 1 });
    circle.beginFill(fill);
    circle.drawCircle(0, 0, radius);
    circle.endFill();
    circle.x = x;
    circle.y = y;
    app.stage.addChild(circle);
    return circle;
};

let createTriangle = (x = 0, y = 0, fill = 0x1b823a) => {
    let tri1 = new PIXI.Graphics();
    tri1.beginFill(fill);
    tri1.drawPolygon([0, -9, 15, 0, 0, 9, 3, 0]);
    tri1.endFill();
    tri1.x = x;
    tri1.y = y;
    //tri1.pivot.set(7.5, -9);
    app.stage.addChild(tri1);
    return tri1;
};

let folder;
function setup() {
    //Create the cat sprite
    folder = new PIXI.Sprite(PIXI.Loader.shared.resources["images/logo.png"].texture);

    //   folder.x = 30;
    //   folder.y = 30;
    folder.position.set(cw * 0.389, ch * 0.413);
    //folder.scale.set(0.6, 0.6);
    folder.anchor.set(0.5, 0.5);
    folder.width = 40;
    folder.height = 40;
    //folder.angle = 270;
    // folder.vx = 0;
    // folder.vy = 0;

    //Add the cat to the stage
    app.stage.addChild(folder);

    let lItemH = 58;
    let leftItem1 = createIconTextGroupItem("Map fields", "images/logo.png");
    leftItem1.position.set(15, 90);
    console.log(leftItem1.width);

    let leftItem2 = createIconTextGroupItem("Track jobs", "images/logo.png");
    leftItem2.position.set(15, 90 + lItemH * 1);

    let leftItem3 = createIconTextGroupItem("Take notes", "images/logo.png");
    leftItem3.position.set(15, 90 + lItemH * 2);

    let leftItem4 = createIconTextGroupItem("Log harvest", "images/logo.png");
    leftItem4.position.set(15, 90 + lItemH * 3);

    let leftItem5 = createIconTextGroupItem("Invite team members", "images/logo.png");
    leftItem5.position.set(15, 90 + lItemH * 4);

    let leftItem6 = createIconTextGroupItem("Submit hours worked", "images/logo.png");
    leftItem6.position.set(15, 400);

    let leftItem7 = createIconTextGroupItem("Alerts", "images/logo.png");
    leftItem7.position.set(55, 470);

    let color_lightGreen = 0xdcede3;

    let lineStyle = { width: 3, color: 0x1b823a, alpha: 1 };
    let bgLineStyle = { width: 20, color: color_lightGreen, alpha: 1 };

    {
        const line1bg = new PIXI.Graphics();
        line1bg.lineStyle(bgLineStyle); //eaf3ee
        line1bg.moveTo(0, 0);
        line1bg.lineTo(75, 0);
        line1bg.quadraticCurveTo(90, 0, 90, 15);
        line1bg.lineTo(90, 116 + lItemH * 2 - 15);
        line1bg.quadraticCurveTo(90, 116 + lItemH * 2, 75, 116 + lItemH * 2);
        line1bg.lineTo(65, 116 + lItemH * 2);
        line1bg.lineTo(0, 116 + lItemH * 2);
        line1bg.x = 159;
        line1bg.y = 115;
        app.stage.addChild(line1bg);

        const line2bg = new PIXI.Graphics();
        line2bg.lineStyle(bgLineStyle);
        line2bg.moveTo(0, 0);
        line2bg.lineTo(90, 0);
        line2bg.x = 159;
        line2bg.y = 115 + lItemH * 1;
        app.stage.addChild(line2bg);

        const line3bg = new PIXI.Graphics();
        line3bg.lineStyle(bgLineStyle);
        line3bg.moveTo(0, 0);
        line3bg.lineTo(165, 0);
        line3bg.x = 159;
        line3bg.y = 115 + lItemH * 2;
        app.stage.addChild(line3bg);

        const line4bg = new PIXI.Graphics();
        line4bg.lineStyle(bgLineStyle);
        line4bg.moveTo(0, 0);
        line4bg.lineTo(90, 0);
        line4bg.x = 159;
        line4bg.y = 115 + lItemH * 3;
        app.stage.addChild(line4bg);
    }

    createCircle(color_lightGreen, 10, 159, 115 + lItemH * 0);
    createCircle(color_lightGreen, 10, 159, 115 + lItemH * 1);
    createCircle(color_lightGreen, 10, 159, 115 + lItemH * 2);
    createCircle(color_lightGreen, 10, 159, 115 + lItemH * 3);
    createCircle(color_lightGreen, 10, 159, 115 + lItemH * 4);

    const line1 = new PIXI.Graphics();
    line1.lineStyle(lineStyle);
    line1.moveTo(0, 0);
    line1.lineTo(75, 0);
    line1.quadraticCurveTo(90, 0, 90, 15);
    line1.lineTo(90, 116 - 15);
    line1.quadraticCurveTo(90, 116, 90 + 15, 116);
    //line1.lineTo(165, 116);
    line1.x = 159;
    line1.y = 115;
    app.stage.addChild(line1);

    const line2 = new PIXI.Graphics();
    line2.lineStyle(lineStyle);
    line2.moveTo(0, 0);
    line2.lineTo(75, 0);
    line2.quadraticCurveTo(90, 0, 90, 15);
    line2.x = 159;
    line2.y = 115 + lItemH * 1;
    app.stage.addChild(line2);

    const line3 = new PIXI.Graphics();
    line3.lineStyle(lineStyle);
    line3.moveTo(0, 0);
    line3.lineTo(90, 0);
    line3.lineTo(165, 0);
    line3.x = 159;
    line3.y = 115 + lItemH * 2;
    app.stage.addChild(line3);

    const line4 = new PIXI.Graphics();
    line4.lineStyle(lineStyle);
    line4.moveTo(0, 0);
    line4.lineTo(75, 0);
    line4.quadraticCurveTo(90, 0, 90, -15);
    line4.x = 159;
    line4.y = 115 + lItemH * 3;
    app.stage.addChild(line4);

    const line5 = new PIXI.Graphics();
    line5.lineStyle(lineStyle);
    line5.moveTo(0, 0);
    line5.lineTo(75, 0);
    line5.quadraticCurveTo(90, 0, 90, -15);
    line5.lineTo(90, -116 + 15);
    line5.quadraticCurveTo(90, -116, 90 + 15, -116);
    line5.x = 159;
    line5.y = 115 + lItemH * 4;
    app.stage.addChild(line5);

    createCircle(color_lightGreen, 3, 159, 115 + lItemH * 0, 0x1b823a, 2.5);
    createCircle(color_lightGreen, 3, 159, 115 + lItemH * 1, 0x1b823a, 2.5);
    createCircle(color_lightGreen, 3, 159, 115 + lItemH * 2, 0x1b823a, 2.5);
    createCircle(color_lightGreen, 3, 159, 115 + lItemH * 3, 0x1b823a, 2.5);
    createCircle(color_lightGreen, 3, 159, 115 + lItemH * 4, 0x1b823a, 2.5);

    const tri1 = createTriangle(170, 106);
    const tri2 = createTriangle(170, 106 + lItemH * 1);
    const tri3 = createTriangle(170, 106 + lItemH * 2);
    const tri4 = createTriangle(170, 106 + lItemH * 3);
    const tri5 = createTriangle(170, 106 + lItemH * 4);

    //app.ticker.add((delta) => gameLoop(delta));

    gsap.to(folder, {
        pixi: { scale: 0.16, duration: 1 },
        yoyo: true,
        repeat: -1
    });

    // gsap.fromTo(
    //     tri1,
    //     { pixi: { x: 170 } },
    //     { pixi: { x: 220 }, yoyo: false, repeat: -1, duration: 2 }
    // );

    let arrDuration = 3;

    gsap.timeline({ repeat: -1 })
        .to(tri1, {
            duration: 1.5,
            ease: "none",
            //repeat: -1,
            motionPath: {
                //alignOrigin: [0.5, 0.5],
                autoRotate: 0,
                path: "M159,115 h70 c20,0 20,0 20,20 v76 c0,20 0,20, 20,20",
                useRadians: true
            }
        })
        .to(tri1, {
            duration: 0.5,
            ease: "none",
            //repeat: -1,
            motionPath: {
                //alignOrigin: [0.5, 0.5],
                autoRotate: 0,
                path: "M268,231 h45",
                useRadians: true
            }
        });

    // gsap.to(tri1, {
    //     duration: arrDuration,
    //     ease: "none",
    //     repeat: -1,
    //     motionPath: {
    //         //alignOrigin: [0.5, 0.5],
    //         autoRotate: 0,
    //         path: "M159,115 h70 c20,0 20,0 20,20 v96 h75",
    //         useRadians: true
    //     }
    // });

    // gsap.to(tri2, {
    //     duration: arrDuration,
    //     ease: "none",
    //     repeat: -1,
    //     motionPath: {
    //         //alignOrigin: [0.5, 0.5],
    //         autoRotate: 0,
    //         path: "M159,174 h90 v57 h75",
    //         useRadians: true
    //     }
    // });

    // gsap.to(tri3, {
    //     duration: arrDuration,
    //     ease: "none",
    //     repeat: -1,
    //     motionPath: {
    //         //alignOrigin: [0.5, 0.5],
    //         autoRotate: 0,
    //         path: "M159,231 h90 h75",
    //         useRadians: true
    //     }
    // });

    // gsap.to(tri4, {
    //     duration: arrDuration,
    //     ease: "none",
    //     repeat: -1,
    //     motionPath: {
    //         //alignOrigin: [0.5, 0.5],
    //         autoRotate: 0,
    //         path: "M159,289 h90 v-57 h75",
    //         useRadians: true
    //     }
    // });

    // gsap.to(tri5, {
    //     duration: arrDuration,
    //     ease: "none",
    //     repeat: -1,
    //     motionPath: {
    //         //alignOrigin: [0.5, 0.5],
    //         autoRotate: 0,
    //         path: "M159,347 h70 c20,0 20,0 20,-20 v-96 h75",
    //         useRadians: true
    //     }
    // });

    // MotionPathHelper.create("#arrow", {
    //     path: path1
    // });
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
