---
layout: blocks.njk
draft: false
pageType: "blog-post"
disableDefaultFooter: true
item: "metalsmith-redux-conclusion" # used as a key for bloglist filters

seo:
  title: "Metalsmith Redux: Conclusion | Werner Glinka"
  description: "Metalsmith Redux began with a simple premise: amid framework overload, reintroduce Metalsmith as an example of stability and simplicity in an ecosystem obsessed with complexity."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1761081921/conclusion_ppzzmr.jpg"
  canonicalOverwrite: ""

blogTitle: "Beyond Markdown: Building Sectioned Webpages"
date: 2025-10-30
author: ""
image:
  src: "v1761081921/conclusion_ppzzmr.jpg"
  alt: ""
  caption:
excerpt: "Metalsmith Redux began with a simple premise: amid framework overload, reintroduce Metalsmith as an example of stability and simplicity in an ecosystem obsessed with complexity."

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
        image: "v1761081921/conclusion_ppzzmr.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Metalsmith Redux"
              titleCase: false
              header: "h1"
              subtitle: "The Conclusion"
              prose: ""
            date: 2025-10-30

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
              In May 2025, I started a series about Metalsmith, the static site generator. We began with a simple premise: amid framework overload, reintroduce Metalsmith as an example of stability and simplicity in an ecosystem obsessed with complexity. This wasn’t about revisiting old tools. Through careful exploration, we guided you toward a more efficient way to build websites—one that solves real problems without introducing unnecessary complexity.

              ## The Journey We Took
              We started with the basics: Metalsmith reads files, transforms them through plugins, writes output. Simple. Timeless. This predictability is rare in modern web development, where frameworks churn and APIs break with each major version.

              Then we explored the [traditional approach](/blog/metalsmith-redux-getting-started/)—Markdown files with frontmatter, templates that wrap content, blogs that follow established patterns. This has worked for years. But as we built more complex sites, the workarounds multiplied. Page templates proliferated. We needed more elaborate frontmatter configurations to work around Markdown limitations and had to maintain duplicated code across dozens of specialized templates. The process became increasingly inefficient.

              Then we flipped the mental model. Instead of documents with embedded components, we asked: what if pages were compositions of components? This led to sectioned pages, where every page is composed of self-contained section components, each with its template, styles, and behavior.

              The [Structured Content Starter](/blog/metalsmith-redux-introducing-structured-content-starter/) proved the concept worked. But it revealed a critical gap: asset management. When you have dozens of components, each with CSS and JavaScript, how do you bundle them intelligently without manual maintenance?

              This became the perfect opportunity to [explore AI-assisted development](/blog/metalsmith-redux-bundled-components-plugin/). The Metalsmith Bundled Components plugin emerged not from a predetermined spec, but from exploratory dialogue with Claude. We kicked the tires, discussed edge cases, and patterns emerged organically. The manifest pattern, the validation system, and the dependency resolution—none of these were planned up front. They evolved through collaborative exploration.

              ## Our Discovery
              This series wasn’t just about Metalsmith techniques. It revealed something more fundamental about web development in 2025:

              Simplicity scales better than complexity. The component architecture uses basic web platform features—HTML, CSS, JavaScript—without framework overhead. Yet it handles enterprise-scale sites with ease.

              The platform is enough. We don’t need megabytes of JavaScript to reconstruct HTML in the browser. We don’t need hydration. We don’t need virtual DOMs. The browser already knows how to display a hero section. We just need to give it well-structured HTML with appropriate styles.

              AI changes how we build tools. Not by generating code on command, but by enabling exploratory development. The bundled components plugin exists because Claude and I explored the problem space together until we arrived at a solution. This collaborative approach produces better solutions than starting with rigid specifications.

              Build-time beats runtime. By resolving dependencies, validating configurations, and optimizing assets during the build, we eliminate runtime overhead. The first page load gets everything. Subsequent pages are instant—no server, no database, no hydration delays.

              ## The Broader Implications
              This approach challenges several assumptions in modern web development:

              You don’t need a complex framework to build component-based sites. Metalsmith’s plugin architecture and Nunjucks templating provide everything required. The “framework” is just a set of patterns and discipline.

              Static sites aren’t limited to blogs and documentation. Component-based static sites handle complex marketing pages, portfolio sites, and content-rich experiences—anything that doesn’t need server-side personalization.

              Content management doesn’t require proprietary systems. Structured YAML in version control works remarkably well. Or add a Git-based CMS for non-technical editors, and you have a complete content pipeline without vendor lock-in.

              Performance optimizations happen at build time. Components declare their dependencies, and the bundling plugin figures out what CSS and JavaScript your site actually needs. No manual dependency lists. No unused code in your bundles.

              ## What This Enables
              With this foundation in place, components become truly portable across projects. A testimonial section built for one site works in another with no modification. Teams can build component libraries that embody their design systems.

              The structured content approach enables headless CMS integration naturally. Content lives in structured data already. Switching from YAML files to WordPress, Sanity, or Contentful just changes the source plugin. The component architecture remains unchanged.

              ## The Stability Advantage
              This architecture isn’t trendy. It’s built on fundamentals that won’t change. HTML will still be HTML. CSS will still cascade. JavaScript will enhance progressively. The Metalsmith core hasn’t had breaking changes in years and doesn’t need them.

              This is the opposite of technical debt. It’s a technical investment in stability,

              ## The Role of Constraints
              Years of working with clients taught me that constraints enable better outcomes. Content creators can’t accidentally break layouts or violate brand guidelines because components provide guardrails. They focus on content and messaging rather than wrestling with design decisions they’re not equipped to make.

              ## Looking Forward
              A component-based static site is a foundation. With components that manage their own dependencies, dynamically composable pages, and build-time optimization to ensure performance, we have the infrastructure to build sophisticated websites.

              AI will play a growing role by adding to our ability to explore solutions, document decisions, and build tools that solve real problems. The bundled components plugin demonstrates that this collaborative approach produces results.

              ## The Thesis Validated
              This series set out to show that Metalsmith remains an excellent choice for building websites in 2025. Its stability, simplicity, and plugin architecture make it ideal for component-based development. Its lack of opinions lets you implement exactly the patterns your project needs.

              The component architecture isn’t Metalsmith-specific, but Metalsmith makes it particularly elegant to implement. The pipeline model naturally accommodates component discovery, dependency resolution, and asset bundling. The file-based approach maps cleanly to component structure.

              ## The Conclusion
              We started asking why someone would choose Metalsmith in 2025. The answer: complexity is expensive, and simplicity scales. The platform has everything we need, and building with native technologies creates sites that age gracefully..

              The component-based approach is based on years of experience building corporate websites. The bundled components plugin was developed to support this flexible architecture.

              This is web development that lasts because it’s built on fundamentals. It’s not trendy, but it solves real problems.

              Sometimes the best way forward is remembering what actually matters: delivering fast, accessible, maintainable websites that serve users well. Everything else is just noise.

              The [Component Library](https://ms-components-library.netlify.app/) showcases what’s possible. The [Structured Content Starter](https://github.com/wernerglinka/metalsmith2025-structured-content-starter) and [Bundled Components]( https://github.com/wernerglinka/metalsmith-bundled-components) plugin provide the tools.

              ![](https://res.cloudinary.com/glinkaco/image/upload/v1761081924/library_kqyncr.jpg)


              Questions about building websites with Metalsmith? Find me on [Bluesky](https://bsky.app/profile/wernerglinka.bsky.social).

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
            url: "/blog/metalsmith-redux-conclusion"
            socialTitle: "Metalsmith Redux: Conclusion"
            socialComment: "The Metalsmith Redux blog series began with a simple premise: amid framework overload, reintroduce Metalsmith as an example of stability and simplicity in an ecosystem obsessed with complexity."

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
