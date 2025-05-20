/* eslint-disable import/no-extraneous-dependencies */

import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import Metalsmith from "metalsmith";
import metadata from "@metalsmith/metadata";
import drafts from "@metalsmith/drafts";
import collections from "@metalsmith/collections";
import blogPages from "metalsmith-sectioned-blog-pagination";
import permalinks from "@metalsmith/permalinks";
import layouts from "@metalsmith/layouts";
import externalLinks from "metalsmith-safe-links";
import prism from "metalsmith-prism";
import assets from "metalsmith-static-files";
import sass from "@metalsmith/sass";
import postcss from "@metalsmith/postcss";
import esbuild from "@metalsmith/js-bundle";
import include from 'metalsmith-include-files';

// These are additional dependencies used for production
import htmlMinifier from "metalsmith-optimize-html";
import sitemap from 'metalsmith-sitemap';
import robots from "metalsmith-robots";

// These are additional dependencies used for development
import { performance } from 'perf_hooks'; // Measures build performance
import browserSync from 'browser-sync'; // Live-reload development server

// These variables help determine the current directory and file paths
const thisFile = fileURLToPath( import.meta.url ); // Gets the actual file path of this script
const thisDirectory = dirname( thisFile ); // Gets the directory containing this script
const mainFile = process.argv[ 1 ]; // Gets the file that was executed by Node.js

// ESM does not currently import JSON modules by default.;
// Ergo we'll JSON.parse the file manually
import * as fs from 'fs';
const { dependencies } = JSON.parse( fs.readFileSync( './package.json' ) );
/* eslint-disable no-underscore-dangle */
const __dirname = dirname( fileURLToPath( import.meta.url ) );

/**
 * engineOptions
 * @type {Object}
 * @description This object is passed to the layouts plugin and allows us to
 *  pass options to the Nunjucks templating engine.
 */
import * as nunjucksFilters from './nunjucks-filters/index.js';

const engineOptions = {
  path: [ "templates" ],
  filters: nunjucksFilters
};

/**
 * ENVIRONMENT SETUP
 * Determine if we're in production mode based on NODE_ENV environment variable
 * @type {boolean}
 */
const isProduction = process.env.NODE_ENV !== 'development';

// Variable to hold the development server instance
let devServer = null;

/**
 * Create a new Metalsmith instance
 * This is the core object that will build our site
 * @type {Metalsmith}
 */
const metalsmith = Metalsmith( thisDirectory );

/**
 * Configure the basic Metalsmith settings
 * These determine how Metalsmith will process files
 */
metalsmith
  .clean( true )
  .ignore( [ '**/.DS_Store' ] )
  .watch( isProduction ? false : [ 'src', [ 'templates' ] ] )
  //.env( 'DEBUG', process.env.DEBUG )
  .env( 'NODE_ENV', process.env.NODE_ENV )
  .source( "./src/content" )
  .destination( "./build" )
  .metadata( {
    msVersion: dependencies.metalsmith,
    nodeVersion: process.version,
  } )

  /**
   * Load global metadata from JSON files
   * This data is available to all templates
   * Learn more: https://github.com/metalsmith/metadata
   */
  .use(
    metadata( {
      'metadata': "src/content/data/site.json",
      'metadata.testimonials': "src/content/data/testimonials",
      'metadata.work': "src/content/data/work",
      'metadata.projects': "src/content/data/projects",
    } )
  )

  /**
   * Exclude draft content in production mode
   * Learn more: https://github.com/metalsmith/drafts
   */

  .use( drafts( !isProduction ) )

  /**
   * Create a collection of blog posts
   * Learn more: https://github.com/metalsmith/collections
   */
  .use(
    collections( {
      blog: {
        pattern: "blog/*.md",
        sortBy: "date",
        reverse: true,
        limit: 100,
      },
    } )
  )

  /**
   * Create metadata for blog pagination as pages are built
   * with individual page components so we can't use the 
   * pagination plugin to do this.
   * Learn more: https://github.com/wernerglinka/metalsmith-sectioned-blog-pagination
   */
  .use( blogPages( {
    "pagesPerPage": 12,
    "blogDirectory": "blog/",
  } ) )

  /**
   * We are not using any markdown contents, only frontmatter
   * to define structured pages. Markdown content of section
   * properties will be done with a Nunjucks filter
   * Learn more: https://github.com/metalsmith/permalinks
   */
  .use( permalinks( {
    match: "**/*.md"
  } ) )

  /**
   * Apply Nunjucks templates to HTML content
   * Learn more: https://github.com/metalsmith/layouts
   */
  .use( layouts( {
    directory: "templates",
    transform: 'nunjucks',
    pattern: '**/*.{html,njk}*',
    engineOptions
  } ) )

  /**
   * Process all links so external links have 
   * target="_blank" and rel="noopener noreferrer" 
   * attributes and internal links are relative
   * Learn more: https://github.com/wernerglinka/metalsmith-safe-links
   */
  .use( externalLinks( {
    hostnames: [
      "http://localhost:3000/",
      "https://glinka.co/",
      "https://www.glinka.co/"
    ]
  } ) )

  /**
   * Syntax highlight code blocks using Prism.js
   * Learn more: https://github.com/wernerglinka/metalsmith-prism
   */
  .use(
    prism( {
      decode: true,
    } )
  )

  /**
   * Move static assets to the build directory
   * Learn more: https://github.com/wernerglinka/metalsmith-static-files
   */
  .use(
    assets( {
      source: "src/assets/",
      destination: "assets/",
    } )
  )
  /**
   * Compile Sass to CSS and apply PostCSS plugins
   * Learn more: https://github.com/metalsmith/sass
   * Learn more: https://github.com/metalsmith/postcss
   */
  .use(
    sass( {
      entries: {
        "src/sass/styles.scss": "assets/styles.css",
      },
    } )
  )
  .use( postcss( { plugins: [ "postcss-preset-env", "autoprefixer", "cssnano" ], map: !isProduction } ) )

  /**
   * Bundle JavaScript using esbuild
   * Learn more: https://github.com/metalsmith/js-bundle
   */
  .use(
    esbuild( {
      entries: {
        "assets/scripts": "src/js/main.js",
      },
      drop: [],
    } )
  )

  /**
   * Include custom components
   * Placement is important. This should be just before the final build
   * Learn more: https://github.com/emmercm/metalsmith-include-files
   */
  .use( include( {
    directories: {
      'assets/custom-components': [
        './node_modules/@wernerglinka/cloudinaryimage/lib/cloudinaryimage.js',
        './node_modules/@wernerglinka/linkcomponent/lib/link.js',
        './node_modules/@wernerglinka/truncatedaptitle/lib/truncaptitle.js'
      ]
    },
    overwrite: true,
  } ) );

/**
 * PRODUCTION
 * These plugins only run in production mode to optimize the site
 */
if ( isProduction ) {
  metalsmith
    /**
     * Optimize HTML by Minify HTML to reduce file size
     * Learn more: https://github.com/wernerglinka/metalsmith-optimize-html
     */
    .use( htmlMinifier() )

    /**
     * Generate a sitemap.xml file for search engines
     * Learn more: https://github.com/ExtraHop/metalsmith-sitemap
     */
    .use(
      sitemap( {
        hostname: 'https://glinka.co',
        omitIndex: true, // Remove index.html from URLs
        omitExtension: true, // Remove .html extensions
        changefreq: 'weekly', // How often pages change
        lastmod: new Date(), // Last modification date
        pattern: [ '**/*.html', '!**/404.html' ], // Include all HTML except 404
        defaults: {
          priority: 0.5, // Default priority for pages
          changefreq: 'weekly', // Default change frequency
          lastmod: new Date() // Default last modified date
        }
      } )
    )

    /**
     * Generate a robots.txt file for search engines
     * Learn more: https://github.com/woodyrew/metalsmith-robots
     */
    .use( robots( {
      "useragent": "*",
      "sitemap": "https://glinka.co/sitemap.xml"
    } ) );
}

/**
 * BUILD EXECUTION
 * This section handles the actual build process and development server
 * It only runs when this file is executed directly (not when imported)
 */
if ( mainFile === thisFile ) {
  // Start timing the build for performance measurement
  let t1 = performance.now();

  // Execute the Metalsmith build
  metalsmith.build( ( err ) => {
    // Handle any build errors
    if ( err ) {
      throw err;
    }

    // Log build success and time taken
    /* eslint-disable no-console */
    console.log( `Build success in ${ ( ( performance.now() - t1 ) / 1000 ).toFixed( 1 ) }s` );

    // If watch mode is enabled, set up the development server
    if ( metalsmith.watch() ) {
      if ( devServer ) {
        // If server already exists, just reload it
        t1 = performance.now();
        devServer.reload();
      } else {
        // Otherwise, create a new BrowserSync server
        devServer = browserSync.create();
        devServer.init( {
          host: 'localhost', // Server hostname
          server: './build', // Directory to serve
          port: 3000, // Server port
          injectChanges: false, // Don't inject CSS changes, reload page
          reloadThrottle: 0 // Don't throttle reloads
        } );
      }
    }
  } );
}

// Export the Metalsmith instance for use in other files
export default metalsmith;
