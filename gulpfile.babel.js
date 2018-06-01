import gulp from 'gulp';

import del from 'del';

// HTML
import nunjucksRender from 'gulp-nunjucks-render';
import fetch from 'node-fetch';
import data from 'gulp-data';

// Styling related packages
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cleanCSS from 'gulp-clean-css';
import sourcemaps from 'gulp-sourcemaps';

// JavaScript
import uglify from 'gulp-uglify';

// Browsersync
import bs from 'browser-sync';
const bSync = bs.create();

function browserSync() {
  bSync.init({
    server: {
      baseDir: './',
    },
  });

  gulp.watch('');
}

export function clean() {
  return del(['assets']);
}

export async function getData() {
  // const res = await fetch(
  //   'https://kerckhoff.dailybruin.com/api/packages/flatpages/enterprise.lanl/'
  // );
  const res = require('./data.json');
  console.log(res);
  return res;
}

export function nunjucks(production = false) {
  const compiledNunjucks = gulp
    .src('src/*.njk')
    .pipe(data(getData()))
    .pipe(nunjucksRender({ path: ['src/'] }));

  // if (production) {
  //   return compiledNunjucks.pipe(gulp.dest('dist'));
  // }
  return compiledNunjucks.pipe(gulp.dest('dist'));
}

export function styles(production = false) {
  const compiledSass = gulp
    .src('src/style.scss')
    .pipe(sass())
    .pipe(postcss([autoprefixer()]));

  // if (production) {
  //   return compiledSass.pipe(cleanCSS()).pipe(gulp.dest('dev'));
  // }
  return compiledSass.pipe(gulp.dest('dist'));
}

export function scripts(production = false) {
  // if (production) {
  //   return gulp.src('src/script.js').pipe(gulp.dest('dev'));
  // }

  return gulp
    .src('src/script.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
}

export const build = gulp.series(clean, nunjucks, styles, scripts);

export default build;
