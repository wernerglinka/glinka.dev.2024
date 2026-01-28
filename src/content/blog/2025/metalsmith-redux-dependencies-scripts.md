---
layout: blocks.njk
pageType: "blog-post"
disableDefaultFooter: true
item: "metalsmith-redux-depenendencies-scripts" # used as a key for blogpost filters

seo:
  title: "Metalsmith Redux - Static Site Generation in 2025 | Werner Glinka"
  description: "We examine package.json, one of the most important files in any Node.js project. While it might not be the most exciting file in our project, package.json is crucial. It defines our project, what it depends on, and the commands we can run to build, develop, and maintain it"
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1744827192/project-packages_ethu16.jpg"
  canonicalOverwrite: ""

blogTitle: "Metalsmith Redux - Dependencies and Scripts"
date: 2025-04-21
author: ""
image:
  src: "v1744827192/project-packages_ethu16.jpg"
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
        image: "v1744827192/project-packages_ethu16.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Metalsmith Redux: Dependencies and Scripts"
              header: "h1"
              subtitle: ""
              prose: ""
            date: 2025-04-21
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
              In our [previous post](/blog/metalsmith-redux-files-structure), we explored the file structure of our [Metalsmith2025 Simple Starter](https://github.com/wernerglinka/metalsmith2025-simple-starter). Today, we'll examine `package.json`, one of the most important files in any Node.js project.

              While it might not be the most exciting file in our project, `package.json` is crucial. It defines our project, what it depends on, and the commands we can run to build, develop, and maintain it.

              Let's dig in and understand what each part of this file does.

              ## What is package.json?
              
              Think of `package.json` as your project's ID card and instruction manual combined. It tells `Node.js` and `npm` (Node Package Manager) everything they need to know about your project: its name, version, dependencies, scripts, and more.

              Every `Node.js` project, including our Metalsmith site, needs a `package.json` file. Without it, none of the tools we're using would work.
              
              ### The Basic Metadata
              
              At the top of our `package.json` file, we see the basic information about our project:

              ```javascript
              {
                "name": "metalsmith-blog-starter",
                "version": "1.0.0",
                "description": "A simple Metalsmith blog starter",
                "type": "module",
                "keywords": [
                  "metalsmith",
                  "starter"
                ],
                "author": "werner@glinka.co",
                "license": "MIT",
              }
              ```
              Let's break down what each of these fields means:

              - **name**: The name of our project. This is how other developers would refer to it if we published it as a package.
              - **version**: The current version of our project, following semantic versioning (MAJOR.MINOR.PATCH).
              - **description**: A brief explanation of what the project does.
              - **type**: Set to "module", which means we're using ECMAScript modules (import/export) rather than CommonJS (require/module.exports).
              - **keywords**: Tags that help people find our project if we publish it.
              - **author**: The creator of the project.
              - **license**: The legal terms under which the project is distributed. MIT is a permissive open-source license.

              These fields aren't strictly necessary for our project to work, but they provide essential context for anyone who looks at our code.

              ### The `engines` Field
              
              Near the bottom of the file, you'll find:

              ```javascript
              "engines": {
                "node": ">=18.0.0"
              }
              ```

              This tells us that our project requires `Node.js` version 18.0.0 or higher. This is important because some features we're using might not be available in older versions of `Node.js`.

              ### The Scripts: Commands to Run

              The scripts section defines commands that we can run in the terminal with `npm run [script-name]`:

              ```javascript 
                "scripts": {
                  "dev": "metalsmith -c metalsmith.js --env NODE_ENV=development --env DEBUG=@metalsmith*",
                  "build": "metalsmith -c metalsmith.js --env NODE_ENV=production",
                  "start": "NODE_ENV=development DEBUG=@metalsmith* node metalsmith.js --watch",
                  "serve": "browser-sync start --server 'build'",
                  "format": "prettier --write \"**/*.{js,json,njk,css}\"",
                  "lint": "eslint --fix .",
                  "fix": "npm run format && npm run lint",
                  "depcheck": "depcheck"
                }
              ```

              These scripts are the commands you'll use most often when working with the project. Let's go through each one:

              #### Building and Development Scripts

              **dev**: Builds the site in development mode with debug information enabled. This is what you'll use most often during development. Each plugin used in the build process will log debug information and show you what's happening under the hood.
              
              ```javascript
              metalsmith -c metalsmith.js --env NODE_ENV=development --env DEBUG=@metalsmith*
              ```
              
              This command tells Metalsmith to:
              - Use metalsmith.js as its configuration file (`-c metalsmith.js`)
              - Set the environment to development (`--env NODE_ENV=development`)
              - Enable debug logging for Metalsmith plugins (`--env DEBUG=@metalsmith*`)


              **build**: Builds the site in production mode, which might include additional optimizations and exclude development features.
              
              ```javascript
              metalsmith -c metalsmith.js --env NODE_ENV=production
              ```

              **start**: An alternative development mode that directly runs `metalsmith.js` as a `Node.js` script with file watching enabled. So when you make changes to your source files, they will be automatically shown in your browser.
              
              ```javascript
              NODE_ENV=development DEBUG=@metalsmith* node metalsmith.js --watch
              ```
              
              This is my preferred way to work with Metalsmith when I build a site. The terminal output is not overwhelmed with plugin debug information so I can focus on relavent content or metadata logging. We'll explore this in more detail in the next post.

              **serve**: Starts a local development server that serves the files from the `build` directory.
              
              ```javascript
              browser-sync start --server 'build'
              ```

              ### Code Quality and Maintenance Scripts

              **format**: Uses `Prettier` to automatically format your JavaScript, JSON, Nunjucks, and CSS files.
              
              ```javascript
              prettier --write "**/*.{js,json,njk,css}"
              ```

              This ensures consistent code style across the project.

              **lint**: Uses `ESLint` to check your JavaScript files for potential errors and automatically fixes them when possible.
              
              ```javascript
              eslint --fix .
              ```

              **fix**: Runs both `format` and `lint` commands in sequence.
              
              ```javascript
              npm run format && npm run lint
              ```

              This is a convenient way to clean up your code in one go.

              **depcheck**: Checks for unused dependencies or dependencies missing from `package.json`. This is really helpful when you're managing a project with many dependencies. Dependencies have a tendency to accumulate over time... at least in my case.
              
              ```javascript
              depcheck
              ```

              ## Development vs. Production Mode

              You might have noticed that several scripts specify either `development` or `production` mode. This typical pattern in `Node.js` applications enables different behavior in different environments.

              - Development mode includes drafts, detailed debug information, and watches for file changes
              - Production mode excludes drafts, minifies HTML, generates a sitemap, and performs other optimizations

              This distinction ensures that we have a smooth development experience while still producing optimized output for deployment.
              
              ## The Dependencies: What Our Project Needs

              The `dependencies` and `devDependencies` sections list all the packages our project relies on:

              ```javascript
              "devDependencies": {
                "browser-sync": "^3.0.4",
                "eslint": "^9.24.0",
                "prettier": "^3.5.3"
              },
              "dependencies": {
                "@metalsmith/drafts": "^1.3.0",
                "@metalsmith/layouts": "^3.0.0",
                "@metalsmith/permalinks": "^3.2.0",
                "depcheck": "^1.4.7",
                "jstransformer-nunjucks": "^1.2.0",
                "marked": "^15.0.8",
                "metalsmith": "^2.6.3",
                "metalsmith-blog-lists": "^2.0.2",
                "metalsmith-menu-plus": "^0.0.3",
                "metalsmith-optimize-html": "^0.5.3",
                "metalsmith-simple-pagination": "^0.0.1",
                "metalsmith-sitemap": "^1.2.2",
                "metalsmith-static-files": "^1.1.1",
                "metalsmith-unified-markdown": "^0.0.4",
                "rehype-highlight": "^7.0.2"
              }
              ```

              There's a distinction between the two types of dependencies:

              - **dependencies**: Packages required for the project to run in production
              - **devDependencies**: Packages only needed during development, like testing tools or development servers
              
              Let's break down what each package does, starting with the dev dependencies:

              #### DevDependencies
              - **browser-sync**: Creates a local development server with automatic browser reloading
              - **eslint**: Checks your JavaScript code for potential problems
              - **prettier**: Automatically formats your code for consistency

              #### Dependencies
              ##### Core Metalsmith and Templating
              - **metalsmith**: The core static site generator that powers our project
              - **jstransformer-nunjucks**: Enables Nunjucks templating in our layouts

              ##### Metalsmith Core Plugins (Official)
              **@metalsmith/drafts**: Excludes draft content in production builds
              **@metalsmith/layouts**: Applies templates to content files
              **@metalsmith/permalinks**: Creates clean URLs without file extensions

              ##### Community Metalsmith Plugins
              - **metalsmith-blog-lists**: Generates lists of blog posts (latest, featured, etc.)  and places them in the Metalsmith metadata. These lists can then be used in sidebars or footers.
              - **metalsmith-menu-plus**: Creates navigation menus and breadcrumbs from your content
              - **metalsmith-optimize-html**: Minifies HTML in production builds
              - **metalsmith-simple-pagination**: A simple pagination plugin for folder content
              - **metalsmith-sitemap**: Generates a `sitemap.xml` file for search engines
              - **metalsmith-static-files**: Copies static files (CSS, images, etc.) to the build directory
              - **metalsmith-unified-markdown**: Processes Markdown content with unified/remark/rehype. Uses rehype plugin for code syntax highlighting

              ##### Supporting Packages
              - **marked**: A Markdown parser used by some Nunjucks filters
              - **rehype-highlight**: A syntax highlighting plugin for rehype (used with unified-markdown)
              - **depcheck**: Helps manage dependencies

              ## Version Numbers and the Caret (^)

              You might have noticed that each dependency has a version number prefixed with a caret (^):

              ```javascript
              "metalsmith": "^2.6.3"
              ``` 

              The caret means "compatible with version 2.6.3, but allow minor and patch updates." When you run `npm install`, 'npm' will install the latest version that matches this pattern.

              This follows semantic versioning:

              - **Major**(first number): Breaking changes
              - **Minor** (second number): New features without breaking changes
              - **Patch** (third number): Bug fixes

              The caret allows your project to automatically get bug fixes and new features without breaking changes.

              ## Understanding the Plugin Ecosystem

              Looking at the dependencies, you might notice a pattern: many packages are named `metalsmith-[plugin name]` or `@metalsmith/[plugin name]`. These are Metalsmith plugins, each adding specific functionality to the core Metalsmith engine.

              The beauty of Metalsmith's plugin-based architecture is that you can add, remove, or replace plugins to customize your build process. Each plugin does one thing well: _following the Unix philosophy_.

              Some common patterns in the plugin names:

              - **@metalsmith/[plugin name]**: Official plugins maintained by the Metalsmith team
              - **metalsmith-[plugin name]**: Community plugins created by Metalsmith users

              This modular approach means you can start with a simple setup and gradually add more features as needed.
              
              ### How These Dependencies Are Used
              
              All these dependencies are imported and will be used in `metalsmith.js`, which we'll explore in detail in the [next post](/blog/metalsmith-redux-build-pipeline).
              
              #### Adding New Dependencies
              As you develop your Metalsmith site, you might want to add new functionality. You can add new dependencies using `npm`:

              ```bash
              npm install --save some-metalsmith-plugin
              ``` 

              Then, you'll need to add the plugin to your Metalsmith pipeline in metalsmith.js:

              ```javascript
              import somePlugin from 'some-metalsmith-plugin';
              
              // ... other imports ...

              Metalsmith(__dirname)
                // ... existing plugins ...
                .use(somePlugin())
                // ... more plugins ...

              ```

              We'll do this in a future post when we add new capabilities to our site. This flexibility is one of Metalsmith's greatest strengths—you can customize it to suit your exact needs.
              
              #### Exploring Further: Available Plugins

              The plugins included in our starter project are just a small selection of what's available in the Metalsmith ecosystem. You can find many more plugins by:
              - Searching on [npm](https://www.npmjs.com/search?q=metalsmith)
              - Checking the [Metalsmith website](https://metalsmith.io/)
              - Looking at the official [Metalsmith GitHub organization](https://github.com/metalsmith)

              #### Keeping Dependencies Updated
              Over time, dependencies will receive updates with new features and bug fixes. You can update your dependencies using:

              ```bash
              npm update
              ``` 

              For major version updates (which might include breaking changes), you'll need to:

              ```bash
              npm install --save [plugin-name]@latest
              ``` 

              Replacing `[plugin-name]` with the package you want to update. Before you update, it's a good idea to check the plugin's documentation or release notes to see if there are any breaking changes you need to address.

              > It's a good practice to periodically check for updates and keep your dependencies current for security and performance reasons.
              
              ## Next Steps

              Now that we understand what's in our `package.json` and the role each dependency plays, we're ready to dive into `metalsmith.js` in the [next post](/blog/metalsmith-redux-build-pipeline). We'll explore how all these packages come together to build our site, and how the Metalsmith pipeline transforms our content into a complete website.

              In the meantime, try modifying one of the scripts or adding a new dependency to see how it affects your project. This hands-on experimentation is the best way to deepen your understanding of how everything works together.
              Happy building!

              > Did you know? Metalsmith's plugin architecture was inspired by the Unix philosophy: "Do one thing and do it well." Each plugin focuses on a specific transformation, and they work together to create a powerful, flexible system.


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
            url: "/blog/metalsmith-redux-dependencies-scripts"
            socialTitle: "Metalsmith Redux - Dependencies and Scripts"
            socialComment: "We examine package.json, one of the most important files in any Node.js project. While it might not be the most exciting file in our project, package.json is crucial. It defines our project, what it depends on, and the commands we can run to build, develop, and maintain it"
  
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

---