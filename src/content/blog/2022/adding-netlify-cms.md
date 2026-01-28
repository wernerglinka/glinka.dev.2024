---
layout: blocks.njk
pageType: "blog-post"
disableDefaultFooter: true
item: "adding-netlify-cms" # used as a key for bloglist filters

seo:
  title: Adding Netlify CMS to Metalsmith | Werner Glinka
  description: "Static Site Generators (SSGs) often leave non-developer editors wanting a smoother experience. This post details how to integrate Netlify CMS with a Metalsmith site, providing an easy, code-free editing interface."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1648136437/tgc2022/blogImages/add-netlify-cms/adding-netlify-cms_klvybu.jpg"
  canonicalOverwrite: ""

blogTitle: "Adding Netlify CMS to Metalsmith"
date: 2022-03-28
author: ""
image:
  src: "v1648136437/tgc2022/blogImages/add-netlify-cms/adding-netlify-cms_klvybu.jpg"
  alt: ""
  caption:
excerpt: "Static Site Generators (SSGs) often leave non-developer editors wanting a smoother experience. This post details how to integrate Netlify CMS with a Metalsmith site, providing an easy, code-free editing interface."

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
        image: "v1648136437/tgc2022/blogImages/add-netlify-cms/adding-netlify-cms_klvybu.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Adding Netlify CMS to Metalsmith"
              header: "h1"
              subtitle: ""
              prose: ""
            date: 2022-03-28
          
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
              **Update on Jul 26, 2023**: [Netlify CMS is now called Decap CMS](https://www.netlify.com/blog/netlify-cms-to-become-decap-cms/). The CMS changed ownership and is again under active development. This means that what I am discussing here may be outdated.

              Let's be frank, the editing experience with any Static Site Generator (SSG) could be better for anybody who is not a developer. As developer-friendly as SSGs are, most "normal" people dislike editing Markdown content. Many editors are used to a Wordpress-like editing experience, and that's what they expect. This post will look at how to add the Netlify CMS to a Metalsmith website so users can enjoy non-code editing.

              ## Netlify CMS in their own words

              **Static + content management = ♥**
              
              Get the speed, security, and scalability of a static site, while still providing a convenient editing interface for content.

              **An integrated part of your Git workflow**
              
              Content is stored in your Git repository alongside your code for easier versioning, multi-channel publishing, and the option to handle content updates directly in Git.

              **An extensible CMS built on React**
              
              Netlify CMS is built as a single-page React app. Create custom-styled previews, UI widgets, and editor plugins or add backends to support different Git platform APIs.

              ## Adding Netlify CMS to your Metalsmith site
              There is a good, [official tutorial](https://www.netlifycms.org/docs/add-to-your-site/) on their website, so I'll limit this post to some observations and comments that I find noteworthy based on implementing this CMS on a [Metalsmith Netlify Starter website](https://metalsmith-netlify-starter.netlify.app/). The GitHub repository for this site can be found [here](https://github.com/wernerglinka/metalsmith-netlify-starter).

              ### Adding local editing

              According to their website, local editing is in beta. I have been using it on the Metasmith Netlify Starter website with no issues.

              #### 1 Configure the Netlify CMS proxy server port number
              
              Create a `.env` file in the `metalsmith` root folder and define the PORT you'd like the proxy server to use. The dev server runs on <span>http:/</span>/localhost:3000.
              
              ```bash
              PORT=3002
              ```
              
              #### 2 Add the `local_backend` object in `config.yml`
              ```yaml
              backend:
                name: git-gateway

              local_backend:
                # when using a custom proxy server port
                url: http://localhost:3002/api/v1
              ```

              #### 3 Add this script to the package.json file

              ```json
              "edit": "cross-env NODE_ENV=development NODE_PATH=./node_modules npx netlify-cms-proxy-server & npm run watch & npm run serve"
              ```

              Run `npm run edit` will start the local site. Navigate to <span>http:/</span>/localhost:3000/admin/ and click the login button... et voilà... the Netlify CMS.


              ### Styling the preview pane

              For the CMS to use our CSS, we'll need to register the style sheet first in the admin/index.html file.

              ```html
              <body>
                <script src="https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js"></script>
                <script>CMS.registerPreviewStyle('https://metalsmith-netlify-cms-starter.netlify.app/assets/styles.css');</script>
              </body>
              ```

              ### Creating Custom Previews

              By default, the CMS shows all frontmatter fields and the page's content body in the preview pane. For the preview to display the page as in production, we must duplicate the whole page structure in React components. This process is explained [here](https://www.netlifycms.org/docs/customization/).

              As we can [see in the tutorial](https://www.netlifycms.org/docs/customization/#registerpreviewtemplate), building the React component is done without the benefit of JSX. I am used to JSX, but the browser doesn't understand it. Instead, to make this work with JSX, we'd have to install Babel and convert JSX to Javascript.  I'd love to use JSX, but I want to avoid adding a compile step to my front-end code. 

              Fortunately, there is a solution, [**htm**](https://github.com/developit/htm), with a jsx-like syntax in plain javascript. HTM looks the same as JSX, except it uses template literals. It will parse the template literals and convert them to javascript that the browser can digest. 

              With htm, a preview page template may look like this:

              ```javascript
              // use htm so we don't have to build templates with h()
              import htm from "https://unpkg.com/htm?module";
              const html = htm.bind(h);

              // Preview component for a Page
              const Page = createClass({
                render() {
                  const entry = this.props.entry;

                  return html`
                    <main>
                      <h1>${entry.getIn(["data", "title"], null)}</h1>
                      ${this.props.widgetFor("body")}
                    </main>
                  `;
                },
              });

              export default Page;
              ```

              Have a look at the [CMS setup for the starter](https://github.com/wernerglinka/metalsmith-netlify-starter/tree/main/src/content/admin) to get a better idea of what this may look like.


              ### Images
              Unfortunately, Netlify CMS does not support image sub-folders. All site images will be stored in one folder. Of course, WordPress users have been doing this forever, so a whole cottage industry of file manager plugins has emerged, but I digress...

              Yes, we'll have all images in a single directory; this will work for small sites. For larger sites, I'd recommend using a digital asset management tool like [cloudinary.com](http://cloudinary.com). Cloudinary has a free tier that will work for most small sites. 

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
              - item: "building-netlify-cms-content-model"
              - item: "using-forestry-cms-with-metalsmith"
---