---
layout: blocks.njk
pageType: "blog-post"
disableDefaultFooter: true
item: "nunjucks-in-the-browser" # used as a key for bloglist filters

seo:
  title: Utilizing Nunjucks in the Browser | Werner Glinka
  description: "Integrating Nunjucks into a browser-based app requires pre-compilation and path adjustments. Learn from my experience for a smooth development process. Visit the GitHub repository for the complete code."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1694310271/template_tiv9nw.jpg"
  canonicalOverwrite: ""

blogTitle: "Utilizing Nunjucks in the Browser"
date: 2023-09-09
author: ""
image:
  src: "v1694310271/template_tiv9nw.jpg"
  alt: ""
  caption:
excerpt: "Integrating Nunjucks into a browser-based app requires pre-compilation and path adjustments. Learn from my experience for a smooth development process. Visit the GitHub repository for the complete code."

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
        image: "v1694310271/template_tiv9nw.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Utilizing Nunjucks in the Browser"
              header: "h1"
              subtitle: ""
              prose: ""
            date: 2023-09-09
          
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
              When faced with integrating Nunjucks into a browser-based application, I initially assumed that my prior experience using Nunjucks in Metalsmith websites would ease the transition. However, I quickly discovered that the scarcity of documentation made this endeavor more challenging than expected. In this article, I aim to share my insights and guidance for those in a similar situation.

              My use case involved developing a Metalsmith documentation site that cataloged section components available for the [`ms-start` CLI](https://github.com/wernerglinka/ms-start). Users needed the ability to select a section by name, with the corresponding content dynamically loading into the main body of the page for review. To achieve this, I intended to use the existing section templates from ms-start as they were. Here's what I learned along the way:

              ## Pre-Compile Nunjucks Templates for Browser Use

              When working with [Nunjucks in the browser](https://mozilla.github.io/nunjucks/getting-started.html), it's crucial to pre-compile all templates and then use `nunjucks-slim.js` to render them. The slim version of Nunjucks doesn't come with the full compiler so it's smaller - 8K min/gzipped vs. 20K min/gzipped of `nunjucks.js`. I created a small Metalsmith plugin to pre-compile all section templates to accomplish this. Below is a snippet of the plugin:

              ```javascript
              function precompileNunjucksTemplates(options) {
                options = normalizeOptions(options);

                return function(files, metalsmith, done) {
                  // Start time
                  const start = Date.now();

                  // Retrieve templates directory
                  const templatesDir = path.join(metalsmith.directory(), options.templatesDir);
                  const targetDir = path.join(metalsmith.directory(), options.destDir);

                  const precompileOpts = {
                    include: [/.*\.njk/]
                  };
                  const precompiledTemplates = nunjucks.precompile(templatesDir, precompileOpts);
                  fs.writeFileSync(path.join(targetDir, '/precompiledTemplates.js'), precompiledTemplates);

                  // End time
                  const end = Date.now();
                  const duration = end - start;
                  console.log(`Precompiled Nunjucks templates in ${duration}ms`);
                  
                  done();
                };
              };

              module.exports = precompileNunjucksTemplates;
              ```

              In my setup, the `templatesDir` path, relative to the Metalsmith root, was `lib/layouts` and the resulting `precompiledTemplates.js` file was stored in `lib/assets`.

              This `precompiledTemplates.js` file would then be loaded into the browser using a script tag, making it available within the window object of the site:

              ```html
              <script src="/assets/precompiledTemplates.js"></script>
              ```

              ## Constructing the Browser Page

              Upon loading the page, the following files must be present:

              ```html
              <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
              <script src="/assets/nunjucksCustomFilters.js"></script>
              <script src="/assets/nunjucks-slim.js"></script>
              <script src="/assets/precompiledTemplates.js"></script>
              <script src="/assets/initialSectionStates.js"></script>
              ```

              The inclusion of `marked` is necessary for a Nunjucks custom filter. `nunjucksCustomFilters.js` contains custom filters, as indicated by its name, while `initialSectionStates.js` contains the initial properties for the templates.

              **`initialSectionStates.js`** is a JavaScript object containing the initial properties for all templates. It's structured as follows:
              ```javascript
              const initialSectionStates = {
                audio: {
                  audio: {
                    ogg: "",
                    mpeg: "https://file-examples.com/storage/fee055cea664f06ab9a43fb/2017/11/file_example_MP3_700KB.mp3"
                  }
                },
                icon: {
                  icon: {
                    name: "feather",
                    caption: ""
                  }
                },
                image: {
                  image: {
                    src: "https://source.unsplash.com/random/800x600",
                    alt: "",
                    caption: ""
                  }
                },
                ...
                }
              ```

              **`nunjucksCustomFilters.js`** contains the custom filters used in the Nunjucks templates. It's structured as follows:

              ```javascript
              const mdToHTML = function(str) {
                return marked(str);
              };
              ```

              Building the page where these templates would be used is straightforward. As the entire HTML content would be inserted via a Nunjucks template, the HTML structure is simple:

              ```html
              <div class="doc-content js-template-wrapper"></div>
              ```

              Now, let's delve into the JavaScript code responsible for making it all work:

              ```javascript
              const sectionWrapper = {
                container: "section",
                name: "text",
                containerFields: {
                  isDisabled: false,
                  isAnimated: false,
                  containerId: "",
                  containerClass: "",
                  inContainer: true,
                  isNarrow: true,
                  background: {
                    color: "",
                    image: "",
                    isDark: false
                  }
                }
              };
              const getSection = function(templateName) {
                  // Retrieve the initial params for the template
                  const params = initialSectionStates[templateName];

                  // Combine the sectionWrapper with the section params
                  const section = Object.assign({}, sectionWrapper, {params});

                  // Create the Nunjucks environment to enable custom filters
                  const env = nunjucks.configure({ autoescape: true });
                  env.addFilter('mdToHTML', mdToHTML);
                  
                  // Return the rendered section
                  return env.render(`sections/${templateName}.njk`, {section});
              };

              const init = function () {
                  const allTemplates = document.querySelectorAll(".js-template");

                  allTemplates.forEach(template => {
                    
                    template.addEventListener("click", e => {
                      e.preventDefault();
                      e.stopPropagation();
                      
                      // Get the template wrapper
                      const templateWrapper = document.querySelector(".js-template-wrapper");
                      // Get template title
                      const templateTitle = document.querySelector(".js-template-title");
                      // Get the template name
                      const templateName = e.currentTarget.innerText;
                      // Set the template title
                      templateTitle.innerText = templateName;
                      // Get the rendered section and insert it into the template wrapper on the page
                      const section = getSection(templateName);
                      templateWrapper.innerHTML = section;
                    }); // End click event
                  }); // End forEach
              };
              ```

              In this JavaScript code, we begin by defining the properties for a `sectionWrapper`, which is a common template that wraps every section. Next, we define a function `getSection` responsible for rendering Nunjucks templates dynamically. It retrieves initial parameters for the template, combines them with the `sectionWrapper`, and sets up the Nunjucks environment with custom filters. Finally, it renders the specified Nunjucks template.

              The `init` function initializes the page by attaching event listeners to template elements. When a template is clicked, it retrieves the associated template name, renders the section using `getSection`, and inserts it into the template wrapper on the page.

              This JavaScript code facilitates the dynamic loading of sections from pre-compiled Nunjucks templates in the browser, enhancing user experience and performance.

              I encountered an initial roadblock in my quest to use the existing Nunjucks templates without modification. It became evident that the templates in their original form wouldn't function as expected. To resolve this, I delved into the code within `precompiledTemplates.js` to discern the precise requirements of the pre-compiled templates regarding variable paths.

              I discovered that the paths within Nunjucks `include` statements needed to be adjusted from their previous format:

              ```javascript
              {% include "params/particles/text.njk" %}
              ```

              To this revised format:

              ```javascript
              {% include "section/particles/text.njk" %}
              ```

              As revealed in the `precompiledTemplates.js` code, this crucial alteration allowed the templates to work seamlessly as intended.

              For a more comprehensive understanding of this implementation in its entirety, you can visit the following GitHub repository: [https://github.com/wernerglinka/ms-start-docs](https://github.com/wernerglinka/ms-start-docs) and explore the codebase.

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
              - item: "nunjucks-transformer"
              - item: "metalsmith-layouts-nunjucks"
---
