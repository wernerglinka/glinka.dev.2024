---
layout: blocks.njk
pageType: "blog-post"
disableDefaultFooter: true
item: "minneapolis-wordpress-setup" # used as a key for bloglist filters

seo:
  title: Minneapolis - the WordPress setup | Werner Glinka
  description: "Our WordPress setup features Underscores theme for a customizable foundation. Key plugins include ACF Pro, CPT UI, WPGraphQL, and Netlify Deploy. We'll fetch content via WPGraphQL, manage images with Cloudinary, and host on Pantheon."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1685556092/mpls-night-snow_wuihss.jpg"
  canonicalOverwrite: ""

blogTitle: "Minneapolis - the WordPress setup"
date: 2023-05-31
author: ""
image:
  src: "v1685556092/mpls-night-snow_wuihss.jpg"
  alt: ""
  caption:
excerpt: "Our WordPress setup features Underscores theme for a customizable foundation. Key plugins include ACF Pro, CPT UI, WPGraphQL, and Netlify Deploy. We'll fetch content via WPGraphQL, manage images with Cloudinary, and host on Pantheon."

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
        image: "v1685556092/mpls-night-snow_wuihss.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Minneapolis - the WordPress setup"
              header: "h1"
              subtitle: ""
              prose: ""
            date: 2023-05-31

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
              Here are the major ingedients of the WordPress setup.
              
              ## Theme
              I'll be using the WordPress starter theme Underscores. Underscores, also known as "_s", is a popular starter theme for WordPress that provides a bare-bones foundation for creating custom WordPress themes. It is developed and maintained by Automattic, the company behind WordPress.com. Underscores is designed to be lightweight, flexible, and developer-friendly, allowing developers 
              to build custom WordPress themes from scratch with minimal code and a solid foundation.

              Customize and download the theme here: https://underscores.me/

              ![Underscores](https://res.cloudinary.com/glinkaco/image/upload/v1685556732/underscores_bgznqw.png)

              ## Plugins
              Initial plugins to prove the concept. I'll add plugins that restrict access to certain IP addresses for production.

              - Add WPGraphQL SEO
              - Admin Menu Editor
              - Advanced Custom Fields PRO (ACF Pro)
              - Cloudinary
              - Code Syntax Block
              - Custom Post Type UI (CPT UI)
              - Happy SCSS Compiler
              - SVG Support
              - Webhook Netlify Deploy
              - WPGraphQL
              - WPGraphQL for Advanced Custom Fields
              - WPS Hide Login
              - Yoast SEO

              The key plugins are ACF Pro and CPT UI to define custom fields and post types. They will allow us to create structured content and define the fields our static site generator will consume.

              The WPGraphQL plugins will enable the GraphQL API and the Webhook Netlify Deploy plugin will trigger a Netlify build when content is ready.

              ## Posts
              Blog posts are written using the Block Editor. 
              
              ## Pages
              All pages will be built with a pre-defined set of structured sections. The WordPress Block Editor is not needed. This snippet in functions.php will remove the editor.

              ```javascript
              add_action('admin_init', 'remove_textarea');
              function remove_textarea() {
                  remove_post_type_support( 'page', 'editor' );
              }
              ```

              ## Content API
              I'll use the [WPGraphQL](https://www.wpgraphql.com/) plugin to fetch content with [GraphQL](https://graphql.org/). There is an excellent [introduction to this subject here](https://www.wpgraphql.com/docs/quick-start).

              ## Digital Assets
              I'll use [Cloudinary](https://cloudinary.com/), a cloud-based media management platform for all images. Cloudinary provides image transformation via URL parameters which allow for images sized for the space available on the page. 

              ## Content Architecture
              The WordPress content architecture will mirror Metalsmith's static site. Pages are composed of section components. On the WordPress site, sections will be built with [ACF Flexible Content](https://www.advancedcustomfields.com/resources/flexible-content/) fields. Section templates will be built in PHP, which will be used to provide page previews. ( _Initially, I wanted to use ACF Blocks, but the way content is stored in Editor Blocks is not suitable, so Flexible Content it is._ )

              The section template structure will be identical to Metalsmith, all classes, styling and behavior will be the same. The only difference will be WordPress's PHP template tags vs. Metalsmith's [Nunjucks](https://mozilla.github.io/nunjucks/) template tags. 

              ## Hosting
              The WordPress site is hosted on [Pantheon](https://pantheon.io/). I have been using Pantheon since its inception and love its DevOps setup.

              In the [next blog post](/blog/minneapolis-building-wp-section/) we'll discuss how pages and their section components are constructed on the WordPress site.

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
              - item: "minneapolis-using-wordpress-headless-cms-metalsmith"
              - item: "minneapolis-project-outline"
              - item: "minnepolis-building-wp-section" 
              - item: "minneapolis-building-wp-source-plugin" 
              - item: "minneapolis-generate-graphql-queries" 

---