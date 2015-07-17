/**
 * @license inazumatv.com
 * @author (at)taikiken / http://inazumatv.com
 * @date 15/07/17 - 17:49
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * for yamori.js
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


// ----------------------------------------------------------------
// task
// ----------------------------------------------------------------
gulp.task( 'readme-build', function () {

  return gulp.src( './README.md' )
    .pipe( $.replace( { patterns: patterns } ) )
    .pipe( gulp.dest( '../' ) )
    .pipe( $.size( { title: '*** readme-build ***' } ) );

} );