---
layout: blocks.njk
pageType: "blog-post"
disableDefaultFooter: true
item: "metalsmith-starters" # used as a key for bloglist filters

seo:
  title: New Metalsmith Starters | Werner Glinka
  description: "A new set of three starters to help get started with Metalsmith quickly"
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1690740357/blacksmith_cu4d0y.jpg"
  canonicalOverwrite: ""

blogTitle: "New Metalsmith Starters"
date: 2022-03-21
author: ""
image:
  src: "v1690740357/blacksmith_cu4d0y.jpg"
  alt: ""
  caption:
excerpt: "A new set of three starters to help get started with Metalsmith quickly."

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
        image: "v1690740357/blacksmith_cu4d0y.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "New Metalsmith Starters"
              header: "h1"
              subtitle: ""
              prose: ""
            date: 2022-03-21

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
              I just released three new Metalsmith starters to help new and old Metalsmith hands to get started quickly with their projects. 

              ## A Bare-bones Starter
              When you are just starting this may help.

              - Code at https://github.com/wernerglinka/metalsmith-bare-bones-starter
              - Demo at https://metalsmith-bare-bones-starter.netlify.app/

              ## A Blog Starter
              Adding a blog to your Metalsmith site is not difficult.

              - Code at https://github.com/wernerglinka/metalsmith-blog-starter
              - Demo at https://github.com/wernerglinka/metalsmith-blog-starter

              ## A Company Website Starter
              Company websites are normally more complex than your average portfolio or blog site. Here is a starter that inlcudes flexible page layouts, a responsive/progressive image component and more.

              - Code at https://github.com/wernerglinka/metalsmith-company-starter
              - Demo at https://metalsmith-company-starter.netlify.app/
      
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
              - item: "building-responsive-progressive-image-component"
              - item: "metalsmith-lever-api"

---