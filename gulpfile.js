'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();
const rm = require('gulp-rimraf');

const folders = {
    styles: {
        source: './src/styles/**/*.scss',
        target: './dist'
    },
    templates: {
        source: './src/templates/**/*.pug',
        target: './dist'
    },
    assets: {
        source: './src/assets/**/*',
        target: './dist'
    }
};

gulp.task('clean', function() {
    // You can use multiple globbing patterns as you would with `gulp.src`
    gulp.src('dist/*').pipe(rm());
});

gulp.task('pug', () =>
    gulp.src(folders.templates.source)
        .pipe(pug({
            // Your options in here.
        }))
        .pipe(gulp.dest(folders.templates.target))
        .pipe(browserSync.stream())
);

gulp.task('pug:watch', () =>
    gulp.watch(folders.templates.source, ['pug']));

gulp.task('sass', () =>
    gulp.src(folders.styles.source)
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest(folders.styles.target))
            .pipe(browserSync.stream())
);

gulp.task('sass:watch', () =>
    gulp.watch(folders.styles.source, ['sass'])
);

gulp.task('serve', function () {
    browserSync.init({
        server: './dist',
        port: 8000
    });
});

gulp.task('assets', () =>
    gulp.src(folders.assets.source)
        .pipe(gulp.dest(folders.assets.target))
);

gulp.task('assets:watch', () =>
    gulp.watch(folders.assets.source, ['assets'])
);

gulp.task('default',
    [ 'pug', 'sass', 'assets', 'pug:watch',
    'sass:watch', 'assets:watch', 'serve' ]
);

gulp.task('compile', [ 'pug', 'sass' ]);