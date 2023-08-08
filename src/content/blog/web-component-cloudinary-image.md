---
layout: blocks.njk
draft: false
pageType: "blog-post"
disableDefaultFooter: true
item: "web-component-cloudinary-image" # used as a key for bloglist filters

seo:
  title: "Building a Custom Web Component: CloudinaryImage | Werner Glinka"
  description: "In this blog post, we will build a custom web component called CloudinaryImage that allows us to lazy load images from Cloudinary. "
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1646849499/tgc2022/social_yitz6j.png"
  canonicalOverwrite: ""

blogTitle: "Creating a Cloudinary Image Web Component
"
date: 2023-08-05
author: ""
image:
  src: "v1691099161/images_hlthlx.jpg"
  alt: ""
  caption:
excerpt: "In this blog post, we will build a custom web component called CloudinaryImage that allows us to lazy load images from Cloudinary. "

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
        image: "v1691099161/images_hlthlx.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Building a Custom Web Component: CloudinaryImage"
              header: "h1"
              subtitle: "Lazy load images from Cloudinary"
              prose: ""
            date: 2023-08-05
          
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
              In this blog post, we will build a custom web component called `CloudinaryImage` that allows us to lazy load images from Cloudinary. Lazy loading can significantly improve the performance of web pages by loading only the images currently visible in the viewport, reducing unnecessary network requests and improving load times. I have written about a responsive/progressive [lazy-loading image component for Metalsmith/Nunjucks](/blog/building-responsive-progressive-image-component) last year, a web component will take this approach to the next level.

              ## Introduction to the `CloudinaryImage` component

              The `CloudinaryImage` component is designed to display a low-resolution image initially and then replace it with a high-resolution image once it becomes visible in the viewport. To achieve this, we will use the Intersection Observer API to detect when the component is in the viewport. The component will also ensure the image maintains its aspect ratio and is styled with the appropriate CSS to prevent layout shifts.

              The component is used like this: 
              ```javascript
              <cloudinary-image 
                base="<cloudinary-base-url>"
                imageId="<cloudinary-image-id>"
                alt="<image-alt-text>"
              ></cloudinary-image>
              ```

              ## Defining Properties and Attributes

              The `CloudinaryImage` component accepts three attributes: `base`, `imageid,` and `alt`. These attributes will be used to build the Cloudinary URLs and provide alternative text for the images. Instead of dynamically defining getters and setters inside the constructor, we will define them explicitly within the class body. It is considered best practice to define getters and setters outside the constructor. Sticking to this convention ensures that your custom elements are consistent with other elements and libraries, making it easier for other developers to understand and work with our code.

              ```javascript
              // explicitly define properties reflecting to attributes
              get base() {
                return this.getAttribute('base');
              }
              set base(value) { 
                if (value) {
                  this.setAttribute('base', value); 
                } else {
                  this.removeAttribute('base');
                }
              }
              get imageid() {
                return this.getAttribute('imageid');
              }
              set imageid(value) { 
                if (value) {
                  this.setAttribute('imageid', value); 
                } else {
                  this.removeAttribute('imageid');
                }
              }
              get alt() {
                return this.getAttribute('alt');
              }
              set alt(value) { 
                if (value) {
                  this.setAttribute('alt', value); 
                } else {
                  this.removeAttribute('alt');
                }
              }
              ```

              Now, our component can update the properties whenever the corresponding attributes are changed and vice versa.

              ## Image Loading and Intersection Observer

              To load the images lazily and swap the low-resolution image with the high-resolution image when it becomes visible, we'll use the Intersection Observer API.

              First we load the low-resolution image in the `connectedCallback` when the component is added to the DOM. When the component becomes visible, the Intersection Observer will call the `loadImage` method. This method will load the high-resolution image and disconnect the Intersection Observer.

              ```javascript
              class CloudinaryImage extends HTMLElement {
                constructor() {
                  super();
                  // Create an Intersection Observer to load the high-resolution image when it becomes visible
                  this.observer = new IntersectionObserver(this.loadImage.bind(this)); 
                  ...
                }

                ...

                connectedCallback() {
                  ...

                  // Load the low-resolution image
                  this.lowResImage.src = `${this.base}w_100,c_fill,g_auto,f_auto/${this.imageid}`;
                  this.lowResImage.alt = this.alt;

                  // Start observing the component for intersection
                  this.observer.observe(this);
                }

                ...

                loadImage(entries, observer) {
                  // Load the high-resolution image when it becomes visible
                  if (!entries[0].isIntersecting) return;

                  // Disconnect the observer once the image is loaded
                  this.observer.unobserve(this);

                  // Set the source for the high-resolution image
                  this.highResImage.src = `${this.base}${this.getImageTransformations()}/${this.imageid}`;
                  this.highResImage.alt = this.alt;

                  ...
                }

                ...
              }
              ```

              ## Image Aspect Ratio

              To prevent layout shifts when loading the images, we set the aspect ratio of the image on the container. We get the image dimensions by using the Cloudinary API so we cvan calculate the image aspect ratio.

              ```javascript
              // Calculate and set the aspect ratio of the image container
              const aspectRatio = await this.getAspectRatio();
              this.imageWrapper.style.aspectRatio = aspectRatio;

              ...

              async getAspectRatio() {
                // Fetch the image properties from Cloudinary
                const response = await fetch(`${this.base}fl_getinfo/${this.imageid}`, {
                  headers: { 'Accept': 'application/json' },
                });
                const data = await response.json();

                // Calculate the aspect ratio and return it
                const imageWidth = data.input.width;
                const imageHeight = data.input.height;
                const aspectRatio = (imageWidth / imageHeight).toFixed(3);

                return aspectRatio;
              }
              ```

              ## Styling the Component

              The component incorporates CSS to ensure the image renders correctly within its container. Default styling uses `overflow:hidden` on the image container, ensuring content doesn't spill outside the bounds of the container. Similarly, the use of `object-fit: cover` on the image ensures it maintains its aspect ratio while completely filling its parent container. For this fitting to be effective, the image's height is set to 100% by default.

              However, web designs are dynamic, and the default settings might not always be the best fit. If, for instance, you want the image height to adjust automatically based on its intrinsic proportions, the `--image-height` CSS variable comes into play. This variable is accessible in the light DOM, enabling customization. You can set the image height to `auto` using this variable.

              The low-resolution image is initially blurred and then fades out when the high-resolution image has been loaded. The high-resolution image is positioned absolutely with a `z-index` to place it behind the low-resolution image.

              ```css
              <style>
                :host {
                  --image-height: auto;
                }
                figure {
                  position: relative;
                  width: 100%;
                  height: 100%;
                  overflow: hidden;
                  margin: 0;
                  transition: all 0.3s ease-in-out;
                }
                img {
                  display: block;
                  width: 100%;
                  height: var(--image-height);
                  object-fit: cover;
                }
                .low-res {
                  filter: blur(10px);
                  transition: opacity 0.4s ease-in-out;
                }
                .high-res {
                  display: block;
                  position: absolute;
                  z-index: -1;
                  top: 0;
                  left: 0;
                }
              </style>
              ```
              ### Putting It All Together

              Finally, we register the custom element with `customElements.define`.

              ```javascript
              customElements.define("cloudinary-image", CloudinaryImage);
              ```
              
              Here is the code for the `CloudinaryImage` component:

              ```javascript
              /**
              * @name CloudinaryImage
              * @description Custom element for lazy loading images from cloudinary
              * @example <cloudinary-image base="<cloudinary-base-rl>" imageid="<cloudinary-image-id>" alt="<your alt text>"></cloudinary-image>
              * @param {string} base - cloudinary base url
              * @param {string} imageid - cloudinary image id
              * @param {string} alt - image alt text
              *
              * - Load a low resolution image for fast loading and then replace it with a high resolution image
              *   once it has been loaded.
              * - To prevent layout shift, the image is wrapped in a figure element with an aspect ratio
              *   matching the image. The aspect ratio is calculated from the image width and height which is
              *   fetched from cloudinary.
              * - The figure element is styled with overflow: hidden and the image is styled with
              *   object-fit: cover. This will ensure that the image will fill the figure element
              *   without stretching or squashing the image.
              */
              class CloudinaryImage extends HTMLElement {
                constructor() {
                  super();

                  // Create an observer instance and load a high resolution image when the component is visible
                  this.observer = new IntersectionObserver(this.loadImage.bind(this));

                  this.shadow = this.attachShadow({ mode: "open" });
                  this.shadow.innerHTML = `
                    <style>
                      :host {
                        --image-height: auto;
                      }
                      figure {
                        position: relative;
                        width: 100%;
                        height: 100%;
                        overflow: hidden;
                        margin: 0;
                        transition: all 0.3s ease-in-out;
                      }
                      img {
                        display: block;
                        width: 100%;
                        height: var(--image-height);
                        object-fit: cover;
                      }
                      .low-res {
                        filter: blur(10px);
                        transition: opacity 0.4s ease-in-out;
                      }
                      .high-res {
                        display: block;
                        position: absolute;
                        z-index: -1;
                        top: 0;
                        left: 0;
                      }
                    </style>
                    <figure>  
                      <img class="low-res" src="" alt="">
                      <img class="high-res" src="" alt="">
                    </figure>
                  `;
                  this.imageWrapper = this.shadowRoot.querySelector("figure");
                  this.lowResImage = this.shadowRoot.querySelector(".low-res");
                  this.highResImage = this.shadowRoot.querySelector(".high-res");

                }

                static get observedAttributes() {
                  return ["base", "imageid", "alt"];
                }

                // explicitly define properties reflecting to attributes
                get base() {
                  return this.getAttribute('base');
                }
                set base(value) { 
                  if (value) {
                    this.setAttribute('base', value); 
                  } else {
                    this.removeAttribute('base');
                  }
                }
                get imageid() {
                  return this.getAttribute('imageid');
                }
                set imageid(value) { 
                  if (value) {
                    this.setAttribute('imageid', value); 
                  } else {
                    this.removeAttribute('imageid');
                  }
                }
                get alt() {
                  return this.getAttribute('alt');
                }
                set alt(value) { 
                  if (value) {
                    this.setAttribute('alt', value); 
                  } else {
                    this.removeAttribute('alt');
                  }
                }

                async attributeChangedCallback(property, oldValue, newValue) {
                  if (!oldValue || oldValue === newValue) return;

                  const { base, imageid, alt } = this.getAttributes();
                  const imageParams = this.getImageTransformations();

                  switch (property) {
                    case "base":
                    case "imageid":
                      // change image source
                      this.highResImage.src = `${base}${imageParams}/${imageid}`;

                      // change the image wrapper aspect ratio
                      const aspectRatio = await this.getAspectRatio(base, imageid);
                      this.imageWrapper.style.aspectRatio = aspectRatio;

                      break;

                    case "alt":
                      // change alt text
                      this.highResImage.alt = alt;
                      break;
                  }
                }

                async connectedCallback() {
                  const self = this;
                  const { base, imageid, alt } = this.getAttributes();

                  // add aspect ratio to image wrapper
                  const aspectRatio = await this.getAspectRatio(base, imageid);
                  this.imageWrapper.style.aspectRatio = aspectRatio;

                  // load low resolution image
                  this.lowResImage.src = `${base}w_100,c_fill,g_auto,f_auto/${imageid}`;
                  this.lowResImage.alt = alt;

                  // images are only loaded when they are visible in the viewport
                  this.observer.observe(this);
                }

                disconnectedCallback() {
                  this.observer.unobserve(this);
                }

                /**
                * Get the component attributes
                * @returns {object} component attributes
                * @private
                * @example const attributes = getAttributes();
                */
                getAttributes() {
                  const base = this.getAttribute("base");
                  const imageid = this.getAttribute("imageid");
                  const alt = this.getAttribute("alt");

                  return { base, imageid, alt };
                }

                /**
                * Get the image transformation parameters
                * @returns {string} image transformation parameters
                * @private
                * @example const imageParams = getImageTransformations();
                * @see https://cloudinary.com/documentation/image_transformations
                */
                getImageTransformations() {
                  // get width of figure parent element
                  // Note: do this after shadow.append otherwise offsetWidth will be 0
                  const parentWidth = this.offsetWidth;
                  // get device pixel ratio
                  const pixelRatio = window.devicePixelRatio || 1.0;
                  // build transformation parameters for the cloudinary image url
                  const imageParams = `w_${100 * Math.round((parentWidth * pixelRatio) / 100)},f_auto`;

                  return imageParams;
                }

                /**
                * Get the aspect ratio of the image
                * @returns {number} aspect ratio
                * @private
                * @async
                * @example const aspectRatio = await getAspectRatio();
                */
                async getAspectRatio(base, imageid) {
                  // get the image properties from cloudinary
                  // ref: https://cloudinary.com/documentation/image_transformation_reference#fl_getinfo
                  const response = await fetch(`${base}fl_getinfo/${imageid}`, {
                    headers: { Accept: "application/json" },
                  });
                  const data = await response.json();
                  // image dimensions
                  const imageWidth = data.input.width;
                  const imageHeight = data.input.height;
                  const aspectRatio = (Math.round((imageWidth / imageHeight) * 100) / 100).toFixed(3);

                  return aspectRatio;
                }

                /**
                * Load the initial high-res image
                * create high resolution image
                * @param {Array} entries
                * @param {Object} observer
                * @returns {void}
                */
                loadImage = (entries, observer) => {
                  if (!entries[0].isIntersecting) return;

                  // disconnect observer once image is loaded
                  this.observer.unobserve(this);

                  const { base, imageid, alt } = this.getAttributes();
                  const imageParams = this.getImageTransformations();
                  // high res image source
                  this.highResImage.src = `${base}${imageParams}/${imageid}`;
                  this.highResImage.alt = alt;

                  // once the hi-res image has been loaded, fade-out the low-res image and remove it
                  this.highResImage.onload = () => {
                    let opacity = 1;
                    let fadeOut = setInterval(() => {
                      if (opacity <= 0) {
                        clearInterval(fadeOut);
                        // remove low-res image after transition ends
                        this.lowResImage.addEventListener("transitionend", () => {
                          this.lowResImage.remove();
                        });
                      }
                      this.lowResImage.style.opacity = opacity;
                      opacity -= 0.1;
                    }, 100);
                  };
                };
              }

              // register component
              customElements.define("cloudinary-image", CloudinaryImage);
              ```
              ## Conclusion

              In this blog post, we created a custom web component called `CloudinaryImage` that allows us to lazy load images from Cloudinary. The component uses the Intersection Observer API to load high-resolution images only when they become visible in the viewport, reducing page load times and improving performance. 

              The complete source code for the `CloudinaryImage` component can be found in [this GitHub repository](link-to-repo).

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
              - item: "building-responsive-progressive-image-component"
---