/// <binding AfterBuild='default' Clean='clean' />
"use strict";

var gulp = require("gulp"),
  rimraf = require("rimraf"),
  concat = require("gulp-concat"),
  cssmin = require("gulp-cssmin"),
  uglify = require("gulp-uglify"),
  less = require("gulp-less"),
  tsc = require("gulp-tsc");

var paths = {
    webroot: "./wwwroot/"
};

paths.js = paths.webroot + "js/**/*.js";
paths.minJs = paths.webroot + "js/**/*.min.js";
paths.less = paths.webroot + "less/**/main.less";
paths.css = paths.webroot + "css/**/*.css";
paths.minCss = paths.webroot + "css/**/*.min.css";
paths.lessDest = paths.webroot + "css";
paths.concatJsDest = paths.webroot + "js/site.min.js";
paths.concatCssDest = paths.webroot + "css/site.min.css";
paths.ts = {
  src: paths.webroot + "ts/app/**/*.ts",
  dest: paths.webroot + "js/app"
};

gulp.task( "default", ["build"] );

gulp.task( "clean:js", function ( cb ) {
  rimraf( paths.concatJsDest, cb );
} );

gulp.task( "clean:css", function ( cb ) {
    rimraf(paths.concatCssDest, cb);
});

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("min:js", function () {
    return gulp.src([paths.js, "!" + paths.minJs], { base: "." })
        .pipe(concat(paths.concatJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:css", function () {
    return gulp.src([paths.css, "!" + paths.minCss])
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min", ["min:css"]);

gulp.task("less", function() {
  return gulp.src(paths.less)
    .pipe(less())
    .pipe(gulp.dest(paths.lessDest));
} );

gulp.task("ts:compile", function() {
  return gulp
    .src(paths.ts.src)
    .pipe(tsc({
      module: "amd",
      sourcemap: true,
      emitError: false
    }))
    .pipe(gulp.dest(paths.ts.dest));
} );

gulp.task("ts:clean", function(cb) {
  rimraf(paths.ts.dest, cb);
} );

gulp.task("ts", ["ts:clean", "ts:compile"]);

gulp.task("build", ["less", "ts", "min"]);
