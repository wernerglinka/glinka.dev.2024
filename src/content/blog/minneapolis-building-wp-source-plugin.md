---
layout: blocks.njk
draft: false
pageType: "blog-post"
disableDefaultFooter: true
item: "minneapolis-building-wp-source-plugin" # used as a key for bloglist filters

seo:
  title: Minneapolis - building the WordPress source plugin for Metalsmith | Werner Glinka
  description: "This post will review integrating WordPress content into the Metalsmith static site generation process. This includes building a Metalsmith WordPress source plugin to fetch the site content from the WordPress API and convert it into Metalsmith file objects."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1687815985/minneapolis-downtown-skyline_ub97k1.jpg"
  canonicalOverwrite: ""

blogTitle: "Minneapolis - building the WordPress source plugin for Metalsmith"
date: 2023-06-26
author: ""
image:
  src: "v1687815985/minneapolis-downtown-skyline_ub97k1.jpg"
  alt: ""
  caption:
excerpt: "This post will review integrating WordPress content into the Metalsmith static site generation process. This includes building a Metalsmith WordPress source plugin to fetch the site content from the WordPress API and convert it into Metalsmith file objects."

sections:
  - container: section # section || article || aside
    description: "blog post banner"
    containerFields:
      animateSection: false
      disabled: false
      containerId: "blog-banner"
      containerClass: "blog-banner"
      inContainer: false
      background:
        color: ""
        image: "v1687815985/minneapolis-downtown-skyline_ub97k1.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Minneapolis - building the WordPress source plugin for Metalsmith"
              header: "h1"
              subtitle: ""
              prose: ""
            date: 2023-06-26

  - container: section # section || article || aside
    description: "blog post text section"
    containerFields:
      animateSection: false
      disabled: false
      containerId: ""
      containerClass: "text-section"
      inContainer: true
      background:
        color: ""
        image: ""
        isDark: false
    columns:
      - column:
        blocks:
          - name: text
            blockClass: "blogpost-text"
            prose: |-
              In the [last blog post](/blog/minneapolis-generate-graphql-queries/), we saw how to create GraphQL queries representing our site content. This post will review integrating WordPress content into the Metalsmith static site generation process. This includes building a Metalsmith WordPress source plugin to fetch the site content from the WordPress API and convert it into Metalsmith file objects. Metalsmith will then create all static pages.
              
              While our WordPress website is fully functional, it also makes the content available at the WordPress API URL.
              
              ```html
              https://dev-mpls.pantheonsite.io/graphql/
              ```
              _If you are new to GraphQL, I'd recommend reviewing this [introduction to WpGraphQL](https://www.wpgraphql.com/docs/introduction) before continuing._

              ## Metalsmith WordPress source plugin
              For this project, we only use Posts and Pages. However, custom post types can be effortlessly incorporated as well. To gain valuable insights into crafting Metalsmith plugins, I recommend reviewing [this resource](https://metalsmith.io/docs/writing-plugins/) for an excellent introduction.

              ### Plugin options
              In our plugin, we retrieve the navigation metadata and content for both posts and pages, as specified within the plugin options. The source plugin reads these options and verifies the requested content types. Subsequently, it fetches the necessary data and appends the navigation metadata to the Metalsmith metadata object. The implementation is carried out in the metalsmith.js file, exemplified as follows:


              **metalsmith.js**
              ```javascript
              const wordpressSource = require("./local_modules/wordpress-source");
              ...

              .use(
                    wordpressSource({
                      source: "https://dev-mpls.pantheonsite.io/graphql/",
                      contentTypes: ["posts", "pages"],
                    })
                  )

              ```
              Here we provide the API source adress and tell the plugin to fetch all posts and pages.

              ### Getting Pages
              Let's have a look at how we get the pages content. 
              
              **getPages.js**
              ```javascript
              const fetch = require('node-fetch');
              const queryString = require('./queries/pages');
              const flatten = require('./flatten');

              /**
              * getPages()
              * Function to fetch all pages from a WordPress site.
              * @returns {Array} contentTypes
              */

              module.exports = async function getPages(sourceURL) {
                const res = await fetch(sourceURL, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    query: queryString,
                  }),
                });

                const rawData = await res.json();

                const pages = rawData.data.pages.nodes
                  .filter((node) => node.sections.sections.length > 0)
                  .map((node) => node);

                // flatten section objects
                for (let i = 0; i < pages.length; i++) {  
                  flatten(pages[i].sections.sections);
                } 
                
                return pages;
              };

              ```
              Here we fetch all page data from a source URL, parsing the response body text as JSON, which gives us a javascript object `rawData`, then we extract an array with all pages while discarding empty sections. 
              
              Finally, we flatten/simplify image and CTA data.

              **flatten.js**
              ```javascript
              {
                  obj.image.height = obj.image.url?.mediaDetails?.height;
                  obj.image.width = obj.image.url?.mediaDetails?.width;
                  obj.image.url = obj.image.url?.mediaItemUrl;
              }
              ```
              At this point we have built the `files` array with all pages.

              ```javascript
              [
                {
                  seo: {
                    title: 'Home',
                    metaDesc: 'A headless Wordpress - proof of concept site with GraphQL to feed Metalsmith',
                    canonical: 'https://dev-mpls.pantheonsite.io/',
                    opengraphTitle: 'Minneapolis',
                    opengraphDescription: 'For Facebook - A headless WordPress - proof of concept site with GraphQL to feed Metalsmith',
                    opengraphAuthor: '',
                    opengraphModifiedTime: '2023-06-26T22:12:33+00:00',
                    opengraphImage: [Object],
                    opengraphUrl: 'https://dev-mpls.pantheonsite.io/',
                    twitterTitle: 'Minneapolis',
                    twitterDescription: 'For Twitter - A headless WordPress - proof of concept site with GraphQL to feed Metalsmith',
                    twitterImage: [Object]
                  },
                  slug: 'home',
                  title: 'Home',
                  parent: null,
                  uri: '/',
                  sections: { sections: [Array] },
                  footerContent: { footerContent: null }
                },    
                {
                    ...next page
                },	
                {
                    ...next page
                }
              ]
              ```

              ### Building the GraphQL queries
              Before we continue, let's step back and look at the query string we imported at the top of `getPages.js` as this file is the key to what we request from the WordPress API.

              ```javascript
              const queryString = require('./queries/pages');

              ```
              `pages.js` defines a query string that requests all page sections data which we built with ACF Flexible Content fields in the WordPress backend. 

              ```javascript
              
              const seo = require('./seo');
              const ctaBanner = require('./ctaBanner');
              const defaultFooter = require('./defaultFooter');
              const featuredLogos = require('./featuredLogos');
              const featuredResources = require('./featuredResources');
              const fullPageBanner = require('./fullPageBanner');
              const longText = require('./longText');
              const media = require('./media');
              const multiMedia = require('./multiMedia');
              const minimalBanner = require('./minimalBanner');
              const richFooter = require('./richFooter');
              const imageOnly = require('./imageOnly');
              const keyPoints = require('./keyPoints');
              const videoOnly = require('./videoOnly');
              const imageGallery = require('./imageGallery');
              const tabs = require('./tabs');

              module.exports = `
                {
                  pages {
                    nodes {
                      ${seo}
                      slug
                      title
                      parent {
                        node {
                          slug
                        }
                      }
                      uri
                      sections {
                        sections { 
                          ${ctaBanner}
                          ${defaultFooter}
                          ${featuredLogos}
                          ${featuredResources}
                          ${fullPageBanner}
                          ${imageOnly}
                          ${longText}
                          ${media}
                          ${multiMedia}
                          ${minimalBanner}
                          ${richFooter}
                          ${keyPoints}
                          ${videoOnly}
                          ${imageGallery}
                          ${tabs}
                        }
                      }
                      footerContent {
                        footerContent {
                          ... on Embed {
                            content
                          }
                        }
                      }
                    }
                  }
                }
              `;
              ```
              
              To make this query code manageable, we'll' use string fragments for each page section. If we compare the string with what we reviewed in our [last blog post](/blog/minneapolis-generate-graphql-queries/), we see that the structures are identical.

              ### The plugin code
              Now let's put this all together and look at the complete plugin code.

              **index.js**
              ```javascript
              const getPosts = require('./getPosts');
              const getPages = require('./getPages');
              const getSiteMetadata = require('./getSiteMetadata');

              /**************************************************************************
              * @typedef Options
              * @property {String} <key></key>
              *************************************************************************/

              /** @type {Options} */
              const defaults = {
                source: "",
                contentTypes: ["pages"],
              };

              /** @type {ContentTypes} */
              const knownContentTypes = ["posts", "pages"];

              /**************************************************************************
              * Normalize plugin options
              * @param {Options} [options]
              * @returns {Object}
              *************************************************************************/
              function normalizeOptions(options) {
                return Object.assign({}, defaults, options);
              }

              /**************************************************************************
              * A Metalsmith plugin to fetch content from WordPress
              *
              * @param {Options} option
              * @returns {import('metalsmith').Plugin}
              **************************************************************************/
              function initWordPressSource(options) {
                options = normalizeOptions(options);

                return async function metalsmithSourceWordPress(files, metalsmith, done) {
                  const debug = metalsmith.debug('metalsmith-source-wordpress');
                  debug('Running with options: %O', options);

                  /**************************************************************************
                  * Check if contentTypes are known
                  **************************************************************************/
                  for (const contentType of options.contentTypes) {
                    if (!knownContentTypes.includes(contentType)) {
                      throw new Error(
                        `Unknown content type: ${contentType}. Known content types are: ${knownContentTypes.join(', ')}`
                      );
                    }
                  }

                  const sourceURL = options.source;

                  /**************************************************************************
                  * Get site metadata
                  **************************************************************************/
                  const siteMetadata = await getSiteMetadata(sourceURL);
                  // add site metadata to metalsmith metadata object
                  metalsmith.metadata().nav = siteMetadata.nav;

                  /**************************************************************************
                  * Get all posts
                  **************************************************************************/
                  if (options.contentTypes.includes('posts')) {
                    const allPosts = await getPosts(sourceURL);

                    // loop over all posts and get the content for each post
                    for (const post of allPosts) {
                      // get the post name
                      const postName = post.uri.substring(1, post.uri.length - 1);
                      // add this post to the files object
                      const fileName = postName + '.md';
                      files[fileName] = {
                        title: post.title,
                        date: post.date,
                        featuredImage: post.featuredImage,
                        excerpt: post.excerpt,
                        footerContent: post.footerContent.footerContent.content,
                        layout: 'posts.njk',
                        contents: post.content,
                        mode: '0644',
                        stats: {},
                      };
                    }
                  }
                  
                  /**************************************************************************
                  * Get all pages
                  **************************************************************************/
                  if (options.contentTypes.includes('pages')) {
                    const allPages = await getPages(sourceURL);

                    // loop over all pages and get the content for each page
                    for (const page of allPages) {
                      // loop over all sections and get the content for each section
                      let pageSections = [];

                      for (const section of page.sections.sections) {
                        // disregard empty sections
                        if (Object.keys(section).length !== 0) {
                          // get the section type
                          const sectionType = Object.keys(section)[0];
                          const thisSection = { section : sectionType, ...section[sectionType]};
                          
                          // assemble the pageSections object
                          pageSections.push(thisSection);
                        }
                      }

                      // get the page name
                      const pageName = !!page.uri ? page.uri.substring(1, page.uri.length - 1) : page.slug;
                      // add this page to the files object
                      const fileName = page.uri === "/" ? 'index.md' : pageName + '.md';
                      files[fileName] = {
                        title: page.title,
                        seo: page.seo,
                        sections: pageSections,
                        footerContent: page.footerContent.footerContent ? page.footerContent.footerContent.content : '',
                        layout: page.slug == 'blog' ? 'blog.njk' : 'sections.njk',
                        contents: Buffer.from(''),
                        mode: '0644',
                        stats: {},
                      };
                    }
                  }

                  /**************************************************************************
                  * Done
                  **************************************************************************/ 
                  done();
                }
              }

              module.exports =  initWordPressSource;
              ```

              The plugin can be broken down into three parts. First, we normalize the plugin options and validate the the post types are known. Second, we get the site metadata and add them to the Metalsmith metadata. And third, we get the content for each page and post, build their respective file objects and add it to the `files` object.

              The complete site code, including the plugin code can be found in the [Github Repository](https://github.com/wernerglinka/minneapolis).

  - container: aside # section || article || aside
    description: "section with related blogposts"
    containerFields:
      disabled: false
      containerId: ""
      containerClass: "related-blogs"
      inContainer: false
      background:
        color: ""
        image: ""
        isDark: false
    columns:
      - column:
        blocks:
          - name: related-blogs
            blockClass: ""
            title: "Related Posts"
            header: "h2"
            horizontal: false
            selections:
              - item: "minneapolis-using-wordpress-headless-cms-metalsmith"
              - item: "minneapolis-project-outline"
              - item: "minneapolis-wordpress-setup"
              - item: "minnepolis-building-wp-section"  
              - item: "minneapolis-generate-graphql-queries" 


---