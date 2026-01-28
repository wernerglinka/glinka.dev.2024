---
layout: blocks.njk
pageType: "blog-post"
disableDefaultFooter: true
item: "building-netlify-cms-content-model" # used as a key for bloglist filters

seo:
  title: Building a Netlify CMS content model | Werner Glinka
  description: "Built a Metalsmith Netlify starter with integrated CMS. Overcome YAML limitations with Manual Initialization. Content types defined in individual files; simplifies managing growing configurations. Code available on GitHub."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1648318622/tgc2022/blogImages/netlify-cms-content-model/content-model_zgup7u.jpg"
  canonicalOverwrite: ""

blogTitle: "Building a Netlify CMS content model"
date: 2022-04-02
author: ""
image:
  src: "v1648318622/tgc2022/blogImages/netlify-cms-content-model/content-model_zgup7u.jpg"
  alt: ""
  caption:
excerpt: "Built a Metalsmith Netlify starter with integrated CMS. Overcome YAML limitations with Manual Initialization. Content types defined in individual files; simplifies managing growing configurations. Code available on GitHub."

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
        image: "v1648318622/tgc2022/blogImages/netlify-cms-content-model/content-model_zgup7u.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Building a Netlify CMS content model"
              header: "h1"
              subtitle: ""
              prose: ""
            date: 2022-04-02

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
              I recently completed building a Metalsmith Netlify starter, which comes with in-built support for Netlify CMS. The basic CMS integration was quite straightforward, as I simply adhered to the tutorial presented in the [Netlify documentation](https://www.netlifycms.org/docs/add-to-your-site/). Given the absence of a Metalsmith template, I chose to follow the [Add to your site](https://www.netlifycms.org/docs/add-to-your-site/) pathway. I've elaborated on this experience in my blog post titled [Adding Netlify CMS to Metalsmith](/blog/adding-netlify-cms/).

              Upon finalizing the integration, I submitted the starter to Netlify CMS for potential inclusion in their [Start with a Template](https://www.netlifycms.org/docs/start-with-a-template/) section.

              Having built numerous expansive sites with Metalsmith and Gatsby, I can attest to the challenges that can arise when updating configurations for a site's content model as it continues to grow. Within Netlify CMS, the content model is defined using YAML in `config.yaml`, located in the `/admin` folder. In my perspective, this approach comes with two primary drawbacks:

              - The use of YAML for writing
              - The swift transition to a convoluted mass of configuration data

              I personally favor defining content models in a modular style, leveraging json or js, as this makes management considerably easier. Unfortunately, YAML doesn't support imports, thereby limiting the option of modularity. Hence, one large `config.yaml` file appears to be the only solution...or is it?

              Upon delving deeper into the [Beta Features](https://www.netlifycms.org/docs/beta-features/) section, I discovered the perfect solution: [Manual Initialization](https://www.netlifycms.org/docs/beta-features/#manual-initialization). This revolutionary feature enables us to bypass `config.yml` and dynamically configure the CMS using JavaScript. This innovative approach allows us to define each content type in a distinct file.

              Here is the `admin` folder for this implementation, along with all content model files:

              ```
              admin

                ├─ index.html
                │
                ├─ templates
                │   ...
                └─ content-models
                    │
                    ├─ index.js
                    ├─ data.js
                    ├─ pages.js
                    └─ posts.js
              ```
              
              **admin/index.html**


              ```html
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8" />
                  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                  <title>Netlify CMS</title>
                </head>
                <body>
                  <script>
                    // This global flag enables manual initialization.
                    window.CMS_MANUAL_INIT = true;
                  </script>
                  <script src="https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js"></script>
                  <script type="module" src="./content-models/index.js"></script>
                  <!-- Include Netlify Identity for authentication -->
                  <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
                  <script type="module" src="./templates/index.js"></script>
                </body>
              </html>
              ```

              **admin/content-models/index.js**

              ```javascript
              import pages from "./pages.js";
              import posts from "./posts.js";
              import data from "./data.js";

              const { CMS, initCMS: init } = window;

              init({
                config: {
                  backend: {
                    name: "git-gateway",
                    branch: "main",
                  },
                  local_backend: {
                    url: "http://localhost:3002/api/v1",
                  },
                  publish_mode: "editorial_workflow",
                  media_folder: "src/assets/images",
                  public_folder: "assets/images",
                  collections: [pages, posts, data],
                },
              });
              ```

              **admin/content-models/pages.js**

              ```javascript
              const pages = {
                name: "pages",
                label: "Pages",
                folder: "src/content/",
                create: true,
                slug: "{{slug}}",
                fields: [
                  {
                    label: "Layout",
                    name: "layout",
                    widget: "hidden",
                    default: "simple.njk",
                  },
                  {
                    label: "Body Class",
                    name: "bodyClass",
                    widget: "string",
                    required: false,
                  },
                  {
                    label: "SEO",
                    name: "seo",
                    widget: "object",
                    summary: "SEO Properties",
                    fields: [
                      {
                        label: "Title",
                        name: "title",
                        widget: "string",
                      },
                      {
                        label: "Description",
                        name: "description",
                        widget: "string",
                      },
                      {
                        label: "Social Image",
                        name: "socialImage",
                        widget: "image",
                        required: false,
                      },
                      {
                        label: "Canonical Overwrite",
                        name: "canonicalOverwrite",
                        widget: "string",
                        required: false,
                      },
                    ],
                  },
                  {
                    label: "Body",
                    name: "body",
                    widget: "markdown",
                    required: false,
                  },
                ],
              };

              export default pages;
              ```

              **admin/content-models/pages.js**

              ```javascript
              const posts = {
                name: "posts",
                label: "Posts",
                folder: "src/content/blog",
                create: true,
                slug: "{{slug}}",
                fields: [
                  {
                    label: "Layout",
                    name: "layout",
                    widget: "hidden",
                    default: "blog-post.njk",
                  },
                  {
                    label: "Body Class",
                    name: "bodyClass",
                    widget: "string",
                    required: false,
                  },
                  {
                    label: "SEO",
                    name: "seo",
                    widget: "object",
                    summary: "SEO Properties",
                    fields: [
                      {
                        label: "Title",
                        name: "title",
                        widget: "string",
                      },
                      {
                        label: "Description",
                        name: "description",
                        widget: "string",
                      },
                      {
                        label: "Social Image",
                        name: "socialImage",
                        widget: "image",
                        required: false,
                      },
                      {
                        label: "Canonical Overwrite",
                        name: "canonicalOverwrite",
                        widget: "string",
                        required: false,
                      },
                    ],
                  },
                  {
                    label: "Blog Title",
                    name: "blogTitle",
                    widget: "string",
                  },
                  {
                    label: "Publish Date",
                    name: "publishDate",
                    widget: "dateTime",
                  },
                  {
                    label: "Author",
                    name: "author",
                    widget: "string",
                    required: false,
                  },
                  {
                    label: "Image",
                    name: "image",
                    widget: "image",
                    required: false,
                  },
                  {
                    label: "Featured Blogpost",
                    name: "featuredBlogpost",
                    widget: "boolean",
                    required: false,
                  },
                  {
                    label: "Featured Blogpost Order",
                    name: "featuredBlogpostOrder",
                    widget: "number",
                    required: false,
                  },
                  {
                    label: "Excerpt",
                    name: "excerpt",
                    widget: "string",
                    required: false,
                  },
                  {
                    label: "Body",
                    name: "body",
                    widget: "markdown",
                    required: false,
                  },
                ],
              };

              export default posts;
              ```

              **admin/content-models/pages.js**

              ```javascript
              const data = {
                name: "data",
                label: "Data",
                files: [
                  {
                    label: "Navigation",
                    name: "navigation",
                    file: "src/content/data/navigation.json",
                    fields: [
                      {
                        label: "Menu",
                        name: "menu",
                        widget: "list",
                        fields: [
                          {
                            label: "Label",
                            name: "label",
                            widget: "string",
                          },
                          {
                            label: "URL",
                            name: "url",
                            widget: "string",
                          },
                          {
                            label: "Body Class",
                            name: "bodyClass",
                            widget: "string",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    label: "Site",
                    name: "site",
                    file: "src/content/data/site.json",
                    fields: [
                      {
                        label: "Title",
                        name: "title",
                        widget: "string",
                      },
                      {
                        label: "Description",
                        name: "description",
                        widget: "string",
                      },
                      {
                        label: "Author",
                        name: "author",
                        widget: "string",
                      },
                      {
                        label: "Site URL",
                        name: "siteUrl",
                        widget: "string",
                      },
                      {
                        label: "Site Owner",
                        name: "siteOwner",
                        widget: "string",
                      },
                      {
                        label: "Validate",
                        name: "validate",
                        widget: "object",
                        summary: "Validation",
                        fields: [
                          {
                            label: "Google",
                            name: "google",
                            widget: "string",
                            required: false,
                          },
                          {
                            label: "Bing",
                            name: "bing",
                            widget: "string",
                            required: false,
                          },
                        ],
                      },
                      {
                        label: "Social",
                        name: "social",
                        widget: "object",
                        summary: "Social",
                        fields: [
                          {
                            label: "LinkedIn",
                            name: "linkedIn",
                            widget: "string",
                            required: false,
                          },
                          {
                            label: "GitHub",
                            name: "gitHub",
                            widget: "string",
                            required: false,
                          },
                        ],
                      },
                      {
                        label: "Social Image",
                        name: "socialImage",
                        widget: "image",
                        required: false,
                      },
                    ],
                  },
                ],
              };

              export default data;

              ```
              You can review the whole site code for the [Metalsmith Netlify Starter](https://github.com/wernerglinka/metalsmith-netlify-starter) at Github.

              ### Recommended Reading

              - [Understanding Content Modeling In A Headless World](https://www.stackbit.com/blog/content-modeling-headless/) by Brian Rinaldi

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
              - item: "adding-netlify-cms"
              - item: "using-forestry-cms-with-metalsmith"
---