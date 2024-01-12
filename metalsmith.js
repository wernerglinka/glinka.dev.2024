/* eslint-disable import/no-extraneous-dependencies */

const Metalsmith = require( "metalsmith" );
const markdown = require( "@metalsmith/markdown" );
const layouts = require( "@metalsmith/layouts" );
const collections = require( "@metalsmith/collections" );
const drafts = require( "@metalsmith/drafts" );
const esbuild = require( "@metalsmith/js-bundle" );
const permalinks = require( "@metalsmith/permalinks" );
const sass = require( "@metalsmith/sass" );
const postcss = require( "@metalsmith/postcss" );
const when = require( "metalsmith-if" );
const htmlMinifier = require( "metalsmith-html-minifier" );
const assets = require( "metalsmith-static-files" );
const metadata = require( "@metalsmith/metadata" );
const include = require( 'metalsmith-include-files' );
const sitemap = require( 'metalsmith-sitemap' );
const robots = require( 'metalsmith-robots' );

const blogPages = require( "./local_modules/blog-pages" );



const prism = require( "metalsmith-prism" );
const externalLinks = require( "metalsmith-safe-links" );

const marked = require( "marked" );


const { dependencies } = require( "./package.json" );
const { use } = require( "browser-sync" );
const isProduction = process.env.NODE_ENV === "production";

// functions to extend Nunjucks environment
const toUpper = string => string.toUpperCase();
const spaceToDash = string => string.replace( /\s+/g, "-" );
const condenseTitle = string => string.toLowerCase().replace( /\s+/g, "" );
const UTCdate = date => date.toUTCString( "M d, yyyy" );
const blogDate = string => new Date( string ).toLocaleString( "en-US", { year: "numeric", month: "long", day: "numeric" } );
const trimSlashes = string => string.replace( /(^\/)|(\/$)/g, "" );
const mdToHTML = mdString => {
  try {
    return marked.parse( mdString, {
      mangle: false,
      headerIds: false
    } );
  } catch ( e ) {
    console.error( "Error parsing markdown:", e );
    return mdString;
  }
};

const filterList = ( list, selections ) => {
  const filterredList = [];
  for ( let i = 0; i < list.length; i++ ) {
    for ( let j = 0; j < selections.length; j++ ) {
      if ( list[ i ].item === selections[ j ].item ) {
        filterredList.push( list[ i ] );
      }
    }
  }
  return filterredList;
};

// turn a string of words into a unique array of words. Used to create a unique list of categories in rich-list.njk
const toArray = ( string ) => {
  return [ ...new Set( string.trim().split( " " ) ) ].sort();
};

const dump = obj => {
  const getCircularReplacer = () => {
    const seen = new WeakSet();
    return ( key, value ) => {
      if ( typeof value === "object" && value !== null ) {
        if ( seen.has( value ) ) {
          return;
        }
        seen.add( value );
      }
      return value;
    };
  };

  return JSON.stringify( obj, getCircularReplacer(), 4 );
};

const isRelated = ( post, selections ) => {
  const simpleArray = selections.map( obj => obj.item );
  if ( simpleArray.includes( post.item ) ) {
    return true;
  }
  return false;
};

// Define engine options for the inplace and layouts plugins
const engineOptions = {
  path: [ "templates" ],
  filters: {
    toUpper,
    spaceToDash,
    condenseTitle,
    UTCdate,
    blogDate,
    trimSlashes,
    mdToHTML,
    filterList,
    toArray,
    dump,
    isRelated
  },
};

const t1 = performance.now();

function msBuild() {
  Metalsmith( __dirname )
    //.env('DEBUG', '@metalsmith/metadata*')
    .source( "./src/content" )
    .destination( "./build" )
    .clean( true )
    .ignore( '**/.DS_Store' )
    .metadata( {
      msVersion: dependencies.metalsmith,
      nodeVersion: process.version,
    } )

    .use( when( isProduction, drafts() ) )

    .use(
      metadata( {
        metadata: "src/content/data/site.json",
        'metadata.testimonials': "src/content/data/testimonials",
        'metadata.work': "src/content/data/work",
        'metadata.projects': "src/content/data/projects",
      } )
    )

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

    .use( markdown() )

    .use( permalinks() )

    .use( layouts( {
      directory: "templates",
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
        lineNumbers: true,
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
      "sitemap": "https://www.glinka.co/sitemap.xml"
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

    .use( when( isProduction, htmlMinifier() ) )

    /*
    .use( ( files, metalsmith, done ) => {
      console.log(files);
      console.log(metalsmith.metadata().blog);
      console.log(JSON.stringify(metalsmith.metadata(),null, 4));
      done();
    }
    )
    */

    .use( sitemap( {
      hostname: 'https://www.glinka.co',
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

    .build( err => {
      if ( err ) throw err;
      console.log( `Build success in ${ ( ( performance.now() - t1 ) / 1000 ).toFixed( 1 ) }s` );
    } );
}

if ( require.main === module ) {
  msBuild();
} else {
  module.exports = msBuild;
}