/* eslint-disable import/no-extraneous-dependencies */

import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import Metalsmith from "metalsmith";
import drafts from "@metalsmith/drafts";
import markdown from "@metalsmith/markdown";
import layouts from "@metalsmith/layouts";
import esbuild from "@metalsmith/js-bundle";
import permalinks from "@metalsmith/permalinks";
import assets from "metalsmith-static-files";
import sitemap from 'metalsmith-sitemap';
import prism from "metalsmith-prism";
import collections from "@metalsmith/collections";
import sass from "@metalsmith/sass";
import postcss from "@metalsmith/postcss";
import metadata from "@metalsmith/metadata";
import include from 'metalsmith-include-files';
import externalLinks from "metalsmith-safe-links";
import robots from "metalsmith-robots";
import blogPages from "metalsmith-sectioned-blog-pagination";



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

export function msBuild() {
  const isProduction = process.env.NODE_ENV === 'production';

  return (
    Metalsmith( __dirname )
      .clean( true )
      .ignore( [ '**/.DS_Store' ] )
      .watch( isProduction ? false : [ 'src', [ 'templates' ] ] )
      .env( 'NODE_ENV', process.env.NODE_ENV )
      //.env( 'DEBUG', '@metalsmith/layouts*' )
      .source( "./src/content" )
      .destination( "./build" )
      .metadata( {
        msVersion: dependencies.metalsmith,
        nodeVersion: process.version,
      } )

      .use(
        metadata( {
          metadata: "src/content/data/site.json",
          'metadata.testimonials': "src/content/data/testimonials",
          'metadata.work': "src/content/data/work",
          'metadata.projects': "src/content/data/projects",
        } )
      )

      // Exclude draft content in production mode
      .use( drafts( !isProduction ) )

      /**
       * Create a collection of blog posts
       */
      .use(
        collections( {
          blog: {
            pattern: "blog/*.md",
            sortBy: "date",
            reverse: true,
            limit: 50,
          },
        } )
      )

      /**
       * Create metadata for blog pagination as pages are built
       * with individual page components so we can't use the 
       * pagination plugin to do this.
       */
      .use( blogPages( {
        "pagesPerPage": 12,
        "blogDirectory": "blog/",
      } ) )

      /**
       * We are not using any markdown contents, only frontmatter
       * to define structured pages. Markdown content of section
       * properties will be done with a Nunjucks filter
       */
      .use( permalinks( {
        match: "**/*.md"
      } ) )

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
       */
      .use( externalLinks( {
        hostnames: [
          "http://localhost:3000/",
          "https://glinka.co/",
          "https://www.glinka.co/"
        ]
      } ) )

      .use(
        prism( {
          //lineNumbers: true,
          decode: true,
        } )
      )

      /**
       * Build assets - CSS and JS.
       */
      .use(
        assets( {
          source: "src/assets/",
          destination: "assets/",
        } )
      )
      .use(
        sass( {
          entries: {
            "src/sass/styles.scss": "assets/styles.css",
          },
        } )
      )
      .use( postcss( { plugins: [ "postcss-preset-env", "autoprefixer", "cssnano" ], map: !isProduction } ) )

      .use(
        esbuild( {
          entries: {
            "assets/scripts": "src/js/main.js",
          },
          drop: [],
        } )
      )

      .use( robots( {
        "useragent": "*",
        "sitemap": "https://glinka.co/sitemap.xml"
      } ) )

      /**
       * Include custom components
       * Placement is important. This should be just before the final build
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
      } ) )


      .use( ( files, metalsmith, done ) => {
        //console.log( files );
        console.log( metalsmith.metadata() );
        done();
      } )


      .use( sitemap( {
        hostname: 'https://glinka.co',
        omitIndex: true,
        omitExtension: true,
        changefreq: 'weekly',
        lastmod: new Date(),
        pattern: [ '**/*.html', '!**/404.html' ],
        defaults: {
          priority: 0.5,
          changefreq: 'weekly',
          lastmod: new Date()
        }
      } ) )
  );
}