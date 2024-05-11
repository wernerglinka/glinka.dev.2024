---
layout: blocks.njk
draft: false
pageType: "blog-post"
disableDefaultFooter: true
item: "building-smooth-marquee" # used as a key for bloglist filters

seo:
  title: Creating a Smooth Marquee Animation with CSS | Werner Glinka
  description: "Marquee animations can be a great addition to engaging and eye-catching website designs. Implementing a smooth-image marquee animation can be challenging. This blog post will explore the techniques I used to create a smooth marquee animation using CSS, including multiple content copies and 3D transformations.
"
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1690483186/badges_m3g2nr.jpg"
  canonicalOverwrite: ""

blogTitle: "Creating a Smooth Marquee Animation with CSS: Lessons Learned"
date: 2024-05-11
author: ""
image:
  src: "v1690483186/badges_m3g2nr.jpg"
  alt: ""
  caption:
excerpt: "Marquee animations can be a great addition to engaging and eye-catching website designs. I have primarily used them for social proof..."

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
        image: "v1690483186/badges_m3g2nr.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Creating a Smooth Marquee Animation with CSS: Lessons Learned"
              header: "h1"
              subtitle: ""
              prose: ""
            date: 2024-05-11
          
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
              Marquee animations can be a great addition to engaging and eye-catching website designs. I have primarily used them for social proof to support marketing claims, such as displaying customer logos linked to testimonials or case studies.

              In the past, an HTML element `<marquee>` was mainly used for scrolling text. However, when researching this element on [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/marquee), I was greeted with a warning:

              **Deprecated:** This feature is no longer recommended. Though some browsers might still support it, it may have already been removed from the relevant web standards, may be in the process of being dropped, or may only be kept for compatibility purposes. Avoid using it, and update existing code if possible.

              This left me with one option: do it yourself. After researching this subject, I settled on [Ryan Mulligan's approach](https://ryanmulligan.dev/blog/css-marquee/). However, I discovered that implementing a smooth-image marquee animation can be challenging. This blog post will explore the techniques I used to create a smooth marquee animation using CSS, including multiple content copies and 3D transformations.

              ## The Problem

              Initially, I encountered issues with my marquee animation where the images would not render correctly or disappear intermittently. The animation would work fine for a while, but then the images would vanish, only reappearing when the cursor moved on the page. This inconsistent behavior was frustrating and detracted from the overall user experience.

              ## The Solution

              After some experimentation and research, I discovered two crucial techniques that significantly improved the marquee animation:

              **Multiple Content Copies:** Instead of using two copies of the marquee content, I increased the number to three. Having multiple copies of the content, I found that logos were always visible during the animation loop. When one copy moved out of view, the following copy was already in place to continue the animation seamlessly, creating the illusion of an infinite loop.

              **3D Transformations:** I replaced the traditional 2D transformations with 3D transformations, specifically using `translate3d()`. By leveraging 3D transformations, I took advantage of the hardware acceleration provided by the device's GPU. This resulted in smoother and more efficient animation rendering compared to 2D transformations.

              **The CSS Code:**
              Here's the final CSS code:

              ```css
              .images-marquee {
                --animation-speed: 50s;
                
                .container {
                  position: relative;
                  overflow: hidden;

                  &:before,
                  &:after {
                    content: "";
                    position: absolute;
                    z-index: 1000;
                    top: 0;
                    left: 0;
                    width: 15rem;
                    height: 100%;
                    background-image: linear-gradient(to right, rgba(255, 255, 255, 1), transparent);
                  }
                  &:after {
                    left: auto;
                    right: 0;
                    background-image: linear-gradient(to left, rgba(255, 255, 255, 1), transparent);
                  }
                }

                .marquee {
                  position: relative;
                  display: flex;
                  overflow: hidden;
                  user-select: none;

                  &.hover-pause:hover .marquee-content {
                    animation-play-state: paused;
                  }
                }

                .marquee-content {
                  flex-shrink: 0;
                  display: flex;
                  justify-content: space-around;
                  animation: scroll var(--animation-speed) linear infinite;

                  /* Pause animation when reduced-motion is set */
                  @media (prefers-reduced-motion: reduce) {
                    .marquee-content {
                      animation-play-state: paused !important;
                    }
                  }

                  li {
                    display: flex;
                    flex-shrink: 0;
                    flex-direction: column;
                    justify-content: center;
                    width: 20rem;

                    img {
                      max-width: 100%;
                      height: 10rem;
                    }
                  }
                }

                @keyframes scroll {
                  0% {
                      transform: translate3d(0, 0, 0);
                  }

                  100% {
                      transform: translate3d(-100%, 0, 0);
                  }
                }
              ```

              In this code, the `.marquee-content` class sets up the marquee content using Flexbox and applies the `scroll` animation. Each list item (`.marquee-content li`) has a fixed width and is set not to shrink. The `@keyframes` rule defines the animation keyframes, using `translate3d()` to move the content horizontally.

  - container: aside # section || article || aside
    description: "section with image marquee"
    containerFields:
      disabled: false
      containerId: ""
      containerClass: "marquee-section"
      inContainer: false
      background:
        color: ""
        image: ""
        isDark: false
    columns:
      - column:
        blocks:
          - name: image-marquee
            blockClass: ""
            imageFolder: "/assets/images/bundesliga/"
            selections:
              - item: "augsburg.svg"
              - item: "bayern.svg"
              - item: "dortmund.svg"
              - item: "frankfurt.svg"
              - item: "freiburg.svg"
              - item: "berlin.svg"
              - item: "hoffenheim.svg"
              - item: "köln.svg"
              - item: "leverkusen.svg"
              - item: "mainz.svg"
              - item: "monchengladbach.svg"
              - item: "schalke.svg"
              - item: "stuttgart.svg"
              - item: "wolfsburg.svg"
              - item: "bremen.svg"
              - item: "darmstadt.svg"
              - item: "bochum.svg"
              - item: "heidenheim.svg"
              - item: "leipzig.svg"
     
    
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
              ## Conclusion

              By implementing multiple content copies and utilizing 3D transformations, I created a smooth marquee animation. The multiple copies ensured continuous content visibility, while the 3D transformations provided hardware acceleration for improved performance. These techniques resolved my initial issues, resulting in a seamless and visually appealing marquee animation.

              I hope this blog post helps others who may encounter similar challenges when creating marquee animations.


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
---