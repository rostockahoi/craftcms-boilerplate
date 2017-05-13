/**
 *
 *  CraftCMS 2 Starter
 *  Copyright 2017 Johannes Ahrndt
 *
 *
 */

'use strict';

// This gulpfile makes use of new JavaScript features.
// Babel handles this without us having to do anything. It just works.
// You can read more about the new JavaScript features here:
// https://babeljs.io/docs/learn-es2015/


var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var notifier = require("node-notifier");
var del = require('del');
var pump = require('pump');
var pkg = require('./package.json');
var $ = require('gulp-load-plugins')();

var config = require('./gulp.config.json');

var getTimestamp = function() {
  return ( + new Date());
};

/*
 * STYLES TASK
 */
gulp.task( 'clean:styles', () => {
	return del([
		config.dist.styles + '/app.css',
		config.dist.styles + '/app.css.map'
	]);
})
gulp.task( 'styles', ['clean:styles'], () => {
    return gulp.src( [ config.src.styles + '/app.scss' ] )
        .pipe( $.plumber( {
            errorHandler: function( err ) {
                console.log( err );
                this.emit( 'end' );
            }
        } ) )
        .pipe( $.scssLint())
        .pipe( $.sourcemaps.init())
	        .pipe( $.sass( {
	            includePaths: config.styles.includePaths
	        } ) )
        	.on( 'error', $.notify.onError( "Error: <%= error.message %>" ) )
	        .pipe( $.autoprefixer( {
	            browsers: config.styles.compatibility
	        } ) )
        .pipe( $.sourcemaps.write('./'))
        .pipe( gulp.dest( config.dist.styles ) )
        .pipe( reload( {
            stream: true
        } ) )
        .pipe( $.notify( '[dev] Styles task finished' ) );
} );
gulp.task( 'clean:build:styles', () => {
	return del([
		config.dist.styles + '/app.min.css',
		config.dist.styles + '/app.css.min.map'
	]);
})
gulp.task( 'build:styles', ['clean:build:styles'], () => {
    return gulp.src( [ config.src.styles + '/app.scss' ] )
        .pipe( $.plumber( {
            errorHandler: function( err ) {
                console.log( err );
                this.emit( 'end' );
            }
        } ) )
        .pipe( $.scssLint())
        .pipe( $.sourcemaps.init())
	        .pipe( $.sass( {
	            includePaths: config.styles.includePaths
	        } ) )
        	.on( 'error', $.notify.onError( "Error: <%= error.message %>" ) )
	        .pipe( $.autoprefixer( {
	            browsers: config.styles.compatibility
	        } ) )
        .pipe( $.sourcemaps.write('./'))
        .pipe( $.rename( {
            suffix: '.min'
        } ) )
        .pipe( $.cleanCss( {
            compatibility: 'ie7',
            keepSpecialComments: 0
        } ) )
        .pipe( gulp.dest( config.dist.styles ) )
        .pipe( $.notify( '[build] Styles task finished' ) );
} );

/*
 * SCRIPTS TASK
 */
gulp.task( 'clean:scripts', () => {
	return del([
		config.dist.scripts + '/app.js',
		config.dist.scripts + '/app.js.map'
	]);
})
gulp.task( 'scripts', ['clean:scripts'], () => {
    return browserify( config.src.scripts + '/app.js', {
            debug: true
        } )
        .bundle()
        .on( 'error', $.notify.onError( "Error: <%= error.message %>" ) )
        .pipe( source( 'app.js' ) )
        .pipe( $.buffer() )
        .pipe( $.sourcemaps.init())
	    .pipe( $.sourcemaps.write('./'))
        .pipe( $.stream() )
        .pipe( gulp.dest( config.dist.scripts ) )
        .pipe( reload( {
            stream: true
        } ) )
        .pipe( $.notify( '[dev] Scripts task finished' ) );
} );
gulp.task( 'clean:build:scripts', () => {
	return del([
		config.dist.scripts + '/app.min.js',
		config.dist.scripts + '/app.js.min.map'
	]);
})
gulp.task( 'build:scripts', ['clean:build:scripts'], () => {
    return browserify( config.src.scripts + '/app.js', {
            debug: false
        } )
        .bundle()
        .on( 'error', $.notify.onError( "Error: <%= error.message %>" ) )
        .pipe( source( 'app.js' ) )
        .pipe( $.buffer() )
        .pipe( $.sourcemaps.init())
        	.pipe( $.uglify() )
	    .pipe( $.sourcemaps.write('./'))
        .pipe( $.stream() )
        .pipe( $.rename( {
            suffix: '.min'
        } ) )
        .pipe( gulp.dest( config.dist.scripts ) )
        .pipe( $.notify( '[build] Scripts task finished' ) );
} );

/*
 * TEMPLATE TASK
 */
gulp.task('clean:templates', () => {
    return del([
        config.dist.templates + '/**/*',
        "!" + config.dist.templates + '/.htaccess',
        "!" + config.dist.templates + '/web.config'
        ]);
});
gulp.task('templates', ['clean:templates'], () => {
    return gulp.src(config.src.templates + '/**/*.twig')
        .on('error', $.notify.onError("Error: <%= error.message %>"))
        .pipe(gulp.dest(config.dist.templates))
        .pipe(reload({
            stream: true
        }))
        .pipe($.notify({ message: 'Templates task finished', onLast: true } ) );
});

/*
 * IMAGES TASK
 */
gulp.task('clean:templates', () => {
 return del([
     config.dist.images + '/**/*'
     ]);
});
gulp.task( 'images', () => {
    return gulp.src( config.src.images + '/**/*' )
        .on( 'error', $.notify.onError( "Error: <%= error.message %>" ) )
        .pipe( gulp.dest( config.dist.images ) )
        .pipe( reload( {
            stream: true
        } ) )
        .pipe( $.notify( { message: 'Images task finished',  onLast: true } ) );
} );

/*
 * CACHE BUSTING TASK
 * replaces eg. "app.min.css?v=(0-9)" in master layout with "app.min.css?v=timestamp"
 */
gulp.task( 'cachebust:scripts', () => {
    return gulp.src( config.src.templates + '/_layouts/_master.twig' )
        .pipe( $.replace( /app.min.js(\?v=)*([0-9]*)/g, 'app.min.js?v=' + getTimestamp() ))
        .pipe( $.replace( /app.js(\?v=)*([0-9]*)/g, 'app.js?v=' + getTimestamp() ))
        .pipe( gulp.dest( config.src.templates + '/_layouts/' ) )
        .pipe( $.notify( 'Cache busting scripts task finished' ) );
} );

gulp.task( 'cachebust:styles', () => {
    return gulp.src( config.src.templates + '/_layouts/_master.twig' )
        .pipe($.replace( /app.min.css(\?v=)*([0-9]*)/g, 'app.min.css?v=' + getTimestamp()))
        .pipe($.replace( /app.css(\?v=)*([0-9]*)/g, 'app.css?v=' + getTimestamp()))
        .pipe( gulp.dest( config.src.templates + '/_layouts/' ) )
        .pipe( $.notify( 'Cache busting styles task finished' ) );
} );

/*
 * FAVICON TASKS
 */
gulp.task( 'clean:favicon', () => {
    return del([
        config.dist.favicon + "/**/*"
        ]);
} );

gulp.task( 'generate-favicon', [ 'clean:favicon' ], () => {
    return gulp.src( config.src.favicon ).pipe( $.favicons( {
            appName: pkg.name,
            appDescription: pkg.description,
            developerName: pkg.author,
            url: pkg.homepage,
            version: pkg.version,
            html: config.favicon.templateFile,
            background: config.favicon.background,
            path: config.favicon.path,
            display: config.favicon.display,
            orientation: config.favicon.orientation,
            start_url: config.favicon.start_url,
            pipeHTML: config.favicon.pipeHTML,
            replace: config.favicon.replace
        } ) )
        .on( 'error', $.notify.onError( "Error: <%= error.message %>" ) )
        .pipe( gulp.dest( config.dist.favicon ) );
} );

gulp.task( 'favicon', [ 'generate-favicon' ], () => {
    return gulp.src( config.dist.favicon + '/' + config.favicon.templateFile )
        .pipe( $.rename( {
            extname: '.twig'
        } ) )
        .pipe( gulp.dest( config.src.templates ) )
        .on( 'error', $.notify.onError( "Error: <%= error.message %>" ) )
        .pipe( $.notify( 'Favicon task finished' ) );
} );

/*
 * WATCH TASK
 */
gulp.task('watch', () => {
    browserSync.init({
        proxy: config.url
    });
    gulp.watch( config.src.scripts + "/**/*.js", [ 'scripts', 'cachebust:scripts' ] );
    gulp.watch( config.src.styles + "/**/*.scss", [ 'styles', 'cachebust:styles' ] );
    gulp.watch( config.src.templates + "/**/*", [ 'templates' ] );
    gulp.watch( config.src.images + '/**/*', [ 'images' ] );

    notifier.notify({
        title: 'Watch',
        message: 'Gulp is watching for changes in scripts, styles, templates, images'
    });
});

/*
 * DEFAULT TASK
 */
gulp.task('default', ['watch']);

/*
 * DEFAULT TASK
 */
gulp.task('build', ['build:styles', 'build:scripts', 'templates', 'images', 'favicon', 'cachebust:scripts', 'cachebust:styles']);
