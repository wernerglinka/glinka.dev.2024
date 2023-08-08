---
layout: blocks.njk
draft: false
pageType: "blog-post"
disableDefaultFooter: true
item: "clamp-calculator" # used as a key for bloglist filters

seo:
  title: Simplifying Responsive Font Sizing with a Clamp Calculator | Werner Glinka
  description: "The blog discusses a widget, the 'Clamp Calculator', used for calculating CSS clamp functions for responsive font sizing, padding, and margins. The widget ensures fonts smoothly adjust with viewport width changes."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1689804403/clamp_twhjdw.jpg"
  canonicalOverwrite: ""

blogTitle: "Simplifying Responsive Font Sizing with a Clamp Calculator"
date: 2023-07-10
author: ""
image:
  src: "v1689804403/clamp_twhjdw.jpg"
  alt: ""
  caption:
excerpt: "The blog discusses a widget, the 'Clamp Calculator', used for calculating CSS clamp functions for responsive font sizing, padding, and margins. The widget ensures fonts smoothly adjust with viewport width changes."


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
        image: "v1689804403/clamp_twhjdw.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Simplifying Responsive Font Sizing with a Clamp Calculator"
              header: "h1"
              subtitle: ""
              prose: ""
            date: 2023-07-10

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
              This post follows an earlier post [Better Responsive Websites with Clamp](/blog/using-clamp-in-responsive-design/).

              While working on the [Minneapolis project](/blog/minneapolis-using-wordpress-headless-cms-metalsmith/), using WordPress as a CMS that feeds content to a Metalsmith Static Site Generator, I reviewed several articles about fluid type scale. I used what I had learned in my [typography](https://github.com/wernerglinka/minneapolis/blob/main/src/scss/_typography.scss). I also found an interesting article on CSS-Tricks,  [Linearly Scale font-size with CSS clamp() Based on the Viewport
              ](https://css-tricks.com/linearly-scale-font-size-with-css-clamp-based-on-the-viewport/), which describes a tool to calculate the clamp function. I forked the calculator and implemented it in pure javascript.

              This handy tool makes it easy to calculate and generate CSS clamp functions for responsive font sizing. And it also works great for padding and margins.

              ## The Clamp Calculator

              The "Clamp Calculator" widget is a user-friendly tool that helps web developers define CSS clamp functions for responsive font sizing, padding and margins. It calculates the optimal CSS clamp function by inputting minimum and maximum viewport widths and font-size values. The clamp function ensures that the font size smoothly adjusts between the minimum and maximum values based on the viewport width.

              <div id="clampCalculator">
                <iframe id="clampCalculator" src="https://css-clamp-calculator.netlify.app/"></iframe>
              </div>

              The widget is built with HTML, CSS, and vanilla JavaScript, and it uses a straightforward structure with essential styling for user interface elements.

              ### Input Section

              The input section comprises various form elements to input the parameters for the clamp function. These parameters include:

              - Minimum Viewport Width (`minWidth`)
              - Maximum Viewport Width (`maxWidth`)
              - Minimum Font Size (`minFontSize`)
              - Maximum Font Size (`maxFontSize`)
              - Pixels per Rem (`pxPerRem`)

              ```html
              <!-- Input Section -->
              <div class="form-wrapper">
                <form>
                  <!-- Form groups for each input -->
                  <div class="form-group">
                    <label for="minWidth">Min Viewport Width:</label>
                    <input 
                      type="number" 
                      class="form-control" 
                      id="minWidth" 
                      value=""
                      onInput="updateResult(this.value, this.id)"
                    ><span>px</span>
                  </div>
                  <!-- More form groups for other parameters -->
                  <!-- ... -->
                </form>
              </div>
              ```

              ### Output Section

              The output section shows the calculated clamp function that ensures responsive font sizing based on the provided parameters.

              ```html
              <!-- Output Section -->
              <div id="result"></div>
              ```

              ### Calculating the Clamp Function

              The JavaScript code calculates the clamp function using the input parameters. It then updates the result div with the calculated clamp function.

              ```javascript
              const parameters = {
                minWidth: 320,
                maxWidth: 1200,
                minFontSize: 2,
                maxFontSize: 4,
                pxPerRem: 10,
              };

              function calculateClampFunc() {
                const minWidth = parameters.minWidth / parameters.pxPerRem;
                const maxWidth = parameters.maxWidth / parameters.pxPerRem;
                const slope = (parameters.maxFontSize - parameters.minFontSize) / (maxWidth - minWidth);
                const yAxisIntersection = -minWidth * slope + parameters.minFontSize;
                const clampFunc = `clamp(${parameters.minFontSize}rem, ${yAxisIntersection.toFixed(4)}rem + ${(slope * 100).toFixed(4)}vw, ${parameters.maxFontSize}rem)`;
                // update the result div
                document.querySelector('#result').innerHTML = clampFunc;
              }

              function updateResult(value, id) {
                // Update the parameters object
                parameters[id] = Number(value);
                // Calculate the clamp function parameters and update the result div
                calculateClampFunc();
              }
              ```

              ### Copy to Clipboard

              A copy button is provided to copy the generated clamp function to the clipboard.

              ```html
              <!-- Copy to Clipboard -->
              <div class="copy-wrapper">
                <svg viewBox="-40 0 512 512" id="copyThis">
                  <!-- SVG Path for the copy icon -->
                </svg>
              </div>
              ```
              This JavaScript code handles the copy action when the copy button is clicked.
              ```javascript
              document.querySelector('#copyThis').addEventListener('click', () => {
                const txt = document.querySelector('#result').innerHTML;
                const t = document.createElement("textarea");
                t.value = txt;
                document.body.appendChild(t);
                t.select();
                document.execCommand("copy");
                document.body.removeChild(t);

                alert(`${txt} Copied to clipboard!`);
              });
              ```

              ### Styling

              The widget has minimal styling to ensure a clean and user-friendly interface.

              ## Conclusion

              In summary, the Clamp Calculator is an excellent tool for web developers aiming to streamline responsive font sizing in their projects. By offering the ability to input key parameters and instantly generate the CSS clamp function, the widget eases the process of creating a responsive and harmonious typographic experience.

              The "Clamp Calculator" can be found online here: https://css-clamp-calculator.netlify.app/. The code can be found on GitHub: https://github.com/wernerglinka/clamp-calculator.


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
              - item: "using-clamp-in-responsive-design" 

---