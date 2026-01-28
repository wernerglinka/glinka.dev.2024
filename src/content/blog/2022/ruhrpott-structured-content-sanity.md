---
layout: blocks.njk
pageType: "blog-post"
disableDefaultFooter: true
item: "ruhrpott-structured-content-sanity" # used as a key for bloglist filters

seo:
  title: "Ruhrpott - structured content from Sanity | Werner Glinka"
  description: "We're venturing into creating dynamic media sections using Sanity Studio, enabling our Metalsmith SSG to fetch content seamlessly during build time."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1681165865/sanity-blog-header_wqvbpm.png"
  canonicalOverwrite: ""

blogTitle: "Ruhrpott - structured content from Sanity"
date: 2022-12-02T12:00:00Z
author: ""
image:
  src: "v1690750196/ruhrpott-4_ij8cvw.jpg"
  alt: ""
  caption:
excerpt: "We're venturing into creating dynamic media sections using Sanity Studio, enabling our Metalsmith SSG to fetch content seamlessly during build time."

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
        image: "v1690750196/ruhrpott-4_ij8cvw.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Ruhrpott - structured content from Sanity"
              header: "h1"
              subtitle: ""
              prose: ""
            date: 2022-12-02T12:00:00Z

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
              In the first post of the Ruhrpot project, we discussed how to use structured content to build a simple media page section. The content was defined in the Frontmatter YAML Object of the source page. In this post, we will source all content from the [Sanity CMS](https://www.sanity.io/docs/a-short-introduction-to-sanity-io). There will be no source file; structured content will be fetched from the Sanity API and directly injected into the Metalsmith metadata layer.

              ## About Sanity.io

              Sanity.io is a content platform that allows you to create, edit, and manage structured content such as text, images, and other media. It provides a real-time data store for storing and managing this content and APIs for interacting with it. Sanity.io also offers a content editing environment called [Sanity Studio](https://www.sanity.io/studio), a single-page application that allows us to quickly set up and customize an editing environment for our content. In addition to the data store and Studio, Sanity.io also provides a range of SDKs, libraries, and tools that enable us to query content and integrate it with other websites, services, and applications.

              Learn how to get started with Sanity here: https://www.sanity.io/docs/getting-started-with-sanity

              To use the Sanity Studio, we first define the structure of our content using schemas. A schema is a JSON object that represents the types of content that can be created, the fields that can be used to store data, and the relationships between different types of content.

              ## A practical example the Sanity way

              In this example, we will model the media section from our previous blogpost. While our last implementation was done with a YAML object in the file frontmatter, this time, we will create the media section content with Sanity Studio, which our Metalsmith SSG can then fetch during build time. We will discuss how that works in the next blogpost.

              ## The media section schema

              ```javascript
              import {defineType} from 'sanity'

              export default defineType({
                name: 'mediaBlock',
                title: 'Media Block',
                type: 'object',
                fields: [
                  {
                    name: 'blockOrder',
                    title: 'Block Order',
                    type: 'string',
                    options: {
                      list: [
                        { title: "Image Right", value: "imageRight" },
                        { title: "Image Left", value: "imageLeft" },
                      ]
                    },
                    initialValue: "imageRight",
                  },
                  { name: 'titlePrefix', 
                    type: 'string', 
                    title: 'Title Prefix' 
                  },
                  {
                    title: 'Title',
                    name: 'title',
                    type: 'string'
                  },
                  {
                    name: "headerType",
                    title: "Header Type",
                    type: "string",
                    description: 'Choose from h1 through h6',
                    options: {
                      list: [
                        { title: "h1", value: "h1" },
                        { title: "h2", value: "h2" },
                        { title: "h3", value: "h3" },
                        { title: "h4", value: "h4" },
                        { title: "h5", value: "h5" },
                        { title: "h6", value: "h6" },
                      ]
                    },
                    initialValue: "h2",
                  },
                  {
                    name: 'subtitle',
                    type: 'string',
                    title: 'Subtitle',
                  },
                  {
                    name: 'mediaImage',
                    title: 'Media Image',
                    type: 'imageBlock',
                  },
                  {
                    name: 'portableTextBody',
                    type: 'simpleBlockContent',
                    title: 'Portable Text Body',
                  },
                  {
                    name: 'cta',
                    type: 'cta',
                    title: 'CTA',
                  },
                ],
              })
              ```

              Here is the JSON Object schema that defines an object called `mediaBlock` with several fields, including `headerType` and `portableTextBody`. The `headerType` field is a list that allows us to select from a list of options. `portableTextBody` is a rich text field using a format called [Portable Text](https://www.sanity.io/docs/presenting-block-text), which is different from the markdown format used in the previous example. Once the values for the mediaBlock object have been entered into Sanity Studio, they can be published and made available through the Sanity API.

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
              - item: "ruhrpott-metalsmith-sanity-match-just-right"
              - item: "ruhrpott-metalsmith-sanity-source-plugin"
              - item: "ruhrpott-sanity-studio-setup"
---