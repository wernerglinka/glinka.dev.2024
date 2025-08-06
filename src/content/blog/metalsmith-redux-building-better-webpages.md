---
layout: blocks.njk
draft: false
pageType: "blog-post"
disableDefaultFooter: true
item: "metalsmith-redux-building-better-webpages" # used as a key for bloglist filters

seo:
  title: "Beyond Markdown: Building Sectioned Webpages | Werner Glinka"
  description: "Instead of starting with content and adding MDN components, what if we began with components and composed them into pages?"
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1750533169/building-better-webpages_didfcs.jpg"
  canonicalOverwrite: ""

blogTitle: "Beyond Markdown: Building Sectioned Webpages"
date: 2025-06-23
author: ""
image:
  src: "v1750533169/building-better-webpages_didfcs.jpg"
  alt: ""
  caption:
excerpt: "Instead of starting with content and adding MDN components, what if we began with components and composed them into pages?"

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
        image: "v1750533169/building-better-webpages_didfcs.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Beyond Markdown"
              titleCase: false
              header: "h1"
              subtitle: "Building Sectioned Webpages"
              prose: ""
            date: 2025-06-23

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
              In my [previous post about MDN](/blog/metalsmith-redux-beyond-markdown), we explored how to embed structured components within Markdown content. While this approach works well for blog posts and content-heavy pages, it also shows the limitations when treating pages as documents with embedded components rather than compositions of reusable elements.

              What if we flipped these two scenarios? Instead of starting with content and adding components, what if we began with components and composed them into pages?

              This shift leads to"sectioned pages," a [component-first approach](https://metalsmith-components.netlify.app/) that transforms website building while solving real problems that limit traditional static site workflows.

              ## The Issue with Traditional Approaches
              Traditionally,  static site generators build pages with frontmatter for metadata and a markdown body for content. This works for blogs and documentation sites but falls short when building websites that require rich, varied layouts.

              Consider a typical company homepage. It might include a hero section with background image, headline, subtext, and call-to-action, a features grid showcasing product benefits, a testimonial carousel with customer quotes, and a media section with video and descriptive text. Each of these elements requires different markup, styling, and behavior patterns.

              With markdown, you need to compromise. You can embed HTML directly in your markdown files, making them difficult to edit and maintain. Alternatively, you can create separate templates for each page type, which leads to template explosion and duplicated code whenever you need slight variations.

              Even the MDN approach we explored previously, while powerful for content-heavy pages, becomes unwieldy when every section of a page needs different configuration. You end up with front matter, consisting mainly of component configurations with very little markdown content.

              All this doesn't scale well, nor does it provide any implementation flexibility.

              ## The Sectioned Page Solution
              Sectioned pages solve this by treating the page as a composition of reusable components rather than a single content block. Instead of a markdown body, the entire page structure lives in structured frontmatter as a collection of sections.

              Here's what a sectioned page looks like:

              ```yaml
              ---
              layout: sections.njk
              bodyClasses: "home"
              bodyBackgroundImage: "components-background.jpg"

              seo:
                title: My example page
                description: "Showing our sectioned approach"
                socialImage: "my-social-image.jpg"
                canonicalOverwrite: ""

              sections:
                - section: home-banner
                  # section properties here
                
                - section: intro
                  # section properties here
                
                - section: media
                  # section properties here
              ---
              ```

              Each section defines a self-contained component with its configuration, styling, and behavior. The page becomes a composition of these sections rather than a monolithic template. This architectural shift transforms web content from static documents to dynamic compositions. We will dissect this in more detail in the next section.

              Notice there's no markdown body at all. The entire page is defined through structured data, which opens up possibilities we'll explore in future posts about headless content management.

              ## Why This Changes Everything
              ### For Developers: Architecture That Scales
              The sectioned approach follows solid software engineering principles that experienced developers will recognize. Each component has a single responsibility, handling one specific layout pattern without trying to be everything to everyone. A hero section handles hero layouts, a features grid handles feature displays, a testimonial section handles testimonials, and nothing more.

              Frontmatter objects provide structured content for page section components. A section encapsulates its functionality, including templates, styles, and behavior, and it is self-contained and reusable. It's designed to be a building block that can be used on different website pages or even in other projects without needing to be rewritten or reconfigured each time.

              A media section component can be used across dozens of pages with different content but consistent styling and behavior. **Instead of maintaining dozens of specialized page templates, you maintain a smaller set of well-designed components that can be combined in countless ways**.

              This becomes even more powerful when combined with the component bundling approach I'll detail in an upcoming post. Each section can include its own CSS and JavaScript, with automatic dependency resolution ensuring everything loads in the correct order without conflicts.

              ### For Content Creators: Constrained Creativity
              Here's where the sectioned approach gets interesting, and where many developers miss the crucial insight. Rather than giving editors unlimited creative freedom, which often leads to brand chaos, you provide them with a curated set of professionally designed sections.

              They can build any page they need (using approved sections), but the individual pieces are engineered to work together correctly. The creative constraint enables better outcomes because editors can focus on their strengths: content, messaging, and storytelling, rather than wrestling with design decisions they're not equipped to make.

              This prevents the "inner designer" problem that plagues visual page builders. I've had many clients come to me to fix sites where marketing teams were given too much creative control through drag-and-drop builders. Given the tools, every person discovers their inner designer, which invariably leads to chaos. Pages have different font sizes, inconsistent spacing, clashing colors, and components that break on mobile.

              With sectioned pages, every section comes pre-built with consistent typography and spacing, responsive design that works on all devices, brand-compliant colors and styling, built-in accessibility features, and performance optimizations already handled.

              An editor can choose a media section and configure the image, headline, and CTA text. Still, they cannot accidentally break the layout by making the headline Comic Sans or creating a hover effect that doesn't work on mobile.

              ### For Organizations: The Best of Both Worlds
              Developers get clean, maintainable code architecture with version control, fast and secure static site deployment, componentized reusable code, and predictable performance characteristics.
              Content creators get an editing experience without fear of breaking the site, the ability to focus on content rather than code, immediate visual feedback, and flexibility within guardrails.
              Organizations get consistent brand expression across all pages, faster editing times for new content, reduced maintenance overhead, better site performance and security, and scalable content workflows.
              The constraint-based approach means brand guidelines are enforced at the architectural level rather than relying on training and documentation that gets forgotten under deadline pressure.

              ## The Technical Implementation
              The beauty of sectioned pages lies in their simplicity. Building a page becomes straightforward by parsing the frontmatter to extract the sections array, iterating through each section in your template, rendering each section using its corresponding component template, and combining the rendered sections into the final page.
              In Nunjucks, this orchestration might look like:

              ```nunjucks
              {% for section in sections %}
                {% if not section.disabled %}
                  {% include "components/" + section.component + ".njk" %}
                {% endif %}
              {% endfor %}
              ```

              Each component template handles its own styling, structure, and behavior, while the page template simply orchestrates its composition. This separation of concerns means components can be developed, tested, and maintained independently while still working together.

              The approach scales naturally as your site grows. Adding a new section type means creating a single new component template. That component immediately becomes available across your entire site. Updating the styling or behavior of a section type updates it everywhere.

              ### Practical Example: From Traditional to Sectioned

              Let's see how this works in practice. A traditional approach might have separate templates for different page types:

              ```
              templates/
              ├── home.njk           # Custom homepage layout
              ├── about.njk          # About page layout
              ├── services.njk       # Services page layout
              └── contact.njk        # Contact page layout
              ```

              Each template contains mostly duplicated code with slight variations. Adding a new page type means creating another template.
              With sectioned pages, you have:

              ```
              templates/
              ├── default.njk        # Single page template
              └── components/
                  ├── hero.njk       # Hero section
                  ├── features.njk   # Features grid
                  ├── testimonial.njk # Testimonial block
                  ├── media.njk      # Media section
                  └── contact.njk    # Contact form
              ```

              Now, any page can use any combination of these sections. A homepage might use hero + features + testimonial. An about page might use hero + media + contact. A services page might use hero + features + media. The combinations are limitless, but each piece is professionally designed and thoroughly tested.

              This sectioned approach builds on what we've discussed in the Metalsmith Redux series. We started with basic templating and moved to structured content with MDN, and now we're seeing how to architect entire sites around reusable components.

              In the next post, I'll introduce the Metalsmith2025 Structured Content Starter, which demonstrates these concepts in a complete, working project. You'll see how sectioned pages work in practice and get hands-on experience building component-based sites.

              Would you like to see more examples of how MDN can be used in your Metalsmith projects? Let me know on [Bluesky](https://bsky.app/profile/wernerglinka.bsky.social).

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
            url: "/blog/metalsmith-redux-beyond-markdown"
            socialTitle: "Beyond Markdown: Adding Structured Components with Metalsmith MDN"
            socialComment: "MDN is a Metalsmith plugin that provides a simple way to include structured Nunjucks components directly within your Markdown content"

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
---
