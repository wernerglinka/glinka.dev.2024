---
layout: blocks.njk
draft: false
pageType: "blog-post"
disableDefaultFooter: true
item: "metalsmith-layouts-nunjucks" # used as a key for bloglist filters

seo:
  title: Metalsmith, Layouts and Nunjucks | Werner Glinka
  description: "Transitioning from the older versions to the newer ones of the @metalsmith/layout (ML) and @metalsmith/in-place (MIP) plugins may have its hurdles. This post guides you through the process."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1646849499/tgc2022/social_yitz6j.png"
  canonicalOverwrite: ""

blogTitle: "Metalsmith, Layouts and Nunjucks"
date: 2018-06-18
author: ""
image:
  src: "v1645220774/tgc2022/blogImages/metalsmith-layouts-nunjucks/layout-options_apwj06.jpg"
  alt: ""
  caption:
excerpt: "Transitioning from the older versions to the newer ones of the @metalsmith/layout (ML) and @metalsmith/in-place (MIP) plugins may have its hurdles. This post guides you through the process."

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
        image: "v1645220774/tgc2022/blogImages/metalsmith-layouts-nunjucks/layout-options_apwj06.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Metalsmith, Layouts and Nunjucks"
              header: "h1"
              subtitle: ""
              prose: ""
            date: 2018-06-18

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
              **Update** 2/18/2022 - metalsmith-layout is now [@metalsmith/layouts](https://github.com/metalsmith/layouts) and metalsmith-in-place is now [@metalsmith/in-place](https://github.com/metalsmith/in-place).

              ***
              
              When working with Metalsmith to create static websites, it's quite probable that you're employing the @metalsmith/layout (ML) and @metalsmith/in-place (MIP) plugins. If you're still operating on the older 1.x.x versions, you might have attempted to upgrade to newer versions at some point, only to realize that it wasn't a direct swap. From version 2.x onwards, both plugins switched from `consolidation.js` to `jstransformers` for template rendering. `jstransformers` facilitate the usage of varied template engines through a standardized API.

              Moreover, the transition to the `jstransformer-nunjucks` plugin, as opposed to the Nunjucks node module, altered the way to access the Nunjucks environment for extension.

              Subsequently, this shift has influenced the configuration for both the plugins and the templating engines. To comprehend these differences, let's delve into the specifics of both implementations. First, we'll revisit the process prior to the introduction of jstransformers.

              ## The Former Procedure
              We'll begin by examining how we previously employed metalsmith-layouts 1.6.5 and metalsmith-in-place 1.4.4, in conjunction with [Nunjucks](https://mozilla.github.io/nunjucks/).

              Here's what the file system looked like:

              ![the old way of using layouts and in-place](https://res.cloudinary.com/glinkaco/image/upload/v1645219356/tgc2022/blogImages/metalsmith-layouts-nunjucks/with-old-plugins_pat242.png)

              _Note that layout files and source files all have HTML extensions._

              **build.js**

              ```javascript
              const inplace = require('metalsmith-in-place');
              const layouts = require('metalsmith-layouts');
              const metalsmith = require('metalsmith');
              const nunjucks = require("nunjucks");

              nunjucks
                  .configure(["./layouts", "./layouts/partials"], {watch: false, autoescape: false})

                  .addFilter("spaceToDash", function (string) {
                      "use strict";
                      return string.replace(/\s+/g, "-");
                  })
                  .addFilter("toUpper", function (string) {
                      "use strict";
                      return string.toUpperCase();
                  });

              const templateConfig = {
                  "engine": "nunjucks",
                  "directory": "./layouts",
                  "partials": "./layouts/partials"
              };

              metalsmith(__dirname)
                  .source('./src/')
                  .destination('./build/')
                  .clean(true)
                  .use(inplace(templateConfig))
                  .use(layouts(templateConfig))
                  .build(function (err) {
                      if (err) {
                          throw err;
                      }
                      console.log('Build finished!');
                  });
              ```

              Quite straightforward, isn't it? Initially, we require MIP and ML, followed by Nunjucks. We then augment the Nunjucks environment and append filters as necessary. The configuration for the layouts and in-place plugins encompasses the definition of the templating engine and the template's location.

              ## The Current Method

              Now, let's examine the usage of the newer versions of [@metalsmith/layouts](https://github.com/metalsmith/layouts) 2.1.0 and [@metalsmith/in-place](https://github.com/metalsmith/in-place) 4.1.1.

              ![The updated method of employing layouts and in-place](https://res.cloudinary.com/glinkaco/image/upload/v1645219356/tgc2022/blogImages/metalsmith-layouts-nunjucks/with-new-plugins_txdxtr.png)

              _Note that all files intended for rendering with nunjucks now possess a `.njk` extension._

              Before deploying the new plugin versions, we must install the jstransformers we plan to use, in this case, `jstransformer-nunjucks`. The plugins ascertain the engine to use based on file extensions, for Nunjucks it's `.njk`.

              Now, Nunjucks is enveloped by the `jstransformer-nunjucks` plugin, which means we no longer have direct access to the Nunjucks environment. However, the `engineOptions` option allows us to access the Nunjucks environment.

              Here's what the current setup looks like:

              **build.js**

              ```javascript
              const toUpper = function (string) {
                  "use strict";
                  return string.toUpperCase();
              };

              const spaceToDash = function (string) {
                  "use strict";
                  return string.replace(/\s+/g, "-");
              };

              const inplace = require('@metalsmith/in-place');
              const layouts = require('@metalsmith/layouts');
              const metalsmith = require('metalsmith');

              const templateConfig = {
                      engineOptions: {
                          filters: {
                              toUpper: toUpper,
                              spaceToDash: spaceToDash
                          }
                      }
                  };

              metalsmith(__dirname)
                  .source('./src/')
                  .destination('./build/')
                  .clean(true)
                  .use(inplace(templateConfig))
                  .use(layouts(templateConfig))
                  .build(function(err) {
                  if (err) throw err;
                      console.log('Build finished!');
                  });
              ```

              The alterations to the build file are as follows:

              - Nunjucks is no longer required manually; this task is automatically carried out by `jstransformer-nunjucks`.
              - Nunjucks filters are established as functions, which are then conveyed to Nunjucks via the `engineOptions` option of @metalsmith/layouts and @metalsmith/in-place.

              This configuration operates effectively. I've documented my findings in this [Github repository](https://github.com/wernerglinka/ms-layout-njk). The repository comprises four branches: The **master** branch employs the updated method of using these plugins, the **obsolete** branch deploys the old method, the **in-place-only** branch showcases how to use only @metalsmith/in-place for our page rendering, and the **with_markdown** branch implements the new method using a markdown source file.

              ## Exclusively Using `@metalsmith/in-place`

              Given that we're utilizing HTML in our source files and using Nunjucks for templating, we can further streamline our build process by solely employing the @metalsmith/in-place plugin. This necessitates moving some Nunjucks syntax from `body.njk` into the source file:

              **src/index.njk**

              ```html
              ---
              title: Hello Title ;-)

              footnote: this is a footnote
              header_text: Vestibulum id ligula porta felis euismod semper. Nullam quis risus eget urna mollis ornare vel eu leo.
              footer_text: Donec sed odio dui. Maecenas sed diam eget risus varius blandit sit amet non magna.
              filter_test: I should have dashes between words
              ---

              {% extends "./layouts/layout.njk" %}

              {% block body %}
                  <section class="main-content">
                      <h2>This is the Content</h2>

                      <p>This version uses @metalsmith/layouts 2.1.0 and @metalsmith/in-place 4.1.1</p>
                      <p>{{ filter_test | spaceToDash }}</p>
                      <p><em>{{ footnote | toUpper }}</em></p>
                  </section>
              {% endblock %}
              ```

              **layouts/layout.njk**

              ```html
              <!DOCTYPE html>
              <html>
                <head>
                  <title>{{ title }}</title>
                </head>
                <body>
                  {% include "./partials/header.njk" %}

                  {% block body %}   
                    This is the default contents
                  {% endblock %}

                  {% include "./partials/footer.njk" %}
                </body>
              </html>
              ```

              Our file system now looks like this:

              ![the new way of using layouts and in-place](https://res.cloudinary.com/glinkaco/image/upload/v1645219356/tgc2022/blogImages/metalsmith-layouts-nunjucks/in-place-only_lqazil.png)
              
              **build.js**

              ```javascript
              const toUpper = function (string) {
                  return string.toUpperCase();
              };

              const spaceToDash = function (string) {
                  return string.replace(/\s+/g, "-");
              };

              const inplace = require('@metalsmith/in-place');
              const metalsmith = require('metalsmith');

              const templateConfig = {
                  engineOptions: {
                      filters: {
                          toUpper: toUpper,
                          spaceToDash: spaceToDash
                      }
                  }
              };

              metalsmith(__dirname)
                  .source('./src/')
                  .destination('./build/')
                  .clean(true)
                  .use(inplace(templateConfig))
                  .build(function (err) {
                      if (err) {
                          throw err;
                      }
                      console.log('Build finished!');
                  });
              ```

              The `build.js` file closely mirrors the previous version, with the notable absence of the layouts plugin.

              ## Pointers on Paths

              Files situated in the src folder are converted by Metalsmith into an object, implying they're read from memory—not from the disk—when Nunjucks processes them. Consequently, Nunjucks can't resolve relative paths for files in the `src` folder, as it's unaware of their disk locations. This explains why the `extends` tag URL in `./src/index.njk` has to be relative to the project root: `./layouts/layout.njk`. This allows Nunjucks to locate the base template.

              In contrast, files outside the src folder aren't stored in memory by Metalsmith, allowing Nunjucks to resolve relative paths for these files. Hence, the include tag URLs in `./layouts/layout.njk` are relative to the `layout.njk` file: `./partials/footer.njk`.

              It's worth noting that if you're using Markdown in your source files, it's easier to employ @metalsmith/layouts and @metalsmith/in-place together, as outlined below. This avoids potential clashes between your Nunjucks syntax and markdown rendering.

              ## Utilizing Markdown

              ![With markdown source file using layouts and in-place](https://res.cloudinary.com/glinkaco/image/upload/v1645219356/tgc2022/blogImages/metalsmith-layouts-nunjucks/with-markdown_ac6nce.png)

              _Note that the source file carries a `.md.njk` extension_

              While the previous examples employed HTML source files, if we opt to use Markdown, we also need to install jstransformer-markdown. How does jstransformer identify which transformation to apply? Like Nunjucks, it uses the file extensions!

              If multiple transformations are required, this necessitates the use of multiple file extensions. For instance, if we're employing a Markdown source file and the Nunjucks templating engine, we must utilize `index.md.njk`.

              **src/index.md.njk**

              ```markdown
              ---
              title: Hello Title ;-)
              layout: body.njk

              footnote: this is a footnote
              header_text: Vestibulum id ligula porta felis euismod semper. Nullam quis risus eget urna mollis ornare vel eu leo.
              footer_text: Donec sed odio dui. Maecenas sed diam eget risus varius blandit sit amet non magna.
              filter_test: I should have dashes between words
              ---

              ## This is the Content

              This version uses @metalsmith/layouts 2.1.0 and @metalsmith/in-place 4.1.1

              {{ filter_test | spaceToDash }}

              _{{ footnote | toUpper }}_
              ```

              Initially, @metalsmith/in-place uses `jstransformer-nunjucks` to conduct all inline transformations, such as `{{ filter_test | spaceToDash }}` and `{{ footnote | toUpper }}`. Subsequently, the jstransformer converts markdown into HTML, and ultimately, @metalsmith/layouts applies the page template.

              You can explore this approach in the [with_markdown branch](https://github.com/wernerglinka/ms-layout-njk/tree/with_markdown) in the repository.

              ## Deciding When to Use `@metalsmith/in-place` and/or `@metalsmith/layouts`

              The question of when to utilize @metalsmith/in-place and/or @metalsmith/layouts often arises, but it doesn't have a one-size-fits-all answer—rather, the solution depends on your specific use-case. This blog post was crafted to probe a distinct use-case: the synergy of @metalsmith/in-place, @metalsmith/layouts, and Nunjucks.

              In our scenario, @metalsmith/in-place can operate independently if we're employing HTML in our source files. When using Markdown, we discovered that employing layouts is an effective strategy for resolving conflicts between Markdown and Nunjucks—this separation of Nunjucks syntax from the Markdown syntax simplifies things.

              - Opt for @metalsmith/in-place alone when your source file employs HTML.
              - Use both @metalsmith/in-place and @metalsmith/layouts as demonstrated in the **with_markdown** branch when your source file utilizes Markdown.

              Note that leveraging other templating engines may necessitate adjustments to your Metalsmith setup. If you're employing Metalsmith with a different templating engine, consider sharing your use-case on the [Wiki](https://github.com/metalsmith/in-place/wiki) of the @metalsmith/in-place and @metalsmith/layouts GitHub repositories.

              I would like to express my gratitude to the author of @metalsmith/in-place and @metalsmith/layouts, [@ismay](https://github.com/ismay), for his valuable suggestions and clarifications that contributed significantly to this blog post.

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
              - item: "conscious-uncoupling-drupal-metalsmith"
              - item: "introducing-project-orca-part2"
              - item: "introducing-project-orca-part3" 

---