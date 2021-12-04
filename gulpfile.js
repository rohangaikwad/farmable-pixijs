const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const terser = require("gulp-terser");
const concat = require("gulp-concat");
const rename = require("gulp-rename");
const browsersync = require("browser-sync").create();

// Sass Task
function scssTask() {
    return src("public/css/*.scss", { sourcemaps: true })
        .pipe(sass())
        .pipe(postcss([cssnano()]))
        .pipe(dest("public/css", { sourcemaps: "." }));
}

// JavaScript Task
function jsTask() {
    return src("public/js/*.js", { sourcemaps: true })
        .pipe(terser())
        .pipe(dest("public/js", { sourcemaps: "." }));
}

// Browsersync Tasks
function browsersyncServe(cb) {
    browsersync.init({
        server: {
            baseDir: "./public"
        }
    });
    cb();
}

function browsersyncReload(cb) {
    browsersync.reload();
    cb();
}

// Watch Task
function watchTask() {
    watch("public/*.html", browsersyncReload);
    watch(["public/css/**/*.scss", "public/js/**/*.js"], series(scssTask, browsersyncReload));
}

function bundle() {
    let files = [
        "webfont.js",
        "gsap.js",
        "PixiPlugin.js",
        "MotionPathPlugin.js",
        //"MotionPathHelper.min.js",
        "pixi.js"
        //"pixi.dashed-line.js"
    ];
    return src(files.map((f) => `public/js/third-party/${f}`))
        .pipe(concat("gsap_pixi_bundle.js"))
        .pipe(dest("./public/js/"))
        .pipe(terser())
        .pipe(rename("gsap_pixi_bundle.min.js"))
        .pipe(dest("./public/js/"));
}

exports.bundle = bundle;
// Default Gulp task
exports.default = series(scssTask, browsersyncServe, watchTask);
