---
layout: blocks.njk
draft: false
pageType: "blog-post"
disableDefaultFooter: true
item: "introducing-metalsmith-mdn" # used as a key for bloglist filters

seo:
  title: "Introducing Metalsmith MDN | Werner Glinka"
  description: "MDN is a Metalsmith plugin that revolutionizes the way we can reusa section components within markdown content, leveraging the power of Nunjucks templating."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1711578702/m_n-header_yw6yhq.jpg"
  canonicalOverwrite: ""

blogTitle: "Introducing Metalsmith MDN"
date: 2024-03-27
author: ""
image:
  src: "/v1711578702/m_n-header_yw6yhq.jpg"
  alt: ""
  caption:
excerpt: "By adopting MDN in your Metalsmith projects, you can significantly enhance your markdown files, making them more dynamic and reusable.  "

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
        image: "/v1711578702/m_n-header_yw6yhq.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Introducing Metalsmith MDN"
              titleCase: false
              header: "h1"
              subtitle: "Enhancing Markdown with embedded Nunjucks Components"
              prose: ""
            date: 2024-03-27

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

              Markdown is an important tool for developers and writers, prized for its simplicity and efficiency in writing web content. However, its inherent limitations in handling long-form content, particularly in incorporating reusable Page Sections, have posed challenges. Enter MDN, a brand new Metalsmith plugin inspired by MDX, creating the way of embedding reusable Section Components within Metalsmith markdown content.

              <img src="/assets/images/m+n.svg" alt="Metalsmith MDN" class="blog-image mn-logo" />

              Leveraging the robust capabilities of Nunjucks templating, MDN empowers creators to overcome markdown's traditional limitations, enabling unprecedented flexibility in Metalsmith content creation.

              ### Introduction to Section Components

              For those unfamiliar, [Section Components](https://metalsmith-components.netlify.app/) are [reusable blocks of code](https://ms-start-docs.netlify.app/) that can define a portion of a webpage, like a header, footer, or a specific content section. They promote efficiency and consistency across web pages. MDN allows you to reuse these components directly in your markdown files, bridging the gap between simple markdown content and dynamic template features. This is particularly useful for long text pages where you want to maintain a consistent look and feel with the rest of your site.

              ### Getting Started with MDN

              #### Installation

              ```batch
              npm install metalsmith-mdn
              ```

              #### Usage

              Once installed, you can incorporate MDN into your Metalsmith build process. MDN should be used immediately before the markdown plugin to ensure proper processing of your content. Here's a quick setup example:

              ```javascript
              import Metalsmith from 'metalsmith';
              import markdown from '@metalsmith/markdown';
              import MDN from 'metalsmith-mdn';

              Metalsmith(__dirname)
                ...
                .use(MDN({
                  templatesDir: "layouts",
                  customFilters: "nunjucks-filters.js",
                }))
                .use(markdown())
                ...
              ```

              This setup tells Metalsmith to use MDN with specified options for template directory and custom Nunjucks filters, followed by the markdown plugin to process the markdown files.

              ### Configuration Options

              - **templatesDir**: This option specifies the directory where your Nunjucks templates are stored, relative to the Metalsmith root. The default is "layouts" if not specified.
              - **customFilters**: If you have custom Nunjucks filters, you can specify the filename here. The file should be in the Metalsmith root directory, defaulting to "nunjucks-filters.js" if not set.

              ### Implementing Section Components in Markdown

              To use a section component in your markdown, simply include it using the `mdn` tag within your markdown file. Here's how:

              #### `index.md`

              ```markdown
              ---
              layout: simple.njk
              bodyClass: "home"

              seo:
                title: My Awesome Metalsmith Website
                description: "Fusce Aenean Ridiculus Tristique"
                
              mySectionComponent:
                layout: sections/intro.njk
                text:
                  title: Important Information
                  header: "h2"
                  subTitle: ""
                  prose: |-
                    Morbi leo risus, porta ac consectetur ac, vestibulum at eros. 
              ---

              # Home page title
              Donec id elit non mi porta gravida at eget metus. Donec sed odio dui. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.

              {#mdn "mySectionComponent" #}

              Curabitur blandit tempus porttitor. Nullam id dolor id nibh ultricies vehicula ut id elit. Vestibulum id ligula porta felis euismod semper.
              ```

              In this example, the `mySectionComponent` defined in the frontmatter is included in the markdown content using the `{#mdn "mySectionComponent" #}` tag. This component is defined in the `sections/intro.njk` file and uses a `text` macro from another template for processing its content.

              #### `layouts/sections/intro.njk`

              ```clike
              {% from "../partials/text.njk" import text %}

              <section class="section-intro">
                <div class="content">
                  {% set info = params %}
                  {{ text(info.text) }}
                </div>
              </section>
              ```

              #### `layouts/partials/text.njk`

              ```clike
              {% macro text(info) %}

                {% if info.title %}
                  {% if info.header === "h1" %}
                    <h1>{{ info.title }}</h1>
                  {% elif info.header === "h2" %}
                    <h2>{{ info.title }}</h2>
                  {% else %}
                    <h3>{{ info.title }}</h3>
                  {% endif %}
                {% endif %}

                {% if info.subTitle %}
                  <p class="sub-title">{{ info.subTitle }}</p>
                {% endif %}

                {% if info.prose %}
                  <div>{{ info.prose | mdToHTML | safe }}</div>
                {% endif %}

              {% endmacro %}
              ```

              ### The Result

              After processing, the markdown content along with the included section component is transformed into HTML. The section component's content is rendered according to the props defined in the markdown file's frontmatter, seamlessly integrating with the markdown content.

              #### `index.html`

              ```html
              <h1>Home page title</h1>
              <p>Donec id elit non mi porta gravida at eget metus. Donec sed odio dui. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>

              <section class="section-intro  ">
                <div class="content">
                  <h2>Important Information</h2>
                  <div>
                    <p>Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                  </div>
                </div>    
              </section>

              <p>Curabitur blandit tempus porttitor. Nullam id dolor id nibh ultricies vehicula ut id elit. Vestibulum id ligula porta felis euismod semper.</p>

              ```

              By adopting MDN in your Metalsmith projects, you can significantly enhance your markdown files, making them more dynamic and reusable. This approach not only improves the efficiency of content creation but also ensures consistency across your website, providing a richer experience for both developers and end-users.

              The plugin is available on [GitHub](https://github.com/wernerglinka/metalsmith-mdn) and can be installed via npm. Give it a try and see how MDN can revolutionize your Metalsmith content creation process!

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
              - item: "building-flexible-page-layouts"
              - item: "introducing-metalsmith-first-ms-start"
---
