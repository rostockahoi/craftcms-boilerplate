var gulp         = require('gulp');
var browserify   = require('browserify');
var source       = require('vinyl-source-stream');
var streamify    = require('gulp-streamify');
var browserSync  = require('browser-sync').create();
var reload       = browserSync.reload;
var rename       = require('gulp-rename');
var syncy        = require('syncy');
var sass         = require('gulp-sass');
var autoPrefixer = require('gulp-autoprefixer');
var uglify       = require('gulp-uglify');
var concat       = require('gulp-concat');
var notify       = require('gulp-notify');
var notifier     = require('node-notifier');
var cleanCss     = require('gulp-clean-css');
var plumber      = require('gulp-plumber');
var scssLint     = require('gulp-scss-lint');

// Enter URL of your local server here
// Example: 'mysupersite.dev'
var URL = 'craft.dev';

// Browsers to target when prefixing CSS.
var COMPATIBILITY = ['last 2 versions', 'ie >= 9'];

// Paths in source directory
var SRC = {
    bower    : 'bower_components',
    styles   : 'src/styles',
    scripts  : 'src/scripts',
    templates: 'src/templates',
    fonts    : 'src/fonts',
    images   : 'src/img'
};

// Paths in dist directory
var DIST = {
    styles   : 'dist/public/assets/css',
    scripts  : 'dist/public/assets/js',
    templates: 'dist/public/craft/templates',
    fonts    : 'dist/public/assets/fonts',
    images   : 'dist/public/assets/img'
};

// SCSS include paths
// Note that you also have to @import the files in app.scss
var includedStyles = [
    SRC.bower + '/foundation-sites/scss',
];

/*
 * STYLES TASK
 */
gulp.task('styles', function() {
    return gulp.src([SRC.styles + '/app.scss'])
        .pipe(plumber({
            errorHandler: function(err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(scssLint())
        .pipe(sass({
            includePaths: includedStyles
        }))
        .on('error', notify.onError("Error: <%= error.message %>"))
        .pipe(concat('app.css'))
        .pipe(autoPrefixer({
            browsers: COMPATIBILITY
        }))
        .pipe(gulp.dest(DIST.styles))
        .pipe(reload({
            stream: true
        }))
        .pipe(notify('[dev] Styles task finished'));
});

/*
 * SCRIPTS TASK
 * require modules via app.js
 */
gulp.task('scripts', function() {
    return browserify(SRC.scripts + '/app.js', {debug: true})
      .bundle()
      .pipe(plumber({
          errorHandler: function(err) {
              console.log(err);
              this.emit('end');
          }
      }))
      .pipe(source('app.js'))
      // .pipe(streamify(uglify()))
      .pipe(gulp.dest(DIST.scripts))
      .pipe(notify('[dev] Scripts task finished'));
});

/*
 * SYNC TASK
 * src/templates is synced to craft's templates directory because we want to
 * leave it untouched
 */
gulp.task('sync', (done) => {
    syncy([SRC.templates + "/**/*"], DIST.templates, {
            base: SRC.templates,
            ignoreInDest: ["web.config", ".htaccess"],
            updateAndDelete: false
        })
        .then(() => {
            done();
        })
        .catch((err) => {
            done(err);
        });
    notifier.notify({
        title: '[dev] Sync task',
        message: 'Done'
    });
    reload();
});

/*
 * IMAGES TASK
 * Just copy the images in dev mode
 */
gulp.task('images', function(){
  return gulp.src(SRC.images + '/**/*')
  .pipe(plumber({
      errorHandler: function(err) {
          console.log(err);
          this.emit('end');
      }
  }))
  .pipe(gulp.dest(DIST.images))
  .pipe(notify('[dev] Images task finished'));
});

/*
 * SYNC TASK with forced deletion
 * Files in target dir were deleted if not present in src directory.
 * If you mess up the paths, everything can be deleted.
 * You have been warned!
 */
gulp.task('hard-sync', (done) => {
    syncy([SRC.templates + "/**/*"], DIST.templates, {
            base: SRC.templates,
            ignoreInDest: ["web.config", ".htaccess"],
            updateAndDelete: true
        })
        .then(() => {
            done();
        })
        .catch((err) => {
            done(err);
        });
    notifier.notify({
        title: '[dev] Sync task',
        message: 'Done'
    });
    reload();
});

/*
 * WATCH TASK
 * watches styles, scripts and templates
 */
gulp.task('watch', function() {
    browserSync.init({
        proxy: URL
    });
    gulp.watch(SRC.scripts + "/**/*.js", ['scripts']);
    gulp.watch(SRC.styles + "/**/*.scss", ['styles']);
    gulp.watch(SRC.templates + "/**/*", ['sync']);
    gulp.watch(SRC.images + '/**/*', ['images']);

    notifier.notify({
        title: 'Watch',
        message: 'Watching for changes in scripts, styles, templates, images'
    });
});

/*
 * DEFAULT TASK
 * default, you know
 */
gulp.task('default', ['styles', 'scripts', 'sync']);
