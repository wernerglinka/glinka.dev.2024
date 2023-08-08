---
layout: blocks.njk
bodyClasses: "blocks-page blog"

seo:
  title: Werner Glinka - My Blog
  description: "Werner Glinka - My Blog"
  socialImage: "/assets/images/metalsmith-starter-social.png"
  canonicalOverwrite: ""

sections:
  - container: section # section || article || aside
    description: "page banner"
    containerFields:
      animateSection: false
      disabled: false
      containerId: "page-banner"
      containerClass: "page-banner"
      inContainer: false
      background:
        color: ""
        image: "v1690564373/blog-header_yeuzbp.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: page-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Random notes to myself"
              header: "h1"
              subtitle: ""
              prose: ""

  - container: section # section || article || aside
    description: "section with all blogposts"
    containerFields:
      disabled: false
      containerId: ""
      containerClass: "all-blogs"
      inContainer: true
      background:
        color: ""
        image: ""
        isDark: false
    hasPagingParams: true
    columns:
      - column:
        blocks:
          - name: all-blogs
            blockClass: ""
            horizontal: false
            numberOfBlogs: "" # updated by plugin
            numberOfPages: "" # updated by plugin
            pageLength: ""    # updated by plugin
            pageStart: ""     # updated by plugin
            pageNumber: ""    # updated by plugin