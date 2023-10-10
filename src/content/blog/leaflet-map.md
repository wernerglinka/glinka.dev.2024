---
layout: blocks.njk
draft: false
pageType: "blog-post"
disableDefaultFooter: true
item: "leaflet-map" # used as a key for bloglist filters

seo:
  title: Building a Section Component with Leaflet Maps for Metalsmith | Werner Glinka
  description: "Discover how to seamlessly integrate interactive maps into your Metalsmith projects using the Leaflet JS library. From setting up the frontmatter to rendering the map with markers, our guide walks you through every step."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1696969847/map-header_lgqbxg.jpg"
  canonicalOverwrite: ""

blogTitle: "Building a Section Component with Leaflet Maps for Metalsmith"
date: 2023-10-11
author: ""
image:
  src: "v1696969847/map-header_lgqbxg.jpg"
  alt: ""
  caption:
excerpt: "Discover how to integrate interactive maps into your Metalsmith projects using the Leaflet JS library. From setting up the frontmatter to rendering the map with markers, our guide walks you through every step."

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
        image: "v1696969847/map-header_lgqbxg.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Building a Section Component with Leaflet Maps for Metalsmith"
              header: "h1"
              subtitle: ""
              prose: ""
            date: 2023-10-11
          
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
              In this blog post, we will build a section component that renders a map using the popular Leaflet JS library.

              ### Getting Started

              Before diving into the code, visit [Leaflet JS official site](https://leafletjs.com/) for any recent updates or to familiarize yourself with the documentation.

              ### Setting Up The Frontmatter

              The section component's frontmatter offers all the necessary properties to render a map. Here's what this looks like for our component:

              ```yaml
              - container: "section"
                name: "leaflet"
                containerFields:
                  isDisabled: false
                  isAnimated: false
                  containerId: ""
                  containerClass: ""
                  inContainer: false
                  isNarrow: false
                  background:
                    color: ""
                    image: ""
                    isDark: false
                leaflet:
                  latitute: 51.509865
                  longitude: -0.118092
                  zoom: 10
                  containerId: "map"
                  containerHeight: 600
                  markers:
                    - title: London
                      latitute: 51.509865
                      longitude: -0.118092
                      content: 
                        title: "London"
                        body: "London is a political, historical, cultural, and tourist center of the United Kingdom, an important city and commercial spot in Western Europe..."
                        link: "https://en.wikipedia.org/wiki/London"
                    - title: Windsor Castle
                      latitute: 51.483334
                      longitude: -0.604167
                      content: 
                        title: "Windsor Castle"
                        body: "Windsor Castle is one of the most known buildings and a royal residence in the county of Berkshire..."
                        link: "https://en.wikipedia.org/wiki/Windsor_Castle"
              ```

              ### Templating with Nunjucks

              Note how we attach marker info to the `data-markers` attribute. For the attribute value, we use a Nunjucks filter `objToString` to convert a markers Object to a string.

              ```html
              <div class="leaflet-wrapper section-inner">
                <div class="map-wrapper leaflet-map js-leaflet-map section-inner">
                  <div 
                    id="{{ params.leaflet.containerId }}"
                    data-latitute="{{ params.leaflet.latitute }}"
                    data-longitude="{{ params.leaflet.longitude }}"
                    data-zoom="{{ params.leaflet.zoom }}" 
                    style="height: {{ params.leaflet.containerHeight }}px; width: 100%;" 
                    data-markers="{{ params.leaflet.markers | objToString }}">
                  </div>
                </div>
              </div>
              ```

              Note the use of the `data-markers` attribute. A Nunjucks filter, `objToString`, aids in converting the markers object into a string.

              ### Rendering the Map with JavaScript

              We will programmatically create the Leaflet script tag, ensuring it only loads when needed by a map component:

              ```javascript
              const loadLeaflet = (function() {
                const isStylesheetLoaded = (url) => {
                  return Array.from(document.styleSheets).some(styleSheet => {
                    if (styleSheet.href) {
                      return styleSheet.href === url;
                    }
                    return false;
                  });
                }

                const loadStylesheet = (url, integrity, crossOrigin) => {
                  if (!isStylesheetLoaded(url)) {
                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = url;
                    link.integrity = integrity;
                    link.crossOrigin = crossOrigin;
                    document.head.appendChild(link);
                  } else {
                    console.log('Stylesheet is already loaded.');
                  }
                }

                const loadLeafletScript = () => {
                  return new Promise((resolve, reject) => {
                      if (typeof L !== 'undefined') {
                          resolve();
                          return;
                      }

                      var script = document.createElement('script');
                      script.type = 'text/javascript';
                      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
                      script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
                      script.crossOrigin = '';

                      script.onload = function() {
                          resolve();
                      };

                      script.onerror = function() {
                          reject(new Error('Failed to load the Leaflet script.'));
                      };

                      document.head.appendChild(script);
                  });
                }

                const init = () => {
                  loadStylesheet('https://unpkg.com/leaflet@1.9.4/dist/leaflet.css', 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=', '');

                  loadLeafletScript().then((res, err) => {
                    const allMaps = document.querySelectorAll(".js-leaflet-map > div");

                    allMaps.forEach(map => {
                      const mapId = map.getAttribute('id');
                      const mapContainer = document.getElementById(mapId);
                      const latitute = mapContainer.dataset.latitute;
                      const longitude = mapContainer.dataset.longitude;
                      const zoom = mapContainer.dataset.zoom;
                      const markers = JSON.parse(mapContainer.dataset.markers);
                      
                      const mapOptions = {
                        center: [ latitute, longitude ],
                        zoom
                      };

                      // paint the map
                      const thisMap = new L.map(mapId, mapOptions);
                      const layer = new L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
                      thisMap.addLayer(layer);

                      // add markers
                      markers.forEach(marker => {
                        const markerTitle = marker.title;
                        const markerContent = `
                          <h4>${marker.content.title}</h4>
                          <p>${marker.content.body}</p>
                          <a href="${marker.content.link}" target="_blank" rel="noopener noreferrer">Read more</a>`;
                        const thisLatitute = marker.latitute;
                        const thisLongitude = marker.longitude;
                        const thisMarker = L.marker([thisLatitute, thisLongitude],{title: markerTitle })
                          .addTo(thisMap)
                          .bindPopup(markerContent);

                        const showMarkerInfo = (e) => {
                          var popup = e.target.getPopup();
                          var content = popup.getContent();
                        }
                        thisMarker.on('click', showMarkerInfo);
                      });

                    });

                  }).catch(error => {
                      console.error(error);
                  });
                }


                return { init };
              })();

              export default loadLeaflet;
              ```

              This script consists of functions to:

              1. Check if a stylesheet is already loaded.
              2. Load the Leaflet stylesheet.
              3. Load the Leaflet JS script.
              4. Initialize and render the map with markers.

              ### Conclusion

              Incorporating a map into your Metalsmith project enhances your website's visual appeal and provides the interactivity that users expect. Integrating this feature becomes a breeze with the Leaflet JS library and the steps provided above.

              A well-implemented map can significantly elevate the overall user experience. For instance, businesses can showcase their locations, educators can provide geographical references, travelers can share their journeys, and data scientists can visualize geographical data trends. It transforms a static page into an engaging, interactive space catering to diverse needs.

              Moreover, the flexibility offered by Leaflet, combined with Metalsmith, ensures that developers can customize the map to fit various themes, designs, and functionalities, making it harmonious with the existing design language of the website.

              In conclusion, while integrating a map component into your Metalsmith project might initially seem daunting, the rewards for user engagement, clarity of information, and overall website functionality are well worth the effort. Don't just tell your users; show them, guide them, and engage them with the immersive experience that a map can offer.

              Have a look at a real-live example:  https://ms-start-docs.netlify.app/sections/leaflet/

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
              - item: "build-badges-section"
              - item: "building-responsive-progressive-image-component"
---