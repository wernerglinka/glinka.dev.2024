---
layout: blocks.njk
draft: false
pageType: "blog-post"
disableDefaultFooter: true
item: "metalsmith-redux-section-anatomy" # used as a key for bloglist filters

seo:
  title: "Metalsmith Redux: The Anatomy of Section Components | Werner Glinka"
  description: "A look at real Metalsmith components to understand how they work, why they're designed this way, and the patterns that make them powerful. From configuration to templates to optimized bundles."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1756159080/section-components_e0bskl.jpg"
  canonicalOverwrite: ""

blogTitle: "Metalsmith Redux: The Anatomy of Section Components"
date: 2025-08-25
author: ""
image:
  src: "v1756159080/section-components_e0bskl.jpg"
  alt: ""
  caption:
excerpt: "A look at real Metalsmith components to understand how they work, why they're designed this way, and the patterns that make them powerful. From configuration to templates to optimized bundles."

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
        image: "v1756159080/section-components_e0bskl.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Metalsmith Redux: The Anatomy of Section Components"
              titleCase: false
              header: "h1"
              subtitle: ""
              prose: ""
            date: 2025-08-27

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
              In the [previous post](/blog/metalsmith-redux-introducing-structured-content-starter), we introduced the [Structured Content Starter](https://github.com/wernerglinka/metalsmith2025-structured-content-starter) and its component-based philosophy. Today, we're going to take a look a real components to understand how they work, why they're designed this way, and their patterns.

              If you've ever wondered how to build truly modular web pages without the complexity of modern frameworks, this is where theory meets practice. We'll examine actual components from the starter, understand the data flow, and see how the Metalsmith Bundled Components plugin orchestrates everything.

              ## The Component System Architecture

              Before we look into specific components, let's understand the system that makes them work. Each section component in our architecture consists of four interconnected parts:

              1. **Configuration Schema** (YAML in frontmatter)
              2. **Template** (Nunjucks)
              3. **Manifest** (dependency declaration)
              4. **Assets** (CSS, JavaScript when needed)

              These represent a separation of concerns that's been refined through building dozens of real websites. Content lives in configuration. Presentation lives in templates. Dependencies are listed in manifests. Behavior and styles live in assets.

              ## The Hero Component

              Let's start with the hero section – one of the most important components on any webpage. Here's a real hero section from the starter home page:

              ![](https://res.cloudinary.com/glinkaco/image/upload/v1756160021/header-example_iisbgz.jpg)


              ```yaml
              - sectionType: hero
                containerTag: section
                classes: 'first-section merge-with-next'
                id: ''
                description: "Landing page hero section"
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
                  imageScreen: 'dark'
                text:
                  leadIn: ''
                  title: "Welcome to Metalsmith 2025 Structured Content Starter"
                  titleTag: 'h1'
                  subTitle: 'Component-Driven Web Development Without the Framework Overhead'
                  prose: 'Welcome to the Metalsmith2025 Structured Content Starter – a demonstration of how modern websites...'
                ctas:
                  - url: ''
                    label: ''
                    isButton: true
                    buttonStyle: 'primary'
                image:
                  src: ''
                  alt: ''
                  caption: ''
              ```

              This might look like a lot, but every property has a purpose. Let's break it down.

              ### The Section Component Property Model

              Through building production sites, we've identified three distinct layers of component properties:

              **Section Identity**
              ```yaml
              sectionType: hero         # Which section template to use
              containerTag: section     # Semantic HTML element
              classes: 'first-section'  # Custom styling hooks
              id: 'main-hero'           # Anchor targeting
              description: "..."        # Documentation
              isDisabled: false         # Toggle without deletion
              ```

              These properties define what the section *is*. The `sectionType` is the only required property – it tells Metalsmith which template to use.

              **Container Behavior**
              ```yaml
              containerFields:
                inContainer: false     # Full-width background
                isAnimated: false      # Scroll-triggered animations
                noMargin:
                  top: true            # No margin to top of page
                  bottom: false        # Standard spacing below
                background:
                  isDark: true         # Light text on dark
                  image: '...'         # Background image
                  imageScreen: 'dark'  # Overlay for readability
              ```

              These control how the section *behaves* in the page flow. Notice how `inContainer: false` lets the background stretch edge-to-edge while keeping content centered. This is a common pattern for heroes and feature sections.

              **Functional Content**
              ```yaml
              text:
                title: "..."
                titleTag: 'h1'
                subTitle: "..."
                prose: "..."
              ctas:
                - url: "..."
                  label: "..."
              image:
                src: "..."
                alt: "..."
              ```

              This is the actual *content* – what users read and interact with. These properties map directly to template partials.

              ### The Template Implementation

              Now let's see how the template interprets this configuration:

              ```nunjucks
              {# hero.njk #}
              {% from "components/_partials/ctas/ctas.njk" import ctas %}
              {% from "components/_partials/text/text.njk" import text %}
              {% from "components/_partials/image/image.njk" import image %}

              <div class="hero-content">
                {% if section.text %}
                  <div class="hero-text flow">
                    {% if section.text %}
                      {{ text(section.text) }}
                    {% endif %}
                    {% if section.ctas | hasCtas > 0 %}
                      {{ ctas(section.ctas) }}
                    {% endif %}
                  </div>
                {% endif %}
                
                {% if section.image | hasImage %}
                  <div class="hero-image">
                    {{ image(section.image) }}
                  </div>
                {% endif %}
              </div>
              ```

              Notice the pattern: import partials, check for data, render conditionally. A hero works with just a title, or a title and image, or a full configuration. The template adapts.

              ### The Manifest Declaration

              Every component package includes a manifest that declares its dependencies:

              ```json
              {
                "name": "hero",
                "type": "section",
                "styles": ["hero.css"],
                "scripts": [],
                "dependencies": ["ctas", "text", "image", "commons"],
                "validation": {
                  "required": ["sectionType"],
                  "properties": {
                    "isFullScreen": { "type": "boolean" },
                    "isReverse": { "type": "boolean" },
                    "buttonStyle": { 
                      "enum": ["primary", "secondary", "outline", "link"] 
                    }
                  }
                }
              }
              ```

              The Metalsmith Bundled Components plugin reads this manifest and:
              1. Includes `hero.css` in the global bundle
              2. Resolves dependencies recursively (hero needs ctas, ctas needs buttons, etc.)
              3. Validates configuration at build time (For example, "false" is a string and always true, use `false`)
              4. Generates optimized bundles containing only used components

              ## Component Composition Patterns

              The real power emerges when components compose. Let's examine a media-image section to see advanced composition.

              ![](https://res.cloudinary.com/glinkaco/image/upload/v1756161502/media-image_vat0k2.jpg)

              ```yaml
              - sectionType: media-image
                containerTag: aside
                isReverse: false  # Image on left, text on right
                text:
                  leadIn: "and what is this?
                  title: "Media Section Example"
                  prose: "Example of media section with text and image..."
                ctas:
                  - url: "https://apple.com"
                    label: "go to apple"
                image:
                  src: "/assets/feature.jpg"
                  alt: "Feature demonstration"
              ```

              The media-image component reuses the same text, ctas, and image partials as the hero. But it arranges them differently:

              ```nunjucks
              {# media-image.njk #}
              <div class="media-image {% if section.isReverse %}is-reverse{% endif %}">
                {% if section.image %}
                  <div class="image">{{ image(section.image) }}</div>
                {% endif %}
                
                {% if section.text or section.ctas %}
                  <div class="text flow">
                    {{ text(section.text) }}
                    {{ ctas(section.ctas) }}
                  </div>
                {% endif %}
              </div>
              ```

              Same partials, different arrangement. The `isReverse` property flips the layout with a single CSS class. No template duplication.

              ## The Data Flow

              Understanding how data flows through the system is crucial:

              1. **Content Author** writes YAML configuration in frontmatter
              2. **Metalsmith** reads the file and parses the frontmatter
              3. **Page Template** (`sections.njk`) iterates through the sections array
              4. **Section Lookup** matches `sectionType` to the appropriate template
              5. **Template Rendering** processes the configuration through the template
              6. **Partial Functions** handle specific content types (text, images, CTAs)
              7. **HTML Output** is generated and written to disk

              At build time, the [Bundled Components plugin](https://github.com/wernerglinka/metalsmith-bundled-components) intercepts this flow to:
              - Validate configurations against schemas
              - Track component usage
              - Resolve dependency graphs
              - Generate optimized CSS/JS bundles

              ## Advanced Patterns

              ### Conditional Rendering

              Components adapt to available data:

              ```nunjucks
              {% if section.text %}
                <div class="prose flow">
                  {% if section.text.leadIn %}
                    <p class="lead-in">{{ section.text.leadIn }}</p>
                  {% endif %}
                  
                  {% if section.text.title %}
                    <{{ section.text.titleTag or 'h2' }}>
                      {{ section.text.title }}
                    </{{ section.text.titleTag or 'h2' }}>
                  {% endif %}
                  
                  {% if section.text.prose %}
                    {{ section.text.prose | markdown | safe }}
                  {% endif %}
                </div>
              {% endif %}
              ```

              Every element is optional. The component gracefully handles any combination.

              ### Container Control

              The container system provides sophisticated layout control:

              ```nunjucks
              {# In the page template #}
              {# section wrapper may be article, aside, section or div depending on section.containerTag setting #}
              <{{ section.containerTag }} id="{{ section.id }}"  {{ buildContainerAttributes(section) }}>

                {# if section has background add a background image #}
                {% if section.containerFields.background.image %}
                  <div class="background-image" style="background-image: url({{ section.containerFields.background.image }})"></div>
                {% endif %}

                {# section content #}
                {{ renderSection(section, navigation.breadcrumbs, data, collections, previous, next, urlPath) }}

                {% set containerTag = section.containerTag %}
              </{{ containerTag }}>
              ```

              This pattern lets any section have a full-width background while maintaining readable content width.

              ### Spacing Orchestration

              The margin/padding system creates visual rhythm:

              ```css
              .section {
                margin-top: var(--space-l);
                margin-bottom: var(--space-l);
              }

              .section.no-margin-top {
                margin-top: 0;
              }

              .section.no-margin-bottom {
                margin-bottom: 0;
              }

              .merge-with-next {
                margin-bottom: 0;
              }

              .merge-with-next + .section {
                margin-top: 0;
              }
              ```

              Sections can connect seamlessly or maintain breathing room. The configuration controls it all.

              ## Performance Implications

              This architecture isn't just about developer experience – it delivers exceptional performance:

              **Build-Time Optimization**: The Bundled Components plugin analyzes the entire site and creates optimal bundles. If you only use 5 of 20 available components, you only ship CSS for those 5.

              **Single Global Bundle**: Instead of per-page bundles (which defeat caching), we generate one CSS file and one JS file for the entire site. First page load gets everything. Subsequent pages are instant.

              **Progressive Enhancement**: Components work without JavaScript. Interactive features enhance the experience but aren't required. The platform (HTML/CSS) does the heavy lifting.

              **Zero Runtime Overhead**: No component framework. No virtual DOM. No hydration. Just HTML with styles and occasional JavaScript sprinkles.

              ## Component Development Workflow

              Building new components follows a predictable pattern:

              1. **Design the Data Model**: What configuration options does this component need?
              2. **Create the Template**: How should this data render to HTML?
              3. **Write the Styles**: How should it look?
              4. **Declare Dependencies**: What partials does it use?
              5. **Add Validation**: What constraints should be enforced?
              6. **Document Usage**: How do content authors use it?

              Let's say we need a testimonial component:

              ![](https://res.cloudinary.com/glinkaco/image/upload/v1756162163/testimonial-example_hy9art.jpg)

              ```yaml
              # Configuration model
              - sectionType: testimonial
                containerTag: aside
                classes: ''
                id: ''
                isDisabled: false
                isReverse: false
                containerFields:
                  inContainer: false
                  isAnimated: true
                  noMargin:
                    top: true
                    bottom: false
                  noPadding:
                    top: false
                    bottom: false
                  background:
                    color: 'lightgray'
                    image: ''
                    imageScreen: 'none' # light, dark, none
                quote:
                  text: "You've got to be very careful if you don't know where you are going, because you might not get there."
                  cite: 'https://en.wikipedia.org/wiki/Yogi_Berra'
                quotee:
                  portrait:
                    src: '/assets/images/yogi-berra-baseball-great.jpg'
                    alt: "Lawrence Peter 'Yogi' Berra"
                  name: 'Yogi Berra'
                  title: 'Baseball Great'
                  company: 'New York Yankees'
                  logo: '/assets/images/new-york-yankees-logo.svg'
              ```

              ```nunjucks
              {# testimonial.njk #}
              {% from "components/_partials/ctas/ctas.njk" import ctas %} {% from "components/_partials/text/text.njk" import text %}
              {% from "components/_partials/image/image.njk" import image %}

              <div class="testimonial content container {% if section.isReverse %}is-reverse{% endif %}">
                <div class="quotee">
                  {% if section.quotee.portrait.src %}
                  <div class="portrait">{{ image(section.quotee.portrait)}}</div>
                  {% endif %}

                  <div class="name">{{ section.quotee.name }}</div>

                  {% if section.quotee.title %}
                  <div class="title">{{ section.quotee.title }}</div>
                  {% endif %} {% if section.quotee.company %}
                  <div class="company">{{ section.quotee.company }}</div>
                  {% endif %} {% if section.quotee.logo %}
                  <div class="logo">
                    <img src="{{ section.quotee.logo }}" alt="{{ section.quotee.company }}" />
                  </div>
                  {% endif %}
                </div>

                <blockquote cite="{{ section.quote.cite }}">
                  <p>{{ section.quote.text }}</p>
                </blockquote>
              </div>
              ```

              ```json
              // manifest.json
              "name": "testimonial",
              "type": "section",
              "styles": ["testimonial.css"],
              "scripts": [],
              "requires": ["ctas", "text", "image", "commons"],
              "validation": {
                "required": ["sectionType"],
                "properties": {
                  "sectionType": {
                    "type": "string",
                    "const": "testimonial"
                  },
                  "isReverse": {
                    "type": "boolean"
                  }
              ```

              Component complete! It automatically integrates with the build system, gets validated, and contributes to the global bundle.

              ## Key Principles

              This component architecture embodies several key principles:

              **Separation of Concerns**: Content, presentation, and behavior are cleanly separated. Content authors never touch code. Developers rarely touch content.

              **Composition Over Inheritance**: Components compose from smaller partials rather than extending base classes. This creates more flexible, maintainable systems.

              **Platform-First**: We use the web platform's native capabilities rather than reinventing them. HTML for structure, CSS for presentation, JavaScript for enhancement.

              ## What's Next

              In the next post, we'll explore the Metalsmith Bundled Components plugin in detail – how it traces dependencies, validates configurations, and generates optimized bundles.

              The component-based approach isn't just a different way to build pages – it's a fundamental shift in how we think about web content. By treating pages as compositions of reusable sections, we create systems that are both more powerful and simpler to maintain.

              Want to explore the components yourself? Check out the [Component Library](https://ms-components-library.netlify.app/) or experiment with the [Structured Content Starter](https://github.com/wernerglinka/metalsmith2025-structured-content-starter).

              Questions or insights to share? Find me on [Bluesky](https://bsky.app/profile/wernerglinka.bsky.social).

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
            url: "/blog/metalsmith-redux-section-anatomy"
            socialTitle: "Metalsmith Redux: The Anatomy of Section Components"
            socialComment: "A look at real Metalsmith components to understand how they work, why they're designed this way, and the patterns that make them powerful. From configuration to templates to optimized bundles."

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
              - item: "metalsmith-redux-introducing-structured-content-starter"
              - item: "metalsmith-redux-building-better-webpages"
              - item: "use-the-platform"
---
