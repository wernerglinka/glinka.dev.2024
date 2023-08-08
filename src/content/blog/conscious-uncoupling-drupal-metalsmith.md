---
layout: blocks.njk
draft: false
pageType: "blog-post"
disableDefaultFooter: true
item: "conscious-uncoupling-drupal-metalsmith" # used as a key for bloglist filters

seo:
  title: Conscious uncoupling - Drupal 8 meets Metalsmith | Werner Glinka
  description: "The post recounts a presentation I gave about using a headless Drupal for a Metalsmith site. The interest stirred led to a series of blogposts named 'Introducing ORCA', focusing on Metalsmith.
"
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1646849499/tgc2022/social_yitz6j.png"
  canonicalOverwrite: ""

blogTitle: "Conscious Uncoupling - Drupal 8 meets Metalsmith"
date: 2018-06-09
author: ""
image:
  src: "v1645471283/tgc2022/blogImages/conscious-uncoupling-drupal-metalsmith/header_yrq0xy.png"
  alt: ""
  caption:
excerpt: "The post recounts a presentation I gave about using a headless Drupal for a Metalsmith site. The interest stirred led to a series of blogposts named 'Introducing ORCA', focusing on Metalsmith."


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
        image: "v1645471283/tgc2022/blogImages/conscious-uncoupling-drupal-metalsmith/header_yrq0xy.png"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Conscious Uncoupling"
              header: "h1"
              subtitle: "Drupal 8 meets Metalsmith"
              prose: ""
            date: 2018-06-09      
  
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
              In June 2018 I gave a presentation about how to use a headless Drupal as a CMS for a Metalsmith site. The many questions after the presentation resulted in several blogposts called **Introducing ORCA**. The blogposts focus on the Metalsmith side of this presentation. Here is a video of the presentation and click here to [Download the presentation](https://res.cloudinary.com/glinkaco/image/upload/v1645472205/tgc2022/assets/ORCA_ak0fbj.pdf)

  - container: aside # section || article || aside
    description: "section with video"
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
          - name: video
            src: youtube
            id: "jQfZQdU8x8w"
            tn: "v1645472835/tgc2022/blogImages/conscious-uncoupling-drupal-metalsmith/presentation-cover_aojuwu.jpg"

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