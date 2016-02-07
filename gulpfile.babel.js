import gulp from 'gulp';
import plumber from 'gulp-plumber';

import jade from 'gulp-jade';
import stylus from 'gulp-stylus';
import babel from 'gulp-babel';
import flatten from 'gulp-flatten';

import imagemin from 'gulp-imagemin';

import useref from 'gulp-useref';
import gulpif from 'gulp-if';
import lazypipe from 'lazypipe';

import autoprefixer from 'gulp-autoprefixer';
import cssnano from 'gulp-cssnano';
import uglify from 'gulp-uglify';

/**
 * Build Tasks:
 * Initial compilation and copying only
 */

gulp.task('jade', () => {
  return gulp.src(['./src/**/*.jade', '!./src/_partials/*.jade', '!./src/_layout.jade'])
    .pipe(plumber())
    .pipe(jade({
      basedir: './src',
      pretty: true
    }))
    .pipe(gulp.dest('./build'));
})

gulp.task('stylus', () => {
  return gulp.src('./src/css/index.styl')
    .pipe(plumber())
    .pipe(stylus())
    .pipe(gulp.dest('./build/css'));
});

gulp.task('babel', () => {
  return gulp.src('./src/js/*.js')
    .pipe(plumber())
    .pipe(babel({
      presets: ["es2015"]
    }))
    .pipe(gulp.dest('./build/js'));
});

gulp.task('copy-img', () => {
  return gulp.src('./src/img/**/*')
    .pipe(gulp.dest('./build/img'));
});

// Copies all fonts into the `build/fonts` directory
gulp.task('flatten-fonts', () => {
  return gulp.src(['./src/vendor/**/*.{eot,svg,ttf,woff,woff2}', '!./src/vendor/Ionicons/src/*'])
    .pipe(flatten())
    .pipe(gulp.dest('./build/fonts'));
});

// Copies the `vendor` directory into the `build` directory
gulp.task('copy-vendor', () => {
  return gulp.src('./src/vendor/**/*')
    .pipe(gulp.dest('./build/vendor'));
});

// Custom copy function for both build and produce
gulp.task('copy-specials', () => {
  return gulp.src('./src/specials-data/**/*')
    .pipe(gulp.dest('./build/specials-data'))
    .pipe(gulp.dest('./dist/specials-data'));
});

// Custom copy function for uploads folder
gulp.task('copy-uploads', () => {
  return gulp.src('./src/uploads/**/*')
    .pipe(gulp.dest('./build/uploads'))
    .pipe(gulp.dest('./dist/uploads'));
});

gulp.task('build', ['jade', 'stylus', 'babel', 'copy-img', 'flatten-fonts', 'copy-vendor', 'copy-specials', 'copy-uploads'], () => {
});

gulp.task('dev', ['build'], () => {
  gulp.watch('./src/**/*.jade', ['jade']);
  gulp.watch('./src/css/*.styl', ['stylus']);
  gulp.watch('./src/js/*.js', ['babel']);

  gulp.watch('./src/img/**/*', ['copy-img']);
  gulp.watch('./src/vendor/**/*', ['flatten-fonts', 'copy-vendor']);

  console.log("Watching files!");
});


/**
 * Produce Tasks:
 * Minification, optimization, etc.
 */

gulp.task('imagemin', () => {
  return gulp.src('./build/img/**/*')
    .pipe(imagemin({
        progressive: true
    }))
    .pipe(gulp.dest('./dist/img'));
});

gulp.task('copy-fonts', () => {
  return gulp.src('./build/fonts/**/*')
    .pipe(gulp.dest('./dist/fonts'));
});

// Copy the js files that won't be useref'd
gulp.task('copy-custom-vendor', () => {
  /*
  return gulp.src('./src/vendor/path/to/file')
    .pipe(gulp.dest('./dist/vendor/path/to/file'));
  */
});

gulp.task('useref', () => {
  let cssTasks = lazypipe()
    .pipe(autoprefixer, { cascade: false })
    .pipe(cssnano, { discardComments: {removeAll: true} });

  let jsTasks = lazypipe()
    .pipe(uglify);

  return gulp.src('./build/**/*.html')
    .pipe(useref())
      .pipe(gulpif('*.css', cssTasks()))
      .pipe(gulpif('*.js', jsTasks()))
    .pipe(gulp.dest('./dist'));
});

gulp.task('produce', ['imagemin', 'copy-fonts', 'copy-custom-vendor', 'useref'], () => {
});
