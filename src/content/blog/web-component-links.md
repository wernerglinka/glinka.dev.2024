---
layout: blocks.njk
draft: false
pageType: "blog-post"
disableDefaultFooter: true
item: "web-component-links" # used as a key for bloglist filters

seo:
  title: "A simple link web component | Werner Glinka"
  description: "A versatile web component I value: seamlessly blends text links, buttons, color schemes, and link types (external/internal) into a single, efficient component."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1691783874/links_ugtrp8.jpg"
  canonicalOverwrite: ""

blogTitle: "A simple link web component"
date: 2023-08-14
author: ""
image:
  src: "v1691783874/links_ugtrp8.jpg"
  alt: ""
  caption:
excerpt: "A versatile web component I value: seamlessly blends text links, buttons, color schemes, and link types (external/internal) into a single, efficient component."

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
        image: "v1691783874/links_ugtrp8.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "A simple link web component"
              header: "h1"
              subtitle: ""
              prose: ""
            date: 2023-08-14
          
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
              In this blog post, we will explore the `LinkComponent` - a versatile web component that renders links either as text links or button links.

              I'll not go into too much detail of how I build web components. I have done so in previous posts [Building a Custom Web Component: Cloudinaryimage](/blog/web-component-cloudinary-image) or [Truncated Aptitle - a Custom Web Component](/blog/web-component-truncated-ap-title-span).

              ### Introduction

              The `LinkComponent` is designed to render links either as plain text or as a button. It offers several configurations like setting a color scheme, determining if the link opens in a new tab, and even customizing the label text. A simple usage looks like:
              
              ```html
              <link-component url="<your-url>" isbutton colorscheme="primary" isexternal>Label</link-component>
              ```

              ### Key Features

              - **Encapsulation with Shadow DOM**: The component makes use of the Shadow DOM, ensuring styles and markup remain isolated from the rest of the page. This prevents accidental CSS leaks and style conflicts.

              - **Dynamic Styling**: The LinkComponent supports various color schemes like `primary`, `secondary`, `tertiary`, and `inverted`. This is achieved using CSS custom properties (variables) which are both readable and maintainable.

              - **Reactivity**: The component is designed to be reactive. Changes to its attributes or content dynamically update the rendered link. This reactivity is achieved using a `MutationObserver` which watches for changes in the attributes and the `textContent`.

              - **Accessibility**: When rendered as a button, the link gets an `aria-label` attribute, making it more accessible to screen readers. External links get `target="_blank"` and `rel="noopener noreferrer"` attributes for security and performance reasons.

              ### Usage

              #### Rendering as a text link:
              ```html
              <link-component url="<your-url>">Your Label</link-component>

              // renders as: <a href="<your-url>" class="text-link">Your Label</a>
              ```
              
              #### Rendering as a Button:
              ```html
              <link-component url="<your-url>" isbutton colorscheme="primary">Your Label</link-component>

              // renders as: <a href="<your-url>" class="btn primary">Your Label</a>
              ```
              
              #### External Links:
              ```html
              <link-component url="<your-url>" isexternal>Your Label</link-component>

              // renders as: <a href="<your-url>" class="text-link" target="_blank" rel="noopener noreferrer">Your Label</a>
              ```

              ### Code
              Here is the code for the `LinkComponent` component:

              ```javascript
              /**
              * @name LinkComponent
              * @description LinkComponent is a component for links to be rendered as either a text or a button link.
              * @example <link-component url="https://www.apple.com" isbutton colorscheme="primary" isexternal>Label</link-component>
              * @param {string} url - url for link
              * @param {string} label - label for link
              * @param {string} isbutton - if exists, link is renders as a button, else as a text link
              * @param {string} colorscheme - color scheme for button link, primary, secondary or inverted
              * @param {string} isexternal - if exists, link is rendered as an external link
              * 
              */

              class LinkComponent extends HTMLElement {
                
                constructor() {
                  super();
                  
                  this.shadow = this.attachShadow({ mode: 'open' });
                  this.shadow.innerHTML = `
                    <style>
                      /* default styles */
                      :host {
                        --btn-color: #003436;
                        --btn-text-color: #fff;
                        --btn-border-radius: 0;
                        --btn-padding: 0rem 2.5rem;
                        --btn-font-size: 1rem;
                        --btn-font-weight: 700;
                        --btn-line-height: 2.5rem;

                        --btn-color-primary: #003436;
                        --btn-text-color-primary: #fff;

                        --btn-color-secondary: #007175;
                        --btn-text-color-secondary: #fff;

                        --btn-color-tertiary: #00AFB5;
                        --btn-text-color-tertiary: #222;

                        --btn-color-inverted: transparent;
                        --btn-border-color-inverted: #003436;
                        --btn-text-color-inverted: #003436;
                        --btn-text-color-hover-inverted: #fff;
                        
                        --link-color: #003436;
                        --link-hover-color: #00C896;

                        --link-white-space: nowrap;

                      }

                      .text-link {
                        color: var(--link-color);
                        text-decoration: none;
                        border-bottom: 1px dashed var(--link-color);
                        transition: all 0.3s ease-in-out;

                        &:hover {
                          opacity: 0.5;
                        }
                      }
                      
                      .btn {
                        display: inline-block;
                        position: relative;

                        background: var(--btn-color);
                        border: 1px solid var(--btn-border-color);
                        border-radius: var(--btn-border-radius);
                        color: var(--btn-text-color);
                        cursor: pointer;
                        padding: var(--btn-padding);
                        font-size: var(--btn-font-size);
                        font-weight: var(--btn-font-weight);
                        line-height: var(--btn-line-height);
                        text-align: center;
                        text-decoration: none;
                        white-space: var(--link-white-space);
                        transition: all 0.3s ease-in-out;

                        &:hover {
                          opacity: 0.7;
                        }

                        &.primary {
                          background: var(--btn-color-primary);
                          border-color: var(--btn-color-primary);
                          color: var(--btn-text-color-primary);
                        }

                        &.secondary {
                          background: var(--btn-color-secondary);
                          border-color: var(--btn-color-secondary);
                          color: var(--btn-text-color-secondary);
                        }

                        &.tertiary {
                          background: var(--btn-color-tertiary);
                          border-color: var(--btn-color-tertiary);
                          color: var(--btn-text-color-tertiary);
                        } 

                        &.inverted {
                          background: var(--btn-color-inverted);
                          border: 2px solid var(--btn-border-color-inverted);
                          color: var(--btn-text-color-inverted);

                          &:hover {
                            background: var(--btn-border-color-inverted);
                            color: var(--btn-text-color-hover-inverted);
                          }
                        }
                      }
                    </style>
                    <a></a>
                  `;

                  this.link = this.shadow.querySelector('a');

                  // cache the state of the component
                  this.props = {
                    url: "",
                    colorscheme: "",
                    isbutton: false,
                    isexternal: false,
                    label: ""
                  };

                  this.updateLink = link => {
                    link.setAttribute('href', this.props.url);
                    if (this.props.isexternal) { 
                      link.setAttribute('target', '_blank');
                      link.setAttribute('rel', 'noopener noreferrer');
                    } else {
                      link.removeAttribute('target');
                      link.removeAttribute('rel');
                    }
                    if (this.props.isbutton) { 
                      link.setAttribute('role', 'button');
                      link.setAttribute('aria-label', this.props.label);
                      link.setAttribute('class', `btn ${this.props.colorscheme}`.trim()); // trim removes white space in case colorScheme is not set
                    } else {
                      link.setAttribute('class', `text-link`);
                      // if updated from button to text link remove these attributes
                      link.removeAttribute('role');
                      link.removeAttribute('aria-label');
                    }
                    link.textContent = this.props.label;
                  }

                  // watch for textContent and boolean attribute changes
                  this.mutationObserver = new MutationObserver(this.mutationObserverCallback.bind(this));
                  this.mutationObserver.observe(this, {
                    attributes: true,
                    characterData: true, 
                    childList: true, 
                    subtree: true 
                  });
                } // end constructor

                // component attributes
                static get observedAttributes() {
                  return ['url', 'colorscheme', 'isbutton', 'isexternal'];
                }

                // explicitly define properties reflecting to attributes
                get url() {
                  return this.props.url;
                }
                set url(value) { 
                  this.props.url = value;
                  this.updateLink(this.link);
                }
                get colorscheme() {
                  return this.props.colorscheme;
                }
                set colorscheme(value) { 
                  this.props.colorscheme = value;
                  this.updateLink(this.link);
                }
                get isbutton() {
                  return this.props.isbutton;
                }
                set isbutton(value) { 
                  this.props.isbutton = !!value;
                  this.updateLink(this.link);
                }
                get isexternal() {
                  return this.props.isexternal;
                }
                set isexternal(value) { 
                  this.props.isexternal = !!value;
                  this.updateLink(this.link);
                }
                
                // attribute change
                attributeChangedCallback(property, oldValue, newValue) {
                  if (!oldValue || oldValue === newValue) return;

                  switch (property) {
                    case 'url':
                      this.props.url = newValue;
                      break;
                    case 'colorscheme':
                      this.props.colorscheme = newValue;
                      break;
                  }

                  this.updateLink(this.link);
                }

                // boolean attributes and the textContent are changed via a mutation observer
                mutationObserverCallback(mutations) {
                  mutations.forEach((mutation) => {
                    /**
                    * characterData and childList mutations are for textContent changes
                    */

                    if (mutation.type === 'characterData' || mutation.type === 'childList') {
                      this.props.label = mutation.target.textContent;
                    }

                    /**
                    * @notes
                    * For boolean attributes, we use attribute mutations since they don't trigger 
                    * the `attributeChangedCallback`. All other attribute changes are managed by the 
                    * `attributeChangedCallback`.
                    */
                    if (mutation.type === 'attributes') {
                      if (mutation.attributeName === 'isbutton') {
                        this.props.isbutton = !!mutation.target.hasAttribute('isbutton');
                      } 
                      if (mutation.attributeName === 'isexternal') {
                        this.props.isexternal = !!mutation.target.hasAttribute('isexternal');  
                      }
                    }
                    this.updateLink(this.link);
                  });
                } // end mutationObserverCallback

                async connectedCallback() {
                  this.props.url = this.getAttribute('url');
                  this.props.isbutton = this.hasAttribute('isbutton');
                  this.props.isexternal = this.hasAttribute('isexternal');
                  this.props.colorscheme = this.getAttribute('colorscheme');
                  this.props.label = this.textContent;

                  //create link element
                  const link = this.shadow.querySelector('a');

                  this.updateLink(link);
                }

                disconnectedCallback() {
                  // remove mutation observer
                  this.mutationObserver.disconnect();
                } 
              }

              // register component
              customElements.define( 'link-component', LinkComponent );
              ```

              The code can be found on [GitHub](https://github.com/wernerglinka/linkComponent) and on [NPM](https://www.npmjs.com/package/@wernerglinka/linkcomponent).


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
              - item: "web-component-cloudinary-image"
              - item: "web-component-truncated-ap-title-span"
              - item: "exploring-web-components"
---