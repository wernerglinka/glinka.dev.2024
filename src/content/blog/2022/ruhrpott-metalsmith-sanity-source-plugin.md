---
layout: blocks.njk
pageType: "blog-post"
disableDefaultFooter: true
item: "ruhrpott-metalsmith-sanity-source-plugin" # used as a key for bloglist filters

seo:
  title: "Ruhrpott - a Metalsmith Sanity source plugin | Werner Glinka"
  description: "This post discusses integrating Sanity content into the Metalsmith build process. Our custom plugin fetches data from Sanity, transforming it into a Metalsmith-compatible JSON object, considering the differences in rich text and image handling between both platforms."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1690749050/ruhrpott-2_bn9shm.jpg"
  canonicalOverwrite: ""

blogTitle: "Ruhrpott - a Metalsmith Sanity source plugin"
date: 2022-12-08
author: ""
image:
  src: "v1690749050/ruhrpott-2_bn9shm.jpg"
  alt: ""
  caption:
excerpt: "This post discusses integrating Sanity content into the Metalsmith build process. Our custom plugin fetches data from Sanity, transforming it into a Metalsmith-compatible JSON object, considering the differences in rich text and image handling between both platforms."

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
        image: "v1690749050/ruhrpott-2_bn9shm.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Ruhrpott - a Metalsmith Sanity source plugin"
              header: "h1"
              subtitle: ""
              prose: ""
            date: 2022-12-08

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
              In the previous two Ruhrpott blog posts, we have discussed how to build modular page sections with structured content. Initially, we used a Frontmatter YAML object to define a media component, and then we created the same component in Sanity Studio. This blog post will review how to get the Sanity content into the Metalsmith build process.

              To quickly review, the Metalsmith build process consists of three stages:

              - **Read** files from a source folder and transform them into javascript objects
              - **Transform** objects with plugins
              - **Write** files to the destination folder
              
              We can substitute the initial **Read** with fetching page content from Sanity and injecting it into the build process. Since Sanity uses a JSON object to define structured content and the Metalsmith file object is JSON, this process is relatively simple. For our example, there are only a few things to consider.

              Rich text fields in Sanity use the [Portable Text](https://www.sanity.io/docs/presenting-block-text) format , while Metalsmith traditionally uses Markdown.

              Images in a Sanity JSON object are referenced with an asset ID; meta properties are not included.

              To fetch content from Sanity and transform it into a Metalsmith compatible JSON object we'll build a custom plugin. The plugin uses the Sanity Client Javascript library and a few Sanity utility libraries `Block Content to Markdown` and `Image URL`. Let's have a look at the code outline.

              ## The Metalsmith Sanity Source Plugin

              ```javascript
              function initSanitySource(options) {
                options = normalizeOptions(options);

                return async function metalsmithSourceSanity(files, metalsmith, done) {
              
                  // initialize Sanity client
                  const client = sanityClient(options);

                  let contentTypes;
                
                  // fetch all content types from Sanity
                  const contentTypes = await client.fetch(groq`*[discoverable == true]`);
                  
                  const data = {};
                  contentTypes.forEach((contentType) => {
                    // transform Sanity portable text blocks to markdown and resolve image references
                    iterate(contentType, client, options);

                    if ( contentType.isPage ) {
                      // Metalsmith needs contents otherwise it will skip the file
                      contentType.contents = Buffer.from('');
                      contentType.mode = '0644';
                      contentType.stats = {};

                      // add page to files object
                      const fileKey = `${contentType.slug.current}.md`;
                      // add all properties of contentType to files[fileKey]
                      files[fileKey] = contentType;

                    } else {
                      // if content type is not a page, then it is a data file; add to metadata
                      // if a contentType._type array is not already in data, add it
                      if ( !data[contentType._type] ) {
                        data[contentType._type] = [];
                        // add this contentType of type contentType._type to the array
                        data[contentType._type].push(contentType);
                      } else {
                        // if a contentType._type array is already in data, push the contentType object to its
                        data[contentType._type].push(contentType);
                      }
                    }
                  });

                  // merge data object with existing metadata
                  const metadata = metalsmith.metadata();
                  metadata['data'] = data;
                  metalsmith.metadata(metadata);
                  
                  done();
                };
              }
              ```

              The plugin fetches all content types with the `sanityClient` library.

              It will then loop over all content types and divide them into **page** or **data** objects. This is determined by the boolean `contentType.isPage`.

              If the object represents a page, it adds an object to the files object. If the object represents data, it adds the object to the metadata object.

              Metalsmith will do the rest.

              Finally, let's have a look at the iterate function. This function transforms Sanity portable text blocks to markdown and resolves image references.

              ```javascript
              const iterate = (obj, client, options) => {
                Object.keys(obj).forEach(key => {

                  // transform Portable Text to Markdown
                  if(key === "portableTextBody") {
                    obj[key] = BlocksToMarkdown(obj[key], {
                      serializers: getSerializers(client),
                      projectId: options.projectId,
                      dataset: options.dataset,
                    });
                  }

                  // transform image reference to image url
                  if(key == "asset" && obj[key]._ref.startsWith("image-")){
                    const imageBuilder = imageUrl(client);
                    const image = imageBuilder.image(obj[key]);
                    obj["imageURL"] = image.url();
                  }

                  if (typeof obj[key] === 'object' && obj[key] !== null) {
                    iterate(obj[key], client, options)
                  }
                })
              };
              ```

              This is where we use the Sanity utility functions [blocksToMarkdown](https://github.com/sanity-io/block-content-to-markdown) and [imageUrl](https://www.sanity.io/docs/image-url) .

              When we query the Sanity API, rich text content is returned as Portable Text. We transform Portable Text by serializing the arrays that contain Portable Text into Markdown. We are using some custom serializers to do that.

              ```javascript
              const getSerializers = client => {
                return {
                  types: {
                    code: ({node}) => '```' + node.language + '\n' + node.code + '\n```',
                    mainImage: ({node}) => imageUrl(client).image(node).url(),
                    image: ({node}) => `<img src="${imageUrl(client).image(node).url()}" alt="${node.alt}" id="${node.imageId}"/>`,
                    slug: ({node}) => node.current,
                  },
                  marks: {
                    link: ({children, mark}) => `<a href="${mark.href}" ${mark.isExternal && "target='_blank' rel='noreferrer, noopener'"}>${children}</a>`,
                  }
                }
              }
              ```

              I found the articles [Internal and External Links](https://www.sanity.io/guides/portable-text-internal-and-external-links) and [Presenting Portable Text](https://www.sanity.io/docs/presenting-block-text) helpful in understanding serializers.

              The complete code for the Ruhrpott project is available on GitHub. Clone it and experiment, and let me know what you did in the [Metalsmith community at Gitter](https://app.gitter.im/#/room/#metalsmith_community:gitter.im).



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
              - item: "ruhrpott-it-starts-with-metalsmith"
              - item: "ruhrpott-metalsmith-sanity-match-just-right"
              - item: "ruhrpott-sanity-studio-setup"
              - item: "ruhrpott-structured-content-sanity"  

---