---
layout: blocks.njk
pageType: "blog-post"
disableDefaultFooter: true
item: "11ty-accidental-abstraction" # used as a key for bloglist filters
scheduledDate: 2026-02-03

seo:
  title: From Metalsmith to Eleventy - The Accidental Abstraction | Werner Glinka
  description: "It turned out I hadn't created a Metalsmith component library. I'd created a Nunjucks component library that happened to run on Metalsmith."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1769563818/abstruction_yblu42.jpg"
  canonicalOverwrite: ""

blogTitle: "From Metalsmith to Eleventy - The Accidental Abstraction"
date: 2026-02-03
author: ""
image:
  src: "v1769563818/abstruction_yblu42.jpg"
  alt: "accidental abstraction"
  caption:
excerpt: "It turned out I hadn't created a Metalsmith component library. I'd created a Nunjucks component library that happened to run on Metalsmith."

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
        image: "v1769563818/abstruction_yblu42.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: "From Metalsmith to Eleventy"
              title: "The Accidental Abstraction"
              header: "h1"
              subtitle: ""
              prose: ""
            date: 2026-02-03

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
              People kept asking whether I'd looked at Eleventy. I hadn't, and I saw no reason to. Metalsmith worked. The component library worked. Why fix what wasn't broken?

              But eventually, out of curiosity, I tried porting the library to see what would happen.

              The port went faster than expected. Suspiciously fast. I kept waiting for the other shoe to drop—some fundamental incompatibility that would require too much rewriting. It never came. The components, all fifty-plus of them, rendered correctly on the first try. Not a single `{% if %}` or `{{ variable }}` needed modification.

              It turned out that I hadn't created a Metalsmith component library. I'd created a Nunjucks component library that ran on Metalsmith. Eleventy uses Nunjucks, too. The templating syntax, macros, includes, and filters are all identical accross the two platforms. The components were already platform-agnostic.

              ## What Makes a Component Portable

              Obviously, the components don't know which static site generator built the page. They receive data, apply logic and render HTML. A hero component gets a title, some prose, maybe a call-to-action configuration. It outputs markup. What Static Site Generator assembled that data is irrelevant to the template rendering it.

              This works because of a deliberate constraint: no SSG-specific code inside templates. The components are pure Nunjucks. They transform structured input into structured output. Everything platform-specific stays outside the component boundary.

              That boundary matters. Cross it, reference an Eleventy-specific global, assume Metalsmith's file structure, and portability breaks. Keep the components focused on their single job of rendering data to markup, and they work anywhere Nunjucks works.

              ## The Data Shape Problem

              The components ported cleanly. The data access patterns didn't.

              Components expect data under a data namespace: `data.products`, `data.artworks`, etc. That's the convention that keeps them portable across SSGs. Metalsmith passes data explicitly through its pipeline, and I'd structured it to arrive under data. Eleventy's data cascade works differently: files in `_data/` become globals named after the file. A file at `_data/products.json` becomes `products` in templates, not `data.products`.

              The solution: nest a `data/` directory inside `_data/`. Files at `_data/data/products.json` become accessible as `data.products`. The directory structure creates the expected namespace components. No component changes required, just organizing files to produce the right shape.

              For collections, there was more work. Eleventy collections need previous/next navigation between items, a main menu built from pages with navigation labels, breadcrumb trails. In Metalsmith, dedicated plugins handle these. For Eleventy, I wrote a normalization plugin that adds this functionality, previous and next references on collection items, a mainMenu collection, breadcrumb data for each page.

              With the data convention and normalization plugin in place, templates work unchanged across both SSGs.

              ## Pages as Structured Data

              The component architecture enforces a particular way of thinking about content. Pages aren't documents with embedded elements. They're compositions of reusable sections, defined entirely in frontmatter:

              ```yaml
              ---
              layout: sections.njk
              sections:
                - sectionType: hero
                  text:
                    title: Welcome
                    prose: A demonstration of structured content...
                  ctas:
                    - url: /about/
                      label: Learn More

                - sectionType: media-image
                  text:
                    title: How It Works
                    prose: Each section is self-contained...
                  image:
                    src: /assets/images/diagram.jpg
                    alt: Architecture diagram
              ---
              ```

              No markdown body. The page template iterates over sections, dynamically including the appropriate Nunjucks component for each. Hero, media block, testimonial, video embed—each is a section type with its own template, styles, and optional JavaScript.

              This changes how you think about content. You stop thinking about pages and start thinking about [composable pieces](https://nunjucks-components.com/blog/building-structured-pages/). Content creators get flexible building blocks. Developers get maintainable architecture. Neither side can accidentally break what the other built.

              The trade-off is rigidity. You can't write freeform markdown and have it render wherever it lands. You define sections with explicit properties, and components render them predictably. For marketing sites, landing pages, and structured content, this works well. For long-form writing, you use a prose section that accepts markdown—structure where you need it, flexibility where you don't.

              ## Co-location and Bundling

              Every component lives in its own directory with everything it needs:

              ```
              components/sections/hero/
              ├── hero.njk         # Template
              ├── hero.css         # Styles
              ├── hero.js          # Behavior (optional)
              ├── manifest.json    # Dependencies
              └── README.md        # Documentation
              ```

              No hunting through scattered directories. No guessing which styles affect what. Update the hero section, and everything about it is in one place.

              The manifest declares dependencies:

              ```json
              {
                "name": "hero",
                "type": "section",
                "styles": ["hero.css"],
                "scripts": [],
                "dependencies": ["ctas", "text", "image"]
              }
              ```

              A [bundler plugin](https://github.com/wernerglinka/eleventy-plugin-components-bundler) scans the site, identifies which components are actually used, resolves the dependency graph, and produces optimized CSS and JavaScript containing only what's needed. The Metalsmith version scans the build pipeline. The Eleventy version hooks into Eleventy's build process. Different implementations, identical output—the same abstraction pattern that makes the components themselves portable.

              ## What Transfers

              Architectural decisions are more durable than any single tool. Structured frontmatter, data-driven components, separation of content and presentation, co-located assets with manifest-driven bundling—these patterns don't belong to Metalsmith or Eleventy. They're approaches to building maintainable sites that happen to work on both platforms.

              The Nunjucks templates transfer directly. The mental model of pages as section compositions transfers. The habit of keeping platform-specific code outside component boundaries transfers. Even the build tooling transfers in concept, if not in implementation.

              When I wrote in the previous post that skills transfer between static site generators, this is what I meant. Not just general familiarity with the problem space, but specific, working code that runs in both environments. The investment doesn't evaporate when you change platforms. It travels with you.

              ## Trying It

              The component library and starters for both platforms are available:

              - [Eleventy Structured Content Starter](https://github.com/wernerglinka/eleventy-structured-content-starter)
              - [Metalsmith Structured Content Starter](https://github.com/wernerglinka/metalsmith2025-structured-content-starter)
              - [Normalized Collections Plugin for Eleventy](https://github.com/wernerglinka/eleventy-plugin-normalized-collections)
              - [Component Bundler for Eleventy](https://github.com/wernerglinka/eleventy-plugin-components-bundler)

              Clone the starter, run `npm install` and `npm start`, modify some sections in the frontmatter. The components don't care which generator you chose. They render HTML from data—exactly as they should.

              The next post walks through applying this to an actual migration: porting my art website from Metalsmith to Eleventy, including what broke and what the fixes revealed about each platform's assumptions.

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
            url: "/blog/11ty-accidental-abstraction/"
            socialTitle: "From Metalsmith to Eleventy - The Accidental Abstraction"
            socialComment: "It turned out I hadn't created a Metalsmith component library. I'd created a Nunjucks component library that happened to run on Metalsmith."
---
