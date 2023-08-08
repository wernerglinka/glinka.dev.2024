---
layout: blocks.njk
pageType: "blog-post"
disableDefaultFooter: true
item: "creating-svg-line-drawing-animations" # used as a key for bloglist filters

seo:
  title: Creating SVG line drawing animations | Werner Glinka
  description: "Recently, I was inspired by an animated SVG line drawing on the Square Space site. This prompted my exploration into the mechanics of SVG line animation, particularly the use of the stroke-dash property."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1646849499/tgc2022/social_yitz6j.png"
  canonicalOverwrite: ""

blogTitle: "Creating SVG line drawing animations"
date: 2015-05-07
author: ""
image:
  src: "v1685376554/animate-svg-header_ycsv4u.jpg"
  alt: ""
  caption:
excerpt: "Recently, I was inspired by an animated SVG line drawing on the Square Space site. This prompted my exploration into the mechanics of SVG line animation, particularly the use of the stroke-dash property."

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
        image: "v1685376554/animate-svg-header_ycsv4u.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Creating SVG line drawing animations"
              header: "h1"
              subtitle: ""
              prose: ""
            date: 2015-05-07

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
              Recently, I stumbled upon an engaging page on the [Square Space site](http://www.squarespace.com/seven/cover/). This page uniquely employed delightful animations, significantly enhancing user interaction. The use of SVG line animation sparked my interest. Having generally avoided SVG use due to issues with browser compatibility, I was intrigued and resolved to explore this feature. I embarked on creating a small test case and here are some valuable insights I gained:

              ## Understanding SVG Line Animation

              Many online resources discuss SVG line animation; here, I'll briefly explain the concept.

              Observing animated SVG line drawings, one might assume that the animation involves varying the length of individual lines from zero to their full extent. I found it intriguing that the length of a line or path cannot be animated directly. Rather, the illusion of length animation is accomplished using the `stroke-dash` property of an SVG path. The intricacies of this method are expertly elaborated on in two blog posts:

              1. Jake Archibald’s "[Animated Line Drawing in SVG](http://jakearchibald.com/2013/animated-line-drawing-svg/)"
              2. Vox Product’s "[Polygon Feature Design: SVG Animations for Fun and Profit](http://product.voxmedia.com/2013/11/25/5426880/polygon-feature-design-svg-animations-for-fun-and-profit)"

              ## Using requestAnimationFrame Over Interval Timers

              While the initial animation that drew my attention was scroller-based, the two above-mentioned blog posts employ differing strategies for animation implementation. Jake Archibald leverages CSS3 transitions, divulging an insightful trick using getBoundingClientRect to trigger layout, whereas the Vox blog adopts a JavaScript-based approach. The Vox article introduces [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame), an effective method for building JavaScript-based animations. [Paul Irish](https://www.paulirish.com/) explained this early in his 2011 article, "[requestAnimationFrame for Smart Animating](https://www.paulirish.com/2011/requestanimationframe-for-smart-animating/)." [Browser](http://caniuse.com/#search=requestAnimationFrame) support for this was limited then, but it has since dramatically improved, with even Internet Explorer supporting it from version 10 onwards. Polyfills are available to simulate requestAnimationFrame functionality using an interval timer for those who still work with older browsers. Oleg Slobodskoi’s [AnimationFrame.js](https://github.com/kof/animation-frame) is worth consideration.

              Equipped with a solid understanding of SVG line animation mechanics, I set out to build my test case. I used Adobe Illustrator to design three rectangular shapes and exported them as .svg files. The following recounts my journey into the world of SVG animation.

              ![](https://res.cloudinary.com/glinkaco/image/upload/w_1200,f_auto/v1645500871/tgc2022/blogImages/creating-svg-line-drawing-animations/svg-options_zt2cyc.png)

              ## Retrieving the SVG Code: 

              Select **Show SVG Code…** in the SVG Options modal window to access the SVG code. The code will then be displayed in another text modal window. 

              Please note: When creating elementary shapes such as [rectangles](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/rect) or [circles](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/circle), the SVG code will portray them as basic shapes rather than paths, which is incompatible with our purpose. To rectify this, convert the basic shape into a compound path. Select the shape, navigate to `Object > Compound Path > Make`, or use the shortcut `Command + 8` (on a Mac).

              One last step remains before we can wrap up this exercise. It's crucial to ensure that the SVG line drawing is responsive. A wealth of resources is available online to assist with this aspect of the task.

              Below, you will find a visual representation of what this test case ultimately looks like.

              You can download the <a href="/assets/downloads/svg-line-animation-demo.html.zip" data-barba-prevent="self">code for this demo here</a>.

  - container: section # section || article || aside
    description: "svg animation demo"
    containerFields:
      animateSection: false
      disabled: false
      containerId: ""
      containerClass: "svg-animation-demo"
      inContainer: true
      background:
        color: ""
        image: ""
        isDark: false
    columns:
      - column:
        blocks:
          - name: svg-animation-demo
            blockClass: ""
    
  
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
              - item: "case-spinning-image"
              - item: "sanatize-marketo-form" 
---