/**
 * @function assignDeep
 * @param {*} obj 
 * @param {*} targetKey 
 * @param {*} targetValue 
 */
const assignDeep = ( obj, targetKey, targetValue ) => {
  Object.keys( obj ).forEach( key => {
    if ( key === targetKey ) {
      obj[ key ] = targetValue;
    }

    if ( typeof obj[ key ] === 'object' && obj[ key ] !== null ) {
      assignDeep( obj[ key ], targetKey, targetValue );
    }
  } );
};

/**
 * @typedef Options
 * @property {String} key
 */

/** @type {Options} */
const defaults = {
  "pagesPerPage": 6,
  "blogDirectory": "blog/",
};

/**
 * Normalize plugin options
 * @param {Options} [options]
 * @returns {Object}
 */
function normalizeOptions( options ) {
  return Object.assign( {}, defaults, options || {} );
}

/**
 * A Metalsmith plugin to provide the params to build pagination 
 * for the blog landing pages.
 * This plugin requires that the blog posts are build with sections
 * NO contents is used in the blog posts
 *
 * @param {Options} options
 * @returns {import('metalsmith').Plugin}
 */
export default function blogPages( options ) {
  options = normalizeOptions( options );

  return function ( files, metalsmith, done ) {
    const debug = metalsmith.debug( 'blogPages' );
    debug( 'Running with options: %O', options );

    /**
     * build the list of blog posts
     * @type {Array}
     * @description This is a list of all the blog posts in the blog directory
     * @example
     * [
     *  "blog/first-post.md",
     *  "blog/second-post.md",
     *  "blog/third-post.md",
     *  "blog/fourth-post.md",
     *  "blog/fifth-post.md",
     *  "blog/sixth-post.md"
     * ]
     */
    const blogpostList = [];
    for ( const [ file, path ] of Object.entries( files ) ) {
      if ( file.startsWith( options.blogDirectory ) ) {
        blogpostList.push( file );
      }
    }
    // get the number of landing pages to create for the blog
    const numberOfPages = Math.ceil( blogpostList.length / options.pagesPerPage );

    /**
     * if there is only one page, then we don't need to do anything
     */
    if ( numberOfPages === 1 ) {
      done();
      return;
    }

    /**
     * we have multiple pages, so we need to update the blog.md file first
     * @type {Object}
     * @description This is the original blog.md file
     * @example
     * - container: section # section || article || aside
     *  description: "section with all blogposts"
     *  containerFields:
     *    disabled: false
     *    containerId: ""
     *    containerClass: "all-blogs"
     *    inContainer: true
     *    background:
     *       color: ""
     *       image: ""
     *       isDark: false
     *   hasPagingParams: true
     *   columns:
     *     - column:
     *       blocks:
     *         - name: all-blogs
     *           blockClass: ""
     *           horizontal: false
     *           pageLength: ""
     *           pageStart: ""
     *           pageNumber: ""
     */
    const blogContent = files[ "blog.md" ];
    const blogSections = blogContent.sections;
    // loop over the sections until we find the hasPaging property
    for ( let i = 0; i < blogSections.length; i++ ) {
      if ( blogSections[ i ].hasPagingParams ) {
        assignDeep( blogSections[ i ], "numberOfBlogs", blogpostList.length );
        assignDeep( blogSections[ i ], "numberOfPages", numberOfPages );
        assignDeep( blogSections[ i ], "pageLength", options.pagesPerPage );
        assignDeep( blogSections[ i ], "pageStart", 0 );
        assignDeep( blogSections[ i ], "pageNumber", 1 );
        break;
      }
    }

    // create the additional landing pages
    for ( let i = 1; i < ( numberOfPages ); i++ ) {
      const page = i + 1;
      const pageName = `blog/${ page }.md`;
      const blogContent = JSON.parse( JSON.stringify( files[ "blog.md" ] ) );

      if ( numberOfPages > 1 ) {
        // fill in the relevant data for the page
        const blogSections = blogContent.sections;
        // loop over the sections until we find the hasPaging property
        for ( let j = 0; j < blogSections.length; j++ ) {
          if ( blogSections[ j ].hasPagingParams ) {
            assignDeep( blogSections[ j ], "numberOfBlogs", blogpostList.length );
            assignDeep( blogSections[ j ], "numberOfPages", numberOfPages );
            assignDeep( blogSections[ j ], "pageLength", options.pagesPerPage );
            assignDeep( blogSections[ j ], "pageStart", ( page - 1 ) * options.pagesPerPage );
            assignDeep( blogSections[ j ], "pageNumber", page );
            break;
          }
        }
      }
      // add new landing page to the files object
      files[ pageName ] = blogContent;
    }

    done();
  };
}