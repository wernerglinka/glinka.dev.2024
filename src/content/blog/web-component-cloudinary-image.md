---
layout: blocks.njk
draft: false
pageType: "blog-post"
disableDefaultFooter: true
item: "web-component-cloudinary-image" # used as a key for bloglist filters

seo:
  title: "Building a Custom Web Component: CloudinaryImage | Werner Glinka"
  description: "In this blog post, we will build a custom web component called CloudinaryImage that allows us to lazy load images from Cloudinary. "
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1691099161/images_hlthlx.jpg"
  canonicalOverwrite: ""

blogTitle: "Creating a Cloudinary Image Web Component"
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

              The `CloudinaryImage` component accepts three attributes: `base`, `imageid,` and `alt`. These attributes will be used to build the Cloudinary URLs and provide alternative text for the images. 
              
              The state of these attributes will be reflected in the properties of the component and the properties state will be cached in an object called `props`. Changing attributes will update this `props` object and all element updates will be based on the `props` object.
              
              The `props` object is defined in the constructor.

              ```javascript
              this.props = {
                base: "",
                imageid: "",
                alt: ""
              };
              ```

              Instead of defining getters and setters dynamically within the constructor, we'll explicitly set them in the class body. It's best practice to place getters and setters outside of the constructor. Adhering to this convention ensures our custom elements align with standards set by other elements and libraries, simplifying the process for other developers to understand and collaborate on our code.

              It's important to note that we don't modify attributes when properties change. This convention aligns with typical behavior seen in HTML elements and other web components. Attributes are read once in the `connectedCallback` and subsequently cached in the `props` object. When properties alter, the `props` object updates, triggering an appropriate component update.

              ```javascript
              // explicitly define properties reflecting to attributes
              get base() {
                return this.props.base;
              }
              set base(value) { 
                this.props.base = value;
                this.updateImage
              }
              get imageid() {
                return this.props.imageid;
              }
              set imageid(value) { 
                this.props.imageid = value;
                this.updateImage();
              }
              get alt() {
                return this.props.alt;
              }
              set alt(value) { 
                this.props.alt = value;
              }
              ```
              
              ## Updating the Image
              We are using a method `updateImage` to update the image. This method will be called when the component is added to the DOM and when any property changes. The method will update the aspect ratio of the image wrapper, load the low-resolution image, and start observing the component for intersection with the viewport to then load the high-resolution image.

              ```javascript
              this.updateImage = async () => {
                // update aspect ratio to image wrapper
                const aspectRatio = await this.getAspectRatio(this.props.base, this.props.imageid);
                this.imageWrapper.style.aspectRatio = aspectRatio;

                // load low resolution image
                this.lowResImage.src = `${this.props.base}w_100,c_fill,g_auto,f_auto/${this.props.imageid}`;
                this.lowResImage.alt = this.props.alt;

                // images are only loaded when they are visible in the viewport
                this.observer.observe(this);
              };
              ```
              
              ## Image Loading and Intersection Observer

              To load the images lazily and swap the low-resolution image with the high-resolution image when it becomes visible, we'll use the Intersection Observer API.

              First we load the low-resolution image in the `connectedCallback` when the component is added to the DOM. When the component becomes visible, the Intersection Observer will call the `loadImage` method. This method will load the high-resolution image and disconnect the Intersection Observer.

              ```javascript
              class CloudinaryImage extends HTMLElement {
                constructor() {
                  super();
                  // Create an Intersection Observer to load the high-resolution image when it becomes visible
                  this.observer = new IntersectionObserver(this.loadImage.bind(this)); 
                  .
                  .
                  .
                }
                .
                .
                .
                connectedCallback() {
                  this.props.base = this.getAttribute("base");
                  this.props.imageid = this.getAttribute("imageid");
                  this.props.alt = this.getAttribute("alt");

                  this.updateImage();
                }
                .
                .
                .
                loadImage(entries, observer) {
                  // Load the high-resolution image when it becomes visible
                  if (!entries[0].isIntersecting) return;

                  // Disconnect the observer once the image is loaded
                  this.observer.unobserve(this);

                  // Set the source for the high-resolution image
                  this.highResImage.src = `${this.base}${this.getImageTransformations()}/${this.imageid}`;
                  this.highResImage.alt = this.alt;
                  .
                  .
                  .
                }
                .
                .
                .
              }
              ```

              ## Image Aspect Ratio

              To prevent layout shifts when loading the images, we set the aspect ratio of the image on the container. We get the image dimensions by using the Cloudinary API so we can calculate the image aspect ratio.

              ```javascript
              async getAspectRatio(base, imageid) {
                try {
                  // get the image properties from cloudinary
                  // ref: https://cloudinary.com/documentation/image_transformation_reference#fl_getinfo
                  const response = await fetch(`${base}fl_getinfo/${imageid}`, {
                    headers: { Accept: "application/json" },
                  });

                  // Check if the response status is not OK (i.e., not a 2xx status)
                  if (!response.ok) {
                    throw new Error(`Failed to fetch aspect ratio. Status: ${response.status}`);
                  }

                  const data = await response.json();

                  // Ensure the expected properties exist in the returned data
                  if (!data.input || typeof data.input.width !== "number" || typeof data.input.height !== "number") {
                    throw new Error("Unexpected response format from Cloudinary");
                  }

                  // image dimensions
                  const imageWidth = data.input.width;
                  const imageHeight = data.input.height;

                  if (imageHeight === 0) {
                    throw new Error("Image height is 0, cannot compute aspect ratio");
                  }

                  const aspectRatio = (Math.round((imageWidth / imageHeight) * 100) / 100).toFixed(3);
                  return aspectRatio;

                } catch (error) {
                  console.error(`Error getting aspect ratio: ${error.message}`);
                  return "1"; // Default aspect ratio (1:1) if there's an error.
                }
              }
              ```

              ## Styling the Component

              The component incorporates CSS to ensure the image renders correctly within its container. Default styling uses `overflow:hidden` on the image container, ensuring content doesn't spill outside the bounds of the container. Similarly, the use of `object-fit: cover` on the image ensures it maintains its aspect ratio while completely filling its parent container. For this fitting to be effective, the image's height is set to 100% by default.

              However, web designs are dynamic, and the default settings might not always be the best fit. If, for instance, you want the image height to adjust automatically based on its intrinsic proportions, the `--image-height` CSS variable comes into play. This variable is accessible in the light DOM, enabling customization. You can set the image height to `auto` using this variable.

              The low-resolution image is initially blurred and then fades out when the high-resolution image has been loaded. The high-resolution image is positioned absolutely with a `z-index` to place it behind the low-resolution image.


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

                  // cache the state of the component
                  this.props = {
                    base: "",
                    imageid: "",
                    alt: ""
                  };

                  // updated image
                  this.updateImage = async () => {
                    // update aspect ratio to image wrapper
                    const aspectRatio = await this.getAspectRatio(this.props.base, this.props.imageid);
                    this.imageWrapper.style.aspectRatio = aspectRatio;

                    // load low resolution image
                    this.lowResImage.src = `${this.props.base}w_100,c_fill,g_auto,f_auto/${this.props.imageid}`;
                    this.lowResImage.alt = this.props.alt;

                    // images are only loaded when they are visible in the viewport
                    this.observer.observe(this);
                  };

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
                      }
                      .low-res.remove {
                        transition: opacity 1s ease-in-out;
                        opacity: 0;
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

                } // end constructor

                static get observedAttributes() {
                  return ["base", "imageid", "alt"];
                }

                // explicitly define properties reflecting to attributes
                get base() {
                  return this.props.base;
                }
                set base(value) { 
                  this.props.base = value;
                  this.updateImage();
                }
                get imageid() {
                  return this.props.imageid;
                }
                set imageid(value) { 
                  this.props.imageid = value;
                  this.updateImage();
                }
                get alt() {
                  return this.props.alt;
                }
                set alt(value) { 
                  this.props.alt = value;
                }

                async attributeChangedCallback(property, oldValue, newValue) {
                  if (!oldValue || oldValue === newValue) return;

                  switch (property) {
                    case "base":
                      this.props.base = newValue;
                      break;
                    case "imageid":
                      this.props.imageid = newValue;
                      break;
                    case "alt":
                      this.props.alt = newValue;
                      break;
                  }
                  this.updateImage();
                }

                connectedCallback() {
                  this.props.base = this.getAttribute("base");
                  this.props.imageid = this.getAttribute("imageid");
                  this.props.alt = this.getAttribute("alt");

                  this.updateImage();
                }

                disconnectedCallback() {
                  this.observer.unobserve(this);
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
                try {
                  // get the image properties from cloudinary
                  // ref: https://cloudinary.com/documentation/image_transformation_reference#fl_getinfo
                  const response = await fetch(`${base}fl_getinfo/${imageid}`, {
                    headers: { Accept: "application/json" },
                  });

                  // Check if the response status is not OK (i.e., not a 2xx status)
                  if (!response.ok) {
                    throw new Error(`Failed to fetch aspect ratio. Status: ${response.status}`);
                  }

                  const data = await response.json();

                  // Ensure the expected properties exist in the returned data
                  if (!data.input || typeof data.input.width !== "number" || typeof data.input.height !== "number") {
                    throw new Error("Unexpected response format from Cloudinary");
                  }

                  // image dimensions
                  const imageWidth = data.input.width;
                  const imageHeight = data.input.height;

                  if (imageHeight === 0) {
                    throw new Error("Image height is 0, cannot compute aspect ratio");
                  }

                  const aspectRatio = (Math.round((imageWidth / imageHeight) * 100) / 100).toFixed(3);
                  return aspectRatio;

                } catch (error) {
                  console.error(`Error getting aspect ratio: ${error.message}`);
                  return "1"; // Default aspect ratio (1:1) if there's an error.
                }
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

                  const imageParams = this.getImageTransformations();
                  // high res image source
                  this.highResImage.src = `${this.props.base}${imageParams}/${this.props.imageid}`;
                  this.highResImage.alt = this.props.alt;

                  // once the hi-res image has been loaded, fade-out the low-res image and remove it
                  this.highResImage.onload = () => {
                    this.lowResImage.classList.add("remove");
                    
                    this.lowResImage.addEventListener("transitionend", () => {
                      this.lowResImage.remove();
                    });
                      
                  };
                };
              }

              // register component
              customElements.define("cloudinary-image", CloudinaryImage);


              ```
              ## Conclusion

              In this blog post, we created a custom web component called `CloudinaryImage` that allows us to lazy load images from Cloudinary. The component uses the Intersection Observer API to load high-resolution images only when they become visible in the viewport, reducing page load times and improving performance. 

              The complete source code for the `CloudinaryImage` component can be found in [this GitHub repository](https://github.com/wernerglinka/cloudinaryImage).

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
              - item: "web-component-links"
              - item: "web-component-truncated-ap-title-span"
              - item: "exploring-web-components"
---