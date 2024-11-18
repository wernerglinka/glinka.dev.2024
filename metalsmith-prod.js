import drafts from "@metalsmith/drafts";
//import htmlMinifier from "metalsmith-html-minifier";
import htmlOptimize from "metalsmith-optimize-html";
import { msBuild } from './metalsmith.js';

const ms = msBuild();

// set DEBUG environment variable
//ms.env( 'DEBUG', 'metalsmith-htmlOptimize' );

// filter out draft for production
ms.use( drafts() );
// optimize HTML in production
// home page with htmlOptimizer is 28% smaller (11/17/2024)
ms.use( htmlOptimize( {
  "removeComments": true,
  "removeTagSpaces": true,
  "removeDefaultAttributes": true,
  "normalizeBooleanAttributes": true,
  "cleanUrlAttributes": true,
  "cleanDataAttributes": true,
  "removeEmptyAttributes": true,
  "removeProtocols": true,
  "simplifyDoctype": true
} ) );


ms.build( err => {
  if ( err ) {
    throw err;
  }
  /* eslint-disable no-console */
  console.log( `Build success` );
} );