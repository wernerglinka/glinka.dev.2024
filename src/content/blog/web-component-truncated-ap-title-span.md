---
layout: blocks.njk
draft: false
pageType: "blog-post"
disableDefaultFooter: true
item: "web-component-truncated-ap-title-span" # used as a key for bloglist filters

seo:
  title: "Building a Custom Web Component: TruncatedAPTitle | Werner Glinka"
  description: "Explore the creation of TruncatedAPTitle, a custom web component handling attribute changes with MutationObserver. Learn how it truncates and title-cases text, all inside a span."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1646849499/tgc2022/social_yitz6j.png"
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

              ## A Brief Intro to TruncatedAPTitle 

              Our `TruncatedAPTitle` component extends the HTML `span` element and adds a couple of unique attributes: `apstyle` and `textlength`. 

              Used like this `<span is="truncated-aptitle" apstyle textlength="30">Headline goes here</span>`, it applies AP title case styling to the text within it and trims it down to the specified length.

              The tricky part comes from the fact that boolean attributes don't exist on Custom Elements, rather they follow a common convention: an existing attribute means true, while the absense means it's false. This behavior is not unique to Custom Elements, but is common to HTML5 boolean attributes in general. HTML5 defines boolean attributes where the mere presence of the attribute, regardless of its actual value, means true, and its absence implies false.

              ## Addressing Attribute Changes

              While most changes to attributes on our custom element would typically be handled through the `attributeChangedCallback,` it's important to note that the current specifications of the Custom Elements API may not support the lifecycle callback `attributeChangedCallback` for customized built components  as expected.

              For example, if we add a boolean attribute to our custom element, like `apstyle`, and then remove it, the `attributeChangedCallback` will not be triggered. This is because the `attributeChangedCallback` is only triggered when an attribute's value changes, not when it's added or removed.

              In the case of our `TruncatedAPTitle` element, we handle this issue as follows. The `textlength` attribute, a non-boolean attribute, is managed by leveraging the `attributeChangedCallback.` On the other hand, for boolean attributes like `apstyle` and changes to `textContent,` we deploy a `MutationObserver.`

              ```javascript
              attributeChangedCallback(property, oldValue, newValue) {
                if (!oldValue || oldValue === newValue) return;

                if (property === 'textlength') {
                  this.updateTextContent(this.originalAttributes.text);
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
                    this.updateTextContent(this.originalAttributes.text);
                  }
                });
              }
              ```

              This approach provides a solution for our attribute observation requirements. It gives us flexibility and control, effectively monitoring and responding to changes in our custom element.

              ## Defining Attribute Getters and Setters

              Instead of dynamically defining getters and setters inside the constructor, we will define them explicitly within the class body. It is considered best practice to define getters and setters outside the constructor. Sticking to this convention ensures that your custom elements are consistent with other elements and libraries, making it easier for other developers to understand and work with our code. 

              ```javascript
              get textlength() {
                  return this.getAttribute('textlength');
                }
                set textlength(value) { 
                  if (value) {
                    this.setAttribute('textlength', value); 
                  } else {
                    this.removeAttribute('textlength');
                  }
                }
                get apstyle() {
                  return this.hasAttribute('apstyle');
                }
                set apstyle(value) {
                  if (value) {
                    this.setAttribute('apstyle', '');
                  } else {
                    this.removeAttribute('apstyle');
                  }
                }
                
              ```

              ## Keeping Track of Original Attributes

              We need to cache the original textContent attribute to reflect it, especially when the `textlength` attribute changes. That's why we've got an `originalAttributes` object that holds the initial values `text`. Note that we initializing the `originalAttributes` object in the constructor, and then updating it in the `connectedCallback. This is because the element is not yet part of the document's DOM when the constructor is called, so querying for attributes in the constructor might not always work as expected.

              ```javascript
              this.originalAttributes = {}
              ```
              
              The `connectedCallback` is called each time the custom element is inserted into the DOM. This is a good place to initialize the `originalAttributes` object, as we can be sure that the element is part of the DOM at this point.

              ```javascript
              this.originalAttributes = {
                text: this.textContent
              }
              ```

              ## Updating TextContent 

              To encapsulate the logic needed for handling text changes, we've created the `updateTextContent` method. It takes in the text, trims it down to the specified length, applies the AP style (if specified), and updates the component's `textContent`. 

              ```javascript
              updateTextContent(text) {
                const textlength = this.getAttribute('textlength');
                const trimmedText = this.truncateAfterWord(text, textlength);
                const apstyle = this.hasAttribute('apstyle');
                this.textContent = apstyle ? this.apStyleTitleCase(trimmedText) : trimmedText;
              }
              ```

              ## Tidying Up with Title Case

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
              * @description span with text length and ap title style
              * @example <span is="truncated-aptitle" apstyle textlength="30">everything you need to know about headline style 
              *          and capitalization</span> will result in "Everything You Need to Know..."
              * @param {boolean} apstyle - styling according to AP style
              * @param {string} textlength - number of characters to trim to 
              */

              class TruncatedAPTitle extends HTMLSpanElement {
                
                constructor() {
                  super();

                  // need to cache the original attributes so we can reflect the textContent
                  // properly. For example a change to the textlength attribute will need to
                  // be reflected in the textContent.
                  this.originalAttributes = {};

                  // watch for textContent and boolean attribute changes
                  this.mutationObserver = new MutationObserver(this.mutationObserverCallback.bind(this));
                  this.mutationObserver.observe(this, { 
                    attributes: true,
                    characterData: true, 
                    childList: true
                  });
                }

                // observe these component attributes
                static get observedAttributes() {
                  return ['textlength', 'apstyle'];
                }

                // explicitly define properties reflecting to attributes
                get textlength() {
                  return this.getAttribute('textlength');
                }
                set textlength(value) { 
                  if (value) {
                    this.setAttribute('textlength', value); 
                  } else {
                    this.removeAttribute('textlength');
                  }
                }
                get apstyle() {
                  return this.hasAttribute('apstyle');
                }
                set apstyle(value) {
                  if (value) {
                    this.setAttribute('apstyle', '');
                  } else {
                    this.removeAttribute('apstyle');
                  }
                }
                
                // attribute change
                attributeChangedCallback(property, oldValue, newValue) {}

                // boolean attributes are watched with a mutation observer
                mutationObserverCallback(mutations) {
                  mutations.forEach((mutation) => {
                    // characterData and childList mutations are for textContent changes
                    // characterData when textContent is changed directly with dev tools
                    // childList when textContent is changed with js via properties
                    if (mutation.type === 'characterData' || mutation.type === 'childList') {
                      // if the new text is not a substring of the original text 
                      // update the textContent in originalAttributes so we can reflect it
                      // properly
                      const newtext = mutation.target.textContent.toLowerCase().slice(0, -3);
                      if (!this.originalAttributes.text.toLowerCase().includes(newtext)) {
                        this.originalAttributes.text = mutation.target.textContent;
                        this.updateTextContent(mutation.target.textContent);
                      } else {
                        this.updateTextContent(this.originalAttributes.text);
                      }
                    }

                    // attributes mutations are for boolean attributes as they do not 
                    // trigger the attributeChangedCallback. All other attributes are handled 
                    // by the attributeChangedCallback.
                    if (mutation.type === 'attributes') {
                        this.updateTextContent(this.originalAttributes.text);
                    }
                  });
                }

                async connectedCallback() {
                  // cache original textContent
                  this.originalAttributes = {
                    text: this.textContent
                  };
                  // update textContent according to all attributes
                  this.updateTextContent(this.originalAttributes.text);
                }

                updateTextContent(text) {
                  const textlength = this.getAttribute('textlength');
                  const trimmedText = this.truncateAfterWord(text, textlength);
                  const apstyle = this.hasAttribute('apstyle');
                  this.textContent = apstyle ? this.apStyleTitleCase(trimmedText) : trimmedText;
                }

                truncateAfterWord (str, chars) {
                  if (!chars || !str ) return str;
                  return str.length < chars ? str : `${str.substr( 0, str.substr(0, chars - 3).lastIndexOf(" "))}...`;
                }

                capitalize(value) {
                  return value.charAt(0).toUpperCase() + value.slice(1);
                }

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
              }

              // register component
              customElements.define( 'truncated-aptitle', TruncatedAPTitle, { extends: 'span' } );
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
              - item: "building-netlify-cms-content-model"
              - item: "using-forestry-cms-with-metalsmith"
---