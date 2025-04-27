---
layout: blocks.njk
draft: false
pageType: "blog-post"
disableDefaultFooter: true
item: "metalsmith-redux-templating" # used as a key for blogpost filters

seo:
  title: "Metalsmith Redux - Templating with Nunjucks | Werner Glinka"
  description: "Templating with Nunjucks is central to how Metalsmith transforms content into a polished website. It provides the structure and logic needed to create consistent, maintainable sites while keeping content separate from presentation."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1745259892/templating_fuzedt.jpg"
  canonicalOverwrite: ""

blogTitle: "Metalsmith Redux - Templating with Nunjucks"
date: 2025-04-28
author: ""
image:
  src: "v1745259892/templating_fuzedt.jpg"
  alt: ""
  caption:
excerpt: "Templating with Nunjucks is central to how Metalsmith transforms content into a polished website. It provides the structure and logic needed to create consistent, maintainable sites while keeping content separate from presentation"

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
        image: "v1745259892/templating_fuzedt.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Metalsmith Redux: Templating with Nunjucks"
              header: "h1"
              subtitle: ""
              prose: ""
            date: 2025-04-28
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
              In our previous post we discussed the `metalsmith.js` file that defines the site build pipeline. Now let's explore one of the core components of Metalsmith: templating with Nunjucks.

              Templating is a fundamental concept in static site generation that bridges the gap between your content and how it appears on the web. For developers new to static site generators like [Metalsmith](https://metalsmith.io/), understanding templating is crucial to developing a complete mental model of the build process.

              ## What is Templating?

              At its core, [templating](https://en.wikipedia.org/wiki/Template_processor) separates content from presentation. In Metalsmith, your content typically lives in [Markdown](https://www.markdownguide.org/) files with frontmatter, while your presentation logic lives in template files. This separation follows the principle of [separation of concerns](https://en.wikipedia.org/wiki/Separation_of_concerns) - a core tenet of good software architecture.

              Templating works by:
              - Taking your content (data and text)
              - Applying it to a predefined structure (the template)
              - Generating the final HTML that browsers understand

              A critical advantage of templating is componentization - the ability to break down your site's interface into reusable parts. Rather than duplicating common elements like headers, footers, navigation bars, or content cards across multiple templates, you can define these components once and reuse them wherever needed. This approach offers several benefits:

              - **Consistency**: Changes to a component automatically appear everywhere it's used
              - **Maintainability**: Bug fixes only need to be applied in one place
              - **Efficiency**: Less repetitive code means faster development and easier updates
              - **Separation of logic**: Components can encapsulate their own presentation rules

              This componentized approach aligns perfectly with functional programming principles, where small, focused functions compose together to create complex behaviors. In Nunjucks, this is achieved through macros and imports, creating a modular system that maintains clear boundaries between different parts of your template ecosystem.

              ## Why Nunjucks?

              [Nunjucks](https://mozilla.github.io/nunjucks/) is a powerful templating language for JavaScript that was inspired by Jinja2 from the Python ecosystem. It provides several advantages that make it particularly well-suited for Metalsmith projects:

              - **Powerful inheritance system**: Templates can extend other templates, allowing for consistent layouts without duplication.
              - **Rich feature set**: Includes loops, conditionals, filters, and macros for transforming content.
              - **JavaScript integration**: Seamlessly works with JavaScript objects and functions.
              - **Active community**: Maintained and used broadly, ensuring stability and longevity.

              In our Metalsmith2025 Simple Starter, Nunjucks serves as the templating engine that transforms our Markdown content and metadata into a fully-formed website.

              ## Nunjucks in Metalsmith

              Looking at our starter repository, we can see how Nunjucks integrates with Metalsmith in the `metalsmith.js` file:

              ```javascript
              .use(
                layouts({
                  directory: 'lib/layouts',
                  transform: 'nunjucks',
                  pattern: ['**/*.html'],
                  engineOptions
                })
              )
              ```

              This code configures the `@metalsmith/layouts` plugin to:
              - Look for templates in the `lib/layouts` directory
              - Use Nunjucks as the transformation engine
              - Apply templates to all HTML files (in any directory, as indicated by the **/*.html pattern)
              - Pass custom options to the Nunjucks engine

              The `engineOptions` object is particularly important:

              ```javascript
              const engineOptions = {
                path: ['lib/layouts'],
                filters: nunjucksFilters
              };
              ```

              This provides:
              - The path where templates can be found
              - Custom filters for transforming data within templates

              ## Template Inheritance in Nunjucks

              One of Nunjucks' most powerful features is template inheritance, which allows us to create a base structure and extend it for different page types. This prevents duplication and ensures consistency across the site.

              In our starter, this typically works through:

              - **Base templates** that define the overall structure
              - **Child templates** that extend the base and fill in specific sections
              - **Imports** of reusable components like headers and footers

              For example, if we look at the frontmatter of our `about.md` file:

              ```yaml
              ---
              layout: simple.njk
              bodyClass: "about"
              ---
              ```

              This specifies that the content should use the `simple.njk` template, and in `simple.njk`, we extends a base template `layout.njk` while adding page-specific elements. In effect, `simple.njk` replaces the `{% block body %}` section in `layout.njk` with the content from `about.md`.

              The rendering chain works like this:

              1. Metalsmith processes about.md to generate HTML content
              2. The HTML content is passed to simple.njk as the contents variable
              3. simple.njk extends layout.njk and places the content in its body block
              4. The combined template is rendered to create the final HTML page


              ```nunjucks
              {% extends "layout.njk" %}

                {% block body %}
                  <div class="container">{{ contents | safe }}</div>
                {% endblock %}
              ```

              ## Understanding Template Variables

              Nunjucks uses a double curly brace syntax `{{ variable }}` to output variables. These variables come from several sources in a Metalsmith project:

              - **Frontmatter** in your content files (like `bodyClass: "about"`)
              - **Global metadata** defined in your Metalsmith configuration
              - **Computed values** generated during the build process


              For example, if a template contains `<body class="{{ bodyClass }}">`, it will output `<body class="about">` for the About page, using the value from the frontmatter.

              ## Conditionals and Loops

              Nunjucks really shines when handling dynamic content like blog posts. It provides:

              - `{% if %}` statements for conditional rendering
              - `{% for %}` loops for iterating over collections
              - Filters for transforming data (like dates, slugs, etc.)

              This is particularly valuable for our blog section, where we need to display lists of posts, handle pagination, and format dates consistently.

              ## Practical Example: Rendering Blog Posts

              Let's consider how our Metalsmith2025 Simple Starter might use Nunjucks to render blog posts. The process typically flows like this:

              1. Markdown files in the `blog` directory contain content and metadata
              2. The Metalsmith build collects these into a collection
              3. Nunjucks templates iterate through this collection to create:
                - Individual post pages
                - Index pages with post listings
                - Pagination for browsing multiple posts

              The simplePagination plugin in our `metalsmith.js` demonstrates this:

              ```javascript
              .use(
                simplePagination({
                  directory: 'blog',
                  perPage: 2,
                  sortBy: 'post.date',
                  reverse: true,
                  outputDir: 'blog/:num',
                  indexLayout: 'blog.njk',
                  firstIndexFile: 'blog.md',
                  usePermalinks: true
                })
              )
              ```

              This configures how our blog posts are paginated and which template (`blog.njk`) is used to render the listings.

              ## Creating Reusable Components

              One of Nunjucks' most powerful features is the ability to create truly reusable components through its macro system. Instead of merely including template fragments, Nunjucks allows you to import and use macros as self-contained, function-like templates.

              ```nunjucks
              {% from "components/post-card.njk" import postCard %}

              {# Then use it like a function with explicit parameters #}
              {{ postCard({
                title: post.title,
                date: post.date,
                excerpt: post.excerpt,
                url: post.url
              }) }}

              {# Or with the entire post object if the macro is designed to accept it #}
              {{ postCard(post) }}
              ```

              This import-based approach offers several key benefits:

              - **Variable scope isolation**: Unlike with `include`, variables inside the macro won't accidentally overwrite variables in your main template. This prevents unexpected bugs and makes your templates more predictable.

              - **Explicit interfaces**: Parameters must be explicitly passed to macros, creating a clear contract between the component and its consumer. This makes your code more maintainable and self-documenting.

              - **Reusability with different data**: The same component can be used multiple times with different parameters in the same template without interference:

                ```nunjucks
                {{ postCard(featuredPost) }}
                
                {% for post in recentPosts %}
                  {{ postCard(post) }}
                {% endfor %}
                ```

              - **Composition**: Macros can call other macros, allowing for component composition similar to modern frontend frameworks:

                ```nunjucks
                {% from "components/button.njk" import button %}
                
                {% macro postCard(post) %}
                  <div class="post-card">
                    {# ... post content ... #}
                    {{ button({text: "Read More", url: post.url}) }}
                  </div>
                {% endmacro %}
                ```

              This functional approach to templating creates a modular system where each component has a single responsibility, interfaces are clearly defined, and composition is used to build more complex structures.

              ## Debugging Nunjucks Templates
              When working with Nunjucks in Metalsmith, debugging can sometimes be challenging. Here are a few techniques to help troubleshoot template issues:

              - Use the `{% debug %}` tag to print out all variables available in the current context
              - Create custom debug filters in your Metalsmith configuration to log variables
              - Use `{{ variable | dump }}` to inspect complex objects
              - Add comments with `{# This is a comment #}` to temporarily disable sections of code
              - Check the Metalsmith console output for syntax errors in templates

              Remember that template errors often don't provide line numbers, so systematic debugging by commenting out sections can help isolate issues.
              
              ## Conclusion

              Templating with Nunjucks is central to how Metalsmith transforms your content into a polished website. It provides the structure and logic needed to create consistent, maintainable sites while keeping content separate from presentation.

              By understanding how Nunjucks works within Metalsmith, developers gain a clearer mental model of the static site generation process. This knowledge forms a foundation for more advanced techniques in future posts, where we'll explore creating and organizing blog content, customizing with CSS, and implementing advanced features.

              In our next post, we'll dive deeper into creating and organizing blog content within the Metalsmith ecosystem, building on this understanding of Nunjucks templating.

              Any comments? Find me on [Bluesky](https://bsky.app/profile/wernerglinka.bsky.social).
              
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
            url: "/blog/metalsmith-redux-templating"
            socialTitle: "Metalsmith Redux - Templating with Nunjucks"
            socialComment: "Templating with Nunjucks is central to how Metalsmith transforms content into a polished website. It provides the structure and logic needed to create consistent, maintainable sites while keeping content separate from presentation."
  
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
              - item: "metalsmith-redux-intro"
              - item: "metalsmith-redux-getting-started"
              - item: "metalsmith-redux-dependencies-scripts"
              - item: "metalsmith-redux-files-structure"

---