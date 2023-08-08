---
layout: blocks.njk
draft: false
pageType: "blog-post"
disableDefaultFooter: true
item: "using-clamp-in-responsive-design" # used as a key for bloglist filters

seo:
  title: Better Responsive Websites with Clamp | Werner Glinka
  description: "clamp() provides a potent tool for crafting responsive designs adaptable across various devices and screen sizes. It enables linear transitions between two viewport widths, making designs flexible and maintainable."

  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1681846719/a-clamp_bzno8s.jpg"
  canonicalOverwrite: ""

blogTitle: "Better Responsive Websites with Clamp"
date: 2023-04-18
author: ""
image:
  src: "v1681846719/a-clamp_bzno8s.jpg"
  alt: ""
  caption:
excerpt: "clamp() provides a potent tool for crafting responsive designs adaptable across various devices and screen sizes. It enables linear transitions between two viewport widths, making designs flexible and maintainable."


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
        image: "v1681846719/a-clamp_bzno8s.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Better Responsive Websites with Clamp"
              header: "h1"
              subtitle: ""
              prose: ""
            date: 2023-04-18

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
              The [clamp()](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp) function is powerful in creating responsive web designs. It outputs a preferred value within a range of values between a defined minimum and maximum bound and can be used to develop linear transitions between two viewport widths. The function has been supported by major browsers since 2020, making it a reliable and widely compatible solution for responsive design.
                
              The basic syntax of clamp() is as follows:


              ```css
              clamp(minimum, preferred value, maximum);
              ```

              The minimum value is the smallest. This is the lower bound in the range of allowed values. The minimum value will be used if the preferred value is less than this value.

              The preferred value is the expression whose value will be used as long as a result is between the minimum and maximum values. The minimum value will be used if the preferred value is less than the minimum value. The maximum value will be used if the preferred value is greater than the maximum value.

              The maximum value is the largest expression value to which the property's value will be assigned if the preferred value exceeds this upper bound. If the preferred value is larger than this value, the maximum value will be used

              The preferred value argument is typically expressed in percent or viewport width, and it can be calculated using CSS functions like [calc()](https://developer.mozilla.org/en-US/docs/Web/CSS/calc). So, for example, when using clamp() to create a responsive design, we can use calc() to calculate the preferred value argument based on the current viewport width

              To implement fluid font sizes as a function of the viewport width, we can use the following formula to vary the font size between 16px and 24px as the viewport width increases from 320px to 768px:

              ```css
              font-size: clamp(16px, calc(16px + (24 - 16) * (100vw - 320px) / (768 - 320)), 24px);
              ```

              In this formula, 16px is the minimum font size, 24px is the maximum font size, 320px is the minimum viewport width, and 768px is the full viewport width. The calc() function subtracts 320px from the current viewport width (100vw) and divides the result by the difference between 768px and 320px. 

              This gives a value between 0 and 1, representing the distance's proportion between the two viewport widths. Multiplying this proportion by the difference between 24px and 16px and adding 16px gives a value that is linearly proportional to the viewport width. So, the font size will start at 16px when the viewport width is 320px, increase linearly as the viewport width increases, and reach 24px when the viewport width is 768px or greater.

              This approach is not limited to fluid font-size calculation. Any number can be made fluid, including padding and margins.
              One of the benefits of using clamp() is that it allows us to create responsive designs without relying on media queries or JavaScript. This can simplify the CSS and makes the code more maintainable.

              **Update**: And here is a [tool to make this simple](/blog/clamp-calculator/).


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
              - item: "clamp-calculator" 

---