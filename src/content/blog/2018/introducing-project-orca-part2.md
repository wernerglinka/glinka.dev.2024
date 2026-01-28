---
layout: blocks.njk
draft: false
pageType: "blog-post"
disableDefaultFooter: true
item: "introducing-project-orca-part2" # used as a key for bloglist filters

seo:
  title: Introducing Project Orca - Part 2 | Werner Glinka
  description: "This blog explores how Metalsmith uses plugins to convert markdown files into HTML pages in static websites. We examine build scripts, the role of frontmatter, and the use of plugins like markdown, permalinks, and layouts."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1645224098/tgc2022/blogImages/orca1/orca_ahjaat.jpg"
  canonicalOverwrite: ""

blogTitle: "Introducing Project Orca - Part 2"
date: 2018-09-20
author: ""
image:
  src: "v1645224098/tgc2022/blogImages/orca1/orca_ahjaat.jpg"
  alt: ""
  caption:
excerpt: "This blog explores how Metalsmith uses plugins to convert markdown files into HTML pages in static websites. We examine build scripts, the role of frontmatter, and the use of plugins like markdown, permalinks, and layouts."

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
        image: "v1645224098/tgc2022/blogImages/orca1/orca_ahjaat.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Introducing Project Orca"
              header: "h1"
              subtitle: "Part 2"
              prose: ""
            date: 2018-09-20

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
              In [Introducing Project Orca - Part 1](/blog/introducing-project-orca-part1/) I wrote about why we should be using a static website and provided a brief summary of the Metalsmith static site generator's role. In today's blog, we'll delve into the process of how Metalsmith employs plugins to convert a file.

              ## Decoding the Basic Build Script
              Our tool for this task will be a simple Metalsmith build script known as build.js. This script has several responsibilities, including:

              - Transforming a file into a javascript object
              - Converting markdown content into html
              - Determining the permalink
              - Applying a specific page template
              - Transforming the final javascript object back into a file
              - Lastly, moving the file to the specified destination directory
            
              **build.js**

              ```javascript
              Metalsmith(__dirname)            
                  .source('sourcepath')      
                  .destination('destpath')   
                  .use(markdown())
                  .use(permalinks())          
                  .use(layouts())
                  .build(function(err) {         
                      if (err) throw err;          
                  });
              ```

              The Metalsmith build script mentioned earlier lays out the source and destination paths for all the files that will go through the processing.

              ## Working with `example-file.md`

              We'll begin with a basic markdown file titled `example-file.md`. Initially, Metalsmith turns this file into a JavaScript object, followed by plugins modifying the relevant JavaScript properties. Finally, Metalsmith reconverts the object back into a file, which is then moved to the destination directory.

              The starting markdown file consists of a section at the top known as [frontmatter](https://jekyllrb.com/docs/front-matter/). Frontmatter is formatted in [YAML](https://yaml.org/), and it's set apart by lines featuring triple dashes.

              Following the frontmatter, you'll find the content, which in our case consists of a straightforward paragraph topped by an h2 header.

              **example-file.md**

              ```markdown
              ---
              layout: blog-post.html

              # meta data
              title: Etiam Mollis Risus
              draft: true
              description: "Vestibulum id ligula porta felis euismod semper."

              # page properties
              blog_title: Etiam Mollis Risus
              categories: category1
              tags: [tag1, tagA, tag3]
              author: [author2, author1]
              featured_blog_post: true
              featured_blog_post_order: 2

              image:
                feature: default.jpg
                thumbnail: default_tn.jpg
              date: 2017-03-12
              body_classes: blog-post has-sidebar
              ---

              ## Nibh Fringilla Cursus
              Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec ullamcorper nulla non metus auctor fringilla. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
              Note the variable layout that specifies the template file to be used. In our example the template looks like this:
              ```

              **blog-post.html**

              ```html
              <!doctype html>
              <html>
                  <head>
                      <title>{{ title }}</title>
                  </head>
                  <body>
                      {{ contents | safe }}
                  </body>
              </html>
              ```

              ## Transformation from File to JavaScript Object 

              To kick off the build process, Metalsmith converts all files in the source directory into objects. For this illustration, we're working with just one file - `example-file.md`.

              ```javascript
              {
                relative_to_source_path/example-file.md: {
                  layout: blog-post.html,
                  title: Etiam Mollis Risus,
                  description: ‘Vestibulum id ligula porta…’,
                  blog_title: Etiam Mollis Risus,
                  categories: category1,
                  tags: [tag1, tagA, tag3],
                  author: [author2, author1],
                  featured_blog_post: true,
                  featured_blog_post_order: 2,
                  image: {
                    feature: default.jpg,
                    thumbnail: default_tn.jpg
                  },
                  date: 2017-03-12,
                  body_classes: blog-post has-sidebar,
                  contents:‘## Nibh Fringilla Cursus…’,
                  mode: ‘0777’,
                  stats: {}
              }
              ```

              The output from this transformation process yields an object comprised of multiple objects. Each file object can be identified using its source path as the _key_, and the _value_ consists of all the properties of the file.

              ## Converting Markdown to HTML

              The initial plugin that Metalsmith summons is the [markdown plugin](https://github.com/metalsmith/markdown). Its role is to convert the contents of the file into HTML.

              ```javascript
              {
                relative_to_source_path/example-file.html: {
                  layout: blog-post.html,
                  title: Etiam Mollis Risus,
                  description: ‘Vestibulum id ligula porta…’,
                  blog_title: Etiam Mollis Risus,
                  categories: category1,
                  tags: [tag1, tagA, tag3],
                  author: [author2, author1],
                  featured_blog_post: true,
                  featured_blog_post_order: 2,
                  image: {
                    feature: default.jpg,
                    thumbnail: default_tn.jpg
                  },
                  date: 2017-03-12,
                  body_classes: blog-post has-sidebar,
                  contents:‘<h2>Nibh Fringilla Cursus…</h2>’,
                  mode: ‘0777’,
                  stats: {}
              }
              ```
              
              The conversion's effect becomes visible in two areas. The object key now exhibits a .html file extension, and the contents variable now displays an HTML string.

              ## Determine the permalink

              ```javascript
              {
                relative_to_source_path/example-file.html: {
                  layout: blog-post.html,
                  title: Etiam Mollis Risus,
                  description: ‘Vestibulum id ligula porta…’,
                  blog_title: Etiam Mollis Risus,
                  categories: category1,
                  tags: [tag1, tagA, tag3],
                  author: [author2, author1],
                  featured_blog_post: true,
                  featured_blog_post_order: 2,
                  image: {
                    feature: default.jpg,
                    thumbnail: default_tn.jpg
                  },
                  date: 2017-03-12,
                  body_classes: blog-post has-sidebar,
                  contents:‘<h2>Nibh Fringilla Cursus…</h2>’,
                  path: 'example-file',
                  mode: ‘0777’,
                  stats: {}
              }
              ```

              The [permalinks plugin](https://github.com/metalsmith/permalinks) generates a fresh directory for each file, attributing the directory the file's name, excluding the extension. It then places the file into this new directory and renames the file to index.html. For instance, after the plugin completes its operation, the file `example-file.html` evolves into `example-file/index.html`. Furthermore, the plugin introduces a new `path` variable to the file object.

              ## Integrating the Page Template

              ```javascript
              {
                relative_to_source_path/example-file.html: {
                  layout: blog-post.html,
                  title: Etiam Mollis Risus,
                  description: ‘Vestibulum id ligula porta…’,
                  blog_title: Etiam Mollis Risus,
                  categories: category1,
                  tags: [tag1, tagA, tag3],
                  author: [author2, author1],
                  featured_blog_post: true,
                  featured_blog_post_order: 2,
                  image: {
                    feature: default.jpg,
                    thumbnail: default_tn.jpg
                  },
                  date: 2017-03-12,
                  body_classes: blog-post has-sidebar,
                  contents:’<!doctype html>
                    <html>
                        <head>
                          <title>Etiam Mollis Risus</title>
                        </head>
                        <body>
                          <h2>Nibh Fringilla Cursus</h2>…
                        </body>
                    </html>,
                  path: 'example-file',
                  mode: ‘0777’,
                  stats: {}
              }
              ```

              The layout plugin applies the template file `blog-post.html`. This action transforms the `contents` variable into a comprehensive HTML page. The object is now ready to be reverted into a file by Metalsmith and put to the destination directory. Owing to the permalinks plugin usage, our file name has now been revised to `example-file/index.html`.

              **example-file/index.html**

              ```html
              <!doctype html>
              <html>
                <head>
                  <title>Etiam Mollis Risus</title>
                </head>
                <body>
                  <h2>Nibh Fringilla Cursus</h2>
                  <p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec ullamcorper nulla non metus auctor fringilla. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.</p>
                </body>
              </html>
              ```

              As demonstrated, we possess complete command over the files object. In reality, we don't even necessitate a source file; we could simply construct a new JavaScript object, include that in the Metalsmith pages object via a plugin, and ultimately, that object will be converted into a tangible file. The data for such a dynamically generated file could be derived from a data file or an API call, which would retrieve data from an external source.

              The outcome is always the same: a classic, static HTML file.

              If you're interested in learning more about adding dynamically generated files, consider reading my post [Building Job pages with Metalsmith with the Lever Postings API](/blog/metalsmith-lever-api/).

              A pivotal aspect of generating HTML pages with a static site generator is the templating engine. In an upcoming post, Project ORCA Introduction Part 3, we'll examine [Nunjucks](https://mozilla.github.io/nunjucks/), a "rich and powerful templating language for JavaScript," maintained by Mozilla.

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
              - item: "introducing-project-orca-part1"
              - item: "introducing-project-orca-part3" 

---