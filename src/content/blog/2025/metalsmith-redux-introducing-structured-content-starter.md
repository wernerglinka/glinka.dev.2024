---
layout: blocks.njk
pageType: "blog-post"
disableDefaultFooter: true
item: "metalsmith-redux-introducing-structured-content-starter" # used as a key for bloglist filters

seo:
  title: "Metalsmith Redux: Introducing the Structured Content Starter | Werner Glinka"
  description: "Transform how you build static sites with structured content. The Metalsmith2025 structured content starter brings component architecture, smart dependency bundling, and fluid responsive design - no frameworks needed."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1754507648/structured-content_du4obz.jpg"
  canonicalOverwrite: ""

blogTitle: "Metalsmith Redux: Introducing the Structured Content Starter"
date: 2025-08-07
author: ""
image:
  src: "v1754507648/structured-content_du4obz.jpg"
  alt: ""
  caption:
excerpt: "Transform how you build static sites with structured content. The Metalsmith2025 structured content starter brings component architecture, smart dependency bundling, and fluid responsive design - no frameworks needed."

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
        image: "v1754507648/structured-content_du4obz.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Metalsmith Redux: Introducing the Structured Content Starter"
              titleCase: false
              header: "h1"
              subtitle: ""
              prose: ""
            date: 2025-08-07

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
              In a [previous post](/blog/metalsmith-redux-building-better-webpages), we explored the concept of sectioned pages – treating web pages as compositions of reusable components rather than documents with embedded elements. What was missing was a reference implementation. Well, here it is.

              [Have a look at it](https://ms2025-structured-content-starter.netlify.app/), or check out the starter repo: [Metalsmith2025 Structured Content Starter](https://github.com/wernerglinka/metalsmith2025-structured-content-starter).


              This isn't just another boilerplate. It's a fully-realized implementation of the sectioned page philosophy, complete with intelligent dependency management, component architecture, and all the patterns we've been discussing throughout this series. Let me walk you through what makes this starter special and how it transforms the ideas we've explored into practical reality.

              ## From Theory to Practice

              Remember when we discussed the limitations of treating pages as documents? The structured content starter takes that insight and runs with it. Every page is built entirely from structured frontmatter – no markdown body at all. Each section is a self-contained component with its own template, styles, and behavior.

              Here's what the starter home page looks like:

              ```yaml
              ---
              layout: pages/sections.njk
              bodyClasses: 'sections-page'
              hasHero: true

              navigation:
                navLabel: 'Home'
                navIndex: 0

              seo:
                title: MS2025 Structured Content Starter
                description: 'A Metalsmith Starter to build modern websites using structured data and reusable components.'
                socialImage: '/assets/images/sample2.jpg'
                canonicalURL: ''

              sections:
                - sectionType: hero
                  containerTag: section
                  classes: 'first-section merge-with-next'
                  id: ''
                  description: "This is a hero section that merges with the next section. The hero section has a class of 'merge-with-next' which removes the bottom margin. The next section has 'containerFields.noMargin.top' set to true which removes the top margin. The hero section also has a class of 'main-hero' which is used to apply specific styles for this particulat hero implementation."

                  isDisabled: false
                  isFullScreen: false
                  isReverse: true
                  containerFields:
                    inContainer: false
                    isAnimated: true
                    noMargin:
                      top: true
                      bottom: true
                    noPadding:
                      top: false
                      bottom: false
                    background:
                      isDark: true
                      color: ''
                      image: '/assets/images/sample4.jpg'
                      imageScreen: 'dark' # light, dark, none
                  text:
                    leadIn: ''
                    title: Welcome to Metalsmith 2025 Structured Content Starter
                    titleTag: 'h1'
                    subTitle: 'Component-Driven Web Development Without the Framework Overhead'
                    prose: Welcome to the Metalsmith2025 Structured Content Starter – a demonstration of how modern websites can be built using structured data and reusable components without relying on heavy Markdown content or complex JavaScript frameworks. This starter showcases a component-based approach to static site generation that prioritizes maintainability, consistency, and developer experience.
                  ctas:
                    - url: ''
                      label: ''
                      isButton: false
                      buttonStyle: 'link'
                  image:
                    src: ''
                    alt: ''
                    caption: ''

                - sectionType: composed
                  . . .

                - sectionType: text-only
                  . . .

                - sectionType: logos-list
                  . . .

                - sectionType: media-image
                  . . .

                - sectionType: banner
                  . . .
              ---         
              ```

              This is the sectioned page concept fully realized. The page template simply orchestrates these sections, rendering each in sequence. But the real magic happens behind the scenes.

              ## What Makes This Starter Different

              ### The Component Dependency Bundler

              Here's where things get interesting. Each component in the starter includes a `manifest.json` that declares its dependencies:

              ```json
              {
                "name": "hero",
                "type": "section",
                "styles": ["hero.css"],
                "scripts": [],
                "dependencies": ["ctas", "text", "image", "commons"],
                "validation": {...}
              }
              ```

              The [Metalsmith Bundled Components plugin](https://github.com/wernerglinka/metalsmith-bundled-components) scans the entire site, identifies which components are actually used, resolves the dependency graph, and creates optimized global CSS and JavaScript bundles containing only what you need. No manual asset management. No wondering if you're loading unused styles. It just works.

              This isn't per-page bundling (which would defeat browser caching). These are global files that load once on the first visit, then cache for instant subsequent page loads. We're using the platform's strengths, not fighting them.

              ### Component Architecture That Scales

              Every section follows a consistent pattern:

              ```
              lib/layouts/components/sections/hero/
              ├── hero.njk         # Template
              ├── hero.css         # Styles
              ├── hero.js          # Behavior (optional)
              ├── manifest.json    # Dependencies
              └── README.md        # Documentation (recommended)
              ```

              This co-location keeps everything about a component together. When you need to update the hero section, everything is in one place. No hunting through scattered directories. No guessing which styles affect what.

              ### Fluid Design Without Media Queries

              Here's something that excites me about this starter: it implements the [Utopia](https://utopia.fyi) approach to responsive design. Instead of juggling breakpoints and media queries, we use fluid design tokens that scale smoothly across all viewport sizes.

              **Traditional approach - brittle and steppy**
              ```css
              h1 {
                font-size: 24px;
              }
              @media (min-width: 768px) {
                h1 { font-size: 32px; }
              }
              @media (min-width: 1024px) {
                h1 { font-size: 48px; }
              }
              ```

              **Utopia approach - fluid and elegant**
              ```css
              h1 {
                font-size: clamp(1.5rem, 4vw + 1rem, 3rem);
              }
              ```

              The starter includes pre-configured fluid type scales and spacing systems. Your content automatically adapts to any screen size – not in jumpy steps, but in smooth, proportional scaling. 

              The design tokens handle everything:
              - **Typography**: Font sizes that scale proportionally
              - **Spacing**: Margins and padding that maintain visual rhythm
              - **Layout**: Container widths that respond naturally

              It's another example of using the platform's native capabilities instead of fighting them with complex abstractions.

              ### Built-in Intelligence

              With the Metalsmith Bundled Components plugin comes validation that catches common configuration errors before they become runtime problems:

              - Type checking (ensuring booleans are actual booleans, not strings)
              - Enum validation (checking that `buttonStyle` contains valid values)
              - Component existence verification
              - Dependency resolution warnings

              These aren't just nice-to-haves. They're the difference between "why isn't this working?" at 3 PM and going home on time.

              ## What Changes, What Stays the Same

              If you're coming from the simple starter or traditional Metalsmith setups, here's what to expect:

              ### What Changes

              **No Markdown Plugin**: Since all content lives in structured frontmatter, we don't process markdown bodies. Markdown prose in the YAML object is processed via a Nunjucks filter. This feels strange at first, but it's liberating once you embrace it.

              **Single Page Template**: Instead of `home.njk`, `about.njk`, `services.njk`, you have one `sections.njk` that orchestrates sections. This dramatically reduces template duplication.

              **Component-First Thinking**: You stop thinking about pages and start thinking about sections. Need a testimonial block? That's a section. Video with text? Another section. Hero with CTAs? Section.

              **Dependency Management**: No more manually managing which CSS and JavaScript files to include. The Metalsmith Bundled Components plugin handles everything automatically.

              ### What Stays the Same

              **The Metalsmith Pipeline**: Still the same time-less simplicity – read files, transform through plugins, write output. We're just transforming structured data instead of markdown.

              **Nunjucks Templates**: Your template knowledge transfers directly. Nothing changes; you're just working at the component level now.

              **Static Output**: You still get fast, secure, static HTML files. No server-side rendering, no client-side hydration. Just HTML, CSS, and JavaScript – exactly what browsers want.

              **File-Based Content**: Content still lives in files you can version control.

              ## The Developer Experience

              The starter includes everything you need for modern development:

              - **Live Reloading**: Change a component, see it instantly
              - **PostCSS Processing**: Autoprefixing and optimization built-in
              - **ESLint & Prettier**: Consistent code formatting
              - **Logical Organization**: Clear separation between content, components, and assets
              - **Pre-Deployment Tests**: Test before you build and commit

              But here's what I love most: it's all understandable. No webpack configs to decipher. No complex build pipeline to debug. Just a straightforward Metalsmith build file that you can read and modify.

              ## Real-World Ready

              This isn't a toy example. The starter includes:

              - **Multiple Section Types**: Hero, media-image, slider, testimonial, CTAs, and more
              - **Blog System**: Yes, even blogs work with structured content (using a prose section for long-form content)
              - **SEO Features**: Sitemap generation, robots.txt, meta tags
              - **404 Page**
              - **Production Optimizations**: HTML minification, asset optimization

              Everything you need to build a real website is already there.

              ## The Philosophy in Practice

              Remember our discussion about constraint-based creativity? The starter embodies this. Content creators get powerful, flexible sections to work with, but they can't accidentally break the layout or violate brand guidelines. Developers get clean, maintainable architecture without the complexity of modern frameworks.

              This is "use the platform" in action. We're not shipping megabytes of JavaScript to reconstruct HTML in the browser. We're delivering complete, semantic HTML with lightweight enhancements. The browser doesn't need React to display a hero section. It just needs HTML.

              ## Performance That Matters

              The numbers tell the story:

              - **Zero JavaScript by default** (components add only what they need)
              - **Single CSS file** (~30KB for this starter)
              - **Instant subsequent page assets** (everything's cached after first load)
              - **No hydration penalty** (DUH, it's static)

              Compare this to any modern framework-based static site generator. We're not even playing the same game.

              ## Getting Started

              Ready to try it yourself? 

              ```bash
              git clone https://github.com/wernerglinka/metalsmith2025-structured-content-starter my-site
              cd my-site
              npm install
              npm start
              ```

              Your site is running at `http://localhost:3000`. Open `src/index.md`, modify some sections, and watch the magic happen.

              ## What's Next

              In the [next post](/blog/metalsmith-redux-section-anatomy), we'll dive deep into the anatomy of section components – understanding how they're built, how data flows through them, and the patterns that make them so powerful. We'll dissect real components from the starter and see how the Metalsmith Bundled Components plugin works its magic.

              The shift from document-oriented to component-oriented content isn't just a technical change. It's a fundamental rethinking of how we build websites. The structured content starter makes this shift practical, providing a complete foundation for building modern sites without modern complexity.

              Questions about the starter or structured content? Find me on [Bluesky](https://bsky.app/profile/wernerglinka.bsky.social).

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
            url: "/blog/metalsmith-redux-introducing-structured-content-starter"
            socialTitle: "Metalsmith Redux: Introducing the Structured Content Starter"
            socialComment: "Transform how you build static sites with structured content. The Metalsmith2025 starter brings component architecture, smart dependency bundling, and fluid responsive design - no frameworks needed."

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
              - item: "introducing-metalsmith-mdn"
              - item: "javascript-framework-carousel"
              - item: "use-the-platform"
---
