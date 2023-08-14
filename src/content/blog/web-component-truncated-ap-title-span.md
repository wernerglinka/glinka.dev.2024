---
layout: blocks.njk
draft: false
pageType: "blog-post"
disableDefaultFooter: true
item: "web-component-truncated-ap-title-span" # used as a key for bloglist filters

seo:
  title: "Building a Custom Web Component: TruncatedAPTitle | Werner Glinka"
  description: "Explore the creation of TruncatedAPTitle, a custom web component handling attribute changes with MutationObserver. Learn how it truncates and title-cases text."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1691087864/truncated_emiki0.jpg"
  canonicalOverwrite: ""

blogTitle: "Truncated APTitle - a Custom Web Component"
date: 2023-08-08
author: ""
image:
  src: "v1691087864/truncated_emiki0.jpg"
  alt: ""
  caption:
excerpt: "Explore TruncatedAPTitle, a custom web component handling attribute changes with MutationObserver. Learn how it truncates and title-cases text, all inside a span."

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
        image: "v1691087864/truncated_emiki0.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Truncated APTitle - a Custom Web Component"
              header: "h1"
              subtitle: "Applies AP title case and trims text to the specified length"
              prose: ""
            date: 2023-08-08
          
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
              Web Components are potent, offering reusability and encapsulation right in the browser. However, handling attribute changes in custom elements can sometimes be tricky. Today, let's take a closer look at a custom built-in web component `<truncated-aptitle>` that tackles this issue.

              ## A Brief Intro to `TruncatedAPTitle`

              The `TruncatedAPTitle` component is used like a `span` element but adds a couple of unique attributes: `apstyle` and `textlength`. 

              Used like this `<truncated-aptitle apstyle textlength="30">headline goes here</truncated-aptitle>`, it applies AP title case styling to the text within it and trims it down to the specified length.

              The tricky part comes from the fact that boolean attributes don't exist on Custom Elements, rather they follow a common convention: an existing attribute means true, while the absense means it's false. This behavior is not unique to Custom Elements, but is common to HTML5 boolean attributes in general. HTML5 defines boolean attributes where the mere presence of the attribute, regardless of its actual value, means true, and its absence implies false.

              ## Addressing Attribute Changes

              While most changes to attributes on our custom element would typically be handled through the `attributeChangedCallback,` it's important to note that the current specifications of the Custom Elements API may not support the lifecycle callback `attributeChangedCallback` for customized built components  as expected.

              For example, if we add a boolean attribute to our custom element, like `apstyle`, and then remove it, the `attributeChangedCallback` will not be triggered. This is because the `attributeChangedCallback` is only triggered when an attribute's value changes, not when it's added or removed.

              In the case of our `TruncatedAPTitle` element, we handle this issue as follows. The `textlength` attribute, a non-boolean attribute, is managed by leveraging the `attributeChangedCallback.` On the other hand, for boolean attributes like `apstyle` and changes to `textContent,` we deploy a `MutationObserver.`

              ```javascript
              attributeChangedCallback(property, oldValue, newValue) {
                if (property === 'textlength') {
                  this.props.textlength = newValue;
                  this.updateTextContent(this.props.text);
                }
              }
              ```

              We establish a `MutationObserver` within the constructor of the custom element, and set it to observe specific changes, namely changes to attributes and `textContent.` This `MutationObserver` allows us to respond to changes that otherwise wouldn't be caught by `attributeChangedCallback.`

              ```javascript
              this.mutationObserver = new MutationObserver(this.mutationObserverCallback.bind(this));
              this.mutationObserver.observe(this, { 
                attributes: true,
                characterData: true, 
                childList: true
              });
              ```

              Then, we define the `mutationObserverCallback` to handle changes to the `apstyle` attribute and `textContent,` using a `updateTextContent` method, which applies the truncation and title casing as needed.

              ```javascript
              mutationObserverCallback(mutations) {
                mutations.forEach((mutation) => {
                  if (mutation.type === 'characterData' || mutation.type === 'childList') {
                    // handle changes to textContent...
                  }

                  if (mutation.type === 'attributes' && mutation.attributeName === 'apstyle') {
                      this.props.apstyle = mutation.target.hasAttribute('apstyle');
                      this.updateTextContent(this.props.text);
                  }
                });
              }
              ```

              This approach provides a solution for our attribute observation requirements. It gives us flexibility and control, effectively monitoring and responding to changes in our custom element.

              ## Defining Properties and Attributes

              The `TruncatedAPTitle` component accepts two attributes: `textlength` and `apstyle`. The state of these attributes will be reflected in the properties of the component and the properties state will be cached in an object called `props`. Changing attributes will update this `props` object and all element updates will be based on the `props` object.
              
              The `props` object is defined in the constructor.

              ```javascript
              this.props = {
                text: "",
                textlength: "",
                apstyle: false
              };
              ```

              Instead of defining getters and setters dynamically within the constructor, we'll explicitly set them in the class body. It's best practice to place getters and setters outside of the constructor. Adhering to this convention ensures our custom elements align with standards set by other elements and libraries, simplifying the process for other developers to understand and collaborate on our code.

              It's important to note that we don't modify attributes when properties change. This convention aligns with typical behavior seen in HTML elements and other web components. Attributes are read once in the `connectedCallback` and subsequently cached in the `props` object. When properties alter, the `props` object updates, triggering an appropriate component update.

              ```javascript
              // explicitly define properties reflecting to attributes
              get text() {
                return this.props.text;
              }
              set text(value) { 
                this.props.text = value;
                this.updateTextContent(value);
              }
              get textlength() {
                return this.props.textlength;
              }
              set textlength(value) { 
                this.props.textlength = value;
                this.updateTextContent(this.props.text);
              }
              get apstyle() {
                return this.props.apstyle;
              }
              set apstyle(value) {
                this.props.apstyle = !!value;
                this.updateTextContent(this.props.text);
              }
              ```

              ## Updating TextContent 

              To encapsulate the logic needed for handling text changes, we've created the `updateTextContent` method. It takes in the text, trims it down to the specified length, applies the AP style (if specified), and updates the component's `textContent`. 

              ```javascript
              this.updateTextContent = text => {
                if (!text) return;
                const textlength = this.props.textlength;
                const trimmedText = this.truncateAfterWord(text, textlength);
                const apstyle = this.props.apstyle;
                this.textContent = apstyle ? this.apStyleTitleCase(trimmedText) : trimmedText;
              };
              ```

              ## Applying the AP Title Case

              We've also added a simple `apStyleTitleCase` method to handle the title-casing of the text according to Associated Press (AP) style. It takes care of all those pesky small words and punctuation and ensures the text is cased just right.

              ```javascript
              apStyleTitleCase(str) {
                if (!str) return ''
                const lowercaseWords = ['a', 'an', 'and', 'at', 'but', 'by', 'for', 'in', 'nor', 'of', 'on', 'or', 'so', 'the', 'to', 'up', 'yet'];
                return str
                  .toLowerCase()
                  .replace(/\w+/g, function (word, index) {
                    // Always capitalize the first and last word
                    if (index === 0 || index + word.length === str.length) return word.charAt(0).toUpperCase() + word.substr(1);
                    
                    // Otherwise, only capitalize if it's not in the list of lowercase words
                    return lowercaseWords.includes(word) ? word : word.charAt(0).toUpperCase() + word.substr(1);
                  });
              }
              ```

              ## Bringing it All Together

              Finally, we've registered our component using `customElements.define`, extending the native `span` element. Voila! Our `TruncatedAPTitle` is ready to roll.

              ```javascript
              customElements.define( 'truncated-aptitle', TruncatedAPTitle, { extends: 'span' } );
              ```

              While attribute changes in custom elements may be a hurdle, they can be cleared with `MutationObserver` and JavaScript.

              Here is the code for the `TruncatedAPTitle` component:

              ```javascript
              /**
              * @name TruncatedAPTitle
              * @description Custom element with text length and ap title style
              * @example <truncated-aptitle apstyle textlength="30">everything you need to know about headline style 
              *          and capitalization</truncated-aptitle> will result in "Everything You Need to Know..."
              * @param {boolean} apstyle - styling according to AP style
              * @param {string} textlength - number of characters to trim to
              * 
              * @notes Due to the Custom Elements API's current specifications, there might 
              * be limitations with `attributeChangedCallback`. It may not properly support 
              * lifecycle callbacks like `attributeChangedCallback` and `adoptedCallback` 
              * for customized built-in elements. To monitor changes to the element, I utilize
              * the `MutationObserver` interface.
              */

              class TruncatedAPTitle extends HTMLElement {
                
                constructor() {
                  super();

                  // cache the state of the component
                  this.props = {
                    text: "",
                    textlength: "",
                    apstyle: false
                  };

                  // reflect internal state to textContent
                  this.updateTextContent = text => {
                    if (!text) return;
                    const textlength = this.props.textlength;
                    const trimmedText = this.truncateAfterWord(text, textlength);
                    const apstyle = this.props.apstyle;
                    this.textContent = apstyle ? this.apStyleTitleCase(trimmedText) : trimmedText;
                  };

                  // watch for textContent and boolean attribute changes
                  this.mutationObserver = new MutationObserver(this.mutationObserverCallback.bind(this));
                  this.mutationObserver.observe(this, { 
                    characterData: true, 
                    childList: true,
                    attributes: true
                  });
                } // end constructor


                // observe these component attributes
                static get observedAttributes() {
                  return ['textlength', 'apstyle'];
                }

                // explicitly define properties reflecting to attributes
                get text() {
                  return this.props.text;
                }
                set text(value) { 
                  this.props.text = value;
                  this.updateTextContent(value);
                }
                get textlength() {
                  return this.props.textlength;
                }
                set textlength(value) { 
                  this.props.textlength = value;
                  this.updateTextContent(this.props.text);
                }
                get apstyle() {
                  return this.props.apstyle;
                }
                set apstyle(value) {
                  this.props.apstyle = !!value;
                  this.updateTextContent(this.props.text);
                }
                
                // attribute change
                attributeChangedCallback(property, oldValue, newValue) {
                  if (property === 'textlength') {
                    this.props.textlength = newValue;
                    this.updateTextContent(this.props.text);
                  }
                }

                mutationObserverCallback(mutations) {
                  mutations.forEach((mutation) => {
                    // characterData and childList mutations are for text changes
                    if (mutation.type === 'characterData' || mutation.type === 'childList') {
                      /**
                      * @notes
                      * We store the original text in `this.props.text`. If changes occur, we verify if 
                      * it's due to truncation or AP style adjustments. If so, we don't update the 
                      * props. However, if the new text isn't a substring of the original, we 
                      * recognize it as a genuine change and update the `this.props.text`.
                      */
                      const newtext = mutation.target.textContent.toLowerCase().slice(0, -3);
                      if (!this.props.text.toLowerCase().includes(newtext)) {
                        this.props.text = mutation.target.textContent;
                        this.updateTextContent(this.props.text);
                      } 
                    }
                    
                    /**
                    * @notes
                    * For boolean attributes, we use attribute mutations since they don't trigger 
                    * the `attributeChangedCallback`. All other attribute changes are managed by the 
                    * `attributeChangedCallback`.
                    */
                    if (mutation.type === 'attributes' && mutation.attributeName === 'apstyle') {
                        this.props.apstyle = mutation.target.hasAttribute('apstyle');
                        this.updateTextContent(this.props.text);
                    }

                    
                  });
                } // end mutationObserverCallback

                connectedCallback() {
                  // set the props to the current attributes
                  this.props.text = this.textContent;
                  this.props.textlength = this.getAttribute('textlength');
                  this.props.apstyle = this.hasAttribute('apstyle');
                  // and initialize textContent
                  this.updateTextContent(this.props.text);
                }

                disconnectedCallback() {
                  this.mutationObserver.disconnect();
                }

                truncateAfterWord (str, chars) {
                  if (!chars || !str ) return str;
                  return str.length < chars ? str : `${str.substr( 0, str.substr(0, chars - 3).lastIndexOf(" "))}...`;
                }

                capitalize(value) {
                  return value.charAt(0).toUpperCase() + value.slice(1);
                }

                /**
                * 
                * @param {*} str 
                * @returns An AP style formatted string
                * Simple implementation of title-casing according to the AP Stylebook. 
                * One general rule is to capitalize the first word, the last word, and 
                * all words in between except for certain short conjunctions, 
                * prepositions, and articles. 
                */
                apStyleTitleCase(str) {
                  if (!str) return ''
                  const lowercaseWords = ['a', 'an', 'and', 'at', 'but', 'by', 'for', 'in', 'nor', 'of', 'on', 'or', 'so', 'the', 'to', 'up', 'yet'];
                  return str
                    .toLowerCase()
                    .replace(/\w+/g, function (word, index) {
                      // Always capitalize the first and last word
                      if (index === 0 || index + word.length === str.length) return word.charAt(0).toUpperCase() + word.substr(1);
                      
                      // Otherwise, only capitalize if it's not in the list of lowercase words
                      return lowercaseWords.includes(word) ? word : word.charAt(0).toUpperCase() + word.substr(1);
                    });
                } // end apStyleTitleCase
              }

              // register component
              customElements.define( 'truncated-aptitle', TruncatedAPTitle );
              ```
              The code can be found on [GitHub](https://github.com/wernerglinka/truncatedAPTitle) and on [NPM](https://www.npmjs.com/package/@wernerglinka/truncatedaptitle).

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
              - item: "web-component-links"
              - item: "web-component-cloudinary-image"
              - item: "exploring-web-components"
---