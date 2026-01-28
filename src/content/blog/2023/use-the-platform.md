---
layout: blocks.njk
pageType: "blog-post"
disableDefaultFooter: true
item: "use-the-platform" # used as a key for bloglist filters

seo:
  title: "Simplifying Website Development in 2023: Embracing Metalsmith and Use the Platform Philosophy | Werner Glinka"
  description: "In this blog post, we'll explore how to build a website using the Metalsmith static site generator, aligning with the 'Use the platform' philosophy to streamline web development"
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1690740357/blacksmith_cu4d0y.jpg"
  canonicalOverwrite: ""

blogTitle: "Website Development in 2023"
date: 2023-09-22
author: ""
image:
  src: "v1690740357/blacksmith_cu4d0y.jpg"
  alt: ""
  caption:
excerpt: "In this blog post, we'll explore how to build a website using the Metalsmith static site generator, aligning with the 'Use the platform' philosophy to streamline web development"

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
              title: "Website Development in 2023"
              header: "h1"
              subtitle: "Embracing Metalsmith and 'Use the Platform' Philosophy"
              prose: ""
            date: 2023-09-22

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
              In web development, staying current often involves mastering complex build tools and frameworks, which, while powerful, can introduce unnecessary complexity. In 2023, a call for simplicity encourages developers to "Use the platform." This blog post explores building a website with [Metalsmith First](/blog/introducing-metalsmith-first-ms-start), a starter kit for the static site generator Metalsmith, in alignment with the "Use the platform" philosophy to streamline web development.

              ## Why Choose Metalsmith?

              [Metalsmith](https://metalsmith.io/) embodies the "Use the platform" philosophy with its elegant simplicity. It's an open-source static site generator that prioritizes minimalism. Instead of relying on intricate build pipelines and server-side rendering, Metalsmith generates HTML files from input data and templates, making it an ideal choice for projects that value simplicity and performance.

              ### Avoiding Complex Build Tools

              Many contemporary website generation tools have steep learning curves due to their intricate build processes. Metalsmith bypasses this complexity, enabling web developers to focus on content creation and user experience design without being bogged down by complicated build setups.

              ### Embracing "Use the Platform"

              The "Use the platform" philosophy encourages developers to harness the inherent capabilities of web technologies and browsers without depending on external libraries and frameworks. Metalsmith aligns with this philosophy by producing static websites using HTML, CSS, and plain JavaScript.

              ## Use Metalsmith First

              Creating a website with Metalsmith First is as straightforward as its philosophy. With Node.js installed, initiate your Metalsmith project by running:

              ```bash
              npx ms-start init my-site
              ```

              Then, navigate to the newly created project folder:

              ```bash
              cd my-site
              ```

              Launch the development server:

              ```bash
              npm start
              ```

              Finally, visit http://localhost:3000/ in your web browser to view the home page of the Metalsmith First starter. No additional installations or configurations are required. You can now begin adding pages and page sections with `ms-start` commands.

              By embracing Metalsmith First and the "Use the platform" mindset, developers can bypass steep learning curves and intricate configurations, focusing on what truly matters: content creation and delivering seamless user experiences. If your web project prioritizes simplicity, speed, and accessibility, consider trying Metalsmith First.
      
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
              - item: "introducing-metalsmith-first-ms-start"
              - item: "wordpress-static-website"
              - item: "developer-fatique"

---