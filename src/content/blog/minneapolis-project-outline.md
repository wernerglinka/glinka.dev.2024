---
layout: blocks.njk
pageType: "blog-post"
disableDefaultFooter: true
item: "minneapolis-project-outline" # used as a key for bloglist filters

seo:
  title: Minneapolis - the project outline | Werner Glinka
  description: "Explore Minneapolis: where WordPress and Metalsmith combine for dynamic content delivery using the GraphQL API and a headless CMS in modern content management."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1685555154/mpls-banner_veuszb.jpg"
  canonicalOverwrite: ""

blogTitle: "Minneapolis - the project outline"
date: 2023-05-30
author: ""
image:
  src: "v1685555154/mpls-banner_veuszb.jpg"
  alt: ""
  caption:
excerpt: "Explore Minneapolis: where WordPress and Metalsmith combine for dynamic content delivery using the GraphQL API and a headless CMS in modern content management."

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
        image: "v1685555154/mpls-banner_veuszb.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Minneapolis - the project outline"
              header: "h1"
              subtitle: ""
              prose: ""
            date: 2023-05-30

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
              Introducing "Minneapolis," an innovative project that leverages WordPress as a headless CMS to deliver structured content seamlessly to [Metalsmith](https://metalsmith.io/), a robust static site generator.

              With WordPress's renowned user-friendly interface, content management becomes a breeze for editors. By adopting WordPress as a headless CMS, we establish a clear separation between the front-end presentation layer and the back-end content management system, offering unparalleled flexibility and scalability.

              Efficiently retrieving content data from WordPress is made possible through the powerful GraphQL API. This sophisticated query language empowers us to request specific data and shape the response according to our exact needs, resulting in enhanced data retrieval efficiency compared to traditional REST APIs.

              Enter Metalsmith, a versatile static site generator capable of transforming diverse sources into polished static websites. To seamlessly integrate WordPress content into our static site generation process, we're constructing a custom source plugin. This plugin will effectively fetch content data from WordPress and convert it into Metalsmith file objects, streamlining the overall process.

              By adopting this configuration, we harness the content management capabilities of WordPress while capitalizing on the performance and security advantages of a static website generated through Metalsmith.

              This endeavor shares similarities with our previous project "[Ruhrpott](/blog/ruhrpott-metalsmith-sanity-match-just-right/)," where we employed [Sanity IO](https://www.sanity.io/) to feed content to Metalsmith. For further insights, we recommend exploring the Ruhrpott posts.

              Stay tuned for our next post, where we'll delve into a comprehensive review of the [WordPress setup](/blog/minneapolis-wordpress-setup/). Join us on this exciting journey as we unlock the true potential of combining WordPress and Metalsmith for top-tier content delivery.

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
              - item: "adding-netlify-cms"
              - item: "wordpress-static-website"
              - item: "minneapolis-project-outline"


---