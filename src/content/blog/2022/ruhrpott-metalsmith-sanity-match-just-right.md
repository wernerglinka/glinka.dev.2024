---
layout: blocks.njk
draft: false
pageType: "blog-post"
disableDefaultFooter: true
item: "ruhrpott-metalsmith-sanity-match-just-right" # used as a key for bloglist filters

seo:
  title: Ruhrpott - building a website with Metalsmith and Sanity.io | Werner Glinka
  description: "Metalsmith, while excellent for developers, can pose challenges for non-technical content creators. To address this, I explored sanity.io as a user-friendly interface. My proof-of-concept site illustrates the practicality of this solution."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1690748683/ruhrpott-1_v9k4ot.jpg"
  canonicalOverwrite: ""

blogTitle: "Ruhrpott - building a website with Metalsmith and Sanity.io"
date: 2022-11-28
author: ""
image:
  src: "v1690748683/ruhrpott-1_v9k4ot.jpg"
  alt: ""
  caption:
excerpt: "Metalsmith, while excellent for developers, can pose challenges for non-technical content creators. To address this, I explored sanity.io as a user-friendly interface. My proof-of-concept site illustrates the practicality of this solution."

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
        image: "v1690748683/ruhrpott-1_v9k4ot.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Ruhrpott - Building a website with Metalsmith and Sanity.io"
              header: "h1"
              subtitle: ""
              prose: ""
            date: 2022-11-28

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
              Static Site Generators (SSGs) can be a great tool for developers, but they can be challenging for content editors. Writing or editing blog posts in Markdown may not be ideal for everyone, especially for non-technical writers. While Markdown is excellent for technical documentation, it may not be the best fit for marketing writers.

              As someone who loves using Metalsmith, I faced the challenge of making this choice appealing to the people operating the website. In my search for a better user interface, I came across sanity.io. The platform promised all the right things, and I decided to build a proof-of-concept using it.

              You can visit the live site at https://ruhrpott.netlify.app/blog, and the code is available at https://github.com/wernerglinka/ruhrpott-web.

              As part of the proof-of-concept site, I created four blog posts that explore some aspects of building a Metalsmith site with a Sanity backend. These blog posts are also available on the site for reference.

              - [Ruhrpott - it starts with Metalsmith](/blog/ruhrpott-it-starts-with-metalsmith)
              - [Ruhrpott - structured content from Sanity](/blog/ruhrpott-structured-content-sanity)
              - [Ruhrpott - a Metalsmith Sanity source plugin](/blog/ruhrpott-metalsmith-sanity-source-plugin)
              - [Ruhrpott - Ruhrpott's studio setup](/blog/ruhrpott-sanity-studio-setup)
   
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
              - item: "ruhrpott-it-starts-with-metalsmith"
              - item: "ruhrpott-metalsmith-sanity-source-plugin"
              - item: "ruhrpott-sanity-studio-setup"
              - item: "ruhrpott-structured-content-sanity"  

---