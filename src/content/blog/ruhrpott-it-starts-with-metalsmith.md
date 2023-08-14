---
layout: blocks.njk
draft: false
pageType: "blog-post"
disableDefaultFooter: true
item: "ruhrpott-it-starts-with-metalsmith" # used as a key for bloglist filters

seo:
  title: "Ruhrpott - it starts with Metalsmith | Werner Glinka"
  description: "Metalsmith is a versatile static site generator that allows for customization through various plugins. Using a structured content model, it enables building succinct, reusable page components. We'll explore this through a practical example."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1690740357/blacksmith_cu4d0y.jpg"
  canonicalOverwrite: ""

blogTitle: "Ruhrpott - it starts with Metalsmith"
date: 2022-12-01
author: ""
image:
  src: "v1690740357/blacksmith_cu4d0y.jpg"
  alt: ""
  caption:
excerpt: "Metalsmith is a versatile static site generator that allows for customization through various plugins. Using a structured content model, it enables building succinct, reusable page components. We'll explore this through a practical example."

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
              title: "Ruhrpott - it starts with Metalsmith"
              header: "h1"
              subtitle: ""
              prose: ""
            date: 2022-12-01

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
              Metalsmith is a flexible static site generator, agnostic to how a website is built. It can be used to create websites with either structured content, using the contents property or the metadata object to provide data for page components. It is designed to be highly extensible, allowing you to use a wide range of plugins to customize the build process to suit your needs. With Metalsmith, you can import content from external sources, transform and filter the data, and then render the data using templates to generate HTML files that a web server can serve.

              The metadata object can be considered a data layer object available during page builds, which may be defined in the source page Frontmatter or external data from a headless CMS.

              Instead of using Markdown for all content, a structured content model can be defined with YAML objects in the page Frontmatter, which can be used to build simple "page builders." This approach often results in shorter page layout files, as the code is organized into smaller component files and can be easily reused on any page.

              A structured content model defines and organizes the content used in a specific context, such as a website or application. It identifies the types of content needed, arranges them logically, and defines the relationships between different pieces of content.

              An example of how to use a structured content model to build page section components with Metalsmith can be seen on the [Metalsmith Components](https://metalsmith-components.netlify.app/) website.

              We will look further into content modeling in the post [Structured Content from Sanity](/blog/ruhrpott-structured-content-sanity/).

              ## A practical example

              In this example, I use Nunjucks as the templating language, for it uses a syntax similar to that of Jinja or Twig, making it easy to learn and use. It supports includes and inheritance and supports custom filters, tags, and functions.

              For our example, we will examine a Media section, a pattern one can find all over the web. It refers to a two-column box with an image on one side and related text on the other. Our media section is composed of three base components:

              - Text
              - CTA
              - Image

              The example section is used to highlight a significant annual event in the Ruhr Valley, Germany, and is defined in the page Frontmatter like this:

              ```yaml
              sectionFields:
                sectionType: media
                disabled: false
                containerID: ""
                containerClass: ""
                inContainer: true
                addSpacing:
                  margin:
                    top: false
                    bottom: false
                  padding:
                    top: false
                    bottom: false
                hasBackground: false
                  color: ""
                  image: ""
                  cssBackground: ""
                  isDark: false
                blockOrder: imageRight
              text:
                titlePrefix: Upcoming Event
                  title: Cranger Kirmes
                  headerType: "h2"
                  subtitle: Every first Friday of August, every year.
                  prose: "Cranger Kirmes in Herne stands out with the 500-odd showmen and their roller coasters, ghost trains, games, and curios spread out over a 111,000-square-meter space. Originally founded in the 15th century as a horse market, Cranger Kirmes soon evolved into an entertainment event replete with jugglers and magicians. Today, the colorful funfair welcomes about 4 million visitors over 10 days starting the first Friday of August."
              cta:
                title: Learn More
                isExternalLink: true
                url: "https://cranger-kirmes.de/"
                kind:
                  button: true
                  link: false
                  linkType: "primary"
              image:
                src: "https://cdn.sanity.io/images/349a1vg2/production/02a7429bfb4ee3ae930f0d487ee16a058a06353e-1280x939.jpg"
                alt: "Cranger Kirmes Folk Festival Fair"
                caption: "Cranger Kirmes Folk Festival Fair"
                credits: ""
              ```

              This is what the rendered section looks like

              ![](https://res.cloudinary.com/glinkaco/image/upload/w_1800,f_auto//v1681164428/cranger-kirmes_tarsoy.png)

              Let's break down the section definition.

              The object `sectionFields` contains a set of common fields shared by all page sections. These fields allow the section type to be defined, enable the section to be disabled or temporarily hidden, and provide the option to add attributes such as a container ID or class. Additionally, the `addSpacing` field allows for customization of section spacing, while the `background` field allows for the application of a solid color, image, or CSS pattern as the section's background. The `isDark` field allows the text color to be changed from the default dark color to a light color, and the `blockOrder` field determines the position of the section's image in relation to the text (either on the left or right side).

              The common section fields are followed by the type-specific building blocks of the media section: `text`, `cta`, and `image`. One can see the relationship between the example code with the rendered section by matching the values of the various fields with their visual representation.

              During the Metalsmith build process, the Frontmatter YAML object is added to the metadata layer and becomes available to plugins. The plugins don’t care where the metadata comes from; they may as well be inserted dynamically with another plugin, allowing a CMS to provide content information without source files.

              We will explore that route in the following blog post.

              A template to build the section may look like this:

              ```javascript
              {% from "../partials/cta.njk" import cta %}
              {% from "../partials/image.njk" import image %}

              {% macro media(info) %}

                {% if info.titlePrefix %}
                  <p class="prefix">{{ info.titlePrefix }}</p>
                {% endif %}

                {% if info.title %}
                  {% if info.headerType === "h1" %}
                    <h1 class="page-heading">{{ info.title }}</h1>
                  {% elif info.headerType === "h2" %}
                    <h2 class="section-heading">{{ info.title }}</h2>
                  {% else %}
                    <h3 class="section-heading">{{ info.title }}</h3>
                  {% endif %}
                {% endif %}

                {% if info.subtitle %}
                  <p class="sub-title">{{ info.subtitle }}</p>
                {% endif %}

                {% if info.image %}
                  {{ image(info.image) }}
                {% endif %}

                {% if info.prose %}
                  <div class="prose">{{ info.prose | mdToHTML | safe }}</div>
                {% endif %}
                
                {% if info.cta %}
                  {{ cta(info.cta) }}
                {% endif %}

              {% endmacro %}
              ```

              Here we use a macro to isolate the section fields from the global scope so other sections which use the same fields cannot be overwritten.

              The result is shown in the [above image](#image-above).

              This example is based on a source file with all content fields defined in the file's Formatter. [Next](/blog/ruhrpott-structured-content-sanity/), we will explore how to do the same thing but the content coming from Sanity CMS.

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
              - item: "ruhrpott-metalsmith-sanity-match-just-right"
              - item: "ruhrpott-metalsmith-sanity-source-plugin"
              - item: "ruhrpott-sanity-studio-setup"
              - item: "ruhrpott-structured-content-sanity"  
---