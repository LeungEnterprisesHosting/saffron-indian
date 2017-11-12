import gulp from "gulp";
import plumber from "gulp-plumber";

// Use gulp-pug since it supports more features
// (e.g. ES6 template strings)
import jade from "gulp-pug";
import stylus from "gulp-stylus";
import babel from "gulp-babel";
import flatten from "gulp-flatten";

import useref from "gulp-useref";
import gulpif from "gulp-if";
import lazypipe from "lazypipe";
import rev from "gulp-rev";
import revReplace from "gulp-rev-replace";

import autoprefixer from "gulp-autoprefixer";
import cssnano from "gulp-cssnano";
import uglify from "gulp-uglify";

import yaml from "gulp-yaml";

/**
 * Build Tasks:
 * Initial compilation and copying only
 */

gulp.task("jade", () => {
  return gulp
    .src(["./src/**/*.jade", "!./src/_partials/*.jade", "!./src/_layout.jade"])
    .pipe(plumber())
    .pipe(
      jade({
        basedir: "./src",
        pretty: true
      })
    )
    .pipe(gulp.dest("./build"));
});

gulp.task("stylus", () => {
  return gulp
    .src("./src/css/*.styl")
    .pipe(plumber())
    .pipe(stylus())
    .pipe(gulp.dest("./build/css"));
});

gulp.task("babel", () => {
  return gulp
    .src("./src/js/*.js")
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest("./build/js"));
});

gulp.task("copy-img", () => {
  return gulp
    .src("./src/img/**/*")
    .pipe(gulp.dest("./build/img"))
    .pipe(gulp.dest("./dist/img"));
});

gulp.task("copy-icons", () => {
  return gulp
    .src("./src/icons/**/*")
    .pipe(gulp.dest("./build/icons"))
    .pipe(gulp.dest("./dist/icons"));
});

// Copies all fonts into the `build/fonts` directory
gulp.task("flatten-fonts", () => {
  return gulp
    .src([
      "./src/vendor/**/*.{eot,svg,ttf,woff,woff2}",
      "!./src/vendor/Ionicons/src/*"
    ])
    .pipe(flatten())
    .pipe(gulp.dest("./build/fonts"));
});

// Copies the `vendor` directory into the `build` directory
gulp.task("copy-vendor", () => {
  return gulp.src("./src/vendor/**/*").pipe(gulp.dest("./build/vendor"));
});

// Custom copy function for both build and produce
gulp.task("copy-specials", () => {
  return gulp
    .src("./src/specials-data/**/*.json")
    .pipe(gulp.dest("./build/specials-data"))
    .pipe(gulp.dest("./dist/specials-data"));
});

gulp.task("copy-specials-yaml", () => {
  return gulp
    .src("./src/specials-data/**/*.+(yml|yaml)")
    .pipe(yaml({ space: 2 }))
    .pipe(gulp.dest("./build/specials-data"))
    .pipe(gulp.dest("./dist/specials-data"));
});

// Custom copy function for uploads folder
gulp.task("copy-uploads", () => {
  return gulp
    .src("./src/uploads/**/*")
    .pipe(gulp.dest("./build/uploads"))
    .pipe(gulp.dest("./dist/uploads"));
});

// Custom copy function for sitemap
gulp.task("copy-sitemap", () => {
  return gulp
    .src("./src/sitemap.xml")
    .pipe(gulp.dest("./build"))
    .pipe(gulp.dest("./dist"));
});

gulp.task("copy-stuff", [
  "copy-icons",
  "copy-specials",
  "copy-specials-yaml",
  "copy-uploads",
  "copy-sitemap"
]);

gulp.task(
  "build",
  [
    "jade",
    "stylus",
    "babel",
    "copy-img",
    "flatten-fonts",
    "copy-vendor",
    "copy-stuff"
  ],
  () => {}
);

gulp.task("dev", ["build"], () => {
  gulp.watch("./src/**/*.jade", ["jade"]);
  gulp.watch("./src/css/*.styl", ["stylus"]);
  gulp.watch("./src/js/*.js", ["babel"]);

  gulp.watch("./src/img/**/*", ["copy-img"]);
  gulp.watch("./src/icons/**/*", ["copy-icons"]);
  gulp.watch("./src/vendor/**/*", ["flatten-fonts", "copy-vendor"]);

  console.log("Watching files!");
});

/**
 * Produce Tasks:
 * Minification, optimization, etc.
 */

gulp.task("copy-fonts", () => {
  return gulp.src("./build/fonts/**/*").pipe(gulp.dest("./dist/fonts"));
});

// Copy the js files that won't be useref'd
gulp.task("copy-custom-vendor", () => {
  /*
  return gulp.src('./src/vendor/path/to/file')
    .pipe(gulp.dest('./dist/vendor/path/to/file'));
  */
});

gulp.task("useref", () => {
  let cssTasks = lazypipe()
    .pipe(autoprefixer, {
      browsers: ["> 1%", "last 2 versions"],
      cascade: false
    })
    .pipe(cssnano, { discardComments: { removeAll: true } });

  let jsTasks = lazypipe().pipe(uglify);

  return gulp
    .src("./build/**/*.html")
    .pipe(useref())
    .pipe(gulpif("*.css", cssTasks()))
    .pipe(gulpif("*.js", jsTasks()))
    .pipe(gulpif("*.css", rev()))
    .pipe(gulpif("*.js", rev()))
    .pipe(revReplace())
    .pipe(gulp.dest("./dist"));
});

gulp.task("produce", ["copy-fonts", "copy-custom-vendor", "useref"], () => {});
