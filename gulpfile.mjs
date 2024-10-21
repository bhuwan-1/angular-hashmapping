import gulp from 'gulp';
import useref from 'gulp-useref';
import gulpIf from 'gulp-if';
import rev from 'gulp-rev';
import revReplace from 'gulp-rev-replace';
import uglify from 'gulp-uglify';
import cleanCSS from 'gulp-clean-css';
import htmlmin from 'gulp-htmlmin';
import { deleteAsync } from 'del';
import rename from 'gulp-rename';

// Clean the dist folder
export const clean = () => {
  console.log('Cleaning dist folder...');
  return deleteAsync(['dist']);
};

// Process and cache-bust JS, CSS, and HTML files
export const build = () => {
  console.log('Starting build process...');
  return gulp.src('src/index.html')  // Entry point
    .pipe(useref()) // Parse build blocks in HTML
    .pipe(gulpIf('*.js', uglify())) // Minify JavaScript
    .pipe(gulpIf('*.css', cleanCSS())) // Minify CSS
    .pipe(gulpIf('*.html', htmlmin({ collapseWhitespace: true }))) // Minify HTML
    .pipe(gulpIf('*.js', rev())) // Hash JS files
    .pipe(gulpIf('*.css', rev())) // Hash CSS files
    .pipe(gulpIf('*.html', rev())) // Hash HTML files (optional)
    .pipe(revReplace()) // Replace references to hashed files
    .pipe(gulp.dest('dist'))// Output to dist folder
    .pipe(gulpIf('*.html', rename('index.html'))) // Copy the hashed HTML as index.html
    .pipe(gulp.dest('dist'));
};

export const copyViews = () => {
  console.log('Copying views...');
  return gulp.src('src/views/**/*.html')
    .pipe(gulp.dest('dist/views'));
};

// Define the default task
export default gulp.series(clean, build, gulp.parallel(copyViews));
