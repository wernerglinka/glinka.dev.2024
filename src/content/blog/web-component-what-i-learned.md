---
layout: blocks.njk
draft: false
pageType: "blog-post"
disableDefaultFooter: true
item: "web-component-what-i-learned" # used as a key for bloglist filters

seo:
  title: "Building Web Components: What I Learned | Werner Glinka"
  description: "Web components are a blend of specifications, not a rigid framework. By seeking community wisdom I have learned a lot about the best practices and pitfalls of web components."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1646849499/tgc2022/social_yitz6j.png"
  canonicalOverwrite: ""

blogTitle: "What I Learned Building Web Components"
date: 2023-08-11
author: ""
image:
  src: "v1691778282/what-i-learned_ssixre.jpg"
  alt: ""
  caption:
excerpt: "Web components are a blend of specifications, not a rigid framework. By seeking community wisdom I have learned a lot about the best practices and pitfalls of web components."

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
        image: "v1691778282/what-i-learned_ssixre.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Building Web Components - What I Learned"
              header: "h1"
              subtitle: "Applies AP title case and trims text to the specified length"
              prose: ""
            date: 2023-08-11
          
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
              Web components, in essence, represent the modern web's promise of encapsulation and reusability. They're an umbrella term for a suite of technologies, allowing developers to create reusable custom elements with their functionality hidden from the global scope. But it's crucial to understand that web components are more than just a technology or a feature: they're a set of specifications and conventions. 

              There isn't a monolithic, singular way to build web components. Unlike certain frameworks or libraries that come with strict guidelines, web components, being more of a standard, leave much to interpretation. This freedom can be both exhilarating and overwhelming. Having built a few web components, I've learned a lot about the best practices and pitfalls of web components and here are some of my takeaways:

              - **Do not extend built-in HTML elements as Safari doesn't support it. Only extend HTML elements.**
                
                Extending built-in HTML elements (like `<button>`, `<input>`, etc.) is referred to as customized built-in elements. As of August 2023, Safari does not fully support it. The safer approach is to use autonomous custom elements, which means creating entirely new elements like `<my-button>` or `<my-slider>`.

              - **The state of the component is cached in an object.**
                
                This is a common pattern, especially in larger or more complex components. Managing the state in a centralized object can simplify update logic and make the component more readable.

              - **The state object will be defined in the `constructor`.**
                
                Generally, it's a good place to define initial values. It ensures the state exists before any other methods attempt to use it.

              - **The state object will be initialized in `connectedCallback`.**
                
                This makes sense if you want to ensure the state object is populated with initial values when the element is added to the DOM.

              - **Element updates will be done with a dedicated `updateElement` method.**
                
                It's a good practice to abstract the update logic to its own method. This makes the code modular and easier to maintain.

              - **Attributes define the initial component state.**
                
                My components use attributes to allow users to configure the initial state of the component.

              - **Attributes will not be updated via the JS API.**
                
                This follows how HTML elements work. For example, you can't update the `value` attribute of an `<input>` element with JavaScript. Instead, you update the `value` property. 

              - **Boolean attribute changes will be monitored with a `MutationObserver`.**
                
                This will allow the deletion and addition of attributes to be monitored.

              - **All non-boolean attributes will be monitored in `attributeChangedCallback`.**
                
                This is the built-in way of detecting attribute changes for web components.

              - **Attribute changes will call the element update method.**
                
                This ensures the component remains reactive to changes.

              - **All attributes will be reflected with element properties in `connectedCallback`.**
                
                This ensures synchronicity between attributes and properties.

              - **Getters and setters will update the `props` object and then call the component update method if necessary.**
                
                It's common to use getters and setters for this. _BUT, be aware that this can cause infinite loops, as updating a property in a setter could lead to the setter being called again!_

              - **Encapsulation is powerful but can introduce styling challenges.**

                Web components may include a shadow DOM, which ensures style and structure encapsulation. But it can also make it challenging when users want to style your component. A good approach is to provide CSS custom properties or "CSS variables" to allow for some style customization without breaching encapsulation. A README file is your best way to communicate how to style your component.

              - **Events are the bridge for inter-component communication.**

                While encapsulation ensures separation, sometimes your web component needs to talk to the outer world. Custom events can broadcast updates and communicate with its surroundings.

              - **Accessibility is non-negotiable.**

                Like all web development, accessibility is essential. Ensure that your components are accessible by using the right aria attributes, semantic HTML, and keyboard navigability. It's easy to overlook this with custom elements, but it's crucial.


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