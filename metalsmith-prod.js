import drafts from "@metalsmith/drafts";
import htmlOptimize from "metalsmith-optimize-html";
import { msBuild } from './metalsmith.js';

const ms = msBuild();

// set DEBUG environment variable
// ! Uncomment for debugging !
//ms.env( 'DEBUG', 'metalsmith-optimize-html' );

// filter out draft for production
//ms.use( drafts() );
// optimize HTML in production
// home page with htmlOptimizer is 31% smaller (11/17/2024)
ms.use( htmlOptimize( {
  "removeComments": true,
  "removeTagSpaces": true,
  "normalizeBooleanAttributes": true,
  "removeEmptyAttributes": true,
  "simplifyDoctype": true,
  "safeRemoveAttributeQuotes": true
} ) );


ms.build( err => {
  if ( err ) {
    throw err;
  }
  /* eslint-disable no-console */
  console.log( `Build success` );
} );