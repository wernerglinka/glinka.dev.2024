---
layout: blocks.njk
draft: false
pageType: "blog-post"
disableDefaultFooter: true
item: "metalsmith-redux-beyond-markdown" # used as a key for bloglist filters

seo:
  title: "Beyond Markdown: Adding Structured Components with Metalsmith MDN | Werner Glinka"
  description: "MDN is a Metalsmith plugin that provides a simple way to include structured Nunjucks components directly within your Markdown content"
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1711578702/m_n-header_yw6yhq.jpg"
  canonicalOverwrite: ""

blogTitle: "Beyond Markdown: Adding Structured Components with Metalsmith MDN"
date: 2025-05-09
author: ""
image:
  src: "v1711578702/m_n-header_yw6yhq.jpg"
  alt: ""
  caption:
excerpt: "We explore a common challenge when working with Markdown-based content: how do you include structured, reusable components within your long-text content?"

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
        image: "v1711578702/m_n-header_yw6yhq.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Beyond Markdown"
              titleCase: false
              header: "h1"
              subtitle: "Adding Structured Components with Metalsmith MDN"
              prose: ""
            date: 2025-05-09

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
              Over the course of our Metalsmith Redux series, we've built a solid foundation for creating static websites with Metalsmith. You've learned how to [set up a Metalsmith project](/blog/metalsmith-redux-getting-started/), understand the [file structure](/blog/metalsmith-redux-files-structure/), [work with dependencies](/blog/metalsmith-redux-dependencies-scripts/), [configure the build pipeline](/blog/metalsmith-redux-build-pipeline/), and [implement templating with Nunjucks](/blog/metalsmith-redux-templating/).

              But there's still a fundamental challenge when working with Markdown-based content: how do you include structured, reusable components within your long-form content?

              ## The Content Flexibility Challenge

              When building websites, we often face competing needs:
              - Ease of writing - Markdown excels here, making content creation straightforward
              - Structured components - For consistent design and reusable elements
              - Flexibility - The ability to place components anywhere within content

              Traditional approaches force you to choose between simple Markdown (sacrificing structure) or complex templating (sacrificing simplicity). But what if you could have both?

              ## Introducing MDN: Markdown + Nunjucks
              
              That's where the `metalsmith-mdn` plugin comes in. MDN stands for "Markdown + Nunjucks" and provides a simple way to include structured Nunjucks sections directly within your Markdown content. 

              With MDN, you can:

              - Write most of your content in simple Markdown
              - Include structured components exactly where needed
              - Reuse the same components across your site

              Let's see how to enhance our Metalsmith2025 Simple Starter with MDN and implement a practical example: an author bio component that can be placed anywhere within our blog posts.

              ## Adding MDN to the Starter
              First, let's install the metalsmith-mdn plugin:

              ```bash
              npm install --save metalsmith-mdn
              ```

              Next, we need to update our `metalsmith.js` file to include the plugin in our build pipeline. Remember that **MDN must be added immediately before the markdown plugin**:

              ```javascript
              // metalsmith.js
              import MDN from 'metalsmith-mdn';
              // ... other imports

              // In the pipeline
              metalsmith
                // ... existing plugins
                .use(
                  MDN({
                    templatesDir: 'lib/layouts',
                    customFilters: 'lib/nunjucks-filters/index.js'
                  })
                )
                .use(markdown({
                  engineOptions: {
                    extended: {
                      rehypePlugins: [rehypeHighlight]
                    }
                  }
                }))
                // ... rest of pipeline
                ```

              Notice that we're setting `templatesDir` to `lib/layouts` because that's where the Nunjucks templates are stored in the starter file system.

              ## Creating an About the Author Component

              Now that we have MDN installed, let's create a reusable author Component that we can include in our blog posts.

              ### 1. Create the Component Template
              
              First, we'll create a new Nunjucks template for our author Component. Create a new file at lib/layouts/sections/author.njk:
              
              ```html
              <aside class="blog-author">
                <h2>About {{ params.text.name }}</h2>
                <div>
                  <img src="{{ params.portrait}}" alt="{{ params.text.name }}" />
                  <p>{{ params.text.bio }}</p>
                </div>
                {% if params.social %}
                <ul class="social-links">
                  {% for link in params.social %}
                  <li>
                    <a href="{{ link.url }}" class="author-bio__social-link" target="_blank" rel="noopener">
                      {{ link.platform }}
                    </a>
                  </li>
                  {% endfor %}
                </ul>
                {% endif %}
              </aside>
              ```

              ### 2. Add Some Styling

              Let's add some basic CSS to style our author bio component. Add this to your site's CSS file in `lib/assets/styles.css`:
              
              ```css
              /**
               * Blog Author Section
               */
              .blog-author {
                margin: var(--spacing-lg) 0;
                padding: var(--spacing-md);
                background-color: var(--color-background-light);
                border-radius: var(--border-radius);
                box-shadow: 0 2px 4px var(--color-shadow);
                transition:
                  transform var(--transition-fast),
                  box-shadow var(--transition-fast);

                /* Author heading */
                h2 {
                  margin-top: 0;
                  color: var(--color-primary);
                  border-bottom: 2px solid var(--color-border);
                  padding-bottom: var(--spacing-xs);
                }

                /* Author content container */
                > div {
                  display: flex;
                  justify-content: flex-start;
                  align-items: center;
                  gap: var(--spacing-md);
                }

                /* Author image */
                img {
                  width: 150px;
                  height: 150px;
                  object-fit: cover;
                }

                /* Author bio */
                p {
                  padding-left: var(--spacing-md);
                  font-style: italic;
                  margin: 0;
                }

                /* Social links */
                .social-links {
                  list-style: none;
                  padding: 0;
                  margin: 0;
                  display: flex;
                  justify-content: flex-end;
                  gap: var(--spacing-sm);
                  margin-top: var(--spacing-md);
                }

                .social-links li {
                  margin: 0;
                }

                .social-links a {
                  text-decoration: none;
                  color: var(--color-primary);
                  font-weight: bold;
                }
                /* Responsive layout for small screens */
                @media (max-width: 767px) {
                  > div {
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                  }

                  img {
                    margin-bottom: var(--spacing-md);
                  }

                  p {
                    padding-left: 0;
                  }
                }
              }
              ```

              ### 3. Use the Component in a Blog Post

              Now, let's update one of our blog posts to include the author component. Open a blog post file in the `src/blog` directory and add the author component to the frontmatter and the corresponding MDN Tag,  `{#mdn "author" #}`,  at the end of the markdown body:

              ```markdown
              ---
              layout: blog-post-with-sidebar.njk
              bodyClass: "blog-post"
              draft: false

              seo:
                title: Cras mattis consectetur purus
                description: "Etiam porta sem malesuada magna mollis euismod."
                socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1646849499/tgc2022/social_yitz6j.png"
                canonicalOverwrite: ""

              post:
                title: "Cras mattis consectetur purus"
                date: "2021-07-10T12:00:00Z"
                author: "Albert Einstein"
                image: "/assets/images/blog-images/blog2.jpg"
                featuredBlogpost: true
                featuredBlogpostOrder: 1
                excerpt: |-
                  Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec id elit non mi porta gravida at eget metus. Maecenas faucibus mollis interdum. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.

              # Add the author bio component configuration
              author:
                layout: sections/author.njk
                text:
                  name: "Albert Einstein"
                  bio: "It was March 14, 1951, the day Albert Einstein turned 72. The famous physicist, who was born in Ulm, Germany, had already been living in the United States for many years. At the time, he was working at the Institute for Advanced Study in Princeton, New Jersey."
                social:
                  - url: "https://www.linkedin.com/company/albert-einstein-institution/"
                    platform: "LinkedIn"
                  - url: "https://github.com/manjunath5496/The-Collected-Papers-of-Albert-Einstein"
                    platform: "GitHub"
                portrait: "/assets/images/blog-images/albert.jpg"
              ---

              Aenean lacinia bibendum nulla sed consectetur. Maecenas faucibus mollis interdum. ...

              ...Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.

              {#mdn "author" #}
              ```

              Although we placed the author section at the end of the post, you can place it anywhere within the content.

              The key things to notice here:

              - We added an `author` object to the frontmatter with all the properties our component needs
              - We included the `{#mdn "author" #}` tag in the Markdown content where we want the author section to appear
              - The layout property inside author points to our template at  `secion/author.njk`

              ### 4. How MDN Processes Your Content

              This is where the magic happens. When you build your site, the MDN plugin:

              - **Finds all MDN tags**: It scans your Markdown content for `{#mdn "componentName" #}` tags
              - **Renders each tag as HTML**: It uses Nunjucks to transform your component data into HTML
              - **Inserts the HTML directly into your content**: The MDN tag is replaced with the rendered HTML

              The HTML that MDN generates becomes part of your Markdown content before the Markdown processor runs. Since almost allMarkdown processors are designed to pass through HTML unchanged, your component remains intact during Markdown processing.
              
              For example, your content might transform like this:

              #### Before MDN Processing
              ```markdown
              Here's some text.
              {#mdn "author" #}
              More text here.
              ```

              #### After MDN Processing (before Markdown processing)
              ```html
              Here's some text.
              <div class="author-bio">
                <div class="author-bio__avatar">
                  <img src="/assets/images/authors/werner.jpg" alt="Werner Glinka">
                </div>
                <!-- rest of the component HTML -->
              </div>
              More text here.
              ```

              #### After Markdown Processing
              ```html
              <h1>Before MDN Processing</h1>
              <p>Here's some text.</p>
              <div class="author-bio">
                <div class="author-bio__avatar">
                  <img src="/assets/images/authors/werner.jpg" alt="Werner Glinka">
                </div>
                <!-- rest of the component HTML remains intact -->
              </div>
              <p>More text here.</p>
              ```

              This process ensures that your structured components are perfectly integrated with your Markdown content.
              
              ## How MDN Works

              Understanding how MDN works is relatively simple:

              - **Configuration**: You set up the plugin with the location of your templates and any custom filters
              - **Tag Placement**: You place {#mdn "componentName" #} tags in your Markdown content
              - **Data Definition**: You define the component data in your frontmatter
              - **Processing**: The plugin processes all MDN tags, rendering them as HTML that's perfectly valid within Markdown syntax
              - **Markdown Conversion**: After MDN processing, the Markdown plugin converts the content to HTML, preserving your component's structure

              The important thing to remember is that most Markdown processors are designed to pass HTML through unchanged. MDN leverages this behavior by inserting fully-formed HTML before the Markdown processing step, allowing you to seamlessly mix Markdown's simplicity with the power of structured components.

              ## Beyond Author Bios: Other Component Ideas

              The author bio is just one example of what you can do with MDN. Here are some other components you might create:

              - **Call-to-action boxes** - Highlight important actions
              - **Image galleries** - Display collections of images
              - **Product features** - Highlight product details with consistent styling
              - **Testimonial quotes** - Include customer feedback
              - **Alert boxes** - Highlight important information
              - **Interactive elements** - Include forms or other interactive components

              The beauty of this approach is that you can create these components once and reuse them across your site, both in your templates and directly within your Markdown content.

              ### Using the Same Components in Templates and Content
              One of the biggest advantages of MDN is that it allows you to use the same sections in both your templates and your Markdown content. This ensures a consistent design language across your site.

              For example, you could use the author section:
              - In templates: At the end of blog post templates
              - In Markdown: In the middle of a specific post where it makes more sense contextually
              - In author pages: As the header for an author's profile page

              The component looks the same everywhere, but you have the flexibility to place it wherever it makes the most sense.
              
              ## Advanced MDN Usage
              
              Once you're comfortable with the basics, you can explore more advanced MDN features:

              ### Conditional Component Properties
              You can make certain aspects of your components optional:

              ```nunjucks
              {% if params.showTitle !== false %}
                <h2 class="component__title">{{ params.title }}</h2>
              {% endif %}
              ```

              ### Component Variants
              You can create component variants through properties:

              ```nunjucks
              <div class="callout callout--{{ params.type || 'info' }}">
                {{ params.content | mdToHTML | safe }}
              </div>
              ```

              ### Custom Filters
              You can create custom Nunjucks filters to transform your data. MDN supports loading custom filters from a specified file.

              ## Conclusion
              The `metalsmith-mdn` plugin bridges the gap between simple Markdown content and structured components. By adding MDN to your Metalsmith site, you gain:
              - **Simplicity**: Keep writing most content in Markdown
              - **Flexibility**: Place components anywhere in your content
              - **Consistency**: Reuse the same components across your site

              In a future post, we'll explore an alternative approach to long-form content by using only frontmatter. But for now, try experimenting with MDN in your Metalsmith projects and see how it can enhance your content authoring experience.

              Would you like to see more examples of how MDN can be used in your Metalsmith projects? Let me know on [Bluesky](https://bsky.app/profile/wernerglinka.bsky.social).

  - container: aside # section || article || aside
    description: "social share links"
    containerFields:
      disabled: false
      containerId: ""
      containerClass: "share-links"
      inContainer: false
      background:
        color: ""
        image: ""
        isDark: false
    columns:
      - column:
        blocks:
          - name: social-shares
            blockClass: ""
            text:
              prefix: ""
              title: "Share this post"
              header: "h3"
              subtitle: ""
              prose: ""
            url: "/blog/metalsmith-redux-beyond-markdown"
            socialTitle: "Beyond Markdown: Adding Structured Components with Metalsmith MDN"
            socialComment: "MDN is a Metalsmith plugin that provides a simple way to include structured Nunjucks components directly within your Markdown content"

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
              - item: "introducing-metalsmith-mdn"
---
