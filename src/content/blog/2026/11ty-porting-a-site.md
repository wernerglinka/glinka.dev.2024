---
layout: blocks.njk
pageType: "blog-post"
disableDefaultFooter: true
item: "11ty-porting-a-site" # used as a key for bloglist filters
scheduledDate: 2026-02-10

seo:
  title: From Metalsmith to Eleventy - Porting an Actual Site | Werner Glinka
  description: "In theory, migrating a site from Metalsmith to Eleventy should be straightforward. Theory met practice when I ported my art website."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1769563801/porting_jjh3zu.jpg"
  canonicalOverwrite: ""

blogTitle: "From Metalsmith to Eleventy - Porting an Actual Site"
date: 2026-02-10
author: ""
image:
  src: "v1769563801/porting_jjh3zu.jpg"
  alt: ""
  caption:
excerpt: "In theory, migrating a site from Metalsmith to Eleventy should be straightforward. Theory met practice when I ported my art website."

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
        image: "v1769563801/porting_jjh3zu.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: "From Metalsmith to Eleventy"
              title: "Porting an Actual Site"
              header: "h1"
              subtitle: ""
              prose: ""
            date: 2026-02-10

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
              In theory, migrating a site from Metalsmith to Eleventy should be straightforward, copy the content, adjust some configuration, done.

              Theory met practice when I ported my [art website](https://wernerglinka.com).

              The site isn't large: a homepage with an artwork carousel, sixteen individual artwork pages, a works gallery, five studio notes, a couple of press articles, and an about page. Twenty-seven pages total. All built with the same component architecture I'd developed over years of Metalsmith work. If any site should port cleanly, this one should.

              It mostly did. The interesting parts are where it didn't.

              ## The Content Migration

              The content files moved without modification. Both platforms use YAML frontmatter, and my pages define everything as structured sections rather than markdown body content. Copy the files, change the layout path in frontmatter from `pages/sections.njk` to `sections.njk`, and the content is ready.

              The data files—JSON defining the artwork carousel and gallery grid—moved just as easily. The asset files, several years of artwork photographs organized by year, copied over with their directory structure intact.

              The first build completed successfully. Thirty files written. Then I looked at the site in a browser.

              ## Navigation Showing Everything

              The main menu listed every page on the site. Home, Works, About, Studio Notes—but also every individual artwork page, every studio note post, every article. The navigation component was doing exactly what it was told: display all pages with a `navLabel` in their frontmatter.

              In Metalsmith, I'd used a menu plugin which allowed me to be selective about which pages got included in the navigation. In the Eleventy port, I'd copied all the frontmatter without thinking about what the normalization plugin would do with it. The [normalized collections plugin](https://github.com/wernerglinka/eleventy-plugin-normalized-collections) builds the main menu from every page that declares a navigation label. Every page had one.

              The fix was simple: remove `navLabel` from pages that shouldn't appear in the main menu. Only four pages needed it—Home, Works, About, and Studio Notes. The rest were accessible through their parent sections, not through top-level navigation.

              ## Components Not Rendering

              The homepage carousel didn't appear. Neither did the works gallery grid. The sections were in the frontmatter, the components existed, but the sections rendered empty.

              The problem was data access patterns. The artist-slider component expected artwork data at `data.artworks[section.artworks.source]`. The image-grid component expected `data[section.dataSource]`. These paths assumed data would be accessible under a `data` namespace in templates.

              This is where the `_data/data/` directory convention matters. Eleventy's data cascade makes any JSON file in `_data/` available as a global variable named after the file. A file at `_data/site.json` becomes `site` in templates. But my components expected data under a `data` object—`data.artworks`, `data.works`, not just `artworks` or `works` at the root level.

              The solution: nest a `data/` directory inside `_data/`. Files at `_data/data/artworks/home-slider.json` become accessible as `data.artworks['home-slider']`. The directory structure creates the namespace the components expect. It's ugly but a small price to pay for components compatibility.

              This convention, paired with the normalization plugin handling collection data shapes, forms the bridge between platforms. Metalsmith builds pass data explicitly through the pipeline. Eleventy's data cascade provides it automatically. The `_data/data/` pattern makes both approaches resolve to the same access paths in templates.

              No component changes required. The components were already correct—they just needed the environment configured to deliver data where they expected to find it.

              ## Image Paths

              The works gallery rendered its grid layout, but the images showed only alt text. The thumbnails weren't loading.

              The image paths in `works.json` were relative: `/2001/2001.01.004.jpg`. The original Metalsmith build had resolved these against a base path. The Eleventy build didn't know to do that.

              I updated the paths to be fully qualified: `/assets/images/artworks/thumbnails/2001/2001.01.004.jpg`. Explicit paths that work regardless of how the build system handles path resolution.

              ## Component Naming

              The studio notes pages used a component called `blog-navigation` for previous/next links between posts. That component had been renamed to `collection-links` in the published component library—a more accurate name since it works for any collection, not just blogs.

              The fix was updating the frontmatter in all five studio notes pages to reference `collection-links` instead of `blog-navigation`, and downloading the renamed component.

              But then the collection links rendered empty. The component was hardcoded to look for `collections['blog']`, and my collection was named `studio-notes`.

              I made the component configurable, adding support for a `collectionName` property with a default fallback to `blog`. Then added `collectionName: 'studio-notes'` to each studio notes page. The component now works for any collection name, which is what it should have done from the start.

              ## What the Fixes Reveal

              Each problem pointed to an assumption that worked in one environment but not the other.

              The navigation issue revealed that I'd been relying on selective frontmatter rather than explicit configuration. The data access issue revealed assumptions about directory structure baked into component expectations. The image path issue revealed reliance on implicit path resolution. The component naming issue revealed hardcoded values that should have been configurable.

              None of these were Eleventy problems or Metalsmith problems. They were assumptions I'd made while building in one environment that didn't survive the move to another. The migration exposed them. Fixing them made the components more robust and more portable.

              The [site works now](https://www.wernerglinka.com/). The carousel autoplays, the gallery grid displays justified layouts, the collection navigation links posts correctly. The build produces the same output it did on Metalsmith, but with less configuration and more of the pipeline handled by Eleventy's defaults.

              More importantly, I understand both platforms better than I did before. Metalsmith's explicitness taught me how static site generators work. Eleventy's conventions taught me where I'd been doing unnecessary work. The migration taught me which assumptions were load-bearing and which were incidental.

              The next post covers extending the site with capabilities I hadn't implemented in Metalsmith: a full bilingual version using Eleventy's i18n support.

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
            url: "/blog/11ty-porting-a-site/"
            socialTitle: "From Metalsmith to Eleventy - Porting an Actual Site"
            socialComment: "In theory, migrating a site from Metalsmith to Eleventy should be straightforward. Theory met practice when I ported my art website."
---
