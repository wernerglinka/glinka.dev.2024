---
layout: blocks.njk
draft: false
pageType: "blog-post"
disableDefaultFooter: true
item: "minneapolis-using-wordpress-headless-cms-metalsmith" # used as a key for bloglist filters

seo:
  title: Using WordPress as a headless CMS for Metalsmith | Werner Glinka
  description: "Faced with balancing static website advantages and an accessible editor experience, I considered multiple CMS options. Amidst costs and discontinuations, I realized WordPress was the ideal solution for Metalsmith."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1646849499/tgc2022/social_yitz6j.png"
  canonicalOverwrite: ""

blogTitle: "Minneapolis - using WordPress as a headless CMS for Metalsmith"
date: 2023-05-29
author: ""
image:
  src: "v1685383991/frustrated-user_dncxvp.jpg"
  alt: ""
  caption:
excerpt: "Faced with balancing static website advantages and an accessible editor experience, I considered multiple CMS options. Amidst costs and discontinuations, I realized WordPress was the ideal solution for Metalsmith."

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
        image: "v1685383991/frustrated-user_dncxvp.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Minneapolis - using WordPress as a headless CMS for Metalsmith"
              header: "h1"
              subtitle: ""
              prose: ""
            date: 2023-05-29

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
              I'VE BEEN GRAPPLING WITH A DILEMMA since I started building static websites again in 2017. On the one hand, I love the developer experience, excellent website performance, and enhanced security that static websites offer. Plus, there's the added benefit of not having to deal with constant updates to plugins, modules, or content management systems (CMS). However, my clients were losing the editor experience they had grown accustomed to, as they were now required to work with Markdown in a text editor. Understandably, this was not a popular transition.
              
              While management appreciated static websites' performance and security advantages, the day-to-day users who worked with the sites were dissatisfied. This led me on a quest to find a solution that would improve the editor experience. I initially experimented with Drupal as a headless CMS, but it is too costly to maintain for my clients. NetlifyCMS, another option, faced abandonment but resurfaced as the open-source project Decap CMS. Forestry IO, the CMS I had used, was discontinued and replaced by yet another product called TinaCMS. Amidst all this, it seemed like Sanity was the most promising choice.

              After implementing a proof-of-concept with Sanity, I evaluated the process of constructing the content schema, transferring the content from the Sanity Content Lake, and integrating it with the Metalsmith static site generator. However, a realization struck me: there was an existing solution available that I had overlooked in my pursuit of a headless CMS—WordPress.

              WordPress is a mature and widely-used content management system known for its user-friendly backend interface. This means that non-technical editors can easily manage and update website content without coding knowledge. In addition, WordPress is free to use and can be hosted anywhere, even locally, making it a cost-effective solution for businesses and individuals.
              Furthermore, WordPress is the world's most popular content management system, with a market share of over 40%. As a result, marketing professionals are likely to encounter it frequently in their work.

              In contrast to some newer CMSs like Contentful, Sanity, and Strapi, WordPress provides more flexibility and control over content types and structures thanks to its vast library of plugins. WordPress's extensive plugin ecosystem allows developers to customize the platform for their clients to be a simple and intuitive content management system.

              WordPress has a vast library of plugins that can extend its functionality, allowing users to add features like analytics and social media integration.

              While some newer CMSs have gained popularity, WordPress is a reliable choice. While NetlifyCMS was almost abandoned and Forestry was sunset, WordPress has continued to thrive and evolve.

              Using WordPress as an editing backend for Metalsmith is an intelligent decision for non-technical editors who need a simple and user-friendly content management system. The maturity of WordPress, its low cost, and availability make it a preferred option compared to many newer CMSs.

              So, WordPress it is. I will dive deeper into this subject with project Minneapolis. [More to come](/blog/minneapolis-project-outline/).


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
              - item: "minneapolis-wordpress-setup"
              - item: "minneapolis-project-outline"
              - item: "minnepolis-building-wp-section" 
              - item: "minneapolis-building-wp-source-plugin" 
              - item: "minneapolis-generate-graphql-queries" 


---