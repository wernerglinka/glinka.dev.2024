---
layout: blocks.njk
draft: false
pageType: "blog-post"
disableDefaultFooter: true
item: "exploring-web-components" # used as a key for bloglist filters

seo:
  title: "Exploring Web Components | Werner Glinka"
  description: "Unlock the true potential of web development with Web Components. Embrace reusability, efficiency, and elevate your projects to new heights! "
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1646849499/tgc2022/social_yitz6j.png"
  canonicalOverwrite: ""

blogTitle: "Exploring Web Components
"
date: 2023-08-01
author: ""
image:
  src: "v1691098518/web-components_xjqs5i.jpg"
  alt: ""
  caption:
excerpt: "Unlock the true potential of web development with Web Components. Embrace reusability, efficiency, and elevate your projects to new heights! "

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
        image: "v1691098518/web-components_xjqs5i.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Exploring Web Components"
              header: "h1"
              subtitle: "Using the platform"
              prose: ""
            date: 2023-08-01
          
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
              In the ever-evolving landscape of web development, I recently reacquainted myself with an intriguing technology that promises to reshape how I approach future web projects—Web Components. These versatile components offer a myriad of advantages that simplify the building of web pages. By crafting custom components, I discovered a realm where redundant code becomes a thing of the past, and workflow optimization becomes the norm. The rewards have been evident—saved time, improved quality, and heightened functionality.

              One of the primary draws of Web Components lies in their reusability and encapsulation capabilities, simplifying maintenance and enhancing overall productivity. They work across all modern browsers, promoting cross-platform compatibility and consistent user experiences. They are bringing us closer to just "using the platform".

              As CSS Tricks so eloquently said back in 2019: 
              
              > _The platform (meaning using standard features built into browsers) might not have everything you need (it often won’t) and using those features will bring long-term resiliency to what you build in a way that a framework may not. The web evolves and very likely won’t break things. Frameworks evolve and very likely will break things_.

              Goes really well with my previous post [The Ever-Changing Landscape of Front-End JavaScript Frameworks and Build Tools](/blog/developer-fatique).

              The potential of Web Components is boundless, empowering developers to build sophisticated components that can elevate their web projects. For instance, custom image loaders can work wonders, significantly enhancing a web page's performance, especially when dealing with large images. Hint, my first web component will be about [image loading from Cloudinary](/blog/web-component-cloudinary-image).  As I delve deeper into this web technology, I marvel at the ability to create reusable elements just once and then use them forever.

              In light of my experiences, I fully recommend that web developers explore Web Components. The potential they offer is vast, unlocking new possibilities and reshaping web development, all without the need for a framework.

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
              - item: "developer-fatique"
---