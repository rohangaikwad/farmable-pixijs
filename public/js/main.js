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

let color_lightGreen = 0xf0f8f4;
let color_darkGreen = 0x00843d;
let color_darkOrange = 0xcf4520;
let color_lightOrange = 0xfcf4f2;

const app = new PIXI.Application({
    width: 960,
    height: 602,
    antialias: true,
    transparent: true
});

//Add the canvas that Pixi automatically created for you to the HTML document
document.getElementById("cunt").appendChild(app.view);
//PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
let imageAliases = [
    "logo.png",
    "arrow.svg",
    "l_icon_1.svg",
    "l_icon_2.svg",
    "l_icon_3.svg",
    "l_icon_4.svg",
    "l_icon_5.svg",
    "l_icon_6.svg",
    "l_icon_7.svg",
    "r_icon_1.svg",
    "r_icon_2.svg",
    "r_icon_3.svg",
    "r_icon_11.svg",
    "r_icon_21.svg",
    "r_icon_31.svg",
    "logo_mobile_app.svg",
    "logo_web_portal.svg"
];

let images = imageAliases.map((i) => `images/${i}`);
console.log(images);
PIXI.Loader.shared.add(images).load(setup);

//This `setup` function will run when the image has loaded

let GetSprite = (alias) => {
    let imageAlias = imageAliases.filter((img) => img.split(".")[0] === alias)[0];
    return new PIXI.Sprite(PIXI.Loader.shared.resources[`images/${imageAlias}`].texture);
};

let createIconTextGroupItem = (textStr, textureName) => {
    let container = new PIXI.Container();

    let containerW = 125;
    let containerH = 50;

    const rectangle = new PIXI.Graphics();
    rectangle.lineStyle({ width: 2, color: 0xf1f1f1, alpha: 1 });
    rectangle.beginFill(0xffffff);
    rectangle.drawRoundedRect(0, 0, containerW, containerH, 7);
    rectangle.endFill();
    container.addChild(rectangle);

    let icon = GetSprite(textureName); // new PIXI.Sprite(PIXI.Loader.shared.resources[textureName].texture);
    icon.anchor.set(0.5, 0.5);
    icon.width = (icon.width / icon.height) * 20;
    icon.height = 20;
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

let createText = (textStr, txtColor, x, y) => {
    const textLabel = new PIXI.Text(textStr, {
        fontFamily: "Arial",
        fontSize: 16,
        fontWeight: 600,
        fill: txtColor,
        wordWrap: true,
        wordWrapWidth: 360,
        align: "left"
    });
    textLabel.anchor.set(0, 0.5);
    textLabel.x = x;
    textLabel.y = y;

    app.stage.addChild(textLabel);
    return textLabel;
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

let createTriangle = (x = 0, y = 0, fill = 0x1b823a, reverse = false) => {
    let tri1 = new PIXI.Graphics();
    tri1.beginFill(fill);
    let w = 15;
    let h = 18;
    if (reverse) {
        tri1.drawPolygon([-w / 2, -h / 2, w / 2, 0, -w / 2, h / 2, -w / 2 + 3, 0]);
        //tri1.drawPolygon([w / 2, -h / 2, -w / 2, 0, w / 2, h / 2, w / 2 - 3, 0]);
    } else {
        tri1.drawPolygon([-w / 2, -h / 2, w / 2, 0, -w / 2, h / 2, -w / 2 + 3, 0]);
    }
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

let createBigBoxWithText = (t1, t2, t3, i1, i2, i3) => {
    let container = new PIXI.Container();
    let lineStyle3 = { width: 1, color: color_darkOrange, alpha: 1 };
    let boxOutline = drawLine(lineStyle3, { x: 0, y: 0 }, [
        { x: 0, y: 0 },
        { x: 341, y: 0, curve: 22 },
        { x: 341, y: 83, curve: 22 },
        { x: 0, y: 83 },
        { x: 0, y: 0 }
    ]);
    container.addChild(boxOutline.obj);

    let boxLine1 = drawLine(lineStyle3, { x: 10, y: 35 }, [
        { x: 0, y: 0 },
        { x: 320, y: 0 }
    ]);
    container.addChild(boxLine1.obj);

    const mainText = new PIXI.Text(t1, {
        fontFamily: "Arial",
        fontSize: 16,
        fontWeight: 500,
        fill: color_darkOrange,
        wordWrap: true,
        wordWrapWidth: 360,
        align: "left"
    });
    mainText.anchor.set(0, 0.5);
    mainText.x = 40;
    mainText.y = 18;
    container.addChild(mainText);

    const txt1 = new PIXI.Text(t2, {
        fontFamily: "Arial",
        fontSize: 14,
        fontWeight: 500,
        fill: color_darkOrange,
        wordWrap: true,
        wordWrapWidth: 110,
        align: "left"
    });
    txt1.anchor.set(0, 0.5);
    txt1.x = 40;
    txt1.y = 57;
    container.addChild(txt1);

    const txt2 = new PIXI.Text(t3, {
        fontFamily: "Arial",
        fontSize: 14,
        fontWeight: 500,
        fill: color_darkOrange,
        wordWrap: true,
        wordWrapWidth: 130,
        align: "left"
    });
    txt2.anchor.set(0, 0.5);
    txt2.x = 200;
    txt2.y = 57;
    container.addChild(txt2);

    let mainImg = GetSprite(i1);
    mainImg.anchor.set(0.5, 0.5);
    mainImg.width = (mainImg.width / mainImg.height) * 20;
    mainImg.height = 20;
    mainImg.x = 20;
    mainImg.y = 18;
    container.addChild(mainImg);

    let iconImg1 = GetSprite(i2);
    iconImg1.anchor.set(0.5, 0.5);
    iconImg1.width = (iconImg1.width / iconImg1.height) * 22;
    iconImg1.height = 22;
    iconImg1.x = 20;
    iconImg1.y = 57;
    container.addChild(iconImg1);

    let iconImg2 = GetSprite(i3);
    iconImg2.anchor.set(0.5, 0.5);
    iconImg2.width = (iconImg2.width / iconImg2.height) * 22;
    iconImg2.height = 22;
    iconImg2.x = 180;
    iconImg2.y = 57;
    container.addChild(iconImg2);

    app.stage.addChild(container);
    return container;
};

let folder;
function setup() {
    let logoBgCircle1 = createCircle(0xfdf8f6, 45, 372.75, 248.25, 0x1b823a, 0);
    let logoBgCircle2 = createCircle(0xfaedea, 40, 372.75, 248.25, 0x1b823a, 0);
    let logoBgCircle3 = createCircle(0xf6dfdc, 34, 372.75, 248.25, 0x1b823a, 0);

    //Create the cat sprite
    folder = GetSprite("logo");

    //   folder.x = 30;
    //   folder.y = 30;
    folder.position.set(372.75, 248.25);
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
    let leftItem1 = createIconTextGroupItem("Map fields", "l_icon_1");
    leftItem1.position.set(15, 90);
    console.log(leftItem1.width);

    let leftItem2 = createIconTextGroupItem("Track jobs", "l_icon_2");
    leftItem2.position.set(15, 90 + lItemH * 1);

    let leftItem3 = createIconTextGroupItem("Take notes", "l_icon_3");
    leftItem3.position.set(15, 90 + lItemH * 2);

    let leftItem4 = createIconTextGroupItem("Log harvest", "l_icon_4");
    leftItem4.position.set(15, 90 + lItemH * 3);

    let leftItem5 = createIconTextGroupItem("Invite team members", "l_icon_5");
    leftItem5.position.set(15, 90 + lItemH * 4);

    let leftItem6 = createIconTextGroupItem("Submit hours worked", "l_icon_6");
    leftItem6.position.set(15, 400);

    let leftItem7 = createIconTextGroupItem("Alerts", "l_icon_7");
    leftItem7.position.set(53, 470);

    createCircle(color_lightGreen, 10, 159, 115 + lItemH * 0);
    createCircle(color_lightGreen, 10, 159, 115 + lItemH * 1);
    createCircle(color_lightGreen, 10, 159, 115 + lItemH * 2);
    createCircle(color_lightGreen, 10, 159 + 160, 115 + lItemH * 2);
    createCircle(color_lightGreen, 10, 159, 115 + lItemH * 3);
    createCircle(color_lightGreen, 10, 159, 115 + lItemH * 4);

    createCircle(color_lightOrange, 10, 159, 395 + lItemH / 2);
    createCircle(color_lightOrange, 10, 316, 259);
    createCircle(color_lightOrange, 10, 199, 465 + lItemH / 2);
    createCircle(color_lightOrange, 10, 330, 289);

    createCircle(color_lightGreen, 10, 430, 231);
    createCircle(color_lightOrange, 10, 430, 259);

    createCircle(color_lightGreen, 10, 575, 81);
    createCircle(color_lightGreen, 10, 575, 81 + 53);
    createCircle(color_lightGreen, 10, 575, 81 + 53 + 53);

    createCircle(color_lightOrange, 10, 575, 259);
    createCircle(color_lightOrange, 10, 575, 259 + 97);
    createCircle(color_lightOrange, 10, 575, 259 + 97 + 97);

    let bgLineStyle = { width: 20, color: color_lightGreen, alpha: 1 };
    let lineStyle = { width: 2.5, color: color_darkGreen, alpha: 1 };
    let bgLineStyle2 = { width: 20, color: color_lightOrange, alpha: 1 };
    let lineStyle2 = { width: 2.5, color: color_darkOrange, alpha: 1 };
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
        { x: 132, y: -205 },
        { x: 105, y: -205, curve: 10 },
        { x: 105, y: 0, curve: 10 },
        { x: 0, y: 0 }
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
        { x: 48, y: 194, curve: 10 },
        { x: 145, y: 194 }
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

    let bgRLine1 = drawLine(bgLineStyle, { x: 430, y: 231 }, rightLine1Path);
    let bgRLine2 = drawLine(bgLineStyle, { x: 430, y: 231 }, rightLine2Path);
    let bgRLine3 = drawLine(bgLineStyle, { x: 430, y: 231 }, rightLine3Path);
    let bgRLine4 = drawLine(bgLineStyle2, { x: 430, y: 259 }, rightLine4Path);
    let bgRLine5 = drawLine(bgLineStyle2, { x: 430, y: 259 }, rightLine5Path);
    let bgRLine6 = drawLine(bgLineStyle2, { x: 430, y: 259 }, rightLine6Path);

    let rLine1 = drawLine(lineStyle, { x: 430, y: 231 }, rightLine1Path);
    let rLine2 = drawLine(lineStyle, { x: 430, y: 231 }, rightLine2Path);
    let rLine3 = drawLine(lineStyle, { x: 430, y: 231 }, rightLine3Path);
    let rLine4 = drawLine(lineStyle2, { x: 430, y: 259 }, rightLine4Path);
    let rLine5 = drawLine(lineStyle2, { x: 430, y: 259 }, rightLine5Path);
    let rLine6 = drawLine(lineStyle2, { x: 430, y: 259 }, rightLine6Path);

    createCircle(color_lightGreen, 3, 159, 115 + lItemH * 0, color_darkGreen, 2.5);
    createCircle(color_lightGreen, 3, 159, 115 + lItemH * 1, color_darkGreen, 2.5);
    createCircle(color_lightGreen, 3, 159, 115 + lItemH * 2, color_darkGreen, 2.5);
    createCircle(color_lightGreen, 3, 159, 115 + lItemH * 3, color_darkGreen, 2.5);
    createCircle(color_lightGreen, 3, 159, 115 + lItemH * 4, color_darkGreen, 2.5);

    createCircle(color_lightOrange, 3, 159, 395 + lItemH / 2, color_darkOrange, 2.5);
    createCircle(color_lightOrange, 3, 330, 289, color_darkOrange, 2.5);

    const tri1 = createTriangle(159, 115);
    const tri2 = createTriangle(159, 115 + lItemH * 1);
    const tri3 = createTriangle(159, 115 + lItemH * 2);
    const tri4 = createTriangle(159, 115 + lItemH * 3);
    const tri5 = createTriangle(159, 115 + lItemH * 4);
    const tri6 = createTriangle(159, 395 + lItemH / 2, 0xd0421f);
    const tri7 = createTriangle(325, 289, 0xd0421f, true);

    const rTri1 = createTriangle(430, 231);
    const rTri2 = createTriangle(430, 231);
    const rTri3 = createTriangle(430, 231);

    const rTri4 = createTriangle(430, 259, 0xd0421f);
    const rTri5 = createTriangle(430, 259, 0xd0421f);
    const rTri6 = createTriangle(430, 259, 0xd0421f);

    // { x: 430, y: 231 }
    // { x: 430, y: 231 }
    // { x: 430, y: 231 }
    // { x: 430, y: 259 }
    // { x: 430, y: 259 }
    // { x: 430, y: 259 }

    let rTxt1 = createText("Fields overview", color_darkGreen, 595, 81);
    let rTxt2 = createText("Jobs and Harvest review", color_darkGreen, 595, 81 + 53);
    let rTxt3 = createText("Add product details for compliance", color_darkGreen, 595, 81 + 106);

    let rBigBox1 = createBigBoxWithText(
        "Reporting Module",
        "Audit ready treatment reports",
        "Autogenerated jobs and harvest logs",
        "r_icon_1",
        "r_icon_11",
        "r_icon_11"
    );
    rBigBox1.x = 595;
    rBigBox1.y = 220;

    let rBigBox2 = createBigBoxWithText(
        "Teams and Timesheets module",
        "Team management",
        "Timesheets",
        "r_icon_2",
        "r_icon_21",
        "r_icon_21"
    );
    rBigBox2.x = 595;
    rBigBox2.y = 315;

    let rBigBox3 = createBigBoxWithText(
        "Safe Spraying Module",
        "Field access limitations",
        "Label restriction alerts",
        "r_icon_3",
        "r_icon_31",
        "r_icon_31"
    );
    rBigBox3.x = 595;
    rBigBox3.y = 410;

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

    let arrDuration1 = 2;
    let arrDuration2 = arrDuration1 / 3;

    let l1PathPts = line1.path.split(" ").filter((p) => p !== "");
    let len = l1PathPts.length;
    let endPoints = `M${l1PathPts[len - 2]} ${l1PathPts[len - 1]}`;

    gsap.timeline({ repeat: -1 })
        .to(rTri1, { duration: 0, alpha: 0 })
        .to(rTri2, { duration: 0, alpha: 0 })
        .to(rTri3, { duration: 0, alpha: 0 })
        .to(rTri4, { duration: 0, alpha: 0 })
        .to(rTri5, { duration: 0, alpha: 0 })
        .to(rTri6, { duration: 0, alpha: 0 })
        .to(tri7, { duration: 0, alpha: 0 })
        .to(tri1, {
            duration: arrDuration1,
            ease: "none",
            //repeat: -1,
            motionPath: {
                autoRotate: 0,
                path: l1PathPts.join(" "), //"M159,115 h70 c20,0 20,0 20,20 v76 c0,20 0,20, 20,20",
                useRadians: true
            }
        })
        .to(tri1, { duration: 0, alpha: 0 }, arrDuration1)
        .to(
            tri2,
            {
                duration: arrDuration1,
                ease: "none",
                //repeat: -1,
                motionPath: {
                    autoRotate: 0,
                    path: line2.path.split(" ").join(" "), //"M159,115 h70 c20,0 20,0 20,20 v76 c0,20 0,20, 20,20",
                    useRadians: true
                }
            },
            0
        )
        .to(tri2, { duration: 0, alpha: 0 }, arrDuration1)
        .to(
            tri3,
            {
                duration: arrDuration1,
                ease: "none",
                //repeat: -1,
                motionPath: {
                    autoRotate: 0,
                    path: line3.path.split(" ").join(" "),
                    useRadians: true
                }
            },
            0
        )
        .to(tri3, { duration: 0, alpha: 0 }, arrDuration1)
        .to(
            tri4,
            {
                duration: arrDuration1,
                ease: "none",
                motionPath: {
                    autoRotate: 0,
                    path: line4.path.split(" ").join(" "), //"M159,115 h70 c20,0 20,0 20,20 v76 c0,20 0,20, 20,20",
                    useRadians: true
                }
            },
            0
        )
        .to(tri4, { duration: 0, alpha: 0 }, arrDuration1)
        .to(
            tri5,
            {
                duration: arrDuration1,
                ease: "none",
                motionPath: {
                    autoRotate: 0,
                    path: line5.path.split(" ").join(" "), //"M159,115 h70 c20,0 20,0 20,20 v76 c0,20 0,20, 20,20",
                    useRadians: true
                }
            },
            0
        )
        .to(tri5, { duration: 0, alpha: 0 }, arrDuration1)
        .to(
            tri6,
            {
                duration: arrDuration1,
                ease: "none",
                motionPath: {
                    autoRotate: 0,
                    path: line6.path.split(" ").join(" "), //"M159,115 h70 c20,0 20,0 20,20 v76 c0,20 0,20, 20,20",
                    useRadians: true
                }
            },
            0
        )
        .to(tri6, { duration: 0, alpha: 0 }, arrDuration1)
        .to(rTri1, { delay: 0.25, duration: 0, alpha: 1 })
        .to(rTri2, { duration: 0, alpha: 1 }, "<")
        .to(rTri3, { duration: 0, alpha: 1 }, "<")
        .to(rTri4, { duration: 0, alpha: 1 }, "<")
        .to(rTri5, { duration: 0, alpha: 1 }, "<")
        .to(rTri6, { duration: 0, alpha: 1 }, "<")
        .to(tri7, { duration: 0, alpha: 1 }, "<")
        .to(
            rTri1,
            {
                duration: arrDuration1,
                ease: "none",
                motionPath: {
                    autoRotate: 0,
                    path: rLine1.path.split(" ").join(" "), //"M159,115 h70 c20,0 20,0 20,20 v76 c0,20 0,20, 20,20",
                    useRadians: true
                }
            },
            "rightAnim"
        )
        .to(
            rTri2,
            {
                duration: arrDuration1,
                ease: "none",
                motionPath: {
                    autoRotate: 0,
                    path: rLine2.path.split(" ").join(" "), //"M159,115 h70 c20,0 20,0 20,20 v76 c0,20 0,20, 20,20",
                    useRadians: true
                }
            },
            "<"
        )
        .to(
            rTri3,
            {
                duration: arrDuration1,
                ease: "none",
                motionPath: {
                    autoRotate: 0,
                    path: rLine3.path.split(" ").join(" "), //"M159,115 h70 c20,0 20,0 20,20 v76 c0,20 0,20, 20,20",
                    useRadians: true
                }
            },
            "<"
        )
        .to(
            rTri4,
            {
                duration: arrDuration1,
                ease: "none",
                motionPath: {
                    autoRotate: 0,
                    path: rLine4.path.split(" ").join(" "), //"M159,115 h70 c20,0 20,0 20,20 v76 c0,20 0,20, 20,20",
                    useRadians: true
                }
            },
            "<"
        )
        .to(
            rTri5,
            {
                duration: arrDuration1,
                ease: "none",
                motionPath: {
                    autoRotate: 0,
                    path: rLine5.path.split(" ").join(" "), //"M159,115 h70 c20,0 20,0 20,20 v76 c0,20 0,20, 20,20",
                    useRadians: true
                }
            },
            "<"
        )
        .to(
            rTri6,
            {
                duration: arrDuration1,
                ease: "none",
                motionPath: {
                    autoRotate: 0,
                    path: rLine6.path.split(" ").join(" "), //"M159,115 h70 c20,0 20,0 20,20 v76 c0,20 0,20, 20,20",
                    useRadians: true
                }
            },
            "<"
        )
        .to(
            tri7,
            {
                duration: arrDuration1,
                ease: "none",
                motionPath: {
                    autoRotate: 0,
                    path: line7.path.split(" ").join(" "), //"M159,115 h70 c20,0 20,0 20,20 v76 c0,20 0,20, 20,20",
                    useRadians: true
                }
            },
            "<"
        )
        .to(rTri1, { duration: 0.5, alpha: 0, pixi: { scale: 1.45 } })
        .to(rTri2, { duration: 0.5, alpha: 0, pixi: { scale: 1.45 } }, "<")
        .to(rTri3, { duration: 0.5, alpha: 0, pixi: { scale: 1.45 } }, "<")
        .to(rTri4, { duration: 0.5, alpha: 0, pixi: { scale: 1.45 } }, "<")
        .to(rTri5, { duration: 0.5, alpha: 0, pixi: { scale: 1.45 } }, "<")
        .to(rTri6, { duration: 0.5, alpha: 0, pixi: { scale: 1.45 } }, "<")
        .to(tri7, { duration: 0.5, alpha: 0 }, "<");

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
