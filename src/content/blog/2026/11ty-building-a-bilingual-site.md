---
layout: blocks.njk
pageType: "blog-post"
disableDefaultFooter: true
item: "11ty-building-a-bilingual-site" # used as a key for bloglist filters
scheduledDate: 2026-02-17

seo:
  title: From Metalsmith to Eleventy - Building a Bilingual Site | Werner Glinka
  description: "With the art website running on Eleventy, I wanted to add something I'd never implemented in Metalsmith: a full bilingual version with proper language switching and SEO markup."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1769563808/bilingual_cyinvv.jpg"
  canonicalOverwrite: ""

blogTitle: "From Metalsmith to Eleventy - Building a Bilingual Site"
date: 2026-02-17
author: ""
image:
  src: "v1769563808/bilingual_cyinvv.jpg"
  alt: ""
  caption:
excerpt: "With the art website running on Eleventy, I wanted to add something I'd never implemented in Metalsmith: a full bilingual version with proper language switching and SEO markup."

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
        image: "v1769563808/bilingual_cyinvv.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: "From Metalsmith to Eleventy"
              title: "Building a Bilingual Site"
              header: "h1"
              subtitle: ""
              prose: ""
            date: 2026-02-17

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
              With the [art website](https://www.wernerglinka.com/) running on Eleventy, I wanted to add something I'd never implemented in Metalsmith: a full bilingual version. English and German, with proper language switching, localized navigation, and the SEO markup that search engines expect for multilingual content.

              Eleventy has built-in i18n support. Rather than reaching for third-party plugins, I wanted to see how far the native capabilities would take me and where I'd need to build custom solutions.

              ## The Directory Approach

              There are several ways to structure multilingual content. URL parameters (`?lang=de`), subdomains (`de.example.com`), or directory prefixes (`/de/`). I chose directories because they keep English URLs clean—no `/en/` prefix on the default language—while providing clear separation for German content.

              The structure mirrors itself:

              ```
              src/
                index.md              # English homepage (/)
                about.md              # English about (/about/)
                works.md              # English works (/works/)
                de/
                  de.json             # Sets lang: de for all pages in this directory
                  index.md            # German homepage (/de/)
                  über.md            # German about (/de/über/)
                  werke.md            # German works (/de/werke/)
              ```

              German URLs use German words where appropriate: `über` instead of `about`, `werke` instead of `works`. Artwork pages retain their catalog numbers as filenames because they are language-neutral identifiers.

              Eleventy's i18n plugin provides the foundation. A `de.json` file in the German directory sets `lang: de` for every page beneath it. English pages inherit the default `lang: en` from the plugin configuration. The HTML `lang` attribute sets itself correctly without per-page configuration.

              ## Language-Aware Navigation

              The first problem: the main menu showed items from both languages. Home, Works, About appeared alongside Startseite, Werke, Über. The navigation component was collecting every page with a `navLabel`, regardless of language.

              I could have created separate menu collections for each language, but that would have meant duplicating the collection logic and maintaining synchronization. Instead, I filter in the template. The menu collection contains everything; the navigation macro displays only items that match the current page's language context.

              The filter checks URL prefixes. If the current page URL starts with `/de/`, show only menu items whose paths also start with `/de/`. Otherwise, show items without that prefix:

              ```nunjucks
              {% set isGerman = urlPath and urlPath.substring(0, 4) == '/de/' %}

              {% for item in mainMenu %}
                {% set itemIsGerman = item.path and item.path.substring(0, 4) == '/de/' %}
                {% if itemIsGerman == isGerman %}
                  <li><a href="{{ item.path }}">{{ item.title }}</a></li>
                {% endif %}
              {% endfor %}
              ```

              Simple string comparison. No language detection libraries, no complex locale handling. The URL structure carries the language information; the template uses it.

              ## Breadcrumbs Across Languages

              Breadcrumbs presented a subtler problem. The breadcrumb plugin generates crumbs starting with "Home" at `/`. For a German page at `/de/über/`, this produced: Home → Startseite → Über. The first crumb linked to the English homepage.

              For German pages, `/de/` serves as the homepage. The root `/` crumb shouldn't appear. The fix: skip the root crumb when rendering breadcrumbs on German pages.

              ```nunjucks
              {% for crumb in breadcrumbs %}
                {% if not (crumb.path == '/' and isGerman) %}
                  <li><a href="{{ crumb.path }}">{{ crumb.title }}</a></li>
                {% endif %}
              {% endfor %}
              ```

              German breadcrumbs now start at Startseite. English breadcrumbs work as before—same component, conditional logic based on language context.

              ## The Language Switcher

              Users need a way to switch languages. The switcher appears in the header, showing available languages and linking to the equivalent page in each language.

              The challenge: URL paths differ between languages. `/about/` doesn't map to `/de/about/`, it maps to `/de/über/`. The switcher can't just swap URL prefixes; it needs explicit mappings.

              I solved this with frontmatter. Each page declares its alternate language version:

              ```yaml
              # In about.md
              seo:
                alternate:
                  de: /de/über/

              # In de/über.md  
              seo:
                alternate:
                  en: /about/
              ```

              The same `seo.alternate` data serves two purposes: the language switcher uses it to build navigation links, and the head template uses it to generate hreflang tags for search engines—a single source of truth.

              The switcher template reads these alternate URLs and sets them as data attributes:

              ```nunjucks
              {% for lang in languages %}
                {% set langUrl = alternates[lang.code] %}
                <li data-lang="{{ lang.code }}" data-url="{{ langUrl }}">
                  <a href="{{ langUrl }}">{{ lang.label }}</a>
                </li>
              {% endfor %}
              ```

              JavaScript handles the interaction, stores the user's preference in localStorage, and navigates to the appropriate URL. If an explicit alternate URL exists in frontmatter, use it. Otherwise, fall back to path manipulation for pages with identical structures in both languages.

              ## Collections Per Language

              Blog-style content needs separate collections. English studio notes live in `src/studio-notes/`. German studio notes live in `src/de/studio-notizen/`. Each needs its own collection for proper previous/next navigation and index page rendering.

              The Eleventy configuration defines both:

              ```javascript
              eleventyConfig.addPlugin(normalizedCollections, {
                collections: {
                  'studio-notes': {
                    glob: 'src/studio-notes/*.md',
                    sortBy: 'card.date',
                    sortOrder: 'desc'
                  },
                  'studio-notizen': {
                    glob: 'src/de/studio-notizen/*.md',
                    sortBy: 'card.date',
                    sortOrder: 'desc'
                  }
                }
              });
              ```

              German pages reference the German collection in their navigation sections. The `collection-links` component receives `collectionName: 'studio-notizen'` and renders links within the correct language context.

              ## Content Translation

              The page structure stays identical between languages. Only the prose content and labels change:

              ```yaml
              # English
              navigation:
                navLabel: 'About'
              sections:
                - sectionType: text-only
                  text:
                    title: 'About My Work'
                    prose: |-
                      Werner Glinka is a mixed media artist...

              # German
              navigation:
                navLabel: 'Über'
              sections:
                - sectionType: text-only
                  text:
                    title: 'Über meine Arbeit'
                    prose: |-
                      Werner Glinka ist ein Mixed-Media-Künstler...
              ```

              The components don't know or care which language they're rendering. They receive text properties and output HTML. Translation is a content concern, not a component concern.

              ## What Eleventy Provides

              The i18n plugin handles language identification through directory-based JSON files. The data cascade makes language-specific data available without explicit wiring. The build process handles both language trees without special configuration.

              What I built on top: navigation filtering, breadcrumb adjustments, a language switcher with frontmatter-driven URL mapping, and per-language collections. These aren't complex; each is a focused piece of template logic or configuration. But they're necessary because internationalization touches many parts of a site simultaneously.

              The combination works well. Eleventy provides the foundation; custom logic handles the specifics of how this particular site structures its bilingual content.

              The final post covers SEO implementation—the hreflang tags that connect to the language switcher data, plus structured data, sitemaps, and meta tags using Eleventy's templating rather than external plugins.

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
            url: "/blog/11ty-building-a-bilingual-site/"
            socialTitle: "From Metalsmith to Eleventy - Building a Bilingual Site"
            socialComment: "With the art website running on Eleventy, I wanted to add something I'd never implemented in Metalsmith: a full bilingual version with proper language switching and SEO markup."
---
