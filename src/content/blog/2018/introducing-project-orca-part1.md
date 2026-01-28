---
layout: blocks.njk
pageType: "blog-post"
disableDefaultFooter: true
item: "introducing-project-orca-part1" # used as a key for bloglist filters

seo:
  title: Introducing Project Orca - Part 1 | Werner Glinka
  description: "Project ORCA blends Drupal's superior CMS capabilities with a static website. Metalsmith, a Static Site Generator, played a crucial role in this project, thanks to its flexibility, security, and speed."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1645224098/tgc2022/blogImages/orca1/orca_ahjaat.jpg"
  canonicalOverwrite: ""

blogTitle: "Introducing Project Orca - Part 1"
date: 2018-07-18
author: ""
image:
  src: "v1645224098/tgc2022/blogImages/orca1/orca_ahjaat.jpg"
  alt: ""
  caption:
excerpt: "Project ORCA blends Drupal's superior CMS capabilities with a static website. Metalsmith, a Static Site Generator, played a crucial role in this project, thanks to its flexibility, security, and speed."

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
        image: "v1645224098/tgc2022/blogImages/orca1/orca_ahjaat.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Introducing Project Orca"
              header: "h1"
              subtitle: "Part 1"
              prose: ""
            date: 2018-07-18

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
              In a previous blogpost, [Who needs a WordPress website?](/blog/wordpress-static-website/), I discussed the potential overuse of Content Management Systems (CMS) like Wordpress and Joomla. I argued that these popular CMSs may be overkill for many small to medium-sized businesses. For such businesses, a static website could be a more suitable alternative.

              ## The Case for a Static Site

              Static sites are highly secure, load quickly, and are cost-effective to host. Notably, they are devoid of the necessity for security patches or updates - reducing administrative burdens and potential security risks. This combination of features makes them particularly attractive to my corporate clients who appreciate the speed and security of static sites. Some, however, expressed a desire to update the page content themselves.

              The seed for project ORCA was sown through these discussions. The project entailed the use of Drupal, known for its superior content management capability, in conjunction with a static website.

              > ORCA is a decoupled Drupal 8 site that serves content to a static website build process.

              ORCA is designed to cater to the website needs of small to medium-sized businesses. The homepage offers a comprehensive overview of the company, similar to a Single Page website, while also providing links to specific landing pages, such as a blog landing page.

              Building a Drupal site involves organizing information into Blocks, created manually on the block admin page, as Nodeblocks, or automatically with Views. These blocks are then dynamically assembled by Drupal to form a page. However, this luxury is absent with static pages, necessitating the use of a [Static Site Generator](https://www.sitepoint.com/7-reasons-use-static-site-generator/).

              Static Site Generators produce HTML-only page files from templates and raw data (which could be in JSON, YML, or Markdown files). They offer some advantages of a CMS without the hosting, performance, and security issues. Combined with a [Templating Engine](https://en.wikipedia.org/wiki/Template_engine), these generators allow the assembly of site pages via a "build step" performed before site upload to the server.

              Among the hundreds of site generators available, [Jekyll](https://jekyllrb.com/) is one of the most well-known and can be used to [create GitHub pages](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/testing-your-github-pages-site-locally-with-jekyll). However, as I'm more proficient with Javascript, I sought a Javascript-based site generator that's also straightforward to use. My search led me to [Metalsmith](https://www.metalsmith.io/), a perfect match for my requirements.

              ## The Power of Metalsmith
              Metalsmith is a Static Site Generator that, in its simplicity, moves files from a source to a destination directory, allowing plugins to modify the files in the process. It's a potent tool in the creation of flexible, secure, and fast static sites.

              ![](https://res.cloudinary.com/glinkaco/image/upload/w_1200,f_auto/v1645119351/tgc2022/what-is-metalsmith_x9t5nr.jpg)

              Metalsmith operates in a three-step process, making it an extremely efficient Static Site Generator.

              - In the initial phase, Metalsmith reads files from a source directory and transforms them into JavaScript Objects.
              - The transformed JavaScript Objects are then subjected to plugins. These plugins can be effortlessly chained together, applying transformations to the JavaScript objects by modifying their properties or values.
              - In the final step, Metalsmith reconverts all the transformed JavaScript objects back into files, writing them to a designated destination directory.
              
              As Metalsmith is based on Nodejs, thousands of plugins are readily available to be utilized within Metalsmith plugins. Furthermore, Metalsmith's compatibility with Gulp opens up access to all Gulp plugins during the build process. If a unique issue arises, creating a custom plugin to solve it is relatively straightforward.

              In the next installment of this series, "Introducing Project Orca - Part 2," we will delve deeper into Metalsmith's functionality. Stay tuned to understand how Metalsmith could become an integral part of your website development process.

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
              - item: "conscious-uncoupling-drupal-metalsmith"
              - item: "introducing-project-orca-part2"
              - item: "introducing-project-orca-part3" 

---