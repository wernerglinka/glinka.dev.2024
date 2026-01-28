---
layout: blocks.njk
draft: false
pageType: "blog-post"
disableDefaultFooter: true
item: "using-responsive-images" # used as a key for bloglist filters

seo:
  title: Using responsive images | Werner Glinka
  description: "Responsive images, essential for modern web development, improve user experience and reduce loading times. Using the Responsive Image Breakpoints Generator, create images tailored for all screen sizes."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1646867890/tgc2022/blogImages/building-responsive-progressive-image-component/responsive-image_o6hza7.png"
  canonicalOverwrite: ""

blogTitle: "Using responsive images"
date: 2022-03-02
author: ""
image:
  src: "v1646867890/tgc2022/blogImages/building-responsive-progressive-image-component/responsive-image_o6hza7.png"
  alt: ""
  caption:
excerpt: "Responsive images, essential for modern web development, improve user experience and reduce loading times. Using the Responsive Image Breakpoints Generator, create images tailored for all screen sizes."

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
        image: "v1646867890/tgc2022/blogImages/building-responsive-progressive-image-component/responsive-image_o6hza7.png"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Using responsive images"
              header: "h1"
              subtitle: ""
              prose: ""
            date: 2022-03-02

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
              [Responsive Image Breakpoints Generator](https://www.responsivebreakpoints.com/)Understanding the necessity of [responsive images](https://cloudinary.com/blog/introducing_intelligent_responsive_image_breakpoints_solutions) is essential in today's digital landscape. Responsive images are not just an asset, they are an integral part of web development strategy that dramatically improves file sizes, enriches user experience, and significantly decreases loading times. They are especially beneficial for users navigating on compact mobile devices, ensuring optimal performance without unnecessarily consuming bandwidth or prolonging page load times.

              However, incorporating responsive images does pose a challenge. To accommodate varying display sizes and resolutions, site builders must generate multiple versions of each image. This leads us to the inevitable question: in the face of an endless array of screen sizes, how many distinct images are actually necessary?

              That's where the online tool, the [Responsive Image Breakpoints Generator](https://www.responsivebreakpoints.com/), comes into play. This intuitive tool allows us to calculate responsive image breakpoints interactively and produce the required images tailored for every possible screen size.

              Utilizing this tool, I was able to effortlessly create all necessary images for screens ranging from a compact 320px width to an expansive 1440px width. A perfect illustration of this was the diverse set of images I generated for the stunning castle Neuschwanstein in Germany. Using the Responsive Image Breakpoints Generator, I ensured the breathtaking view of this historical marvel was displayed optimally, regardless of the screen size.

              ![](https://res.cloudinary.com/glinkaco/image/upload/w_1800,f_auto/v1646869359/tgc2022/blogImages/building-responsive-progressive-image-component/castle_nz1stw.jpg)

              I set the parameters so the difference in image size between two sizes is 20kB. This means that a user will never load an image with more than 20kB excessive size. The tool will then provide all images and the HTML markup to use. These 10 images will cover the range of screen sizes I specified and minimize the download for each device.
      
              The HTML `<img>` tag tells the browser when to use what image. 

              ```html
              <img src="castle_c_scale,w_1440.jpg"
                sizes="(max-width: 1440px) 100vw, 1440px"
                srcset="
                  castle_c_scale,w_320.jpg 320w,
                  castle_c_scale,w_645.jpg 645w,
                  castle_c_scale,w_803.jpg 803w,
                  castle_c_scale,w_943.jpg 943w,
                  castle_c_scale,w_1079.jpg 1079w,
                  castle_c_scale,w_1196.jpg 1196w,
                  castle_c_scale,w_1283.jpg 1283w,
                  castle_c_scale,w_1281.jpg 1281w,
                  castle_c_scale,w_1401.jpg 1401w,
                  castle_c_scale,w_1440.jpg 1440w
                " 
                alt=""
              >
              ```
              All in all, this is a great tool. It calculates the images we need, creates the images, and provides the code so the browser can display them. 

              But wait! This is just for loading a jpg image. What if we want to use an optimized image format like webp for browsers that support it? File sizes of webp images can be dramatically less then jpg images. 

              In that case we have to use a `<picture>` tag like so:

              ```html
              <picture>
                <source type="image/webp"
                sizes="(max-width: 1440px) 100vw, 1440px"
                srcset=" 
                  castle_c_scale,w_320.webp 320w,
                  castle_c_scale,w_645.webp 645w,
                  castle_c_scale,w_803.webp 803w,
                  castle_c_scale,w_943.webp 943w,
                  castle_c_scale,w_1079.webp 1079w,
                  castle_c_scale,w_1196.webp 1196w,
                  castle_c_scale,w_1283.webp 1283w,
                  castle_c_scale,w_1281.webp 1281w,
                  castle_c_scale,w_1401.webp 1401w,
                  castle_c_scale,w_1440.webp 1440w"
                >
                <img 
                  src="castle_c_scale,w_1440.jpg"
                  sizes="(max-width: 1440px) 100vw, 1440px"
                  srcset="
                    castle_c_scale,w_320.jpg 320w,
                    castle_c_scale,w_645.jpg 645w,
                    castle_c_scale,w_803.jpg 803w,
                    castle_c_scale,w_943.jpg 943w,
                    castle_c_scale,w_1079.jpg 1079w,
                    castle_c_scale,w_1196.jpg 1196w,
                    castle_c_scale,w_1283.jpg 1283w,
                    castle_c_scale,w_1281.jpg 1281w,
                    castle_c_scale,w_1401.jpg 1401w,
                    castle_c_scale,w_1440.jpg 1440w"
                  alt=""
                >
              </picture>
              ```
              This is the markup for one image, it has to be used for every image that is used on the website. In the above example you now have to create 20 different copies for each image on your website. That is insane.
              
              You can see where this is going when you need to include yet another image format, for example `jpeg-xr`.
              
              **Just imagine having 50 images on your website.**

              There must be a better way to do this. In my next post [Building a responsive/progressive image component](/blog/building-responsive-progressive-image-component/), we'll see what that better way may look like.

              In the meantime you may want to review these articles about responsive images:

              - [Responsive images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
              - [A Guide to the Responsive Images Syntax in HTML](https://css-tricks.com/a-guide-to-the-responsive-images-syntax-in-html/)
              - [Responsive Images Done Right: A Guide To `<picture>` And `srcset`](https://www.smashingmagazine.com/2014/05/responsive-images-done-right-guide-picture-srcset/)
              - [Introducing Intelligent Responsive Breakpoints Solutions](https://cloudinary.com/blog/introducing_intelligent_responsive_image_breakpoints_solutions)
          
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