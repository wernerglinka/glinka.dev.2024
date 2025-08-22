---
layout: blocks.njk
draft: false
pageType: "blog-post"
disableDefaultFooter: true
item: "Metalsmith SEO-plugin" # used as a key for bloglist filters

seo:
  title: "Introducing Metalsmith SEO: The Complete SEO Solution for Metalsmith | Werner Glinka"
  description: "The Metalsmith SEO plugin automatically generates HTML meta tags, Open Graph properties, Twitter Cards, JSON-LD structured data, a rotos.txt file and a sitemaps from a single source of truth."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1755896007/seo-plugin_k6qaki.jpg"
  canonicalOverwrite: ""

blogTitle: "Introducing Metalsmith SEO"
date: 2025-08-23
author: ""
image:
  src: "v1755896007/seo-plugin_k6qaki.jpg"
  alt: ""
  caption:
excerpt: "The Metalsmith SEO plugin automatically generates HTML meta tags, Open Graph properties, Twitter Cards, JSON-LD structured data, a rotos.txt file and a sitemaps from a single source of truth."

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
        image: "v1755896007/seo-plugin_k6qaki.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Introducing Metalsmith SEO: One Plugin does it all"
              titleCase: false
              header: "h1"
              subtitle: ""
              prose: ""
            date: 2025-08-23

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
              Building a static site with Metalsmith is straightforward, but getting the SEO right often requires juggling multiple plugins, manually adding meta tags, and constantly updating sitemaps. [Metalsmith SEO](https://github.com/wernerglinka/metalsmith-seo) handled all of this automatically while being smart enough to work with an existing site configuration!

              ## Why Another SEO Plugin?

              There are many single-purpose SEO tools. You might use one plugin for sitemaps, another for Open Graph tags, and yet another for JSON-LD structured data. Each plugin has its own configuration format, and keeping everything synchronized becomes a real chore quickly.

              Metalsmith SEO takes a different approach. It's build on the fact that modern SEO is interconnected – a page title should inform the Open Graph title, which should align with an JSON-LD headline, which should match a sitemap entry. Instead of managing these separately, the plugin creates a unified data flow where a single source of truth feeds all SEO formats.

              ## What Makes It Special

              **Intelligent Automation**: The plugin analyzes your content and automatically detects whether a page is an article, product, or general page. It then generates appropriate structured data, social media tags, and sitemap entries without any manual intervention.

              **`site.json` Integration**: If you're already using `@metalsmith/metadata` with a `site.json` file, Metalsmith SEO seamlessly integrates with your existing configuration. Your site name, description, and other metadata automatically populate all SEO tags.

              **Smart Sitemap Generation**: Unlike other sitemap generators, Metalsmith SEO calculates intelligent priority and change frequency values based on content depth, type, and freshness. Your homepage gets higher priority than a deeply nested archive page, and your blog posts get more frequent crawling than your about page.

              **Fallback Chains**: The plugin implements sophisticated fallback logic. If a page doesn't have a custom SEO description, it checks for an excerpt, then falls back to your site's default description. This ensures every page has proper metadata without requiring manual configuration for each file.

              ## Real-World Example

              Consider a typical blog post with this frontmatter:

              ```yaml
              ---
              layout: pages/sections.njk
              draft: false

              seo:
                title: Architecture Philosophy - Building with Metalsmith Components
                description: 'Explore the core principles behind Metalsmith component architecture: true encapsulation, separation of concerns, and declarative content management for modern static sites.'
                socialImage: 'https://res.cloudinary.com/glinkaco/image/upload/v1646849499/tgc2022/social_yitz6j.png'
                canonicalOverwrite: ''
                keywords: 'metalsmith architecture, component philosophy, structured content, separation of concerns, component encapsulation, declarative content, static site architecture'

              card:
                title: 'Architecture Philosophy'
                date: '2025-06-02'
                author:
                  - Albert Einstein
                  - Isaac Newton
                image: '/assets/images/sample9.jpg'
                featuredBlogpost: true
                featuredBlogpostOrder: 1
                excerpt: |-
                  This starter embodies several key principles that make structured content management both powerful and approachable.
              ---
              ```

              From this simple input, Metalsmith SEO automatically generates comprehensive SEO markup including proper HTML meta tags, Open Graph properties for social sharing, Twitter Card tags, JSON-LD structured data identifying it as an Article with proper author and date information, and a sitemap entry with appropriate priority and change frequency.

              The plugin understands the relationship between these elements. The blog title becomes the Open Graph title and the JSON-LD headline. Your keywords become article tags in Open Graph and keywords in JSON-LD. Everything stays synchronized automatically.

              ## Built for Real Sites

              Metalsmith SEO was designed based on real-world SEO requirements. It handles cases like preserving existing robots.txt files while adding sitemap references, generating reliable lastmod dates, and creating structured data that passes Google's validation tools.

              The plugin also respects your existing workflow. It integrates with common Metalsmith patterns like using `@metalsmith/metadata` for site configuration, supports both ESM and CommonJS projects, and provides sensible defaults that work out of the box while allowing deep customization when needed.

              Have a look at [this website](https://ms-components-library.netlify.app/). Using the dev tools you can explore what SEO information is available on every page, all done with a single [site.json](https://github.com/wernerglinka/metalsmith-components/blob/main/lib/data/site.json) file.

              ## Getting Started

              The beauty of Metalsmith SEO lies in its simplicity. A minimal setup requires just the path to your site.json file. If that doesn't exists just provide the website URL:

              ```javascript
              import Metalsmith from 'metalsmith';
              import seo from 'Metalsmith SEO';

              Metalsmith(__dirname)
                .use(seo({
                  hostname: 'https://example.com',
                  metadataPath: 'data.site'  // Object in metadata points to where to find site metadata
                }))
                .build();
              ```

              This simple configuration automatically generates complete HTML meta tags, Open Graph and Twitter Card tags, JSON-LD structured data, an intelligent sitemap.xml, and even a robots.txt file if you don't have one.

              For sites already using site.json configuration, the setup is even simpler – the plugin automatically discovers and uses your existing metadata, requiring zero additional configuration in many cases.

              Metalsmith SEO represents a new approach to static site SEO – one that prioritizes automation, intelligence, and integration. It's currently under active development with a stable API.

              If you're building a Metalsmith site and want SEO without the complexity, Metalsmith SEO delivers everything you need in a single, well-tested package. Your search engine rankings will thank you, and your development workflow will become significantly simpler.

              Any comments? Find me on [Bluesky](https://bsky.app/profile/wernerglinka.bsky.social).

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
            url: "/blog/metalsmith-seo-plugin"
            socialTitle: "Introducing Metalsmith SEO: The Complete SEO Solution for Metalsmith"
            socialComment: "The Metalsmith SEO plugin automatically generates HTML meta tags, Open Graph properties, Twitter Cards, JSON-LD structured data, a rotos.txt file and a sitemaps from a single source of truth."

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
              - item: "leaflet-map"
---
