---
layout: blocks.njk
draft: false
pageType: page

seo:
  title: Projects | Werner Glinka
  description: ""
  socialImage: >-
    https://res.cloudinary.com/glinkaco/image/upload/v1646849499/tgc2022/social_yitz6j.png
  canonicalOverwrite: ''

sections:
  - container: section
    description: page banner
    containerFields:
      animateSection: false
      disabled: false
      containerId: page-banner
      containerClass: page-banner
      inContainer: false
      background:
        color: ''
        image: v1691014699/projects-banner_znnxqf.jpg
        isDark: false
    columns:
      - blocks:
        - name: page-banner
          blockClass: ''
          text:
            prefix: ''
            title: Projects
            header: h1
            subtitle: Dabbling in Open Source
            prose: ''
  
  - container: section
    description: text only section
    containerFields:
      disabled: false
      containerId: ''
      containerClass: ''
      inContainer: false
      background:
        color: ''
        image: ''
        isDark: false
    columns:
      - blocks:
        - name: text
          blockClass: "more-space page-intro"
          title: ""
          header: ""
          subtitle: ""
          prose: |-
            My primary focus of interest lies in [Metalsmith](https://metalsmith.io/), a static site generator that motivates me to delve deeper into node.js. Metalsmith is more than just a simple, pluggable static site generator, as its core functionality involves reading files from a directory, converting them into JavaScript objects, exposing them to plugins for manipulation, and ultimately converting the objects back into files that are then written to a designated destination directory. It acts as an "engine" that facilitates this entire process.
    columnsDirection: ''

  - container: section
    description: image only section
    containerFields:
      disabled: false
      containerId: ''
      containerClass: ''
      inContainer: true
      background:
        color: ''
        image: ''
        isDark: false
    columns:
      - blocks:
        - name: image
          blockClass: "limit-width"
          src: 'v1645224179/tgc2022/blogImages/orca1/what-is-metalsmith_co5vzn.jpg'
          alt: 'How Metalsmith Works'
          caption: 'How Metalsmith Works'
          fitimage: false
  
  - container: section
    description: text only section
    containerFields:
      disabled: false
      containerId: ''
      containerClass: ''
      inContainer: false
      background:
        color: ''
        image: ''
        isDark: false
    columns:
      - blocks:
        - name: text
          blockClass: "page-intro"
          title: ""
          header: ""
          subtitle: ""
          prose: |-
            Unlike monolithic static site generators such as Gatsby or Hugo, Metalsmith offers a clear and simple understanding of its functionality. With its node plugin architecture, even complex plugins can be easily created, and there is a vast selection of plugins available to choose from.

            Metalsmith, originally developed by Segment in early 2014, experienced a period of inactivity after a few years of initial development. 

            Recently, a new lead developer/maintainer Kevin Van Lierde AKA [webketje](https://github.com/webketje) has taken over and Metalsmith is now again under active development. [Read more about this history here](https://www.metalsmith.io/about/).

    columnsDirection: ''

  - container: aside # section || article || aside
    description: "cta banner"
    containerFields:
      disabled: false
      containerId: ""
      containerClass: "cta-banner multiple-ctas"
      inContainer: false
      background:
        color: ""
        image: ""
        isDark: false
    columns:
      - blocks:
        - name: cta
          url: "https://metalsmith.io/"
          label: "Metalsmith Website"
          isExternal: true
          isButton: true
          buttonStyle: "primary"
      - blocks:
        - name: cta
          url: "https://github.com/metalsmith"
          label: "Metalsmith Github Repository"
          isExternal: true
          isButton: true
          buttonStyle: "primary"

  - container: section
    description: text only section
    containerFields:
      disabled: false
      containerId: ''
      containerClass: ''
      inContainer: false
      background:
        color: ''
        image: ''
        isDark: false
    columns:
      - blocks:
        - name: text
          blockClass: "page-intro"
          title: "Plugins"
          header: "h2"
          subtitle: ""
          prose: |-
            Over the years, I've created several plugins that I've made available to the community through my GitHub repository and npm. I also frequently contribute to existing plugins, as part of my commitment to the continuous evolution of the development landscape. Here are a few of my notable projects:

            **[Metalsmith Markdown Partials](https://github.com/wernerglinka/metalsmith-markdown-partials):** 
            
            This plugin facilitates the reuse of markdown partials, by replacing include markers in a markdown file's content. The key advantage is that it promotes modular markdown and the reuse of content.

            
            **[Metalsmith Blog Lists](https://github.com/wernerglinka/metalsmith-blog-lists):** 
            
            This tool adds metadata lists, such as 'All Blogs', 'Recent Blogs', 'Featured Blogs', and an 'Annualized Blogs List', which can be accessed by all pages. These lists are useful for creating widgets to promote featured or latest blog posts. Please note that this plugin requires all blog posts to be located in the 'blog/' directory of the content.

            
            **[Metalsmith Safe Links](https://github.com/wernerglinka/metalsmith-safe-links):** 
            
            This plugin optimizes links by stripping the protocol and hostname from local links, and adding a target and rel attribute to external links. Given that markdown syntax only permits alt and title attributes in links, this plugin eliminates the need for HTML to add other attributes in a markdown document.

            
            **[Metalsmith Prism](https://github.com/wernerglinka/metalsmith-prism):** 
            
            A plugin initially authored by Robert McGuinness and sponsored by Availity, Metalsmith Prism enables syntax highlighting for Metalsmith HTML templates using [Prism.js](https://prismjs.com/). I took over the maintenance of this plugin in March 2022.

            
            **[Metalsmith Static Files](https://github.com/wernerglinka/metalsmith-static-files):** 
            
            Designed to copy a directory from the source folder to the build folder, this plugin was created as an up-to-date alternative to the now deprecated and archived metalsmith-assets.

  - container: section
    description: text only section
    containerFields:
      disabled: false
      containerId: ''
      containerClass: ''
      inContainer: false
      background:
        color: ''
        image: ''
        isDark: false
    columns:
      - blocks:
        - name: text
          blockClass: "page-intro"
          title: "Starters"
          header: "h2"
          subtitle: ""
          prose: >-
            Here are some starters that may be helpful to get started with building a Metalsmith site.

            #### [Metalsmith Bare-bones Starter](https://github.com/wernerglinka/metalsmith-bare-bones-starter)

            As the name says, this starter is providing a bare-bones setup to get you started. It uses Markdown content and Nunjucks templating and has a couple of pages. The rest is up to you.


            **Plugins:**
              - @metalsmith/drafts
              - metalsmith-metadata
              - @metalsmith/markdown
              - @metalsmith/permalinks
              - metalsmith-layouts
              - metalsmith-assets
              - metalsmith-if
              - metalsmith-html-minifier

            #### [Metalsmith Blog Starter](https://github.com/wernerglinka/metalsmith-blog-starter)

            A blog starter, based on the Metalsmith Bare-bones Starter. It adds a blog landing page and several "greek" blog posts. The rest is up to you.


            **Plugins:**
              - @metalsmith/drafts
              - metalsmith-metadata
              - @metalsmith/collections
              - @metalsmith/markdown
              - @metalsmith/permalinks
              - @metalsmith/layouts
              - metalsmith-prism
              - metalsmith-assets
              - metalsmith-if
              - metalsmith-html-minifier

            #### [Metalsmith Company Starter](https://github.com/wernerglinka/metalsmith-company-starter)

            Company websites are normally more complex than your average portfolio or blog site. Here is a starter that inlcudes flexible page layouts, a responsive/progressive image component and more.


            **Plugins:**
              - @metalsmith/drafts
              - metalsmith-metadata
              - @metalsmith/collections
              - @metalsmith/markdown
              - @metalsmith/permalinks
              - @metalsmith/layouts
              - metalsmith-prism
              - metalsmith-static
              - @metalsmith/sass
              - @metalsmith/postcss
              - metalsmith-if
              - metalsmith-html-minifier


---