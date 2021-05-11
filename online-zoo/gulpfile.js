const { src, dest, watch, parallel, series } = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");
const pug = require("gulp-pug");

function serve() {
  browserSync.init({
    server: {
      baseDir: "dist",
    },
    startPath: "/pages/main/index.html",
  });
}

function html() {
  return src(["src/pug/**/*.pug", "!src/pug/includes/**"])
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(dest("dist/pages"));
}

function styles() {
  return src("src/scss/**/*.scss")
    .pipe(sass({
      outputStyle: 'expanded',
    }).on("error", sass.logError))
    .pipe(dest("dist/pages"))
    .pipe(browserSync.stream());
}

function scripts() {
  return src("src/js/**/*.js")
    .pipe(dest("dist/pages"));
}

function assets() {
  return src("src/assets/**/*")
    .pipe(dest("dist/"));
}

function watchFiles() {
  watch("src/scss/**/*.scss", styles);
  watch("src/js/**/*.js", scripts);
  watch("src/assets/**/*", assets);
  watch("src/pug/**/*.pug", html);
  watch("dist/**/*.html").on("change", browserSync.reload);
}

exports.build = series(html, styles, scripts, assets);
exports.default = parallel(serve, watchFiles);
