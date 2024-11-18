---
layout: blocks.njk
draft: false
pageType: "blog-post"
disableDefaultFooter: true
item: "minneapolis-generate-graphql-queries" # used as a key for bloglist filters

seo:
  title: Minneapolis - getting the content from WordPress | Werner Glinka
  description: "This article focuses on creating queries to fetch content data for Metalsmith via WP GraphQL from a wordpress backend."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1646849499/tgc2022/social_yitz6j.png"
  canonicalOverwrite: ""

blogTitle: "Minneapolis - getting the content from WordPress"
date: 2023-06-05
author: ""
image:
  src: "v1685987355/mpls-stone-bridge_iyjlw2.jpg"
  alt: ""
  caption:
excerpt: "This article focuses on creating queries to fetch content data for Metalsmith via WP GraphQL from a wordpress backend."

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
        image: "v1685987355/mpls-stone-bridge_iyjlw2.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Minneapolis - getting the content from WordPress"
              header: "h1"
              subtitle: ""
              prose: ""
            date: 2023-06-05

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
              At this stage of our project review, we have successfully installed and configured our WordPress site. We have defined the different sections of our pages and demonstrated how these sections can be utilized to compose an [engaging home page](https://dev-mpls.pantheonsite.io/
              ). In this blog post, our focus will be on explaining the process of creating queries to retrieve content data for Metalsmith, our chosen static site generator.

              During the setup of our WordPress site, we made use of the WP GraphQL plugin. This powerful plugin offers an extendable GraphQL schema and API that seamlessly integrates with our WordPress site. Additionally, we needed to access the Advanced Custom Fields (ACF) and utilize any available SEO information provided by the Yoast plugin. To achieve this, we employed the WPGraphQL for Advanced Custom Fields plugin and the Add WPGraphQL SEO plugin.

              To ensure that all ACF fields are accessible through the GraphQL API, it is crucial to enable the "Show in GraphQL" toggle for each respective field.

              ![](https://res.cloudinary.com/glinkaco/image/upload/f_auto,q_auto/v1685987787/graphql-toggle_h1i60z.png)

              ## Building GraphQL queries
              The WP GraphQL plugin includes the GraphiQL IDE, an invaluable tool that allows us to explore the available schema. The GraphQL schema essentially defines the various types of data and operations that can be performed through the API. It provides a comprehensive overview of the queries, mutations, and data structures that are at our disposal.

              Once we have gained insights from exploring the schema, we can begin constructing GraphQL queries to retrieve the specific content we need. These queries are structured and precisely define the data we want to fetch.

              Typically, a query is written starting with an entry point, such as `query {}`, and within the curly braces, we specify the fields we wish to retrieve.

              Read more for a [thorough introduction to GraphQL](https://www.wpgraphql.com/docs/intro-to-graphql).
              Jason Bahl also has several helpful videos on YouTube about WP GraphQL. I'd recommend to start with this one.
  
  - container: aside # section || article || aside
    description: "section with videos"
    containerFields:
      disabled: false
      containerId: ""
      containerClass: "video"
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
            id: "ze2un3ni1CY"
            tn: "v1685988589/jason-bahl-video-tn_izl9vs.png"

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
              Let's have a look at how we can use the GraphiQL IDE to build a query string for our home page.

              Open the IDE by clicking the GraphQL link on the left side of the WP dashboard. Click on the Query Composer button.

              <img class="acf-image" src="https://res.cloudinary.com/glinkaco/image/upload/f_auto,q_auto/v1685986730/graphiql-ide_dfagji.png" alt="GraphQL Query Composer">

              In the Query Composer, scroll down to find and open `pages`, then find `edges`, then `node`. The node presents a single page. 

              <img class="acf-image" src="https://res.cloudinary.com/glinkaco/image/upload/f_auto,q_auto/v1685986730/pages-query_wa8oqn.png" alt="GraphQL Query Page">

              Find and open `sections` and then click the checkbox `sections`. We'll now see all ACF page sections.

              <img class="acf-image" src="https://res.cloudinary.com/glinkaco/image/upload/f_auto,q_auto/v1685986730/sections-query_f2l0ce.png" alt="GraphQL Query Sections">

              Click on `Page_Sections_Sections_Media` and open `media`. We'll see the four fields groups `commonSectionFields`, `cta`, `image` and `text`, as well as the `mediaPosition` checkbox. We can now open all field groups and arrive at the complete schema for the media section.

              <img class="acf-image" src="https://res.cloudinary.com/glinkaco/image/upload/f_auto,q_auto/v1685986730/media-section-schema_hegj71.png" alt="GraphQL Query Media">

              This schema represents the settings of the example media section that [we reviewed in the previous blog post](/blog/minneapolis-building-wp-section/).

              And this is the response we get when we run the query for a media section.

              ```javascript
              {
                "media": {
                  "commonSectionFields": {
                    "backgroundColor": null,
                    "hasBackground": true,
                    "isDark": null,
                    "sectionClasses": null,
                    "settings": [
                      "in_container"
                    ],
                    "usage": "default",
                    "wrapperElement": "section",
                    "backgroundImage": {
                      "url": null
                    }
                  },
                  "cta": {
                    "buttonType": "primary",
                    "ctaClasses": null,
                    "isButton": true,
                    "isExternal": null,
                    "label": "Read More",
                    "target": {
                      "url": "https://www.minneapolisparks.org/parks-destinations/parks-lakes/lake_of_the_isles_park/"
                    }
                  },
                  "image": {
                    "altText": "Lake of the Isles",
                    "credits": "Sollicitudin Venenatis Aenean",
                    "url": {
                      "mediaItemUrl": "https://res.cloudinary.com/djd0plux8/images/w_2560,h_1707/f_auto,q_auto/v1681925514/minneapolis/rod-m-uvPm9PsAWz4-unsplash/rod-m-uvPm9PsAWz4-unsplash.jpg?_i=AA",
                      "mediaDetails": {
                        "file": "2023/04/rod-m-uvPm9PsAWz4-unsplash-scaled.jpg",
                        "height": 1707,
                        "width": 2560
                      }
                    }
                  },
                  "text": {
                    "headingLevel": "h2",
                    "prose": "<p>The name of the lake, referring to the islands in the lake, was used from the earliest days of the settlement of Minneapolis. At one time the lake contained four islands. Two islands near the south shore of the lake were converted to land as the lake was developed.</p>\n",
                    "subtitle": null,
                    "title": "<p>Lake of the Isles</p>\n"
                  },
                  "mediaPosition": "media_right"
                }
              }
              ```

              This is how we can build our queries which will be part of the GraphQL requests that are sent to the WordPress site at 
              ```html
                https://dev-mpls.pantheonsite.io/graphql/<query string here>
              ```

              The query string needs to include all known page sections so it will be quite long. In the [next blog post](/blog/minneapolis-building-wp-source-plugin/), we will review the Metalsmith end and how the queries are assembled, and the content is fetched.

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
              - item: "minneapolis-wordpress-setup"
              - item: "minnepolis-building-wp-section" 
              - item: "minneapolis-building-wp-source-plugin"


---