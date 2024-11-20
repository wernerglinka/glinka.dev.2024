---
layout: blocks.njk
draft: false
pageType: "blog-post"
disableDefaultFooter: true
item: "building-metalsmith-html-optimizer" # used as a key for bloglist filters

seo:
  title: Building a Modern HTML Optimizer for Metalsmith | Werner Glinka
  description: "Building a modern HTML optimizer for Metalsmith: From being inspired by HTMLCompressor's features to creating a modular plugin with effective HTML optimization without compromising security."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1731988878/tgc2022/blogImages/html-optimizer/html-optimizer_gx9nuj.jpg"
  canonicalOverwrite: ""

blogTitle: "Building a Modern HTML Optimizer for Metalsmith"
date: 2024-11-20
author: ""
image:
  src: "v1731988878/tgc2022/blogImages/html-optimizer/html-optimizer_gx9nuj.jpg"
  alt: ""
  caption:
excerpt: "Building a modern HTML optimizer for Metalsmith: From being inspired by HTMLCompressor's features to creating a modular plugin with effective HTML optimization without compromising security."

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
        image: "v1731988878/tgc2022/blogImages/html-optimizer/html-optimizer_gx9nuj.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Building a Modern HTML Optimizer for Metalsmith"
              header: "h1"
              subtitle: ""
              prose: ""
            date: 2024-11-20

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
              The Metalsmith ecosystem needed a fresh approach to HTML optimization.  [Metalsmith HTML Minifier](https://github.com/whymarrh/metalsmith-html-minifier) was once the go-to plugin. However, it has grown stale due to unaddressed security issues. It is built as a wrapper for  [HTML Minifier](https://github.com/kangax/html-minifier), which has a security fix, but sadly, the wrapper has not been updated. This gap prompted me to build a new solution with modern development practices while maintaining simplicity and security.

              ## Learning from the Past, Building for Today

              I began by studying  [HTMLCompressor](https://code.google.com/archive/p/htmlcompressor/), a tool that set the standard for HTML optimization. Its feature set provided valuable insights into what developers need. But HTML Compressor was released 12 years ago and browsers are very different now. This perspective made me realize that not all optimizations are equally useful, and some might even be harmful if applied indiscriminately.

              ## Architecture: Options-Driven Optimizer Loading

              The plugin's architecture reflects my belief in modularity and efficient resource usage. I built a system in which each optimization module has a single purpose, is self-contained and independent from others. The plugin loads these modules dynamically based on user options. At its core lies a simple mapping:

              ```javascript
              const OPTIMIZER_MAP = {
                // Core optimizer - always loaded
                whitespace: 'whitespace.js',

                // Optional optimizers - loaded based on options
                removeComments: 'comments.js',
                removeTagSpaces: 'tag-spaces.js',
                // ... other optimizers
              };
              ```

              This map serves as configuration and documentation, showing which options correspond to which optimizers. When the plugin runs, it examines the user's options and loads only the necessary optimizers. This approach keeps the memory footprint minimal and the processing efficient.
              
              ## The Core Architecture

              I followed a simple concept: optimization should be modular and efficient, loading only what's needed. Each optimizer is an independent module focused on a specific task. The main plugin loads these optimizers and runs them based on user configuration.

              Consider how a typical Metalsmith build might optimize HTML:

              ```javascript
              Metalsmith(__dirname)
                .use(optimizeHTML({
                  removeComments: true,
                  cleanUrlAttributes: true
                }))
              ```

              When the plugin initializes, it examines these options and dynamically imports only the required optimizers. The whitespace optimizer, which is fundamental to my approach, always loads. The comments and URL attribute optimizers are loaded only when explicitly requested.

              This architectural decision proved valuable when I discovered how different optimizers might interact. For instance, the whitespace optimization must preserve formatting in specific HTML elements like `<pre>` and `<code>`. I could refine this logic without touching other optimizations by keeping this logic in a dedicated module.

              ## Evolution Through Real-World Use

              The development process taught me valuable lessons about HTML optimization in modern Web development. Initially, I tried to do too much, offering every conceivable optimization option. However, as I tested with real Metalsmith sites, I found that aggressive optimization often provided diminishing returns while increasing the risk of problems.

              When I tested the plugin on a documentation site, I was surprised that the default whitespace optimization reduced file sizes by 28% while enabling additional optimizations barely improved that figure. This insight shaped my philosophy: start with safe, effective defaults and make additional optimizations optional.

              ## Architecture Deep Dive

              The modular architecture I developed isn't just about loading optimizers - it's about making them work together seamlessly. Each optimizer follows a consistent pattern:

              ```javascript
              export const commentOptimizer = {
                name: 'comment',
                optimize: (content, { removeComments = false } = {}) => {
                  if (!removeComments) return content;
                  return content.replace(/<!--[\s\S]*?-->/g, '');
                }
              };
              ```

              This pattern brings several advantages. Each optimizer has an `optimize` function that handles its options, defines its default behavior, and focuses on a single responsibility. The main plugin then orchestrates these optimizers, running them in a specific order:

              ```javascript
              content = activeOptimizers.reduce((result, optimizer) =>
                optimizer.optimize(result, options),
                content
              );
              ```

              This sequential processing proved crucial when dealing with interdependencies. For example, whitespace optimization must run before tag space normalization to ensure consistent results.

              ## Real-World Evolution

              My understanding of what makes an effective HTML optimizer evolved through real-world testing. One site I worked with had a mix of regular content and code examples:

              **Test Example**
              ```html
              <article>
                <h1>   Coding   Tutorial    </h1>
                <p>Here's   how   to   do   it:</p>
                <pre><code>
                  function   example()   {
                      return   42;
                  }
                </code></pre>
              </article>
              ```

              Initial versions of the plugin aggressively collapsed all whitespace, breaking the code examples. This led me to develop a more nuanced approach that preserves formatting in critical elements while optimizing everything else:

              ```javascript
              export const whitespaceOptimizer = {
                name: 'whitespace',
                optimize: (content) => {
                  const preserveTags = ['pre', 'code', 'textarea', 'script', 'style'];
                  
                  // Store preserved content
                  const preserved = [];
                  const processedHtml = content.replace(
                    new RegExp(`(<(${preserveTags.join('|')})[^>]*>[\\s\\S]*?</\\2>)`, 'gi'),
                    (match) => {
                      preserved.push(match);
                      return `___PRESERVE_${preserved.length - 1}___`;
                    }
                  );

                  // Process remaining content
                  let result = processedHtml
                    .split(/(<[^>]+>)/g)
                    .map(part => part.startsWith('<') ? part : part.replace(/\s+/g, ' ').trim())
                    .join('');

                  // Restore preserved content
                  return preserved.reduce(
                    (text, content, i) => text.replace(`___PRESERVE_${i}___`, content),
                    result
                  ).trim();
                }
              };
              ```

              ## Optimizing for the Modern Web

              In modern websites, URLs can be found in various contexts:

              ```html
              <head>
                <meta property="og:url" content="https://example.com">
                <link rel="canonical" href="https://example.com/page">
                <base href="https://example.com/">
              </head>
              <body>
                <img src="https://cdn.example.com/image.jpg">
                <svg xmlns="http://www.w3.org/2000/svg">
                  <use xlink:href="https://example.com/icons#star"/>
                </svg>
              </body>
              ```

              Each of these URLs required special consideration. Should I remove protocols from social media meta tags? What about SVG namespaces? Real-world testing shows that blanket rules rarely work. Instead, I developed context-aware optimizations that understand the semantics of different HTML elements.

              ## Learning Through Code

              Perhaps the most valuable lesson came from watching how different optimization combinations interact. Consider this example:

              ```javascript
              Metalsmith(__dirname)
                .use(optimizeHTML({
                  removeComments: true,
                  removeTagSpaces: true,
                  cleanUrlAttributes: true
                }));
              ```

              **Test Input HTML**
              ```html
              <!--[if IE]>
              <div   class="legacy"    id="old-ie">
                <img  src="https://example.com/image.jpg"   alt="test">
              </div>
              <![endif]-->
              ```
              **Test Output HTML**
              ```html
              <div class="legacy" id="old-ie">
                <img src="//example.com/image.jpg" alt="test">
              </div>
              ```

              The order of operations matters here. Comment removal, tag space normalization, and URL cleaning each transform HTML. My modular architecture ensures these optimizations work together predictably and efficiently.

              ## A Foundation for the Future
              The path to building a modern HTML optimizer taught us that modularity isn't just about clean code, security, and maintainability. I created a system where each part can be audited, tested, and updated independently by breaking down optimization into discrete, focused modules. This approach contrasts monolithic solutions, which often become security risks as they age.

              When I first examined why the previous HTML minifier became problematic, the issue was clear: its dependency on multiple NPM packages, some of them abandoned,  meant that any security issue in any of these libraries affected the entire system. My modular approach, which only uses one NPM package used by NPM itself, minimizes this risk.

              This modularity extends beyond security. As web standards evolve and new HTML features emerge, my architecture allows us to add new optimizations without touching existing code. Want to optimize the latest HTML features? Create a new optimizer module and add it to the system. The plugin's core remains untouched, maintaining its stability while growing its capabilities.

              As a result, I see significant file size reductions in production environments with zero compatibility issues. More importantly, developers can confidently use the plugin knowing it follows the principle of least surprise—it's safe by default and explicit in its optimizations.

              I built this plugin to optimize HTML and escape NPM Dependency Hell. Through a modular architecture and real-world testing, I've built a foundation that will be reliable for future optimizations.

              The journey from studying HTMLCompressor to creating a modern, secure optimizer has been interesting. I hope this approach to plugin development—emphasizing modularity, security, and real-world testing—inspires others in the Metalsmith community and beyond.

              The plugin is available on [GitHub](https://github.com/wernerglinka/metalsmith-optimize-html)  and  [NPM](https://www.npmjs.com/package/metalsmith-optimize-html). I welcome feedback and contributions to make it even better.

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
              - item: "wordpress-building-resource-filter-1"
              - item: "wordpress-building-resource-filter-2"
              - item: "wordpress-building-resource-filter-3"
              - item: "wordpress-building-resource-filter-4"
              - item: "wordpress-building-resource-filter-5"
---
