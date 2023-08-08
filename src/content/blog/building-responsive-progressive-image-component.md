---
layout: blocks.njk
draft: false
pageType: "blog-post"
disableDefaultFooter: true
item: "building-responsive-progressive-image-component" # used as a key for bloglist filters

seo:
  title: Building a responsive/progressive image component | Werner Glinka
  description: "The post explores creating a lazy-loading image component for Metalsmith/Nunjucks using Cloudinary.io. It uses low-res images first, then high-res as they enter the viewport. It also covers the use of Intersection and Resize Observer APIs."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1646849499/tgc2022/social_yitz6j.png"
  canonicalOverwrite: ""

blogTitle: "Building a responsive/progressive image component"
date: 2022-03-10
author: ""
image:
  src: "v1646931839/tgc2022/blogImages/building-responsive-progressive-image-component/different-devices_hbtqd1.png"
  alt: ""
  caption:
excerpt: "The post explores creating a lazy-loading image component for Metalsmith/Nunjucks using Cloudinary.io. It uses low-res images first, then high-res as they enter the viewport. It also covers the use of Intersection and Resize Observer APIs."

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
        image: "v1646931839/tgc2022/blogImages/building-responsive-progressive-image-component/different-devices_hbtqd1.png"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Building a responsive/progressive image component"
              header: "h1"
              subtitle: ""
              prose: ""
            date: 2022-03-10

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
              In my [previous article](/blog/using-responsive-images/), I discussed the challenges that responsive images present when it comes to building and maintaining a website. In this piece, I will delve into a responsive/progressive lazy-loading image component for Metalsmith/Nunjucks. This component guarantees that we always have an appropriately sized image, irrespective of screen size or device pixel ratio, and that we use the best image format supported by the browser. The inspiration for this project came from a [YouTube video by Glen Maddern](https://www.youtube.com/watch?v=_lQvw2vSDbs&t=2s), which I highly recommend.

              For this approach, we use [cloudinary.io](https://cloudinary.com/) to store all images. Their free plan is very generous, and no credit card is needed to sign up.

              Here's what the component does:

              - Every image is initially loaded at a very low resolution and blurred with CSS. These low-resolution images are rendered at the same size as the original images to avoid content shifts when the high-resolution versions load.
              - As soon as the low-resolution images are loaded, images in the viewport are immediately updated to their high-resolution versions with a fade-in effect.
              - All images outside the viewport remain in low resolution and are lazy-loaded with a fade-in effect as they scroll into the viewport.

              If this sounds familiar, it's because you may have seen similar implementations on Medium or other popular websites.

              ## Implementation

              Firstly, we define the image in our frontmatter. The following example demonstrates the data for the banner image on this page.
                            
              **In the content page**
              ```yaml
              image:
                src: "v1646931839/tgc2022/blogImages/building-responsive-progressive-image-component/different-devices_hbtqd1.png"
                alt: "multiple devices with same image"
                aspectRatio: "50"
                caption: "Based on image by [rawpixel.com/Freepik](http://www.freepik.com)"
              ```
              - `src` - This refers to the Cloudinary image id. The Cloudinary baseURL can be retrieved from the site object in Metalsmith metadata. By combining the BaseURL with the image id, we can generate the source for the high-resolution image.
              - `alt` - This represents the alternative text for the image.
              - `aspectRatio` - This is the aspect ratio of the image. To prevent any content movement when the high-resolution image is inserted, we measure the available width for the image using JavaScript and then calculate the required height for the image. For this step, we need the aspect ratio of the original image.
              - `caption` - This can be used for providing credit or for any other relevant details.

              Instead of an `img` or `picture` tag, we employ a Nunjucks macro in our template.

              **In the template**
              ```javascript
              {% from "../partials/responsive-image.njk" import responsiveImage %}
              ...
              {% set image = params.image %}
              {# site is in scope, was passed via the component macro #}
              {{ responsiveImage(image, site) }}

              ```
              In this step, we initially import the macro and then invoke it with two properties. We pass both the image data from the frontmatter and the site metadata, which comprises the Cloudinary base URL for our account.

              **responsive-image.njk**
              ```javascript
              {% macro responsiveImage(image, site) %}
                <div class="responsive-wrapper js-progressive-image-wrapper" style="padding-bottom:{{ image.aspectRatio}}%;" >

                  {# assemble the image url #}
                  {% set source = site.imagePrefix ~ image.src %}

                  {# get image source for LRIP #}
                  {% set lowResImagesrc = site.imagePrefix ~ "w_100,c_fill,g_auto,f_auto/" ~ image.src %}

                  <img class="low-res" src="{{ lowResImagesrc }}" alt="{{ image.alt }}"/>
                  <img class="high-res" src="" alt="{{ image.alt }}" data-prefix="{{ site.imagePrefix }}" data-source="{{ image.src }}"/>
                </div>
              {% endmacro %}
              ```
              To construct the image wrapper, we employ a time-tested technique known as 'Intrinsic Ratios', introduced by Thierry Koblentz. The aspect ratio is applied via the style attribute. While this method has proven to be effective, it could likely be substituted with the CSS [aspect-ratio](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio) property. However, I will leave the exploration of that alternative to the reader.

              ```html
              <div class="responsive-wrapper js-progressive-image-wrapper" style="padding-bottom:{{ image.aspectRatio}}%;" >
              ```

              Then we assemble the low resolution image source:

              ```javascript
              {% set lowResImagesrc = siteMeta.imagePrefix ~ "w_100,c_fill,g_auto,f_auto/" ~ image.src %}
              ```

              In `lowResImagesrc`, we provide instructions for creating a 100 pixels wide image, cropping it to this width, and focusing on the central part of the image. [Cloudinary's dynamic URL transformations](https://cloudinary.com/documentation/image_transformations) allow us to obtain exactly the image we need without having to manually create one. Cloudinary uses the original image in our account and transforms it on-the-fly.

              Let's examine the portion of the source code that determines the characteristics of the image we receive. This is a set of Cloudinary image transformation parameters:

              - `w_100` - delivers an image of exactly 100px width
              - `c_fill` - crops the image so it fills the available space
              - `g_auto` - applies automatic content-aware gravity by setting the gravity transformation parameter to auto (g_auto in URL syntax). If no gravity is specified in a crop, the image is cropped around its center.
              - `f_auto` - delivers the image in the best format the browser understands. For example, in Chrome, it would deliver a webp image which is smaller than a jpg or png image.

              Next, we have two image tags. The first one, with the `low-res` class, has a valid `src` URL, so the browser fetches it immediately upon loading the page. The second image, with the `high-res` class, has an empty `src` attribute, so the browser ignores it. However, it does have an image ID attached to the `data-source` attribute. We will use this ID to build a valid source URL when this image enters the viewport.

              Now that our markup is defined, the next step is to style it:

              ```css
              .responsive-wrapper {
                position: relative;
                width: 100%;
                height: 0;
                overflow: hidden;

                img {
                  display: block;
                  max-width: 100%;
                }

                .low-res {
                  filter: blur(10px);
                  transition: opacity 0.4s ease-in-out;
                  width: 100%;
                  height: auto;
                }

                .high-res {
                  display: block;
                  position: absolute;
                  top: 0;
                  left: 0;
                  bottom: 0;
                  opacity: 0;
                  transition: opacity 0.4s ease-in-out;
                }

                &.done {
                  .high-res {
                    opacity: 1;
                  }
                  .low-res {
                    opacity: 0;
                  }
                }
              }
              ```

              In the CSS styling, we can observe that the initial `low-res` image is blurred. Once the `high-res` image has been loaded, we will apply the class `done` to the wrapper. This action will mark the completion of the process by fading in the `high-res` image and fading out the `low-res` version.

              The JavaScript that orchestrates all these processes looks like this: (Please provide the code snippet for the completion of this response.)

              ```javascript
              import debounce from "../utilities/debounce";

              const loadResponsiveImage = (function loadResponsiveImage() {
                "use strict"

                // images are loaded when they are visible in the viewport and updated when
                // the viewport width changes.
                
                const loadImage = ((entries, observer) => {
                  // During initial page load the entries array contains all watched objects. The 
                  // isIntersecting property for the individual object indicates visibility.
                  for (let entry of entries) {
                    if ( entry.isIntersecting) {
                      const thisWrapper = entry.target;
                
                      // get the dimensions of the image wrapper and the display pixel density
                      const imageWidth = thisWrapper.clientWidth;
                      const pixelRatio = window.devicePixelRatio || 1.0;
                      
                      // assemble url parameters for the cloudinary image url
                      const imageParams = `w_${100 * Math.round((imageWidth * pixelRatio) / 100)},f_auto`;
                
                      // find the high res image in the wrapper and get the data attributes...
                      const thisImage = thisWrapper.querySelector(".high-res");
                      const thisImagePrefix = thisImage.dataset.prefix;
                      const thisImageSource = thisImage.dataset.source;
                      // ...so we can assemble and replace the image src url
                      thisImage.src = `${thisImagePrefix}${imageParams}/${thisImageSource}`;
                      
                      // take this image of the observe list 
                      observer.unobserve(thisWrapper);
                
                      // once the hi-res image has been loaded, add done class to wrapper
                      // which will fade-in the hi-res image and fade-out the low-res image
                      thisImage.onload = () => {
                        thisWrapper.classList.add("done");
                      };
                    }
                  }
                });

                const updateImage = debounce(function() {
                  // images are only loaded when they are visible
                  const observer = new IntersectionObserver(loadImage);
                
                  // loop over all image wrappers and add to intersection observer
                  const allHiResImageWrappers = document.querySelectorAll(".js-progressive-image-wrapper");
                  for ( let imageWrapper of allHiResImageWrappers ) {
                    observer.observe(imageWrapper);
                  }
                }, 500);

                // resize and intersectionObserver are persistent window methods, ergo they fire after SWUP loads
                const init = () => {
                  // images will update on page load and after a resize
                  const resizeObserver = new ResizeObserver(updateImage);
                  const resizeElement = document.body;
                  resizeObserver.observe(resizeElement);
                };
                
                
                return { init }
                
              }());

              export default loadResponsiveImage;
              ```
              The Intersection Observer API provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or with a top-level document's viewport. This allows us to detect when an image is in the viewport. 

              A Resize Observer, on the other hand, allows us to observe changes to the size of an element's content or border box. This ensures that if an image's display size changes due to a window resize, or other layout changes, we update its size appropriately.

              To further elaborate on the calculated image parameters:

              ```javascript
              const imageParams = `w_${100 * Math.round((imageWidth * pixelRatio) / 100)},f_auto`;
              ```
              The image width is calculated based on the device's pixel ratio to ensure optimal resolution for the given display. For high DPI (dots per inch) screens, such as Apple's Retina displays, which have a device pixel ratio of 2.0, the image width is effectively doubled to provide a crisper, higher resolution image suitable for these screens.

              By adjusting the image size in steps of 100 pixels, you are balancing between image quality and file size. As the display's width increases, the image's width increases in 100-pixel increments, maintaining the optimal image quality without unnecessary file size increase. This process is known as 'responsive resizing' or 'adaptive image resolution'.

              The Cloudinary platform is efficient in this regard as it creates the image transformations on the fly as needed. By limiting the number of image transformations, you are ensuring that only the necessary images are generated, which contributes to efficient resource utilization and management on the Cloudinary platform.

              Therefore, this approach maximizes both visual quality and performance efficiency, providing an optimal user experience across a variety of devices and screen resolutions.

              This is a fantastic way to build a responsive, performance-optimized image loading system for a website. By using this approach, your web pages can start rendering images quicker because initially, they are loading low-resolution versions which are significantly smaller in size and faster to download. Then, as each image scrolls into view, a higher resolution version is loaded to replace the low-resolution one, leading to an optimized, seamless browsing experience for users.

              Here are some additional key benefits:

              1. **Improved User Experience**: Fast loading images greatly enhance the user experience. There's no blank space while waiting for the high-res images to load. The fade-in effect also adds to the site's aesthetics.

              2. **Performance and Efficiency**: By only loading the high-resolution images when they come into the viewport, you reduce the initial loading time of the page and save on bandwidth. This is particularly important for users on slower or metered connections.

              3. **Flexibility**: The image component adjusts the image's width based on the device pixel ratio, which helps to maintain the image quality across different devices and screen sizes. 

              4. **Cloudinary Integration**: The use of Cloudinary for on-the-fly image transformations is a powerful feature. You don't need to create different sizes of each image manually, which can be a time-consuming process. 

              5. **SEO Benefit**: By implementing lazy loading, you can improve your website’s load time, which is a factor in search engine rankings.

              And that is our image component. To see this in action just browse this website and see the images fading in as you change pages and as you scroll.
              
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
              - item: "using-responsive-images"
---