---
layout: blocks.njk
draft: false
pageType: "blog-post"
disableDefaultFooter: true
item: "case-spinning-image" # used as a key for bloglist filters

seo:
  title: The case of the spinning image | Werner Glinka
  description: "The blog covers creating responsive, spinning images using the Phi phenomenon. It details merging 36 images into a single sprite to minimize HTTP requests and increase load times. The challenge of maintaining image quality and responsive design is also discussed."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1645641434/tgc2022/blogImages/case-spinning-image/spinning-image-header_ipdkjl.jpg"
  canonicalOverwrite: ""

blogTitle: "The case of the spinning image"
date: 2015-05-31
author: ""
image:
  src: "v1645641434/tgc2022/blogImages/case-spinning-image/spinning-image-header_ipdkjl.jpg"
  alt: ""
  caption:
excerpt: "The blog covers creating responsive, spinning images using the Phi phenomenon. It details merging 36 images into a single sprite to minimize HTTP requests and increase load times. The challenge of maintaining image quality and responsive design is also discussed."


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
        image: "v1645641434/tgc2022/blogImages/case-spinning-image/spinning-image-header_ipdkjl.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "The case of the spinning image"
              header: "h1"
              subtitle: ""
              prose: ""
            date: 2015-05-31

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
              For a recent website redesign project, the design called for some spinning images. This was an interesting request that I hadn't encountered before. There were plenty of jQuery plugins available that could create spinning images, but they seemed over-engineered for my purpose and didn't entirely meet my requirements. The image needed to spin, be responsive, minimize HTTP requests to support fast page load, and, of course, I was curious! So, I decided to build it myself.

              The concept behind spinning images leverages the [Phi phenomenon](https://en.wikipedia.org/wiki/Phi_phenomenon). This is an optical illusion that perceives continuous motion between separate objects viewed rapidly in succession. It's much like a 'zoetrope', one of several pre-film animation devices that create the illusion of motion by displaying a sequence of drawings or photographs showing progressive phases of that motion.

              To achieve the illusion of smooth motion, you need a minimum of 36 images or frames. So, how do we create this illusion of movement? 

              The initial approach I considered was to layer these images on top of each other and successively bring each one to the foreground at high speed. However, this method quickly proved unfeasible because each individual image necessitated a separate HTTP request. With 36 images, the extra HTTP requests would significantly hamper load times.

              ![](https://res.cloudinary.com/glinkaco/image/upload/w_1200,f_auto/v1646764038/tgc2022/blogImages/case-spinning-image/image-stack_il7h7o.png)

              To circumvent this, I turned to an alternative solution: merging all 36 images into a single large one. I used this composite image as the background of a container and manipulated its position by the width of one frame every 36th of a second. This effectively animated the image.

              ![](https://res.cloudinary.com/glinkaco/image/upload/w_1200,f_auto/v1645641423/tgc2022/blogImages/case-spinning-image/image-sprite_b9gh0s.png)
 
              However, this method introduced another concern: the size of the image. Having one large image means a substantial file to download, but even so, it was preferable to the latency caused by 35 additional HTTP requests. This principle is why image sprites are often chosen over individual images. More on this topic can be found on the [Yahoo Developer Pages](https://developer.yahoo.com/performance/rules.html?guccounter=1).

              When creating the large image in Photoshop, it's important to note that the software limits image width to 8192 pixels when saving with 'Save for Web & Devices...'. Instead, I saved the image as a regular JPG file and optimized it [Image Optimizer](http://www.imageoptimizer.net/Pages/Home.aspx).

              The responsive design of the spinning image was achieved by setting up an empty container div with a width set as a percentage of its container. To maintain the correct height, the container's height was set to zero, with a bottom padding equivalent to the single frame aspect ratio in percent. The background image was applied with background-size: cover, which adjusts it to fit the container's height.

              Here's how the CSS looks:

              ```css
              .imageSpinContainer {
                width: 30%;
                height: 0;
                padding-bottom: 33.63%;  /* reflects the single image/frame aspect ratio */
                background: transparent url('../images/cork-screw.jpg') no-repeat 0;
                background-size: cover;
              }
              ```

              By periodically modifying the background position, the image begins to spin. To make this method responsive, it's essential to change the background position as a percentage of the whole background image.

              In the final implementation, I used a single image upon page load to avoid a flash of empty space before the large image sprite had downloaded completely. I then swapped the background image when the onload event occurred, initiating the spinning motion.

  - container: section # section || article || aside
    description: "spinning image demo"
    containerFields:
      animateSection: false
      disabled: false
      containerId: ""
      containerClass: "spinning-image-demo"
      inContainer: true
      background:
        color: ""
        image: ""
        isDark: false
    columns:
      - column:
        blocks:
          - name: spinning-image-demo
            blockClass: ""

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
              For a more interactive experience, the spinning image can be controlled by users. By double-clicking, the spin can be paused or resumed, and clicking and dragging allows the image to be moved manually.

              Explaining every line of code for this project in detail would be quite a lengthy process. So instead, I have made my development sandbox available as an archive. This way, you can download and explore all the components to see how they work together in creating this spinning image. You'll be able to learn at your own pace, diving deep into the sections you're interested in, and potentially adapt it for your own projects.

              You can download the <a href="/assets/downloads/spinning-image.zip" data-barba-prevent="self">code for this demo here</a>.

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
              - item: "creating-svg-line-drawing-animations"
              - item: "sanatize-marketo-form" 

---