---
layout: blocks.njk
draft: false
pageType: "blog-post"
disableDefaultFooter: true
item: "metalsmith-plugin-template" # used as a key for bloglist filters

seo:
  title: "Metalsmith Plugin Template | Werner Glinka"
  description: "While working on the blog series Metalsmith Redux (Static Site Generation in 2025), I developed several new plugins with the assistance of Claude AI, which led me to create a standardized template for Metalsmith plugins."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1747778384/templates_dbx3zv.jpg"
  canonicalOverwrite: ""

blogTitle: "Metalsmith Plugin Template"
date: 2025-05-20
author: ""
image:
  src: "v1747778384/templates_dbx3zv.jpg"
  alt: ""
  caption:
excerpt: "While working on the blog series Metalsmith Redux (Static Site Generation in 2025), I developed several new plugins with the assistance of Claude AI, which led me to create a standardized template for Metalsmith plugins."

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
        image: "v1747778384/templates_dbx3zv.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Introducing my Metalsmith Plugin Template"
              titleCase: false
              header: "h1"
              subtitle: ""
              prose: ""
            date: 2025-05-20

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
              While working on my blog series [Metalsmith Redux - Static Site Generation in 2025](https://wernerglinka.com/blog/metalsmith-redux-intro), I developed several new plugins with the assistance of Claude AI. I found myself repeatedly modifying the [Metalsmith core plugin](https://github.com/metalsmith/core-plugin) structure for each new project, which led me to create a standardized template. This starter template simplified my plugin development and ensured consistency across my plugins.

              ## What's Included in the Template?

              The template provides a complete foundation for a modern [Metalsmith plugin](https://metalsmith.io/plugins/). You'll find dual module support for both ESM and CommonJS to ensure maximum compatibility across different Node.js environments. The template comes with pre-configured [GitHub Actions](https://github.com/features/actions) workflows for automated testing and coverage reporting, saving you the trouble of setting up CI/CD pipelines from scratch. The testing setup covers both ESM and CommonJS imports to ensure your plugin works in all environments and gives you a good starting point for your own tests.

              For code quality and consistency, the template includes [ESLint](https://eslint.org/) 9.x and [Prettier](https://prettier.io/) configurations. Release management is simplified through integration with [release-it](https://github.com/release-it/release-it) and conventional changelog generation. Developer experience is enhanced with [JSDoc](https://jsdoc.app/) typing that provides excellent IDE support without requiring TypeScript. All of this is wrapped in a standard documentation structure that ensures a consistent experience for users of your plugin.

              ## How to Use the Template

              Getting started with a new Metalsmith plugin is now easier than ever:

              ### 1. Clone the Template

              ```bash
              git clone https://github.com/wernerglinka/metalsmith-plugin-template.git metalsmith-your-plugin-name
              cd metalsmith-your-plugin-name
              rm -rf .git
              git init
              ```

              ### 2. Update Plugin Information

              Search and replace the following placeholders throughout the project:

              - `metalsmith-plugin-name` → Your plugin name (e.g., `metalsmith-markdown-extra`)
              - `plugin-name` → The short version (e.g., `markdown-extra`)
              - `pluginName` → The camelCase version (e.g., `markdownExtra`)
              - `A Metalsmith plugin to ...` → Your plugin description

              The main files to update are:
              - `package.json` (name, description, repository URLs)
              - `README.md` (badges, description, examples)
              - `src/index.js` (plugin function name and JSDoc comments)

              ### 3. Install Dependencies

              ```bash
              npm install
              ```

              ### 4. Implement Your Plugin

              The template provides a fully tested plugin structure in `src/index.js`. Modify it to implement your specific functionality while maintaining the two-phase plugin pattern:

              ```javascript
              function yourPluginName(options = {}) {
                // Normalize options with defaults
                const opts = {
                  defaultOption: true,
                  ...options
                };
                
                return function yourPluginName(files, metalsmith, done) {
                  const debug = metalsmith.debug ? metalsmith.debug('metalsmith-your-plugin-name') : () => {};
                  debug('Processing with options: %O', opts);
                  
                  // Process files...
                  
                  done();
                };
              }
              ```

              ### 5. Write Tests

              Update the pre-configured tests in:
              - `test/index.js` - Main ESM tests
              - `test/cjs.test.cjs` - CommonJS compatibility tests
              - `test/unit/` - Unit tests for specific functionality

              The template includes a complete test fixture structure in `test/fixtures/` to get you started quickly.

              ### 6. Update Documentation

              Ensure the README.md contains:
              - Clear description of what your plugin does
              - Installation instructions
              - Usage examples with code samples
              - Options documentation (in table format)
              - Debug instructions
              - Troubleshooting section

              ### 7. Test and Build

              Run a build before you test as we need to build the ESM and CommonJS versions of your plugin before testing.

              ```bash
              npm run build # Build ESM and CommonJS versions
              npm test      # Run tests
              ```

              ## AI-Assisted Plugin Development

              A unique feature of this template is the included `PROMPT-TEMPLATE.md` file, specifically designed for AI-assisted plugin development. When working with AI assistants like Claude, you can share this template to get structured, consistent help with your plugin development.

              The prompt template guides AI systems with clear instructions on plugin requirements and architecture, code standards and implementation patterns, testing approaches, and documentation needs. It also helps AI assistants avoid common pitfalls in Metalsmith plugin development. This approach has helped me develop several robust plugins in a fraction of the time it would typically take, and I believe it can do the same for you.

              ## Getting Started

              The Metalsmith Plugin Template is available now on GitHub at [wernerglinka/metalsmith-plugin-template](https://github.com/wernerglinka/metalsmith-plugin-template).

              I hope that this template makes your development process smoother and more enjoyable. 

              I'd love to hear your feedback on this template and how it could be improved. Let me know on [Bluesky](https://bsky.app/profile/wernerglinka.bsky.social) or open an issue on GitHub.
  
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
            url: "/blog/metalsmith-plugin-template"
            socialTitle: "Metalsmith Plugin Template"
            socialComment: "I have developed several new Metalsmith plugins with the assistance of Claude AI, which led me to create a standardized template. This starter template simplified my plugin development and ensured consistency across my plugins."

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
---
