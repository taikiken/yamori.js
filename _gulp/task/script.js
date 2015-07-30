/**
 * @license inazumatv.com
 * @author (at)taikiken / http://inazumatv.com
 * @date 2015/04/10 - 15:06
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */
/*jslint node: true */
/*jslint -W079 */
"use strict";

// ----------------------------------------------------------------
// setting
var settings = require( '../setting.js' );

// ----------------------------------------------------------------
// Directory
var dir = settings.dir;

// ----------------------------------------------------------------
// package
var pkg = settings.pkg;
var url = settings.url;
var version = settings.version;

// ----------------------------------------------------------------
// gulp
var gulp = settings.gulp;
var $ = settings.plugin;

// ----------------------------------------------------------------
// scripts
var patterns = settings.patterns;

var libName = 'yamori.js';
var scripts = [];

// dependencies

// Sagen
scripts.push( dir.src + "/" + libName );

// ----------------------------------------------------------------
// task
// ----------------------------------------------------------------

// move old folder
gulp.task( 'script-move-old', function () {

  return gulp.src( dir.libs + '/*' )
    .pipe( gulp.dest( dir.old ) )
    .pipe( $.size( { title: '*** script-move-old ***' } ) );

} );

gulp.task( 'script-clean-libs', function () {

  $.del(
    [
      dir.libs + '/*'
    ],
    {
      base: process.cwd(),
      dot: true,
      force: true
    },
    function (err, deletedFiles) {
      console.log('files deleted:' + deletedFiles.length + "\n" + deletedFiles.join("\n"));
    } );

} );

// build
gulp.task( 'script-min', function () {

  return gulp.src( scripts )
    .pipe( $.concat( libName ) )
    .pipe( $.replace( { patterns: patterns } ) )
    // concat libName
    .pipe( gulp.dest( dir.libs ) )
    .pipe( $.rename( function ( path ) {

      path.basename = path.basename + '-' + version;

    } ) )
    // concat libName-version
    .pipe( gulp.dest( dir.libs ) )
    .pipe( $.uglify( { preserveComments: 'some' } ) )
    .pipe( $.rename( { suffix: '.min' } ) )
    // minified libName-version.min
    .pipe( gulp.dest( dir.libs ) )
    .pipe( $.rename( function ( path ) {
      path.basename = path.basename.replace( '-' + version, '' );
    }) )
    // minified libName.min
    .pipe( gulp.dest( dir.libs ) )
    .pipe( $.size( { title: '*** script-min ***' } ) );
} );

// api
gulp.task( 'script-api', function () {

  //return gulp.src( scripts )
  //  .pipe( $.yuidoc() )
  //  .pipe( $.yuidoc.parser() )
  //  .pipe( gulp.dest( dir.docs ) );
  $.shell.task( 'yuidoc' );

} );

// Lint JavaScript
gulp.task('js-hint', function () {
  return gulp.src( [
    dir.src + '/**/*.js',
    '!' + dir.src + '/dependencies/**/*.js'
  ] )
    .pipe( $.jshint() )
    .pipe( $.jshint.reporter('jshint-stylish'));
});

// ----------------------------------------------------------------
// sequence
// compile & api
gulp.task( 'script-build', function () {

  $.runSequence(
    'script-move-old',
    'script-clean-libs',
    'script-min'
  );

} );

// compile & api
gulp.task( 'script-build-api', function () {

  $.runSequence(
    [
      'script-build',
      'script-api'
    ]
  );

} );