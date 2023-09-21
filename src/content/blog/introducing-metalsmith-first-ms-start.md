---
layout: blocks.njk
draft: false
pageType: "blog-post"
disableDefaultFooter: true
item: "introducing-metalsmith-first-ms-start" # used as a key for bloglist filters

seo:
  title: Introducing Metalsmith First and ms-start | Werner Glinka
  description: "Metalsmith First is a website starter and ms-start is a command-line interface (CLI) tool designed to streamline the process of setting up a Metalsmith First project, an innovative and modular approach to crafting static websites"
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1695321312/start_afwygu.jpg"
  canonicalOverwrite: ""

blogTitle: "Introducing Metalsmith First and ms-start"
date: 2023-09-21
author: ""
image:
  src: "v1695321312/start_afwygu.jpg"
  alt: ""
  caption:
excerpt: "Metalsmith First is a website starter and ms-start is a command-line interface (CLI) tool designed to streamline the process of setting up a Metalsmith First project, an innovative and modular approach to crafting static websites"

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
        image: "v1695321312/start_afwygu.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Introducing Metalsmith First and ms-start"
              header: "h1"
              subtitle: "The Ultimate Way to Build a Metalsmith First Website"
              prose: ""
            date: 2023-09-21
          
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
              In the constantly changing field of web development, there is a continuous need for efficient tools that can make it easier to create static websites. Enter `ms-start`, a command-line interface (CLI) tool designed to streamline the process of setting up a Metalsmith First project, an innovative and modular approach to crafting static websites.

              ## `ms-start`: The Metalsmith First Companion

              **Metalsmith First: The last Starter you'll need**

              Before we dive into the details of `ms-start`, let's explore what makes Metalsmith First unique. At its core, Metalsmith First is a starter kit for Metalsmith, a renowned static site generator. Its embrace of **section-based design** sets it apart, a paradigm that empowers web developers to create entire pages by assembling reusable section components. This approach means you can reuse components across multiple pages, creating consistent and modular websites.

              ### The Power of Section-Based Design
              **Modular Building Blocks for Effortless Customization**

              Imagine building a website using pre-designed building blocks that can be tailored to your needs. This is where section-based design shines. Instead of starting from scratch, you work with modular sections encapsulating specific functionality or content elements. Here are some key benefits:

              **Reusability**: Section components are like building blocks you can use across your website. Need a hero section with a call-to-action button? There's a component for that. Want to showcase a product with an image gallery? There's a component for that, too. This reusability ensures consistency and saves you from duplicating effort.

              **Consistency**: Your website maintains a consistent look and feel with a section-based design. Every instance of a particular section component is styled and behaves the same way, ensuring a uniform user experience.

              **Customization**: While sections are reusable, they are also highly customizable. You can tweak each section's properties to match your specific project requirements. Change colors, adjust layouts, and fine-tune styles with ease.
                
              **Efficiency**: Building a website becomes more efficient. You're no longer wrestling with the intricacies of every page. Instead, you're assembling pages from pre-built components. This saves time and reduces the likelihood of errors.
                
              **Scalability**: As your project grows, section-based design scales with it. Need to add a new section to your page template? It's a matter of adding a new component. No need to overhaul your entire site structure.

              With Metalsmith First, this vision becomes a reality.

              ### `ms-start`: Your Project Kickstarter

              Now, let's shift our focus to `ms-start`, the tool that makes building a Metalsmith First  website a breeze. It's like your project's personal concierge, providing everything you need to kickstart your journey. Here's what `ms-start` brings to the table:

              1. **Seamless Setup**: The `init` command of Ms-Start fetches the Metalsmith First starter from GitHub and integrates it into your local project directory. Say goodbye to the hassle of manual setup.

              2. **Interactive Page Creation**: `ms-start` doesn't stop at initialization. It guides you through an interactive prompt to create one or more pages. You define the page frontmatter, and `ms-start` seamlessly applies it to the corresponding page file.

              3. **Section Components Library**: Metalsmith First is all about modular design, and `ms-start` fully embraces this philosophy. It enables you to integrate new sections into your project effortlessly.

              4. **Documentation Hub**: But that's not all. `ms-start` also provides a [comprehensive documentation hub](https://ms-start-docs.netlify.app/) for all the section components available with `ms-start`. Each section has a dedicated page with detailed explanations of its purpose and practical usage.

              5. **Interactive Sandbox**: The [interactive sandbox](https://ms-start-docs.netlify.app/sandbox/) is even more exciting. You can experiment with each component's properties in a real-time browser environment. This means you can see how each component looks and behaves, making customization a breeze.

              ### Getting Started

              Starting your project with `ms-start` and Metalsmith First is a straightforward process. You get a functional metalsmith.js configuration file and a comprehensive package.json, setting you up for success right from the beginning.

              But that's not all! Metalsmith First includes features like Nunjucks templating, Markdown content, sitemap generation, robots file, smooth page transitions, code syntax highlighting, and more.

              ### Your Journey Begins Today

              In the fast-paced world of web development, having the right tools can make all the difference. With `ms-start` and Metalsmith First, you can easily create stunning, modular, and highly customizable static websites. Say goodbye to tedious setup and hello to a new era of web development.

              Ready to embark on your journey? Visit the [`ms-start` GitHub repository](https://github.com/wernerglinka/ms-start) to get started. We can't wait to see the incredible websites you'll build with this powerful duo.
  
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
      - column:
        blocks:
        - name: cta
          url: "https://github.com/wernerglinka/ms-start"
          label: "ms-start Github Repository"
          isExternal: true
          isButton: true
          buttonStyle: "primary"
      - column:
        blocks:
        - name: cta
          url: "https://ms-start-docs.netlify.app/"
          label: "ms-start Documentation Hub"
          isExternal: true
          isButton: true
          buttonStyle: "primary"
              
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
              - item: "metalsmith-starters"
              - item: "building-flexible-page-layouts"
---