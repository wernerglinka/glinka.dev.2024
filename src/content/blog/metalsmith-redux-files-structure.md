---
layout: blocks.njk
draft: true
pageType: "blog-post"
disableDefaultFooter: true
item: "metalsmith-redux-files-structure" # used as a key for blogpost filters

seo:
  title: "Metalsmith Redux - Starter Files Structure | Werner Glinka"
  description: "Understanding the file structure of a Metalsmith project is key to working with it effectively. Don't worry if it seems a bit overwhelming at first—we'll walk through each part step by step, explaining what it does and why it matters."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1744735403/metalsmith-redux_lgj9qh.jpg"
  canonicalOverwrite: ""

blogTitle: "Metalsmith Redux - Starter Files Structure"
date: 2025-04-19
author: ""
image:
  src: "v1744770553/project-structure_mur1u4.jpg"
  alt: ""
  caption:
excerpt: "Understanding the file structure of a Metalsmith project is key to working with it effectively. Don't worry if it seems a bit overwhelming at first—we'll walk through each part step by step, explaining what it does and why it matters."

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
        image: "v1744770553/project-structure_mur1u4.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Metalsmith Redux: Starter Files Structure"
              header: "h1"
              subtitle: ""
              prose: ""
            date: 2025-04-19
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
              In our [previous post](/blog/metalsmith-redux-getting-started), we set up our first Metalsmith project using the [Metalsmith2025 Simple Starter](https://github.com/wernerglinka/metalsmith2025-simple-starter) and got it running locally. Now it's time to take a more detailed look at what's inside this project.

              Understanding the file structure of a Metalsmith project is key to working with it effectively. Don't worry if it seems a bit overwhelming at first—we'll walk through each part step by step, explaining what it does and why it matters.

              ## Wait, Where Are My HTML Files?
              If you're familiar with traditional static websites—the kind with HTML, CSS, and JavaScript files that you might upload directly to a web server—you might be wondering where all those files are in our project structure.

              When you first look at the Metalsmith project, you won't see a single HTML file. Instead, you'll see Markdown (.md) files, configuration files, and various folders with unfamiliar names. Don't worry, this is by design!

              In a modern static site generator like Metalsmith, we separate the content (what you want to say) from the presentation (how it looks). We write our content in Markdown, which is much easier to work with than HTML, and then Metalsmith automatically transforms it into HTML during the build process.

              The HTML, CSS, and JavaScript files that make up your final website are generated when you run the **build** command. They end up in a **build** directory, ready to be uploaded to a web server. You never need to write or edit HTML by hand unless you want to customize the templates.
              This separation makes it much easier to:

              - Focus on your content without worrying about HTML tags
              - Maintain consistent styling across your entire site
              - Make global changes to your site's structure without editing every page
              - Manage larger websites with dozens or hundreds of pages

              Now, let's look at how this all works by exploring the project structure.

              ## The Big Picture
              Inside the project folder, you'll see several files and directories. Let's start with a bird's-eye view of what we're looking at:

              ```
              metalsmith2025-simple-starter/
              ├── lib/              # Core assets and layouts
              ├── src/              # Your content lives here
              ├── .eslintrc.js      # Code style rules
              ├── .gitignore        # Files for Git to ignore
              ├── .prettierignore   # Files for Prettier to ignore
              ├── .prettierrc       # Code formatting rules
              ├── LICENSE           # MIT license
              ├── metalsmith.js     # The main build configuration
              ├── package.json      # Project dependencies
              └── README.md         # Project documentation
              ```

              This structure keeps everything organized, clearly separating content, templates, project configuration, and the build process. Let's explore each of these areas in more detail, focusing on the content and template files today. In upcoming posts, we'll dive deeper into `metalsmith.js` and `package.json`.

              ## The Source Directory: Where Your Content Lives

              The src directory is where all your content files are stored. When you open it, you'll see something like this:

              ```
              src/
              ├── about.md         # The About page
              ├── blog/            # Blog posts folder
              │   ├── cras-mattis-consecteur-purus.md
              │   ├── curabitur-blandit-empus-porttitor.md
              │   ├── duis-mollis-esr-non-commondo-uctus.md
              │   ├── curabitur-blandit-empus-porttitor.md
              │   └── ... .md
              ├── blog.md          # The main Blog landing page
              └── index.md         # The Home page
              ```

              Each `.md` file in this directory corresponds to a page on your website. These are [Markdown](https://www.markdownguide.org/) files, which combine easy-to-write content with structured metadata.

              Let's take a look at what's inside one of these files. Open `src/index.md`, and you'll see something like this:

              ```markdown
              ---
              layout: simple.njk
              bodyClass: "home"

              navigation:
                navLabel: 'Home'
                navIndex: 0

              seo:
                title: Metalsmith Blog Starter
                description: "A blog starter build with Metalsmith"
                socialImage: "/assets/images/metalsmith-starter-social.png"
                canonicalOverwrite: ""
              ---
              
              # Welcome to Metalsmith2025 Simple Starter

              ![Metalsmith2025 Simple Starter](/assets/images/sample.jpg#full-width)

              ## A Modern Foundation for Static Sites

              Welcome to the Metalsmith2025 Simple Starter – a clean, lightweight foundation for your next web project. This starter combines the elegant simplicity of Metalsmith with modern development practices to create a responsive, content-focused website that's easy to understand and extend.
              ```

              Notice how the file is divided into two sections:

              **Frontmatter**: The section between the "---" lines at the top contains metadata about the page. This is written in YAML format and includes:
              - The layout template to use
              - Navigation information
              - SEO details
              - Any other custom data you want to include

              **Content**: Everything after the second "---" is the actual content of the page, written in [Markdown](https://www.markdownguide.org/). This is where you write the text, add images, create links, etc.

              The beauty of this approach is that it separates content from presentation. You focus on writing your content, and Metalsmith handles, turning it into a fully-styled web page.

              ## The Blog Folder: Your Collection of Posts

              Inside the `src/blog` directory, you'll find individual Markdown files for each blog post. These work just like regular pages, but they have some additional frontmatter:

              ```yaml
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
                author: ""
                image: "/assets/images/blog-images/blog2.jpg"
                featuredBlogpost: true
                featuredBlogpostOrder: 1
                excerpt: |-
                  Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec id elit non mi porta gravida at eget metus. Maecenas faucibus mollis interdum. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
              ---

              Aenean lacinia bibendum nulla sed consectetur. Maecenas faucibus mollis interdum. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Curabitur blandit tempus porttitor. Morbi leo risus, porta ac consectetur ac, vestibulum at eros...
              ```

              Notice the additional post section in the frontmatter. This contains metadata specific to blog posts, such as:
              - The post title
              - Publication date
              - Whether it's a featured post
              - An excerpt or summary
              - Featured image information

              This structured data allows Metalsmith to treat blog posts differently from regular pages. It can generate indexes, create archives by date, show featured posts on the home page, and much more.

              ## The Lib Directory: Templates and Assets

              The `lib` directory contains files that define how your content is shown in a browser:

              ```
              lib/
              ├── assets/           # Static files like images, CSS, JavaScript
              │   ├── css/
              │   ├── images/
              │   └── js/
              ├── data/             # Global data available to templates
              ├── layouts/          # Nunjucks template files
              │   ├── blog-post.njk
              │   ├── blog.njk
              │   ├── includes/     # Reusable template parts
              │   │   ├── footer.njk
              │   │   ├── header.njk
              │   │   └── ...
              │   ├── partials/     # Smaller reusable components
              │   │   ├── meta-tags.njk
              │   │   ├── navigation.njk
              │   │   └── ...
              │   └── simple.njk
              └── nunjucks-filters/ # Custom template filters
              ```

              ### Assets Folder

              The assets folder contains all your static files:
              - `styles.css`: file with your styles
              - `images`: folder with photos, icons, and other graphics
              - `icons`: folder with favicon for various platforms
              - Javascript Client-side scripts

              These files are copied directly to the build directory without processing (though in a production build, some optimization might occur).
              
              ### Layouts Folder

              The layouts folder contains Nunjucks template files. These define the HTML structure of your pages. We'll review the use of Nunjucks in a later post in detail.

              ### Data Folder
              The data folder contains JSON files with global data that's available to all your templates. This might include:
              - Site configuration
              - Social media links
              - Team member information
              - Any other structured data you want to use across your site

              ## The Config Files: A Brief Overview

              In the root directory, you'll find several configuration files that control various aspects of your project:

              - `.eslintrc.js`: Rules for code linting to ensure consistent quality
              - `.prettierrc`: Configuration for automatic code formatting
              - `.gitignore`: Tells Git which files to ignore when committing
              - `metalsmith.js`: The main configuration file that defines the build process
              - `package.json`: Lists all the project dependencies and scripts

              We'll dive deeper into `metalsmith.js` and `package.json` in the next two posts, exploring how they control the build process and project dependencies. For now, just know that they're responsible for telling Metalsmith how to transform your content into a complete website.

              ## The Build Directory: Where Everything Comes Together

              When Metalsmith runs, it creates a build directory that contains your complete website in a way a browser can readily display it.

              ```
              build/
              ├── about/
              │   └── index.html    # The About page
              ├── assets/           # Static assets
              │   ├── css/
              │   ├── images/
              │   └── js/
              ├── blog/             # Blog pages
              │   ├── index.html    # Main blog index
              │   ├── 2/            # Pagination page
              │   │   └── index.html
              │   ├── first-post/
              │   │   └── index.html
              │   └── ...
              └── index.html        # The Home page
              ```

              Each Markdown file from your src directory has been transformed into an HTML file, placed in a directory structure that creates clean URLs. For example, `src/about.md` becomes `build/about/index.html`, which is accessible at the URL `/about/`.

              The static assets from lib/assets have been copied to build/assets, making them available to your HTML files.
              
              ## Making Changes
              
              Now that you understand the basic structure, let's try making some changes to see how it all works:

              - **Edit content**: Open a Markdown file like src/about.md and change some text. Save the file and see the changes in your browser.
              - **Add a new page**: Create a new file like src/contact.md with similar frontmatter to the other pages. Add your content and save. The new page will be automatically added to your site.
              - **Add a new blog post**: Create a new file in the src/blog directory, following the pattern of the existing posts. It will automatically appear in your blog listings.
              - **Customize styles**: Edit the CSS files in lib/assets/css to change the appearance of your site.
              - **Modify templates**: Edit the Nunjucks files in lib/layouts to change the HTML structure of your pages.
              
              ## Next Steps
              
              In the next post, we'll take a closer look at the `package.json` file, exploring the dependencies and scripts that power your Metalsmith project. We'll learn what each package does and how they work together to build your site.
              
              After that, we'll review the `metalsmith.js` file to understand the build pipeline in detail, seeing exactly how your content is transformed from Markdown to a complete website.

              For now, take some time to explore the files in your project, make some changes, and see how they affect your site. The more you experiment, the better you'll understand how Metalsmith works and how you can use it to build exactly the site you want.
              
              Happy building!

              Any comments? Find me on [Bluesky](https://bsky.app/profile/wernerglinka.bsky.social).
              
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
              - item: "use-the-platform"
              - item: "metalsmith-starters"

---