---
layout: blocks.njk
draft: false
pageType: "blog-post"
disableDefaultFooter: true
item: "nunjucks-transformer" # used as a key for bloglist filters

seo:
  title: Nunjucks and jsTransformer | Werner Glinka
  description: "Through the jstransformer-nunjucks plugin, we extend the Nunjucks environment in Metalsmith with configuration options like path, filters, and extensions. This includes converting string cases, replacing spaces with dashes, and capturing variables."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1645220774/tgc2022/blogImages/metalsmith-layouts-nunjucks/layout-options_apwj06.jpg"
  canonicalOverwrite: ""

blogTitle: "Nunjucks and jsTransformer"
date: 2018-08-01
author: ""
image:
  src: "v1645220774/tgc2022/blogImages/metalsmith-layouts-nunjucks/layout-options_apwj06.jpg"
  alt: ""
  caption:
excerpt: "Through the jstransformer-nunjucks plugin, we extend the Nunjucks environment in Metalsmith with configuration options like path, filters, and extensions. This includes converting string cases, replacing spaces with dashes, and capturing variables."

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
        image: "v1645220774/tgc2022/blogImages/metalsmith-layouts-nunjucks/layout-options_apwj06.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Nunjucks and jsTransformer"
              header: "h1"
              subtitle: ""
              prose: ""
            date: 2018-08-01

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
              When using Nunjucks with Metalsmith-in-place or Metalsmith-layouts we are doing so via the [jstransformer-nunjucks](https://github.com/jstransformers/jstransformer-nunjucks) plugin. In this case, to extend the Nunjucks environment we have to pass a configuration object to the Metalsmith plugins.

              Currently `jstransformer-nunjucks` supports a path variable, filters and extensions.

              This is how we would pass these configuration options to Nunjucks:

              ## In our Metalsmith build file

              ```javascript
              const CaptureTag = require(“nunjucks-capture”);

              const toUpper = text => text.toUpperCase();
              const spaceToDash = text => text.replace(/\s+/g, “-“);
              .
              .
              .
              const templateConfig = {
                  engineOptions: {
                      path: __dirname + '/layouts',
                      filters: {
                          toUpper: toUpper,
                          spaceToDash: spaceToDash
                      },
                      extensions: {
                          CaptureTag: new CaptureTag()
                      }
                  }
              };
              .
              .
              .
              .use(metalsmith-in-place(templateConfig))
              ```

              This example defines the path to the layout directory. Now all paths in our templates must be relative to this layout directory path.

              We are also adding two filters: One that converts a string to upper case and a second one that replaces all spaces in a string with dashes.

              Finally, we are extending Nunjucks with [nunjucks-capture](https://github.com/fffunction/nunjucks-capture) - a nunjucks port of the [Liquid Capture tag](https://shopify.dev/api/liquid/tags/variable-tags#capture), which will allow us to use a new capture tag like so:

              ```javascript
              {% set favorite_food = 'pizza' %}
              {% set age = 35 %}

              {% capture about_me -%}
              I am {{ age }} and my favorite food is {{ favorite_food }}.
              {%- endcapture %}

              {{ about_me }}
              ```

              This will result in

              ```javascript
              I am 35 and my favorite food is pizza.
              ```

              Everything between the two tags is stored in a new variable as a string. Dynamic content, such as includes or loops, are evaluated before the variable is stored. This means you've captured the resulting content, not the templating.

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
              - item: "introducing-project-orca-part1"
              - item: "introducing-project-orca-part2"
              - item: "introducing-project-orca-part3" 

---