---
layout: blocks.njk
draft: false
pageType: "blog-post"
disableDefaultFooter: true
item: "using-forestry-cms-with-metalsmith" # used as a key for bloglist filters

seo:
  title: Using the Forestry CMS with Metalsmith | Werner Glinka
  description: "Forestry.io is a Git-backed CMS for websites and web products built using static site generators. This post describes how to setup Forestry CMS with the Metalsmith Forestry Starter."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1690751163/dead-forrest_jmv6xv.jpg"
  canonicalOverwrite: ""

blogTitle: "Using the Forestry CMS with Metalsmith"
date: 2022-04-08
author: ""
image:
  src: "v1690751163/dead-forrest_jmv6xv.jpg"
  alt: ""
  caption:
excerpt: "Forestry.io is a Git-backed CMS for websites and web products built using static site generators. This post describes how to setup Forestry CMS with the Metalsmith Forestry Starter."

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
        image: "v1690751163/dead-forrest_jmv6xv.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Using the Forestry CMS with Metalsmith"
              header: "h1"
              subtitle: ""
              prose: ""
            date: 2022-04-08

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
              **Update on March 22, 2023** : [Forestry is dead](https://forestry.io/blog/forestry-2-0/). Forrestry has been sunset in favor of the new shinny TinaCMS. TinaCMS has a completely new UI and a lot of new features. I have not yet tried it out but it looks very promising. I may try it out in the future... no promisses.

              In the last couple of posts I discussed the details of integrating Netlify CMS with Metalsmith. In this post I'll provide an overview of how to use Forestry for content editing with Metalsmith. Forestry.io is a Git-backed CMS for websites and web products that are built with static site generators. Just like Netlify CMS, Forestry provides an editor-friendly interface for Git.

              Forestry has a free plan for personal projects with no credit card required.

              We'll be using the [Metalsmith Forestry Starter](https://metalsmith-forestry-starter.netlify.app/) to set up Forestry CMS.

              After we have signed up for an account, we'll add a site to our account by clicking the **Add Site** button in our dashboard.

              The initial steps to import the site code from our Git providert are well explaioned in [Forestry's docs](https://forestry.io/docs/quickstart/setup-site/) so I'll not repeat this here.

              ## Configure the site
              Once the site has been added we can configure the site. If you have followed the steps in the Forestry article you should see your site's dashboard.

              ![](https://res.cloudinary.com/glinkaco/image/upload/w_1800,f_auto/v1648680767/tgc2022/blogImages/using-forestry-metalsmith/initial-welcome-screen_arqnkm.png)

  
              ### Sidebar
              The Metalsmith Forestry Starter has two folders that we want to edit, the `content` and the `data` folder. The `content` folder contains all pages and the `data` folder contains the site meta data and the navigation data. 

              We will add them to the sidebar for easy access. 

              Click the **Configure Sidebar** button, then the **Add Section** button in the sidebar dashboard and select **Directory**.

              ![](https://res.cloudinary.com/glinkaco/image/upload/w_1800,f_auto/v1648680767/tgc2022/blogImages/using-forestry-metalsmith/sidebar-setup_d395qs.png)


              Add the info as shown below

              ![](https://res.cloudinary.com/glinkaco/image/upload/w_1800,f_auto/v1648680768/tgc2022/blogImages/using-forestry-metalsmith/content-setup_nt3d7t.png)

  
              Here we say that we want to all files to be shown and that we allow creation of files and folders. Files will be in markdown format.

              Note that we exclude the data folder for this display. We will add this folder separately to the sidebar.

              Add the data section

              ![](https://res.cloudinary.com/glinkaco/image/upload/w_1800,f_auto/v1648680767/tgc2022/blogImages/using-forestry-metalsmith/data-setup_xoksi0.png)

  
              Once these two items are setup, **click the Save button** before you leave the sidebar section.
              
              ### Repository

              The repository section will be filled in already, nothing to do here.

              ### Media

              The Metalsmith Forestry Starter commits all images to Git. The starter does not use many images so this is not an issue. For websites with many images I recommend to use Cloudinary. That makes it very [simple to implement responsive images](/blog/building-responsive-progressive-image-component/). 

              ![](https://res.cloudinary.com/glinkaco/image/upload/w_1800,f_auto/v1648680767/tgc2022/blogImages/using-forestry-metalsmith/media-settings_tazwta.png)


              ### Previews

              Select Node, click Select and fill in the configuration fields as shown below, then click Save.

              ![](https://res.cloudinary.com/glinkaco/image/upload/w_1800,f_auto/v1648680767/tgc2022/blogImages/using-forestry-metalsmith/select-environmenr_nkvn2t.png)

              ![](https://res.cloudinary.com/glinkaco/image/upload/w_1800,f_auto/v1648680767/tgc2022/blogImages/using-forestry-metalsmith/preview-config_lrqoqa.png)
   
              Now your sidebar should look like this. You are ready to edit your site. Click on Content in the sidebar and you'll see the pages of the starter. Click on `index.md` to see the home page.

              ![](https://res.cloudinary.com/glinkaco/image/upload/w_1800,f_auto/v1648745305/tgc2022/blogImages/using-forestry-metalsmith/sidebard-with-content-selected_o3psxf.png)

              Forestry will show the page with the frontmatter on the left and the page body on the right. There is no template applied.

              ![]9https://res.cloudinary.com/glinkaco/image/upload/w_1800,f_auto/v1648680767/tgc2022/blogImages/using-forestry-metalsmith/forestry-editor_dxzhgz.png

              We can create a template from this page by simply clicking on the three dots in the upper right corner and selecting **Create Template**. Name this template **Simple**. Now you can find the template under Frontmatter in the sidebar. [Read all there is to know about Frontmatter templates here](https://forestry.io/docs/settings/front-matter-templates/#apply-a-template-to-content). 

              This should get you started with editing your Metalsmith site with the Forestry CMS.

              Here are some suggestions for further reading:

              - https://forestry.io/docs/
              - https://medium.com/short-bits/forestry-a-cms-for-git-5030a2ea802
              - https://blog.anbuchelva.in/blog/forestry-io-as-cms-for-hexo/

              If you have any questions about this post please chat with me on [Gitter](https://gitter.im/metalsmith/community).

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
              - item: "building-netlify-cms-content-model"

---