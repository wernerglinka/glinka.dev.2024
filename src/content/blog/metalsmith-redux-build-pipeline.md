---
layout: blocks.njk
draft: true
pageType: "blog-post"
disableDefaultFooter: true
item: "metalsmith-redux-build-pipeline" # used as a key for blogpost filters

seo:
  title: "Metalsmith Redux - Static Site Generation in 2025 | Werner Glinka"
  description: "We examine package.json, one of the most important files in any Node.js project. While it might not be the most exciting file in our project, package.json is crucial. It defines our project, what it depends on, and the commands we can run to build, develop, and maintain it"
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1744827639/project-pipeline_yhqg15.jpg"
  canonicalOverwrite: ""

blogTitle: "Metalsmith Redux - The Build Pipeline"
date: 2025-04-24
author: ""
image:
  src: "v1744827639/project-pipeline_yhqg15.jpg"
  alt: ""
  caption:
excerpt: "We examine package.json, one of the most important files in any Node.js project. While it might not be the most exciting file in our project, package.json is crucial. It defines our project, what it depends on, and the commands we can run to build, develop, and maintain it"

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
        image: "v1744827639/project-pipeline_yhqg15.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Metalsmith Redux: The Build Pipeline"
              header: "h1"
              subtitle: ""
              prose: ""
            date: 2025-04-24
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
              I've been building websites with [Metalsmith](https://metalsmith.io/) since 2017 and have written about various aspects of it over the years. But I've usually assumed readers already know what it is. So let's start fresh. This post kicks off a series introducing Metalsmith as an excellent choice for building websites in 2025.

              Why Metalsmith? While JavaScript frameworks get more complicated yearly and require constant updates, Metalsmith keeps things simple and stable. It's perfect for blogs, portfolio sites, and marketing pages - the kinds of sites most of us actually build day-to-day. If you're new to Metalsmith and want to learn how to use it, stick around.

              ## What is Metalsmith?
              At its core, Metalsmith is a static site generator built on [Node.js](https://nodejs.org/). But unlike many of its competitors, Metalsmith doesn't force you into rigid templates, prescribed workflows, or complex DevOps configurations. Instead, it follows a simple philosophy:

              - Read files from a source directory
              - Apply transformations through plugins
              - Write the results to a destination directory

              ![](https://res.cloudinary.com/glinkaco/image/upload/v1645224179/tgc2022/blogImages/orca1/what-is-metalsmith_co5vzn.jpg)
              
              That's it. This straightforward approach gives you complete control over how your content is processed and transformed. Metalsmith treats your source files as data that can be manipulated with JavaScript, making it versatile without being overwhelming.

              ## "Use the Platform" in 2025

              Back in 2023, I wrote about the ["Use the platform"](/blog/use-the-platform) philosophy in web development. This approach encourages developers to leverage the inherent capabilities of web technologies without relying on complex frameworks and build tools. Two years later, this philosophy is even more relevant.

              Modern web development has become increasingly complicated. Developers are expected to master intricate build pipelines, complex state management, and du jour toolchains just to create relatively simple websites. It's easy to forget that at its core, the web is about HTML, CSS, and JavaScript - technologies that browsers understand natively.

              Metalsmith embodies this "Use the platform" mindset by focusing on what matters: transforming content into websites without unnecessary complexity. Instead of forcing you to learn framework-specific abstractions, it works with concepts web developers already understand.

              ## The Issue with Modern JavaScript Frameworks

              Before we explore Metalsmith's advantages in more detail, let's address the elephant in the room: the overwhelming complexity of many modern JavaScript frameworks.

              Today's popular frameworks often come with:

              - **Steep learning curves** that require understanding complex concepts before you can build even simple sites
              - **Complicated DevOps setups** with bundlers, transpilers, and configuration files can be daunting to newcomers
              - **Frequent breaking changes** that force you to update your codebase just to maintain functionality
              - **Heavyweight solutions** that add unnecessary complexity to simple blogs, portfolios, or marketing sites

              When you only need a straightforward website, these frameworks can feel like using a sledgehammer to hang a picture frame. They're powerful tools but often excessive for many common web projects.

              ## Why Choose Metalsmith in 2025?

              Metalsmith offers a simple alternative to framework complexity with several compelling advantages:

              ### 1. Stability and Longevity
              Metalsmith has maintained a consistent, stable API for years. While other frameworks introduce breaking changes with each major version, Metalsmith's core functionality remains reliable. You won't have to rewrite your site every six months to keep up with the latest version.
              This stability means your investment in learning Metalsmith pays dividends over time. The knowledge you gain today will still be relevant years from now.

              ### 2. The Plugin Ecosystem
              Metalsmith's strength lies in its plugin architecture. Each plugin performs a single, well-defined task, allowing you to build the pipeline you need without unnecessary bloat. Need Markdown processing? Add a plugin. Want layouts? Add another plugin. This modular approach means your build process can be as straightforward or sophisticated as your project requires. And if a plugin is unavailable for the special thing you want to do, it is pretty simple to build one yourself.
              
              ### 3. Complete Control
              Many modern static site generators make assumptions about how your site should be structured or how content should be organized. Metalsmith makes no such assumptions. It provides the foundation, and you decide how to build upon it. This level of control is invaluable for projects with unique requirements or custom workflows.
              
              ### 4. JavaScript All the Way
              Metalsmith offers a significant advantage for JavaScript developers: your entire build pipeline uses the same language as your frontend code. There is no need to learn a separate templating language or configuration syntax (unless you want to). Everything is just JavaScript, making it approachable for anyone familiar with Node.js.
              
              ### 5. Minimal Cognitive Load
              [Metalsmith's core is remarkably small](https://github.com/metalsmith/metalsmith)—just a few hundred lines of code with a [straightforward API](https://metalsmith.io/api/). There's not much to learn before you can start being productive. The pipeline approach is intuitive: files go in, transformations happen, and files come out. This simplicity makes Metalsmith easy to reason about, even as your project grows in complexity.
              
              ## Perfect for Blogs, Portfolios, and Marketing Sites
              
              Metalsmith is best for projects that don't need the complexity of full-fledged web applications:

              - Personal blogs where you want to focus on writing, not configuring webpack
              - Portfolio sites that showcase your work without unnecessary overhead
              - Marketing websites that need to be fast, reliable, and easy to maintain
              - Documentation sites where content organization and clarity are paramount

              Metalsmith provides everything you need for these projects without the cognitive burden of more complex frameworks.
              
              ### Who Should Use Metalsmith?
              Metalsmith is particularly well-suited for:
              - Developers tired of framework churn who want a stable foundation for their projects
              - Content-focused sites like blogs, documentation, or marketing pages
              - Projects with unique or specialized requirements that don't fit neatly into other frameworks
              - JavaScript developers who want to leverage their existing knowledge
              - Teams that value simplicity and maintainability over trendy features

              ## Looking Ahead in This Series

              This blog post is the first in a series that will explore Metalsmith in depth. In the coming articles, we'll:

              - Get started with a simple Metalsmith site
              - Explore site structure and organization best practices
              - Enhance your site with essential plugins
              - Master advanced templating techniques with Nunjucks
              - Integrate components into your content with the M+N plugin
              - Build structured, modular pages with sections
              - Extend Metalsmith with custom plugins and optimizations

              By the end of this series, you'll have all the knowledge you need to build sophisticated, high-performance sites with Metalsmith.

              ## Conclusion

              While new, hot web development frameworks come and go ( remember Gatsby?), Metalsmith offers a refreshingly stable approach. It provides a clear mental framework for understanding how your site is built, while its plugin architecture gives you the flexibility to add exactly the features you need—nothing more, nothing less.

              Metalsmith reminds us that sometimes the most powerful solutions are also the simplest. By focusing on doing one thing well—transforming files—Metalsmith provides a foundation that can support everything from simple blogs to complex documentation sites and beyond.

              [The following article](/blog/metalsmith-redux-getting-started) will dive into practical territory, setting up a basic Metalsmith project using a starter and building our first pages. Until then, happy building!

              Ready to get started with Metalsmith? Check out my [simple starter ](https://github.com/wernerglinka/metalsmith2025-simple-starter) and follow along with this series!

              Any comments? Find me on [Bluesky](https://bsky.app/profile/wernerglinka.bsky.social).
              
  - container: aside # section || article || aside
    description: "social share links"
    containerFields:
      disabled: false
      containerId: ""
      containerClass: "share-links"
      inContainer: false
      background:
        color: ""
        image: ""
        isDark: false
    columns:
      - column:
        blocks:
          - name: social-shares
            blockClass: ""
            text:
              prefix: ""
              title: "Share this post"
              header: "h3"
              subtitle: ""
              prose: ""
            url: "/blog/metalsmith-redux-intro"
            socialTitle: "Metalsmith Redux - Static Site Generation in 2025"
            socialComment: "Let's talk about Metalsmith. It's a static site generator that's been around for a while, and for good reason. Metalsmith keeps things simple and stable. It's particularly good for blogs, portfolio sites, and marketing pages - the kinds of sites most of us actually build day-to-day"
  
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
              - item: "use-the-platform"
              - item: "metalsmith-starters"

---