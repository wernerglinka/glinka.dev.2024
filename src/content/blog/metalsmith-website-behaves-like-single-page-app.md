---
layout: blocks.njk
draft: false
pageType: "blog-post"
disableDefaultFooter: true
item: "metalsmith-website-behaves-like-single-page-app" # used as a key for bloglist filters

seo:
  title: Making a Metalsmith Website Behave Like a Single-Page App | Werner Glinka
  description: "Discover how to elevate your Metalsmith website with single-page app behavior using Swup. Enhance user engagement with smooth page transitions."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1692220273/swup_as9ajx.png"
  canonicalOverwrite: ""

blogTitle: "Making a Metalsmith Website Behave Like a Single-Page App"
date: 2023-08-18
author: ""
image:
  src: "v1692220273/swup_as9ajx.png"
  alt: ""
  caption:
excerpt: "Discover how to elevate your Metalsmith website with single-page app behavior using Swup. Enhance user engagement with smooth page transitions."

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
        image: "v1692220273/swup_as9ajx.png"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Making a Metalsmith Website Behave Like a Single-Page App"
              header: "h1"
              subtitle: ""
              prose: ""
            date: 2023-08-18
          
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
              Smooth transitions between web pages have become potent tools to enhance user interaction and engagement. One of their key strengths is significantly improving User Experience (UX). Such transitions provide a fluid and pleasant browsing experience, reminiscent of the seamlessness in single-page apps.

              In web performance, the perception of speed and responsiveness often holds more weight than actual load times. Smooth transitions can cleverly mask page-loading delays. This creates an illusion of a more responsive website, amplifying the perceived performance.

              This enhanced perception plays a pivotal role in user engagement. Seamless transitions captivate users, encouraging them to explore and immerse themselves in the website's content.

              But the allure of transitions isn't just skin deep. From a cognitive perspective, these gradual shifts give users with a brief pause—a moment to assimilate the incoming content. This is especially beneficial in mitigating the abruptness of sudden content changes, streamlining the user's cognitive journey.

              So, how do we incorporate this single-app-like experience into a Metalsmith-built static website?

              Enter Swup.

              Describing itself, Swup proclaims:

              > Swup is a versatile and extensible page transition library tailored for server-rendered websites. It oversees the entire page load lifecycle, ensuring a graceful animation between the present and upcoming page. Moreover, it introduces features like caching, smart preloading, native browser history, and enhanced accessibility.

              Incorporating Swup into a Metalsmith website is refreshingly straightforward. Here's a step-by-step guide detailing the integration of a simple fade transition:

              ## Installing Swup

              ```javascript
              npm install swup
              npm install @swup/head-plugin
              ```

              Swup operates primarily within a webpage's `<main>` section. We employ the head plugin to guarantee proper page initialization—ensuring meta tags are refreshed, new stylesheets are loaded, and JavaScript is executed. 

              ## Add Swup Attributes to Your Content Pages
              **layout.njk**

              ```markup
              <main id="swup" class="transition-fade">
                ... content here
              </main>
              ```

              ## Incorporate Animation Styles
              **transition.css**
              ```css
              html.is-changing .transition-fade {
                transition: opacity 0.25s;
                opacity: 1;
              }

              /* Styles for pages during transition */
              html.is-animating .transition-fade {
                opacity: 0;
              }
              ```
              Though Swup offers a themes plugin featuring transitions like fade, slide, and overlay, I gravitated towards the simplicity of a fade transition, adding a handful of CSS lines.

              ## Embed Swup Scripts
              **scripts.js**

              ```javascript
              import Swup from 'swup';
              import SwupHeadPlugin from '@swup/head-plugin';
              const swup = new Swup({
                plugins: [new SwupHeadPlugin()]
              });

              ...

              function initPage() {
              ... initialize page here...
              }

              window.addEventListener("load", function() {
                initPage();
              });

              swup.hooks.on('page:view', () => {
                initPage();
              });

              ```

              Swup initializes with the head plugin. We re-run the `initPage()` function each time page content transitions, ensuring new elements integrate seamlessly

              Achieving a fluid single-page-app behavior is as straightforward as these three steps.

              For those keen on delving deeper, Swup's comprehensive [documentation](https://swup.js.org/getting-started/) simplifies even the most complex transitions.

              However, a word of caution: while the allure of transitions is undeniable, it's imperative to employ them judiciously. Overindulgence can overshadow primary content or even frustrate users. Moreover, prioritizing accessibility is non-negotiable. Transitions, as delightful as they might be, must be crafted to accommodate all users, particularly those with cognitive disabilities.

              And for a demo, look no further than this website. Go ahead, click around, and enjoy the seamless transitions.

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
              - item: "web-component-cloudinary-image"
              - item: "building-responsive-progressive-image-component"
---