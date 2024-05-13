---
layout: blocks.njk
draft: false
pageType: "blog-post"
disableDefaultFooter: true
item: "isotope-lazy-loading-images" # used as a key for bloglist filters

seo:
  title: Using Isotope with Lazy-Loading Images | Werner Glinka
  description: "Web galleries are a common feature in modern web development, and we often turn to libraries like Isotope for efficient layout management. By incorporating lazy-loading techniques, we can further enhance the performance of these galleries. Isotope, a versatile JavaScript library, elevates web interfaces by enabling dynamic and visually appealing layouts, such as masonry, using CSS"
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1715620485/isotope-lazy-loading_w8ql4y.jpg"
  canonicalOverwrite: ""

blogTitle: "Using Isotope with Lazy-Loading Images"
date: 2024-05-13
author: ""
image:
  src: "v1715620485/isotope-lazy-loading_w8ql4y.jpg"
  alt: ""
  caption:
excerpt: " Isotope, a versatile JavaScript library, elevates web interfaces by enabling dynamic and visually appealing layouts, such as masonry, using CSS."

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
        image: "v1715620485/isotope-lazy-loading_w8ql4y.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Using Isotope with Lazy-Loading Images"
              header: "h1"
              subtitle: ""
              prose: ""
            date: 2024-05-13

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
              Web galleries are a common feature in modern web development, and we often turn to libraries like [Isotope](https://isotope.metafizzy.co/) for efficient layout management. By incorporating lazy-loading techniques, we can further enhance the performance of these galleries. Isotope, a versatile JavaScript library, elevates web interfaces by enabling dynamic and visually appealing layouts, such as masonry, using CSS. It also offers filtering, sorting, and engaging animations through JavaScript and CSS3 transitions, making it a powerful tool in our development tools set.

              However, integrating Isotope with lazy-loading images can pose some challenges. This blog post will delve into the common obstacles encountered and provide practical solutions to overcome them. In addition to Isotope, we'll utilize a small helper library [ImagesLoaded](https://imagesloaded.desandro.com/), which executes a callback after all gallery images have been loaded.

              ## Importing Dependencies
              
              One crucial aspect of our integration process is loading all libraries dynamically when they are needed. To achieve this, we rely on a small helper utility called `loadVendorObject`. This utility, which takes two parameters-the URL of the library script and the name of the global object that the library exposes-is designed to streamline the loading process and ensure that the necessary libraries are available when we need them.

              ```javascript
              function loadVendorObject( url, globalObjectName, timeout = 5000 ) {
                return new Promise( ( resolve, reject ) => {
                  // Check if the global object is already available
                  if ( window[ globalObjectName ] ) {
                    resolve();
                    return;
                  }

                  const script = document.createElement( 'script' );
                  script.src = url;
                  script.async = true;

                  const timeoutId = setTimeout( () => {
                    reject( new Error( `Timed out after ${ timeout }ms while loading script: ${ url }` ) );
                  }, timeout );

                  script.onload = () => {
                    clearTimeout( timeoutId );

                    const checkGlobalObject = () => {
                      if ( window[ globalObjectName ] ) {
                        resolve();
                      } else {
                        setTimeout( checkGlobalObject, 100 ); // Check again after 100ms
                      }
                    };
                    checkGlobalObject();
                  };

                  script.onerror = () => {
                    clearTimeout( timeoutId );
                    reject( new Error( `Failed to load script: ${ url }` ) );
                  };

                  document.head.appendChild( script );
                } );
              }
              ```

              `loadVendorObject` creates a new `<script>` element with its `src` attribute set to the provided `URL`. It attaches an event listener that listens for the load event, which indicates that the script has finished loading. It then appends the `<script>` element to the `<head>` of the document to initiate the loading process. It continuously checks if the specified global object becomes available in the global scope. Once the global object is detected, the interval clears and resolves the promise with the global object.
              
              If an error occurs during the script loading process, it rejects the promise with the error.

              With  loadVendorObject`, we can dynamically load external libraries on demand, reducing the initial page load time and improving performance. The function abstracts away the complexity of checking for the availability of the global object and provides a convenient promise-based interface for handling the loading process.


              ## Lazy-Loading Images with Intersection Observer 

              To lazy-load images, we use the Intersection Observer API. We define the init function, which sets up an Intersection Observer to detect when the gallery container comes into view. When the gallery intersects, we load the `imagesLoaded` library and wait for all images to finish loading before proceeding to the next step.

              ```javascript
              function init() {
                const galleryContainer = document.querySelector('.isotope-grid');
                const observer = new IntersectionObserver((entries) => {
                  entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                      loadVendorObject('https://unpkg.com/imagesloaded@5.0.0/imagesloaded.pkgd.min.js', 'imagesLoaded')
                        .then(() => {
                          const images = galleryContainer.querySelectorAll('img');
                          imagesLoaded(images, () => {
                            // All images are loaded, proceed to initialize Isotope
                            initIsotope(galleryContainer);
                            initFilterItems(galleryContainer);
                          });
                        })
                        .catch((error) => {
                          console.error(`Error loading imagesLoaded script: ${error}`);
                        });
                      observer.unobserve(entry.target);
                    }
                  });
                });
                observer.observe(galleryContainer);
              }
              ```

              ## Initializing Isotope 

              After all images are loaded, we proceed to initialize the Isotope library. We define the `initIsotope` function, which loads the Isotope library on-demand using `loadVendorObject`. Once the library is loaded, we create a new Isotope instance with the specified configuration options.

              ```javascript
              function initIsotope(grid) {
                loadVendorObject('https://unpkg.com/isotope-layout@3/dist/isotope.pkgd.min.js', 'Isotope')
                  .then(() => {
                    isotope = new Isotope(grid, {
                      itemSelector: '.isotope-grid-item',
                      percentPosition: true,
                      layoutMode: 'masonry'
                    });
                    isotope.arrange({ filter: '*' });
                  })
                  .catch((error) => {
                    console.error(`Error loading Isotope script: ${error}`);
                  });
              }
              ```

              ## Initializing Filter Items 
              The `initFilterItems` function sets up the filtering functionality for the gallery. It selects the filter buttons and attaches a click event listener to the button group. When a button is clicked, it retrieves the filter value from the data-filter attribute and applies the filter to the Isotope instance. It also updates the active state of the filter buttons.

              ```javascript
              function initFilterItems(grid) {
                const galleryContainer = document.querySelector('.js-isotope-gallery-container');
                const allFilterItems = galleryContainer.querySelectorAll('.js-isotope-filter button');
                const filterButtonGroup = galleryContainer.querySelector('.js-isotope-filter');

                filterButtonGroup.addEventListener('click', function (event) {
                  if (event.target.tagName === 'BUTTON') {
                    const filterValue = event.target.getAttribute('data-filter');
                    isotope.arrange({ filter: filterValue });

                    allFilterItems.forEach((item) => {
                      item.classList.remove('active');
                    });
                    event.target.classList.add('active');
                  }
                });
              }
              ```

              By following these steps and leveraging the power of Isotope and lazy-loading techniques, you can create dynamic and visually appealing web galleries that provide a smooth user experience. The code examples demonstrate how to load libraries on-demand, lazy-load images using the Intersection Observer API, and initialize Isotope only after all images are loaded.
              With this approach, we can optimize performance, reduce initial page load times, and deliver an engaging gallery experience to our users.

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
              - item: "introducing-project-orca-part1"
              - item: "introducing-project-orca-part2"
              - item: "introducing-project-orca-part3" 

---