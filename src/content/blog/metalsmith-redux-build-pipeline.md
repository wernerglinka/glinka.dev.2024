---
layout: blocks.njk
draft: true
pageType: "blog-post"
disableDefaultFooter: true
item: "metalsmith-redux-build-pipeline" # used as a key for blogpost filters

seo:
  title: "Metalsmith Redux - The Build Pipeline | Werner Glinka"
  description: "We look at where all dependencies come together: the metalsmith.js. This file defines how your content gets transformed from Markdown files into a complete website."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1744827639/project-pipeline_yhqg15.jpg"
  canonicalOverwrite: ""

blogTitle: "Metalsmith Redux - The Build Pipeline"
date: 2025-04-24
author: ""
image:
  src: "v1744827639/project-pipeline_yhqg15.jpg"
  alt: ""
  caption:
excerpt: "We examine package.json, one of the most important files in any Node.js project. While it might not be the most exciting file in our project, package.json is crucial. It defines our project, what it depends on, and the commands we can run to build, develop, and maintain it"

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
        image: "v1744827639/project-pipeline_yhqg15.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Metalsmith Redux: The Build Pipeline"
              header: "h1"
              subtitle: ""
              prose: ""
            date: 2025-04-24
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
              In our [previous post](/blog/metalsmith-redux-dependencies-scripts), we examined the `package.json` file and learned about the dependencies that power our Metalsmith project. Now, we're going to look at where all those dependencies come together: the `metalsmith.js` file.

              If `package.json` is your project's ID card, then `metalsmith.js` is its brain. This file defines exactly how your content gets transformed from Markdown files into a complete website. It's where the magic happens.

              ## The Big Picture: How it works

              At its core, `metalsmith.js` defines a pipeline—a series of transformations that your content goes through. Each transformation is handled by a plugin, and the plugins are applied in a specific order.

              The process looks something like this:
              - Read files from the source directory
              - Apply transformations through plugins
              - Write the results to the destination directory

              It's a simple concept, but incredibly powerful in practice. Let's explore how it works with just enough code to understand the process.

              ## Understanding the File Structure

              The `metalsmith.js` file consists of four main parts:

              1. **Imports**: Loading all the necessary plugins and utilities
              2. **Configuration helpers**: Setting up the environment and options
              3. **Plugin pipeline**: Defining the transformations
              4. **Build logic**: Running the build process

              Let's examine each part and understand what it does.

              ## Imports: Loading Dependencies

              At the top of the file, we import all the necessary dependencies:

              ```javascript
              import { fileURLToPath } from 'node:url';
              import path, { dirname } from 'node:path';

              import Metalsmith from 'metalsmith';
              import drafts from '@metalsmith/drafts';
              import markdown from 'metalsmith-unified-markdown';
              import permalinks from '@metalsmith/permalinks';
              import blogLists from 'metalsmith-blog-lists';
              import menus from 'metalsmith-menu-plus';
              import layouts from '@metalsmith/layouts';
              import assets from 'metalsmith-static-files';
              import htmlMinifier from 'metalsmith-optimize-html';
              import sitemap from 'metalsmith-sitemap';
              import simplePagination from 'metalsmith-simple-pagination';

              import rehypeHighlight from 'rehype-highlight';

              import { performance } from 'perf_hooks';
              import browserSync from 'browser-sync';
              ```

              These imports fall into three categories:
              - Node.js built-in modules (url, path)
              - Metalsmith core and plugins
              - Supporting libraries (rehypeHighlight, browserSync)

              ## Configuration Helpers: Setting Up the Environment

              This section contains code that initializes the environment. A helper to note is the `getGlobalMetadata()` function. It reads JSON files from the `lib/data` directory and makes their contents available to your templates via metadata. Please note that this is normally done with the @metalsmith/metadata plugin. In our case I chose to use a custom function to keep the number of plugins to a minimum.

              ```javascript
              /**
              * @function getGlobalMetadata
              * @returns {Object} An object containing all JSON data files from lib/data directory
              *
              * This function reads all JSON files from the data directory and adds their data
              * to a metadata object. This object can then be added to the Metalsmith metadata.
              * /lib/data/
              *   - site.json
              *   - social.json
              *   - validate.json
              * 
              * becomes
              * {
              *   site: {...},
              *   social: {...},
              *   validate: {...}
              * }
              */
              const getGlobalMetadata = () => {
                const dataDir = path.join( thisDirectory, 'lib', 'data' ); // Path to data directory
                const files = fs.readdirSync( dataDir ); // Get all files in directory

                // Process each JSON file and add it to the result object
                return files.reduce( ( obj, file ) => {
                  const fileName = file.replace( '.json', '' ); // Remove .json extension
                  const fileContents = fs.readFileSync( path.join( dataDir, file ), 'utf8' );
                  obj[ fileName ] = JSON.parse( fileContents ); // Parse JSON content
                  return obj;
                }, {} );
              };

              const globalMetadata = getGlobalMetadata();

              // Get the site URL for use in the sitemap plugin
              const siteURL = globalMetadata.site.siteURL;
              ```

              This function reads JSON files from the `lib/data` directory and makes them available to your templates. For example, if you have a `site.json` file with your site's title and URL, this function allows you to access that data in your Nunjucks templates using variables like `{{ site.title }}`. We'll dive deeper into how this works in a future post about templating, but for now, understand that it's a way to keep site-wide information in one place and use it across all your pages.

              Another important piece of configuration is the setup for Nunjucks templates:

              ```javascript
              /**
              * TEMPLATE ENGINE SETUP
              * Import custom Nunjucks filters that extend the template engine
              * These filters provide additional functionality like date formatting,
              * string manipulation, and more.
              */
              import * as nunjucksFilters from './nunjucks-filters/index.js';

              /**
              * Configuration options for the Nunjucks template engine
              * @type {Object}
              */
              const engineOptions = {
                path: [ 'lib/layouts' ], // Where to find template files
                filters: nunjucksFilters, // Custom filters for templates
              };
              ```

              This configuration tells the layouts plugin where to find templates and what filters to make available to them. Filters are special functions that can transform data in your templates, such as formatting dates or capitalizing text.

              The final part of the configuration sets up the environment and creates the Metalsmith instance:

              ```javascript
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
              * These determine how Metalsmith will process our files
              */
              metalsmith
                .clean( true ) // Clean the destination directory before building
                .ignore( [ '**/.DS_Store' ] ) // Ignore macOS system files
                .watch( isProduction ? false : [ 'src', 'lib/layouts', 'lib/assets' ] ) // Watch for changes in development mode only
                .env( 'NODE_ENV', process.env.NODE_ENV ) // Pass NODE_ENV to plugins
                .source( './src' ) // Where to find source files
                .destination( './build' ) // Where to output the built site
                .metadata( {
                  // Global metadata available to all files
                  msVersion: dependencies.metalsmith, // Metalsmith version
                  nodeVersion: process.version, // Node.js version
                  ...globalMetadata // Global data from JSON files in /lib/data
                } )
              ```

              This configuration:
              - Determines whether we're in production mode
              - Creates a new Metalsmith instance
              - Sets up basic parameters like source and destination directories
              - Configures file watching for development
              - Adds global metadata, including the data from our JSON files

              Note how the code uses the spread operator (`...globalMetadata`) to include all the data from our JSON files in the global metadata. It enumerates the properties of the globalMetadata object and adds the individual properties to the metalsmith metadata.

              ## The Metalsmith Pipeline: Where the Magic Happens

              This is the heart of the file—where we define exactly how our content gets transformed. After the basic configuration, we add plugins using the `.use()` method. Each plugin performs a specific transformation on our content.

              Here's a breakdown of what each plugin does, in order:

              ### 1. Drafts Plugin

              ```javascript
              .use(drafts(!isProduction))
              ```

              This plugin:
              - Filters out pages marked as drafts in production mode
              - Keeps draft content in development mode for previewing

              To mark a page as a draft, add `draft: true` to its frontmatter. The page will then be excluded from production builds but included in development builds. Read more about the [drafts plugin](https://github.com/metalsmith/drafts).

              ### 2. SimplePagination Plugin

              ```javascript
              .use(
                simplePagination({
                  directory: 'blog',
                  perPage: 2,
                  sortBy: 'post.date',
                  reverse: true,
                  outputDir: 'blog/:num',
                  indexLayout: 'blog.njk',
                  firstIndexFile: 'blog.md',
                  usePermalinks: true
                })
              )
              ```

              This plugin:
              - Creates paginated lists of blog posts
              - Processes files in the `blog` directory
              - Shows 2 posts per page (this number would normally larger. We chose 2 in this caseas we have only 5 blogposts in this demo)
              - Sorts posts by date in reverse order (newest first)
              - Generates clean URLs like `blog/` for the first page and `blog/2/` for subsequent pages with `usePermalinks: true`
              - Uses `blog.njk` as the template for the pages

              This is what powers the blog section of your site, breaking up a large number of posts into manageable pages. Read more about the [simplePagination plugin](https://github.com/wernerglinka/metalsmith-simple-pagination).

              ### 3. BlogLists Plugin

              ```javascript
              .use(
                blogLists({
                  latestQuantity: 4,
                  featuredQuantity: 2,
                  featuredPostOrder: 'desc',
                  fileExtension: '.md',
                  blogDirectory: './blog',
                  blogObject: 'post'
                })
              )
              ```

              This plugin:
              - Looks for `.md` files in the `./blog` directory
              - Expects blog post metadata in a `post` object in the frontmatter
              - Creates collections of blog posts that can be displayed on other pages
              - Generates a list of the 4 most recent posts
              - Creates a list of 2 featured posts (marked with `featured: true` in frontmatter)
              - Sorts featured posts in descending order
              

              These lists can be used on your home page or in sidebars to highlight selected blog content. Read more about the [blogLists plugin](https://github.com/wernerglinka/metalsmith-blog-lists).

              ### 4. Markdown Plugin

              ```javascript
              .use(
                markdown({
                  engineOptions: {
                    extended: {
                      rehypePlugins: [rehypeHighlight]
                    }
                  }
                })
              )
              ```

              This plugin:
              - Is new, using the unified/remark ecosystem for Markdown processing while maintaining full API compatibility with @metalsmith/markdown.
              - Converts Markdown content to HTML
              - Uses rehypeHighlight for syntax highlighting in code blocks

              This is where your readable Markdown content becomes browser-ready HTML. The rehypeHighlight plugin adds syntax highlighting to code examples, making them more readable. Read more about the [markdown plugin](https://github.com/wernerglinka/metalsmith-unified-markdown).

              ### 5. Permalinks Plugin

              ```javascript
              .use(permalinks())
              ```

              This simple but powerful plugin:
              - Creates clean URLs by converting files like `about.html` to `about/index.html`
              - This allows URLs like `/about/` instead of `/about.html`
              - Makes your site structure more intuitive and user-friendly

              Read more about the [permalinks plugin](https://github.com/metalsmith/permalinks).

              ### 6. Menus Plugin

              ```javascript
              .use(
                menus({
                  metadataKey: 'mainMenu',
                  usePermalinks: true,
                  navExcludePatterns: ['404.html', 'robots.txt']
                })
              )
              ```

              This plugin:
              - Creates a nested navigation structure reflecting your content file hierarchy
              - Creates an object to be used in templates
              - Works with the clean URLs generated by permalinks
              - Excludes certain pages (like 404) from navigation
              - Creates breadcrumbs for each page

              Individual pages can customize their navigation properties using frontmatter:

              ```yaml
              navigation:
                navLabel: 'About'
                navIndex: 1
              ```

              It then compiles this into a structured menu that your templates can use to build navigation elements.

              Read more about the [menus plugin](https://github.com/wernerglinka/metalsmith-menu-plus).

              ### 7. Layouts Plugin

              ```javascript
              .use(
                layouts({
                  directory: 'lib/layouts',
                  transform: 'nunjucks',
                  pattern: ['**/*.html'],
                  engineOptions
                })
              )
              ```

              This plugin:
              - Applies Nunjucks templates to your HTML content
              - Looks for templates in the `lib/layouts` directory
              - Applies templates to files to match specified patterns
              - Passes options to the Nunjucks engine (defined earlier)

              This is where your content gets its final structure and design. The template to use is specified in each file's frontmatter:

              ```yaml
              layout: simple.njk
              ```

              Read more about the [layouts plugin](https://github.com/metalsmith/layouts).

              ### 8. Assets Plugin

              ```javascript
              .use(
                assets({
                  source: 'lib/assets/',
                  destination: 'assets/'
                })
              )
              ```

              This plugin:
              - Copies static files (CSS, JavaScript, images) from `lib/assets` to `/assets`
              - Makes these files available to your site without processing them

              This ensures that your site has the necessary styles, scripts, and images. Read more about the [assets plugin](https://github.com/wernerglinka/metalsmith-static-files).

              ### Production-Only Plugins

              Some plugins are only used in production mode:

              ```javascript
              if (isProduction) {
                metalsmith
                  .use(htmlMinifier())
                  .use(
                    sitemap({
                      hostname: siteURL,
                      omitIndex: true,
                      omitExtension: true,
                      changefreq: 'weekly',
                      lastmod: new Date(),
                      pattern: ['**/*.html', '!**/404.html'],
                      defaults: {
                        priority: 0.5,
                        changefreq: 'weekly',
                        lastmod: new Date()
                      }
                    })
                  );
              }
              ```

              These plugins:
              - **htmlMinifier**: Removes whitespace and comments from HTML files to reduce their size. Read more about the [htmlMinifier plugin](https://github.com/wernerglinka/metalsmith-optimize-html).
              - **sitemap**: Generates a sitemap.xml file for search engines with appropriate URLs and metadata. Read more about the [sitemap plugin](https://github.com/ExtraHop/metalsmith-sitemap).

              This separation ensures that development builds include all content (including drafts), while production builds are optimized and include only final content.

              ## The Flow of Content Through the Pipeline

              To understand how this all works together, let's follow a single file through the pipeline:

              1. **Source**: Metalsmith reads `src/about.md`.

              2. **Drafts**: If the file has `draft: true` in its frontmatter and we're in production mode, it gets filtered out. Otherwise, it continues.

              3. **SimplePagination**: Since this file isn't in the blog directory, it's left unchanged.

              4. **BlogLists**: Again, not a blog post, so it's unchanged.

              5. **Markdown**: The Markdown content is converted to HTML, becoming `about.html`.

              6. **Permalinks**: The file is moved to `about/index.html` for cleaner URLs.

              7. **Menus**: Navigation information from the frontmatter is collected into a menu structure.

              8. **Layouts**: The HTML content is wrapped in the template specified in the frontmatter (e.g., `simple.njk`).

              9. **Assets**: Static files are copied (doesn't affect our content file).

              10. **Production Plugins**: In production, the HTML is minified and included in the sitemap.

              11. **Destination**: The final `about/index.html` is written to the `build` directory.

              This process happens for every file in the `src` directory, with each plugin doing its job as the files pass through the pipeline.

              ## Build Logic: Running the Pipeline

              The final part of the file handles actually running the build:

              ```javascript
              if (mainFile === thisFile) {
                let t1 = performance.now();
                metalsmith.build((err) => {
                  if (err) {
                    throw err;
                  }
                  console.log(`Build success in ${((performance.now() - t1) / 1000).toFixed(1)}s`);
                  
                  // Development server setup
                  if (metalsmith.watch()) {
                    if (devServer) {
                      t1 = performance.now();
                      devServer.reload();
                    } else {
                      devServer = browserSync.create();
                      devServer.init({
                        host: 'localhost',
                        server: './build',
                        port: 3000,
                        injectChanges: false,
                        reloadThrottle: 0
                      });
                    }
                  }
                });
              }

              export default metalsmith;
              ```

              This code is handling an important aspect of Metalsmith's flexibility - the ability to run the build process in different ways. Let's understand what "Checks if the file is being run directly" actually means.

              Looking at the scripts in `package.json`, we have two different ways to run Metalsmith:
              ```json
              "scripts": {
                "dev": "metalsmith -c metalsmith.js --env NODE_ENV=development --env DEBUG=@metalsmith*",
                "build": "metalsmith -c metalsmith.js --env NODE_ENV=production",
                "start": "NODE_ENV=development DEBUG=@metalsmith* node metalsmith.js --watch",
                // Other scripts...
              }
              ```
              These scripts demonstrate the two ways to run Metalsmith:

              ### 1 Using the Metalsmith CLI (`dev` and `build` scripts):

              - Runs the command `metalsmith -c metalsmith.js`
              - The Metalsmith CLI imports the `metalsmith.js` file as a module
              - In this case, mainFile !== thisFile, so the build logic in the if-block is skipped
              - The CLI itself handles the build process

              ### 2 Running the file directly with Node.js (`start` script):

              - Runs the command `node metalsmith.js --watch`
              - Here, `metalsmith.js` is executed as a standalone node script
              - In this case, mainFile === thisFile, so the build logic in the if-block runs
              - The file handles the build process itself

              This conditional check prevents the build from running twice when using the CLI. It also allows the same file to be used both as a configuration module (imported by the CLI) and as a standalone script. This dual-use approach gives you flexibility in how you run your builds.
              When the file runs directly via `node metalsmith.js`, it also sets up a development server using `BrowserSync`, which serves the files and reloads your browser when changes are detected.

              ## Understanding Key Concepts

              Let's look at a few important concepts that will help you understand how Metalsmith works:

              ### Files Object

              Internally, Metalsmith represents your content as a "files object"—a JavaScript object where each key is a file path and each value is a file object containing the file's contents and metadata. Plugins manipulate this object, adding, removing, or modifying files.

              ### Frontmatter

              The YAML frontmatter at the top of your Markdown files (between `---` lines) becomes metadata in the file object. Plugins can read this metadata to make decisions about how to process the file.

              For example, this frontmatter:

              ```yaml
              ---
              layout: blog-post.njk
              post:
                title: My First Post
                date: 2025-01-15
                featured: true
              ---
              ```

              Becomes this metadata in the file object:

              ```javascript
              {
                layout: 'blog-post.njk',
                post: {
                  title: 'My First Post',
                  date: new Date('2025-01-15'),
                  featured: true
                }
              }
              ```

              ### Metadata

              Metadata can come from three sources:
              1. Frontmatter in content files
              2. Global metadata added with `.metadata()`
              3. Data files loaded by `getGlobalMetadata()`

              Templates can access all this metadata to customize how content is displayed.

              ### Plugin Order

              The order of plugins matters because each one operates on the output of the previous one. For example, you must convert Markdown to HTML before applying layouts, and you must apply permalinks before generating a sitemap.

              ## Customizing Your Build

              Now that you understand how `metalsmith.js` works, you might want to customize it. Here are some common modifications:

              ### Changing Plugin Options

              Most plugins accept options that change their behavior. For example, you could change how many blog posts appear per page:

              ```javascript
              .use(
                simplePagination({
                  // Change from 2 to 5 posts per page
                  perPage: 5,
                  // Other options remain the same
                  directory: 'blog',
                  sortBy: 'post.date',
                  reverse: true,
                  // ...
                })
              )
              ```

              ### Adding New Plugins

              To add a new plugin, first install it:

              ```bash
              npm install --save some-metalsmith-plugin
              ```

              Then import it at the top of `metalsmith.js`:

              ```javascript
              import somePlugin from 'some-metalsmith-plugin';
              ```

              Finally, add it to the pipeline in the appropriate position:

              ```javascript
              .use(
                somePlugin({
                  // Configuration options
                })
              )
              ```

              ### Creating Custom Plugins

              For specialized needs, you can create your own plugins. A Metalsmith plugin is just a function that takes three parameters:

              ```javascript
              function myPlugin(files, metalsmith, done) {
                // Loop through files and modify them
                Object.keys(files).forEach(file => {
                  // For example, add a custom property to each file
                  files[file].customProperty = 'some value';
                  
                  // Or modify content
                  if (file.endsWith('.html')) {
                    let contents = files[file].contents.toString();
                    contents = contents.replace('oldtext', 'newtext');
                    files[file].contents = Buffer.from(contents);
                  }
                });
                
                // When finished
                done();
              }

              // Add to pipeline
              metalsmith.use(myPlugin);
              ```

              This gives you complete control over the transformation process.

              ## Next Steps

              Now that you understand the heart of your Metalsmith project, you're ready to start customizing it to your needs. In our next post, we'll look at how to enhance your site with additional features and techniques.

              Try making some small changes to `metalsmith.js` and see how they affect your site. The more you experiment, the better you'll understand how Metalsmith works and how you can use it to build exactly the site you want. Happy building!

              Any comments? Find me on [Bluesky](https://bsky.app/profile/wernerglinka.bsky.social).
              
  - container: aside # section || article || aside
    description: "social share links"
    containerFields:
      disabled: false
      containerId: ""
      containerClass: "share-links"
      inContainer: false
      background:
        color: ""
        image: ""
        isDark: false
    columns:
      - column:
        blocks:
          - name: social-shares
            blockClass: ""
            text:
              prefix: ""
              title: "Share this post"
              header: "h3"
              subtitle: ""
              prose: ""
            url: "/blog/metalsmith-redux-build-pipeline"
            socialTitle: "Metalsmith Redux - The Build Pipeline"
            socialComment: "We look at where all dependencies come together: the metalsmith.js. This file defines how your content gets transformed from Markdown files into a complete website."
  
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
              - item: "metalsmith-redux-intro"
              - item: "metalsmith-redux-getting-started"
              - item: "metalsmith-redux-files-structure"
              - item: "metalsmith-redux-dependencies-scripts"

---