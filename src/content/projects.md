---
layout: blocks.njk
pageType: page

seo:
  title: Projects | Werner Glinka
  description: "My projects include Metalsmith plugins, starters and poc projects like ruhrpot and minneapolis, as well as contributions to other open source projects. My Metalsmith work has evolved to incorporate AI collaboration. After experimenting with various tools including ChatGPT, Github Co-pilot and Augment Code, I've settled on Claude and Claude Code as primary development partners. This collaboration accelerates plugin development, improves code quality through pair programming patterns, and enables rapid exploration of architectural approaches."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1646849499/tgc2022/social_yitz6j.png"
  canonicalOverwrite: ""

sections:
  - container: section
    description: page banner
    containerFields:
      animateSection: false
      disabled: false
      containerId: page-banner
      containerClass: page-banner
      inContainer: false
      background:
        color: ""
        image: v1691014699/projects-banner_znnxqf.jpg
        isDark: false
    columns:
      - column:
        blocks:
          - name: page-banner
            blockClass: ""
            text:
              prefix: ""
              title: Projects
              header: h1
              subtitle: Dabbling in Open Source
              prose: ""

  - container: section
    description: text only section
    containerFields:
      disabled: false
      containerId: ""
      containerClass: ""
      inContainer: false
      background:
        color: ""
        image: ""
        isDark: false
    columns:
      - column:
        blocks:
          - name: text
            blockClass: "more-space page-intro"
            title: "Metalsmith: The Engine Behind My Work"
            header: ""
            subtitle: ""
            prose: |-
              My work centers on Metalsmith, a static site generator that distinguishes itself through architectural simplicity and extensibility.

              The plugin-based architecture sets Metalsmith apart from monolithic generators like Gatsby or Hugo. Each plugin performs a focused transformation, making the build process modular and comprehensible. Complex functionality emerges from combining simple, single-purpose plugins rather than navigating opaque internal systems.
                  
              This transparency extends to plugin development. Creating custom plugins requires understanding just one pattern: accept a files object, transform it, return it. This simplicity enables rapid prototyping and encourages experimentation.

    columnsDirection: ""

  - container: section
    description: image only section
    containerFields:
      disabled: false
      containerId: ""
      containerClass: ""
      inContainer: true
      background:
        color: ""
        image: ""
        isDark: false
    columns:
      - column:
        blocks:
          - name: image
            blockClass: "limit-width"
            src: "v1645224179/tgc2022/blogImages/orca1/what-is-metalsmith_co5vzn.jpg"
            alt: "How Metalsmith Works"
            caption: "How Metalsmith Works"
            fitimage: false

  - container: section
    description: text only section
    containerFields:
      disabled: false
      containerId: ""
      containerClass: ""
      inContainer: false
      background:
        color: ""
        image: ""
        isDark: false
    columns:
      - column:
        blocks:
          - name: text
            blockClass: "page-intro"
            title: ""
            header: ""
            subtitle: ""
            prose: |-
              Segment created Metalsmith in early 2014, establishing its foundational architecture. After the initial development phase, the project entered a quieter period until 2022, when Kevin Van Lierde AKA [webketje](https://github.com/webketje) assumed leadership as maintainer. Under his stewardship, Metalsmith has returned to active development with regular updates, modernized tooling, and renewed community engagement.

              Since 2023, my Metalsmith work has evolved to incorporate AI collaboration. After experimenting with various tools including [ChatGPT](https://openai.com/index/chatgpt/), [Github Co-pilot](https://github.com/features/copilot) and [Augment Code](https://www.augmentcode.com/), I've settled on [Claude](https://claude.ai/) and [Claude Code](https://www.anthropic.com/claude-code) as primary development partners. This collaboration accelerates plugin development, improves code quality through pair programming patterns, and enables rapid exploration of architectural approaches.

              The combination of Metalsmith's transparent architecture and AI assistance creates an efficient development environment. The AI understands the plugin patterns quickly, while Metalsmith's simplicity makes the generated code easy to verify and refine.

    columnsDirection: ""

  - container: aside # section || article || aside
    description: "cta banner"
    containerFields:
      disabled: false
      containerId: ""
      containerClass: "cta-banner multiple-ctas"
      inContainer: false
      background:
        color: ""
        image: ""
        isDark: false
    columns:
      - column:
        blocks:
          - name: cta
            url: "https://metalsmith.io/"
            label: "Metalsmith Website"
            isExternal: true
            isButton: true
            buttonStyle: "primary"
      - column:
        blocks:
          - name: cta
            url: "https://github.com/metalsmith"
            label: "Metalsmith Github Repository"
            isExternal: true
            isButton: true
            buttonStyle: "primary"

  - container: section
    description: text only section
    containerFields:
      disabled: false
      containerId: ""
      containerClass: ""
      inContainer: false
      background:
        color: ""
        image: ""
        isDark: false
    columns:
      - column:
        blocks:
          - name: text
            blockClass: "page-intro"
            title: "MCP Servers for Metalsmith Development"
            header: "h2"
            subtitle: ""
            prose: |-
              As I integrate AI co-programming into my development workflow, I'm exploring ways to enhance AI assistants with Metalsmith-specific knowledge. MCP servers provide exactly this capability.

              MCP (Model Context Protocol) servers act as bridges between AI models and specialized resources. They enable AI assistants to access files, databases, and APIs while providing domain-specific expertise. Think of them as knowledge extensions that give AI models contextual understanding of specific tools and frameworks.

              **[Metalsmith Plugin MCP Server](https://github.com/wernerglinka/metalsmith-plugin-mcp-server):**
              This server streamlines Metalsmith plugin development by encoding ecosystem best practices directly into the AI's context. It provides automated scaffolding, validation, and maintenance tools that follow established patterns from core Metalsmith plugins and successful community contributions.

              The server offers comprehensive plugin lifecycle support. It generates complete plugin structures with proper testing frameworks, documentation templates, and configuration files. The validation system checks plugins against quality standards derived from exemplary projects like @metalsmith/core-plugin and metalsmith-optimize-images.

  - container: section
    description: text only section
    containerFields:
      disabled: false
      containerId: ""
      containerClass: ""
      inContainer: false
      background:
        color: ""
        image: ""
        isDark: false
    columns:
      - column:
        blocks:
          - name: text
            blockClass: "page-intro"
            title: "Plugins"
            header: "h2"
            subtitle: ""
            prose: |-
              Over the years, I've created several plugins that I've made available to the community. I also frequently contribute to existing plugins. All my plugins and starters  are available on [GitHub](https://github.com/wernerglinka) and [NPM](https://www.npmjs.com/~wernerglinka). Here are a few of my projects:

              **[Metalsmith Bundled Components](https://github.com/wernerglinka/metalsmith-bundled-components):**
              This plugin automates asset management for component-based architectures through intelligent discovery and bundling. It scans component directories for CSS and JavaScript files, resolves dependencies with circular reference detection, and generates correctly-ordered bundles with scope isolation through IIFEs. The plugin supports both ESM and CommonJS modules, integrates with PostCSS for CSS processing, and follows convention-over-configuration principles to minimize setup complexity.

              **[Metalsmith Optimize Images](https://github.com/wernerglinka/metalsmith-optimize-images):** 
              This plugin automates responsive image generation by creating optimized variants for modern web delivery. It processes source images into multiple resolutions for different device widths while generating next-generation AVIF and WebP formats alongside JPEG/PNG fallbacks for universal browser support.

              **[Metalsmith Optimize HTML](https://github.com/wernerglinka/metalsmith-optimize-html):**
              This plugin optimizes HTML output through comprehensive minification without external dependencies. Inspired by the battle-tested [htmlcompressor](https://code.google.com/archive/p/htmlcompressor/) project, it removes unnecessary whitespace, comments, and redundant attributes while normalizing URLs, boolean attributes, and data attributes to reduce file sizes.         


              **[Metalsmith MDN](https://github.com/wernerglinka/metalsmith-mdn):**
              This plugin bridges the gap between structured templates and long-form content by enabling Nunjucks components within markdown files. It allows you to embed the same reusable components used in your page templates directly into markdown content, maintaining consistency across your entire site.


              **[Metalsmith Markdown Partials](https://github.com/wernerglinka/metalsmith-markdown-partials):** 
              This plugin enables content composition through reusable markdown fragments. It processes include markers in your markdown files, replacing them with content from separate partial files during the build process. This approach eliminates content duplication across pages while maintaining pure markdown authoring.

              **[Metalsmith Unified Markdown](https://github.com/wernerglinka/metalsmith-unified-markdown):**
              This plugin explores markdown processing through the [unified/remark ecosystem](https://unifiedjs.com/), demonstrating an alternative architectural approach to the standard [@metalsmith/markdown](https://github.com/metalsmith/markdown) plugin. While fully functional, it prioritizes extensibility and ecosystem integration over raw performance.

              **[Metalsmith Blog Lists](https://github.com/wernerglinka/metalsmith-blog-lists):** 
              This tool adds metadata lists, such as 'All Blogs', 'Recent Blogs', 'Featured Blogs', and an 'Annualized Blogs List', which can be accessed by all pages. These lists are useful for creating widgets to promote featured or latest blog posts. Please note that this plugin requires all blog posts to be located in the 'blog/' directory of the content.


              **[Metalsmith Safe Links](https://github.com/wernerglinka/metalsmith-safe-links):** 
              This plugin automatically processes links in your content to handle internal and external URLs appropriately. For internal links, it converts absolute URLs to relative paths by removing unnecessary protocol and hostname information. For external links, it adds security and usability attributes including target="_blank" and rel="noopener noreferrer". The plugin solves a common markdown limitation: standard markdown link syntax only supports href and title attributes. 


              **[Metalsmith Prism](https://github.com/wernerglinka/metalsmith-prism):** 
              This plugin integrates [Prism.js](https://prismjs.com/) syntax highlighting into the Metalsmith build process, automatically processing code blocks to add language-specific styling without client-side JavaScript dependencies. The plugin supports Prism's extensive language collection and theme options while maintaining the performance benefits of build-time processing.

              Originally developed by Robert McGuinness with sponsorship from Availity, I assumed maintenance responsibilities in March 2022. Under my stewardship, the plugin has been updated for compatibility with current Metalsmith versions and modern Node.js environments, ensuring continued reliability for technical documentation and developer-focused sites.


              **[Metalsmith Static Files](https://github.com/wernerglinka/metalsmith-static-files):** 
              This plugin handles static asset management in Metalsmith projects, copying directories of unchanging files—images, fonts, downloads, vendor scripts—directly from source to build without processing. It provides fine-grained control over which directories to copy and where to place them in the build output.

              Created as a modern replacement for the deprecated metalsmith-assets plugin, it maintains compatibility with current Metalsmith versions while adding improved error handling and clearer configuration options. The plugin streamlines asset management by keeping static files separate from processed content, preventing unnecessary processing overhead and maintaining clean project organization.

  - container: section
    description: text only section
    containerFields:
      disabled: false
      containerId: ""
      containerClass: ""
      inContainer: false
      background:
        color: ""
        image: ""
        isDark: false
    columns:
      - column:
        blocks:
          - name: text
            blockClass: "page-intro"
            title: "Starters"
            header: "h2"
            subtitle: ""
            prose: >-
              The only starters you'll ever need:


              **[Metalsmith2025 Structured Content Starter](https://github.com/wernerglinka/metalsmith2025-structured-content-starter):**
              This is a component-based, structured content starter built with Metalsmith, demonstrating modern web development patterns without the overhead of JavaScript frameworks. Unlike traditional lonf-text Markdown contents, this starter uses structured content in frontmatter to define reusable page sections and components. Each component manages its own styles and scripts, which are automatically bundled only when used. This approach provides the flexibility of component-driven development while maintaining the simplicity and performance benefits of static site generation with Metalsmith. [See a demo here](https://ms2025-structured-content-starter.netlify.app/).


              **[Metalsmith2025 Simple Starter](https://github.com/wernerglinka/metalsmith2025-simple-starter):**
              This is a simple, functional blog starter built with Metalsmith, designed to serve as a learning resource for web developers exploring static site generation. It demonstrates the core concepts of Metalsmith with minimal complexity, making it perfect for beginners while still showcasing the power and flexibility that make Metalsmith a valuable tool in 2025. [A demo is available here](https://ms2025-simple-starter.netlify.app/).


              The following starters are still available but are now deprecated in favor of the starters listed above.

              **[Metalsmith Bare-bones Starter](https://github.com/wernerglinka/metalsmith-bare-bones-starter):**
              As the name says, this starter is providing a bare-bones setup to get you started. It uses Markdown content and Nunjucks templating and has a couple of pages. The rest is up to you.


              **[Metalsmith Blog Starter](https://github.com/wernerglinka/metalsmith-blog-starter):**
              A blog starter, based on the Metalsmith Bare-bones Starter. It adds a blog landing page and several "greek" blog posts. The rest is up to you.


              **[Metalsmith Company Starter](https://github.com/wernerglinka/metalsmith-company-starter):**
              Company websites are normally more complex than your average portfolio or blog site. Here is a starter that inlcudes flexible page layouts, a responsive/progressive image component and more.
---
