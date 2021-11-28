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
    let w = 15;
    let h = 18;
    tri1.drawPolygon([-w / 2, -h / 2, w / 2, 0, -w / 2, h / 2, -w / 2 + 3, 0]);
    tri1.endFill();
    tri1.x = x;
    tri1.y = y;
    //tri1.pivot.set(7.5, -9);
    app.stage.addChild(tri1);
    return tri1;
};

let drawLine = (style, pos, points) => {
    let line = new PIXI.Graphics();
    line.lineStyle(style); //eaf3ee
    line.moveTo(points[0].x, points[0].y);

    let path = `M${points[0].x + pos.x},${points[0].y + pos.y} `;

    points.forEach((pt, i) => {
        if (i === 0) return;
        if (pt.curve) {
            //line.moveTo(pt.x - pt.curve, points[0].y);
            let ppt = points[i - 1];
            let npt = points[i + 1];

            let prevPtX = pt.x !== ppt.x ? pt.x + (ppt.x > pt.x ? pt.curve : -pt.curve) : pt.x;
            let prevPtY = pt.y !== ppt.y ? pt.y + (ppt.y > pt.y ? pt.curve : -pt.curve) : pt.y;
            //console.log("prev", prevPtX, prevPtY);
            let nextPtX = pt.x !== npt.x ? pt.x + (npt.x > pt.x ? pt.curve : -pt.curve) : pt.x;
            let nextPtY = pt.y !== npt.y ? pt.y + (npt.y > pt.y ? pt.curve : -pt.curve) : pt.y;
            //console.log("next", nextPtX, nextPtY);

            line.lineTo(prevPtX, prevPtY);
            line.quadraticCurveTo(pt.x, pt.y, nextPtX, nextPtY);

            path += `L${prevPtX + pos.x},${prevPtY + pos.y} `;
            path += `Q${pt.x + pos.x},${pt.y + pos.y} ${nextPtX + pos.x},${nextPtY + pos.y} `;
        } else {
            line.lineTo(pt.x, pt.y);
            path += `L${pt.x + pos.x},${pt.y + pos.y} `;
        }
    });

    line.x = pos.x;
    line.y = pos.y;
    app.stage.addChild(line);

    //console.log(path);
    return { obj: line, path };
};

let folder;
function setup() {
    let logoBgCircle1 = createCircle(0xcf421f, 42, 373.5, 248.5, 0x1b823a, 0);
    logoBgCircle1.alpha = 0.1;
    let logoBgCircle2 = createCircle(0xcf421f, 34, 373.5, 248.5, 0x1b823a, 0);
    logoBgCircle2.alpha = 0.1;
    let logoBgCircle3 = createCircle(0xcf421f, 26, 373.5, 248.5, 0x1b823a, 0);
    logoBgCircle3.alpha = 0.1;

    //Create the cat sprite
    folder = new PIXI.Sprite(PIXI.Loader.shared.resources["images/logo.png"].texture);

    //   folder.x = 30;
    //   folder.y = 30;
    folder.position.set(373.5, 248.5);
    //folder.scale.set(0.6, 0.6);
    folder.anchor.set(0.5, 0.5);
    folder.width = folder.height = 52;
    //folder.height = 40;
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
    createCircle(color_lightGreen, 10, 159, 115 + lItemH * 0);
    createCircle(color_lightGreen, 10, 159, 115 + lItemH * 1);
    createCircle(color_lightGreen, 10, 159, 115 + lItemH * 2);
    createCircle(color_lightGreen, 10, 159 + 160, 115 + lItemH * 2);
    createCircle(color_lightGreen, 10, 159, 115 + lItemH * 3);
    createCircle(color_lightGreen, 10, 159, 115 + lItemH * 4);

    let bgLineStyle = { width: 20, color: color_lightGreen, alpha: 1 };
    let lineStyle = { width: 2.5, color: 0x1b823a, alpha: 1 };
    let bgLineStyle2 = { width: 20, color: 0xeadcd8, alpha: 1 };
    let lineStyle2 = { width: 2.5, color: 0xd0421f, alpha: 1 };
    let thinLineCurve = 20;
    let leftLineX1 = 90;
    let leftLineX2 = 160;

    let line1Path = [
        { x: 0, y: 0 },
        { x: leftLineX1, y: 0, curve: thinLineCurve },
        { x: leftLineX1, y: lItemH * 2, curve: thinLineCurve },
        { x: leftLineX2, y: lItemH * 2 }
    ];
    let line2Path = [
        { x: 0, y: 0 },
        { x: leftLineX1, y: 0, curve: thinLineCurve },
        { x: leftLineX1, y: lItemH, curve: thinLineCurve },
        { x: leftLineX2, y: lItemH }
    ];
    let line3Path = [
        { x: 0, y: 0 },
        { x: leftLineX1, y: 0 },
        { x: leftLineX2, y: 0 }
    ];
    let line4Path = [
        { x: 0, y: 0 },
        { x: leftLineX1, y: 0, curve: thinLineCurve },
        { x: leftLineX1, y: -lItemH, curve: thinLineCurve },
        { x: leftLineX2, y: -lItemH }
    ];
    let line5Path = [
        { x: 0, y: 0 },
        { x: leftLineX1, y: 0, curve: thinLineCurve },
        { x: leftLineX1, y: -lItemH * 2, curve: thinLineCurve },
        { x: leftLineX2, y: -lItemH * 2 }
    ];

    let line6Path = [
        { x: 0, y: 0 },
        { x: 118, y: 0, curve: 10 },
        { x: 118, y: -165, curve: 10 },
        { x: leftLineX2, y: -165 }
    ];

    let line7Path = [
        { x: 0, y: 0 },
        { x: 105, y: 0, curve: 10 },
        { x: 105, y: -205, curve: 10 },
        { x: 132, y: -205 }
    ];

    let rightLine1Path = [
        { x: 0, y: 0 },
        { x: 48, y: 0, curve: 10 },
        { x: 48, y: -150, curve: 10 },
        { x: 145, y: -150 }
    ];
    let rightLine2Path = [
        { x: 0, y: 0 },
        { x: 48, y: 0, curve: 10 },
        { x: 48, y: -97, curve: 10 },
        { x: 145, y: -97 }
    ];
    let rightLine3Path = [
        { x: 0, y: 0 },
        { x: 48, y: 0, curve: 10 },
        { x: 48, y: -44, curve: 10 },
        { x: 145, y: -44 }
    ];
    let rightLine4Path = [
        { x: 0, y: 0 },
        { x: 145, y: 0 }
    ];
    let rightLine5Path = [
        { x: 0, y: 0 },
        { x: 48, y: 0, curve: 10 },
        { x: 48, y: 97, curve: 10 },
        { x: 145, y: 97 }
    ];
    let rightLine6Path = [
        { x: 0, y: 0 },
        { x: 48, y: 0, curve: 10 },
        { x: 48, y: 193, curve: 10 },
        { x: 145, y: 193 }
    ];

    let bgLine1 = drawLine(bgLineStyle, { x: 159, y: 115 + lItemH * 0 }, line1Path);
    let bgLine2 = drawLine(bgLineStyle, { x: 159, y: 115 + lItemH * 1 }, line2Path);
    let bgLine3 = drawLine(bgLineStyle, { x: 159, y: 115 + lItemH * 2 }, line3Path);
    let bgLine4 = drawLine(bgLineStyle, { x: 159, y: 115 + lItemH * 3 }, line4Path);
    let bgLine5 = drawLine(bgLineStyle, { x: 159, y: 115 + lItemH * 4 }, line5Path);
    let bgLine6 = drawLine(bgLineStyle2, { x: 159, y: 395 + lItemH / 2 }, line6Path);
    let bgLine7 = drawLine(bgLineStyle2, { x: 199, y: 465 + lItemH / 2 }, line7Path);

    let line1 = drawLine(lineStyle, { x: 159, y: 115 + lItemH * 0 }, line1Path);
    let line2 = drawLine(lineStyle, { x: 159, y: 115 + lItemH * 1 }, line2Path);
    let line3 = drawLine(lineStyle, { x: 159, y: 115 + lItemH * 2 }, line3Path);
    let line4 = drawLine(lineStyle, { x: 159, y: 115 + lItemH * 3 }, line4Path);
    let line5 = drawLine(lineStyle, { x: 159, y: 115 + lItemH * 4 }, line5Path);
    let line6 = drawLine(lineStyle2, { x: 159, y: 395 + lItemH / 2 }, line6Path);
    let line7 = drawLine(lineStyle2, { x: 199, y: 465 + lItemH / 2 }, line7Path);

    let rLine1 = drawLine(lineStyle, { x: 430, y: 231 }, rightLine1Path);
    let rLine2 = drawLine(lineStyle, { x: 430, y: 231 }, rightLine2Path);
    let rLine3 = drawLine(lineStyle, { x: 430, y: 231 }, rightLine3Path);
    let rLine4 = drawLine(lineStyle2, { x: 430, y: 259 }, rightLine4Path);
    let rLine5 = drawLine(lineStyle2, { x: 430, y: 259 }, rightLine5Path);
    let rLine6 = drawLine(lineStyle2, { x: 430, y: 259 }, rightLine6Path);

    createCircle(color_lightGreen, 3, 159, 115 + lItemH * 0, 0x1b823a, 2.5);
    createCircle(color_lightGreen, 3, 159, 115 + lItemH * 1, 0x1b823a, 2.5);
    createCircle(color_lightGreen, 3, 159, 115 + lItemH * 2, 0x1b823a, 2.5);
    createCircle(color_lightGreen, 3, 159, 115 + lItemH * 3, 0x1b823a, 2.5);
    createCircle(color_lightGreen, 3, 159, 115 + lItemH * 4, 0x1b823a, 2.5);

    const tri1 = createTriangle(159, 115);
    const tri2 = createTriangle(159, 115 + lItemH * 1);
    const tri3 = createTriangle(159, 115 + lItemH * 2);
    const tri4 = createTriangle(159, 115 + lItemH * 3);
    const tri5 = createTriangle(159, 115 + lItemH * 4);

    //app.ticker.add((delta) => gameLoop(delta));

    // gsap.to(logoBgCircle1, {
    //     pixi: { scale: 1.15 },
    //     duration: 0.5,
    //     yoyo: true,
    //     delay: 0.1,
    //     repeat: -1
    // });
    // gsap.to(logoBgCircle2, {
    //     pixi: { scale: 1.2 },
    //     duration: 0.5,
    //     yoyo: true,
    //     delay: 0.05,
    //     repeat: -1
    // });
    // gsap.to(logoBgCircle3, {
    //     pixi: { scale: 1.25 },
    //     duration: 0.5,
    //     yoyo: true,
    //     repeat: -1
    // });

    // gsap.fromTo(
    //     tri1,
    //     { pixi: { x: 170 } },
    //     { pixi: { x: 220 }, yoyo: false, repeat: -1, duration: 2 }
    // );

    let arrDuration1 = 1.5;
    let arrDuration2 = arrDuration1 / 3;

    let l1PathPts = line1.path.split(" ").filter((p) => p !== "");
    let len = l1PathPts.length;
    let endPoints = `M${l1PathPts[len - 2]} ${l1PathPts[len - 1]}`;

    gsap.timeline({ repeat: -1 }).to(tri1, {
        duration: arrDuration1,
        ease: "none",
        //repeat: -1,
        motionPath: {
            autoRotate: 0,
            path: l1PathPts.join(" "), //"M159,115 h70 c20,0 20,0 20,20 v76 c0,20 0,20, 20,20",
            useRadians: true
        }
    });

    gsap.timeline({ repeat: -1 }).to(tri2, {
        duration: arrDuration1,
        ease: "none",
        //repeat: -1,
        motionPath: {
            autoRotate: 0,
            path: line2.path.split(" ").join(" "), //"M159,115 h70 c20,0 20,0 20,20 v76 c0,20 0,20, 20,20",
            useRadians: true
        }
    });

    gsap.timeline({ repeat: -1 }).to(tri3, {
        duration: arrDuration1,
        ease: "none",
        //repeat: -1,
        motionPath: {
            autoRotate: 0,
            path: line3.path.split(" ").join(" "),
            useRadians: true
        }
    });

    gsap.timeline({ repeat: -1 }).to(tri4, {
        duration: arrDuration1,
        ease: "none",
        motionPath: {
            autoRotate: 0,
            path: line4.path.split(" ").join(" "), //"M159,115 h70 c20,0 20,0 20,20 v76 c0,20 0,20, 20,20",
            useRadians: true
        }
    });

    gsap.timeline({ repeat: -1 }).to(tri5, {
        duration: arrDuration1,
        ease: "none",
        motionPath: {
            autoRotate: 0,
            path: line5.path.split(" ").join(" "), //"M159,115 h70 c20,0 20,0 20,20 v76 c0,20 0,20, 20,20",
            useRadians: true
        }
    });

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
