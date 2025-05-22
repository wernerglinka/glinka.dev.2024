---
layout: blocks.njk
draft: false
pageType: "blog-post"
disableDefaultFooter: true
item: "javascript-framework-carousel" # used as a key for bloglist filters

seo:
  title: "The JavaScript Framework Carousel: Why Simple Still Works | Werner Glinka"
  description: "Developers celebrate migrating blogs to Astro or Next.js, describing complex build processes as 'easier than React.' But why does a blog need to fly? Sometimes simple tools are the sophisticated choice."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1747952580/hammer-screws_xekbht.jpg"
  canonicalOverwrite: ""

blogTitle: "The JavaScript Framework Carousel: Why Simple Still Works"
date: 2025-05-24
author: ""
image:
  src: "v1747952580/hammer-screws_xekbht.jpg"
  alt: ""
  caption:
excerpt: "Developers celebrate migrating blogs to Astro or Next.js, describing complex build processes as 'easier than React.' But why does a blog need to fly? Sometimes simple tools are the sophisticated choice."

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
        image: "v1747952580/hammer-screws_xekbht.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "The JavaScript Framework Carousel"
              header: "h1"
              subtitle: "Why Simple Still Works"
              prose: ""
            date: 2025-05-24

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
              I've been reading a lot of "I rebuilt my blog" posts lately. You know the type - developers excitedly describing how they migrated their personal site to Astro or Next.js. They walk through their setup: configuring bundlers, setting up content collections, defining layouts in JSX, organizing components, optimizing build pipelines. Then comes the punchline: "So much easier than React!"

              The irony seems lost on them. They're celebrating the reduction of complexity by adopting a different complex system. It's like boasting that your new car is easier to fly than your old airplane. The question nobody asks is: why did a blog need to fly in the first place?

              This got me curious. Having built and maintained websites for years, I wondered how much of this complexity was actually necessary. So I built the same website three times. A simple blog with a handful of pages and posts, complete with pagination. Once with Metalsmith, once with Astro, and once with Next.js. The results were illuminating, but not in the way the modern web development narrative would have you believe.

              My Metalsmith build - using a starter I've refined over years - completed the fastest and produced exactly what I asked for: HTML files. The Astro and Next.js versions--built with AI assistance because I couldn't be bothered to learn yet another framework--took longer to build and produced larger outputs. For a static site. 

              This experiment made me ask a question that's been nagging at me for years: What happened to just writing HTML, CSS, and JavaScript?

              ## The Problem That Wasn't

              I've been building websites since before content management systems became ubiquitous. Back then, the pain was real - copying headers and footers across too many corporate website pages was a nightmare. When I discovered Metalsmith in its early days, it solved exactly that problem. A simple pipeline: read files, apply templates, write files. No magic, no virtual DOM, no hydration strategies.

              Fast forward to today, and the JavaScript ecosystem has somehow convinced itself that this simple problem requires increasingly complex solutions. Gatsby emerged to build static sites with React. When developers realized that was overkill for content sites, did we return to simpler tools? No. We invented Astro, which markets "shipping zero JavaScript by default" as an innovation. 

              That's like advertising a car that "doesn't fly by default." Metalsmith never flew in the first place - it just drove really well.

              ## The Complexity Carousel

              Here's the pattern I've watched unfold over the past decade:

              1. Static sites have too much repetition → Static site generators solve this
              2. SPAs are the future → Everything must be a SPA
              3. SPAs are overkill for content → Gatsby/Next.js can generate static sites!
              4. Gatsby/Next.js are too heavy → Here's Astro, it's "modern" but ships less JavaScript!

              Notice how we've come full circle? Each new solution partially undoes the complexity of the previous one, while adding its own abstractions. Meanwhile, tools like Metalsmith keep doing what they've always done - transforming content into HTML through a simple, understandable pipeline.

              ## The Real Cost

              The tragedy isn't just in build times or bundle sizes. It's in what we're teaching new developers. We're telling them you need:

              - A framework to organize content
              - A bundler to optimize assets
              - A complex toolchain to achieve what browsers natively understand

              We've made the simple act of publishing content feel like rocket science. A new developer can no longer just write HTML and see it work. They need to understand JSX, component lifecycles, build configurations, and deployment pipelines before they can put words on the web.

              ## Stone Age Technology?

              Metalsmith was released in 2015. In JavaScript years, that makes it ancient. But here's the thing about good ideas - they don't expire. HTML, CSS, and JavaScript didn't become obsolete just because we invented new ways to generate them. A hammer from 1915 still drives nails just fine.

              The perception that older tools are inferior isn't based on capability - it's based on fashion. The JavaScript ecosystem rewards novelty over stability, complexity over simplicity. Using Metalsmith in 2025 might mark you as behind the times, even if your sites build faster and ship leaner than anything built with the "modern" stack.

              ## The Path Forward

              I'm not advocating for stagnation. When you need partial hydration, complex state management, or real-time features, modern frameworks deliver genuine value. But for a blog? For documentation? For the vast majority of content-driven sites?

              Sometimes the most sophisticated choice is recognizing when you don't need sophistication.

              Metalsmith and tools like it represent a different philosophy - one where complexity is added only when necessary, where build tools serve the developer rather than dominate the workflow, where the output is exactly what you'd write by hand, just automated.

              ## A Simple Test

              Here's my challenge to anyone building a content-focused site: Try the simple approach first. Use a [traditional static site generator](/blog/metalsmith-redux-intro). See if it meets your needs. You might be surprised to find that the "old" way of doing things still works remarkably well.

              Because at the end of the day, browsers haven't changed what they want. They still just need HTML, CSS, and JavaScript. Everything else is just the route we take to get there. And sometimes, the shortest route is still the best one.

              ---

              *The author has built several production sites using Metalsmith and contributes to the project. He's not stuck in the past - he just remembers when the future was simpler.*
      
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
            url: "/blog/javascript-framework-carousel"
            socialTitle: "The JavaScript Framework Carousel: Why Simple Still Works"
            socialComment: "Developers celebrate migrating blogs to Astro or Next.js, describing complex build processes as 'easier than React.' But why does a blog need to fly? Sometimes simple tools are the sophisticated choice."
            
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