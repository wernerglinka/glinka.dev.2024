---
layout: blocks.njk
draft: false
pageType: "blog-post"
disableDefaultFooter: true
item: "11ty-natural-progression" # used as a key for bloglist filters

seo:
  title: From Metalsmith to Eleventy - A Natural Progression | Werner Glinka
  description: "I recently rebuilt my art website using Eleventy, and I want to share why I made that shift and what it looked like in practice."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1769561388/progression_pnxbae.jpg"
  canonicalOverwrite: ""

blogTitle: "From Metalsmith to Eleventy - A Natural Progression"
date: 2026-01-27
author: ""
image:
  src: "v1769561388/progression_pnxbae.jpg"
  alt: ""
  caption:
excerpt: "I recently rebuilt my art website using Eleventy, and I want to share why I made that shift and what it looked like in practice."

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
        image: "v1769561388/progression_pnxbae.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "From Metalsmith to Eleventy"
              header: "h1"
              subtitle: "A Natural Progression"
              prose: ""
            date: 2026-01-27

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
              For the past several years, Metalsmith has been my static site generator of choice. I built client sites with it, created starters, wrote plugins, and lately published the "Metalsmith in 2025" blog series. Metalsmith taught me a lot about how static sites work under the hood, its transparent, pipeline-based architecture forces you to understand every step of the build process. It also helped keep my sanity amid the framework explosion that has inundated developers.

              That understanding doesn't go away when you move to a different tool. It travels with you.

              I recently rebuilt my [art website](https://wernerglinka.com) using Eleventy, and I want to share why I made that shift and what it looked like in practice.

              ## Why Move?

              Metalsmith is elegant. Its core idea—files in, transformations applied, files out—is as clean as it gets. But elegance alone doesn't sustain a project. The community has thinned, plugin maintenance has slowed, and I found myself solving problems that other ecosystems had addressed years ago.

              I wasn't looking to abandon Metalsmith. I was looking to apply what I'd learned somewhere with more momentum.

              Eleventy turned out to be that place. It shares Metalsmith's philosophy of transparency and simplicity, but with a larger community, active maintenance, and sensible defaults for the things I was rebuilding from scratch in every Metalsmith project.

              ## What Carried Over

              The component architecture I developed for Metalsmith—frontmatter-driven sections, co-located styles and scripts, dynamic template composition—wasn't tied to Metalsmith at all. It was a Nunjucks pattern that happened to run on Metalsmith.

              Porting it meant writing an Eleventy-compatible bundler plugin and adjusting some variable names. The components themselves, all fifty-plus of them, work in both environments. I've since published them as a standalone library at [nunjucks-components.com](https://nunjucks-components.com), available for any Nunjucks-based static site generator.

              The build pipeline I'd copied from project to project in Metalsmith? Most of it is built into Eleventy. Less to maintain, fewer decisions to make on each new project.

              ## What's Different

              Eleventy's data cascade takes some getting used to. In Metalsmith, you explicitly pass data through the pipeline and into templates. In Eleventy, data from `_data` files is available automatically in templates. This is convenient but requires understanding the cascade's inheritance rules.

              Nunjucks macro scope isolation works the same way—macros don't inherit template scope—but Eleventy's richer data environment means you think about it differently. I settled on passing a single context object to macros rather than long parameter lists, with data files organized under `_data/data/` to keep namespacing clean.

              ## What's Next

              This post is the first in a short series. I'll follow up with the story of how the component library turned out to be platform-agnostic—an accidental abstraction that made the migration possible—and then walk through the actual process of porting my art website, including building a bilingual version and implementing SEO using Eleventy's native capabilities.

              If you're a Metalsmith user wondering whether to explore other options: the skills transfer. The mental models transfer. You're not starting over; you're applying what you know in a new context.

              And if you're happily building with Metalsmith: keep going. It still works. The choice to move isn't about Metalsmith being wrong—it's about finding where the momentum is for the kind of work you want to do.

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
            url: "/blog/11ty-natural-progression/"
            socialTitle: "From Metalsmith to Eleventy - A Natural Progression"
            socialComment: "I recently rebuilt my art website using Eleventy, and I want to share why I made that shift and what it looked like in practice."
---
