---
layout: blocks.njk
pageType: "blog-post"
disableDefaultFooter: true
item: "11ty-adding-seo" # used as a key for bloglist filters
scheduledDate: 2026-02-24

seo:
  title: From Metalsmith to Eleventy - SEO Without External Dependencies | Werner Glinka
  description: "The bilingual site needed proper SEO. In Eleventy, template-driven generation can accomplish everything—SEO markup is just HTML with specific patterns."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1769621902/seo_wnlrii.jpg"
  canonicalOverwrite: ""

blogTitle: "From Metalsmith to Eleventy - SEO Without External Dependencies"
date: 2026-02-24
author: ""
image:
  src: "v1769621902/seo_wnlrii.jpg"
  alt: ""
  caption:
excerpt: "The bilingual site needed proper SEO. In Eleventy, template-driven generation can accomplish everything—SEO markup is just HTML with specific patterns."

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
        image: "v1769621902/seo_wnlrii.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: "From Metalsmith to Eleventy"
              title: "SEO Without External Dependencies"
              header: "h1"
              subtitle: ""
              prose: ""
            date: 2026-02-24

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
              The bilingual site needed proper SEO: meta tags, Open Graph for social sharing, structured data for search engines, an hreflang-optimized sitemap, and the usual robots.txt. In Metalsmith, I'd used a dedicated SEO plugin that handled most of this. In Eleventy, I wanted to see what template-driven generation could accomplish.

              The answer: everything. SEO markup is just HTML with specific patterns. Templates generate HTML. The fit is natural.

              ## The Frontmatter Contract

              Each page can override site-wide defaults through an `seo` object in frontmatter:

              ```yaml
              seo:
                title: 'Object 2007.01.001'
                description: 'A circular wreath-like form from interlocking metal strips.'
                socialImage: '/assets/images/artworks/2007/2007.01.001.jpg'
                alternate:
                  de: /de/werke/2007.01.001/
                schemaType: VisualArtwork
                artMedium: 'Mixed media assemblage'
                dateCreated: '2007'
              ```

              The fallback chain mirrors what the Metalsmith plugin did: check `seo.title`, fall back to `site.title`. Check `seo.description`, fall back to `site.description`. The logic lives in the head template rather than a plugin, but the pattern is the same.

              ## Meta Tags and Canonicals

              The head template handles the basics:

              ```nunjucks
              {% set baseUrl = site.url | replace(r/\/$/, '') %}
              {% set canonicalUrl = seo.canonicalURL if seo.canonicalURL else baseUrl + page.url %}

              <link rel="canonical" href="{{ canonicalUrl }}" />
              <title>{{ seo.title if seo.title else site.title }}</title>
              <meta name="description" content="{{ seo.description if seo.description else site.description }}" />
              ```

              Page-specific values when available; site defaults when not. The canonical URL strips trailing slashes from the site URL to avoid double-slash problems, then appends the page path.

              ## Open Graph and Twitter Cards

              Social platforms need their own tags. Open Graph covers Facebook and LinkedIn; Twitter Cards handle Twitter's preview format. Both follow the same fallback pattern:

              ```nunjucks
              <meta property="og:title" content="{{ seo.title if seo.title else site.title }}" />
              <meta property="og:description" content="{{ seo.description if seo.description else site.description }}" />
              <meta property="og:image" content="{{ baseUrl }}{{ seo.socialImage if seo.socialImage else site.defaultImage }}" />
              <meta property="og:url" content="{{ canonicalUrl }}" />
              <meta property="og:type" content="website" />

              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:title" content="{{ seo.title if seo.title else site.title }}" />
              <meta name="twitter:image" content="{{ baseUrl }}{{ seo.socialImage if seo.socialImage else site.defaultImage }}" />
              ```

              For an art site, `summary_large_image` makes sense; the artwork images deserve prominent display in social previews. The image paths require the whole base URL because social platforms fetch them from external servers.

              ## hreflang Tags

              The `seo.alternate` data from the i18n implementation serves double duty here. The language switcher uses it for navigation; the head template uses it for search engine hints:

              ```nunjucks
              {% if seo.alternate %}
                <link rel="alternate" hreflang="{{ lang | default('en') }}" href="{{ baseUrl + page.url }}" />
                {% for langCode, altPath in seo.alternate %}
                  <link rel="alternate" hreflang="{{ langCode }}" href="{{ baseUrl + altPath }}" />
                {% endfor %}
                {% if lang == 'de' %}
                  <link rel="alternate" hreflang="x-default" href="{{ baseUrl + seo.alternate.en }}" />
                {% else %}
                  <link rel="alternate" hreflang="x-default" href="{{ baseUrl + page.url }}" />
                {% endif %}
              {% endif %}
              ```

              The `x-default` tag points to English as the fallback for users whose language isn't explicitly supported. Each page declares its alternate, and the template generates the complete set of hreflang references from that single source.

              ## Structured Data with JSON-LD

              Search engines understand structured data. For an art site, the VisualArtwork schema tells Google exactly what kind of content it's indexing: artwork title, medium, creation date, and creator information.

              The schema type comes from frontmatter. A separate template generates the appropriate JSON-LD based on that type:

              ```nunjucks
              {% if seo.schemaType == 'VisualArtwork' %}
              {
                "@context": "https://schema.org",
                "@type": "VisualArtwork",
                "name": "{{ seo.title }}",
                "description": "{{ seo.description }}",
                "url": "{{ canonicalUrl }}",
                "image": "{{ baseUrl }}{{ seo.socialImage if seo.socialImage else site.defaultImage }}",
                "creator": {
                  "@type": "Person",
                  "name": "{{ site.siteOwner }}",
                  "sameAs": {{ site.organization.sameAs | dump }}
                },
                "artMedium": "{{ seo.artMedium }}",
                "dateCreated": "{{ seo.dateCreated }}"
              }
              {% elif seo.schemaType == 'Article' %}
                {# Article schema for blog posts #}
              {% else %}
                {# Default WebPage schema #}
              {% endif %}
              ```

              The `dump` filter safely escapes the `sameAs` array as JSON. Each artwork page includes schema markup that describes it as a visual artwork and specifies its properties. Studio notes get Article schema. The homepage receives the Website schema. The type drives the output.

              ## The Sitemap

              The sitemap is a Nunjucks template that outputs XML. It loops through all pages, excludes drafts, calculates priority based on URL depth, and includes hreflang references for multilingual pages:

              ```nunjucks
              ---
              permalink: /sitemap.xml
              eleventyExcludeFromCollections: true
              ---
              <?xml version="1.0" encoding="UTF-8"?>
              <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
                      xmlns:xhtml="http://www.w3.org/1999/xhtml">
              {% for page in collections.all %}
              {% if not page.data.draft and not page.data.eleventyExcludeFromCollections %}
                <url>
                  <loc>{{ baseUrl }}{{ page.url }}</loc>
                  <lastmod>{{ page.date | isoDate }}</lastmod>
                  <priority>{{ page.url | calculatePriority }}</priority>
                  {% if page.data.seo.alternate %}
                  <xhtml:link rel="alternate" hreflang="{{ page.data.lang | default('en') }}" href="{{ baseUrl }}{{ page.url }}" />
                  {% for langCode, altPath in page.data.seo.alternate %}
                  <xhtml:link rel="alternate" hreflang="{{ langCode }}" href="{{ baseUrl }}{{ altPath }}" />
                  {% endfor %}
                  {% endif %}
                </url>
              {% endif %}
              {% endfor %}
              </urlset>
              ```

              Priority calculation is a simple filter: homepage gets 1.0, root-level pages get 0.8, deeper pages get progressively lower values. The hreflang links in the sitemap mirror those in the page heads—search engines can discover language relationships from either source.

              ## Robots.txt

              The simplest template:

              ```nunjucks
              ---
              permalink: /robots.txt
              eleventyExcludeFromCollections: true
              ---
              User-agent: *
              Allow: /

              Sitemap: {{ site.url }}sitemap.xml
              ```

              It allows all crawlers to access the sitemap. Nothing clever needed.

              ## What Templates Provide

              Every piece of SEO markup follows the same pattern: structured data in the frontmatter, fallbacks to site configuration, and templates that generate the appropriate output. No build-time plugins processing files. No runtime JavaScript. Just templates producing HTML and XML.

              This approach has tradeoffs. A dedicated SEO plugin might validate your markup, warn about missing descriptions, or generate default values more intelligently. Template-driven generation puts that responsibility on you. You need to understand what the markup should look like and ensure your frontmatter includes it.

              For this site, that tradeoff works well. The SEO requirements are clear, the content is structured, and the templates produce exactly what's needed. The thirty-two artwork pages each got `schemaType: VisualArtwork` and `artMedium` properties in a single batch edit. The markup is generated correctly because the templates are valid.

              ## The Complete Picture

              Five posts, one migration. From Metalsmith's explicit pipelines to Eleventy's convention-driven builds. A component library that proved platform-agnostic. A real site ported. Bilingual support using native capabilities plus some custom logic. SEO through templates rather than plugins.

              The skills transferred. The components transferred. The mental model of static sites as data transformation pipelines—files in, processing applied, files out—transferred most of all. Metalsmith taught me that model explicitly. Eleventy uses it implicitly. Understanding one made learning the other feel like recognition rather than discovery.

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
            url: "/blog/11ty-adding-seo/"
            socialTitle: "From Metalsmith to Eleventy - SEO Without External Dependencies"
            socialComment: "The bilingual site needed proper SEO. In Eleventy, template-driven generation can accomplish everything—SEO markup is just HTML with specific patterns."
---
