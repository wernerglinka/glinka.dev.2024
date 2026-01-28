---
layout: blocks.njk
draft: false
pageType: "blog-post"
disableDefaultFooter: true
item: "mcp-server-development-integrating-claude-ai-with-metalsmith" # used as a key for bloglist filters

seo:
  title: "MCP Server Development: Integrating Claude AI with Metalsmith | Werner Glinka"
  description: "Discover how to use Claude AI and MCP servers to automate plugin development. A step-by-step weekend project that transforms repetitive Metalsmith plugin creation into an AI-powered conversation, complete with testing examples and practical insights."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1753307411/mcp-server-header_swz3yc.jpg"
  canonicalOverwrite: ""

blogTitle: "MCP Server Development: Integrating Claude AI with Metalsmith"
date: 2025-07-24
author: ""
image:
  src: "v1753307411/mcp-server-header_swz3yc.jpg"
  alt: ""
  caption:
excerpt: "Discover how to use Claude AI and MCP servers to automate plugin development. A step-by-step weekend project that transforms repetitive Metalsmith plugin creation into an AI-powered conversation, complete with testing examples and practical insights."

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
        image: "v1753307411/mcp-server-header_swz3yc.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "MCP Server Development"
              header: "h1"
              subtitle: "Integrating Claude AI with Metalsmith"
              prose: ""
            date: 2025-07-24

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
              I've been publishing a [series of articles](/blog/metalsmith-redux-intro/) about using [Metalsmith](https://metalsmith.io), a pluggable static site generator, to build websites in 2025. These articles provide detailed information about setup and the process Metalsmith uses to build sites.

              To demonstrate Metalsmith's capabilities for my article series, I found myself building some plugins. If you've ever built plugins for a framework, you know the drill: copy boilerplate from your last project, update package.json, set up tests, configure linters, create directory structures... rinse and repeat. I found myself in this exact situation while building plugins, and it was getting tedious.

              That's when I had a thought: What if [Claude](https://www.anthropic.com/) could help me build a tool that encapsulates best practices and generates production-ready plugins?

              The foundation for this tool's "knowledge base" would be a [plugin I had just finished](https://github.com/wernerglinka/metalsmith-optimize-images) in collaboration with Claude. It had evolved from the [@metalsmith/core-plugin](https://github.com/metalsmith/core-plugin) template and incorporated modern best practices I'd learned through reviewing core Metalsmith plugins and experience: dual module support for both ESM and CommonJS, comprehensive testing setup, proper documentation structure, modern JavaScript patterns, and using [native Metalsmith methods](https://metalsmith.io/api/) instead of external dependencies.

              Over one weekend, that "what if" became reality.

              ## The Collaborative Process
              I've been using Claude for coding for some time now, and it's become a capable co-programmer. The key word here is "co-programmer" - you need to stay actively involved with the code. Claude Code, for instance, frequently gets confused about which directory it's working in. I've lost count of how many times this happened - amusing at first, but potentially problematic if you're not paying attention. Despite these quirks, the collaborative process has been remarkably productive.

              My workflow now typically includes discussing projects with Claude in the desktop app, where I use Opus 4. Then, I ask Claude to prepare a context document for implementation with Claude Code in VS Code. This handoff between planning and implementation has proven to be very effective.

              It was during one of these planning sessions that I realized I could enhance this workflow even further. I was repeatedly asking Claude to scaffold Metalsmith plugins, and each time we'd go through the same dance of establishing best practices, project structure, and configuration. That's when it hit me: why not give Claude the tools to do this directly?

              ## Building the MCP Server: Five Iterations in 48 Hours
              MCP (Model Context Protocol) servers extend AI assistants' capabilities by providing them with specific tools. By building an MCP server for Metalsmith plugin development, I could give Claude the ability to scaffold plugins directly, with all best practices built in. No more repetitive setup discussions - just straight to productive coding.

              ### Iteration 1: Template Evolution
              We started with custom template rendering, quickly moved to Handlebars, and finally settled on [Nunjucks](https://mozilla.github.io/nunjucks/) - which saved over 100 lines of code and provided the flexibility we needed. Third time's the charm.

              ### Iteration 2: Feature Selection
              Instead of generating monolithic plugins, we added a feature selection system. Need async operations? Include async-processing. Adding metadata? Include metadata-generation. The scaffolder only includes code for selected features, keeping plugins lean and focused.

              ### Iteration 3: Quality Metrics
              We built a comprehensive validation system that checks everything from file structure to testing setup. Plugins receive a quality score, with anything above 90% indicating production readiness. This instant feedback helps developers know what might be missing.

              ### Iteration 4: Real-World Refinements
              License selection, coverage configuration with sensible defaults, smart validation that doesn't warn about missing coverage on brand-new plugins - all the little things that make a tool useful.

              ### Iteration 5: Learning from Core Plugins and Experience
              We implemented dual module support using [microbundle](https://github.com/developit/microbundle), replaced external pattern matching with native Metalsmith methods, and added clear documentation about how options work.

              ## Real-World Testing: My First Experience
              After all these iterations, I tested the complete workflow. Here's what happened:

              ### Setup: Adding the MCP Server to Claude Code
              I added the MCP Server to Claude Code's MCP management commands:

              ```bash
              claude mcp add metalsmith-plugin /absolute/path/to/metalsmith-plugin-mcp-server/src/index.js
              ```

              ### Discovery: Finding Available Resources
              Then I started Claude Code in VS Code and asked it to list available resources:

              Me: **claude list mcp**

                            
              Note that I used the wrong command syntax here - but watch how Claude handles it. Claude's response was characteristically verbose (which I appreciate - it shows the thinking process):

              ```bash
              ⏺ I'll help you list the available MCP tools. Let me check what MCP tools are currently available in your environment.
              ⏺ Bash(claude --help | grep -A 20 "MCP")
              ⏺ Bash(claude mcp --help)
              ⏺ Bash(claude mcp list)
                ⎿  metalsmith-plugin: /absolute/path/to/metalsmith-plugin-mcp-server/
                ```

              Claude used its own help commands to discover available MCP servers, then summarized what it found. In our case, I had only one MCP server configured, although there could have been many more.

              ### Test 1: The Overly Simplistic Prompt

              Me: **please build a new plugin**

              Claude didn't make assumptions. Instead, it asked for clarification:

              ```bash
              I'll help you build a new Metalsmith plugin. Let me start by asking what the plugin should do and what you'd like to name it.
              ```

              Me: **name is reverse-titles and it should reverse all titles on pages that are specified via option patterns**

              The result was structurally correct but functionally wrong - it tried to reverse filenames instead of reading HTML content and working with header tags. This drives home the importance of precise communication.

              ### Test 2: Better Description, Still Imperfect

              Me: **please build a new plugin**

              This time I provided a clearer description:

              Me: **name is revert-titles and it should revert the order of all titles in the page content**


              Claude went through the complete process:
              - Created the scaffold with proper naming convention warning
              - Implemented the processFile function
              - Updated tests with proper fixtures
              - Built and ran tests

              The plugin worked - it reversed the word order in titles. "Metalsmith First" became "First Metalsmith". But wait... I actually wanted character reversal as well, not just word reversal. Looking at my prompt, I realized the issues:
              - "Revert" isn't the right word - I meant "reverse"
              - My description was not clear about what to reverse

              ### Test 3: Clear Requirements
              Me: **name is reverse-titles and it should reverse the order of all words and reverse the alphabetical order of characters for all titles in the page content**

              This time the result was exactly what I expected. "_Metalsmith First_" became "_tsriF htimslateM_" and "_Oh, and One More Thing_" became "_gnihT eroM enO dna ,hO_".

              ## Key Takeaways for New Users
              - **Claude is interactive, not prescriptive** - It asks for clarification rather than making assumptions
              - **Precision matters** - Ambiguous descriptions lead to functional but incorrect implementations
              - **The scaffolding is solid** - Even with my imprecise requirements, the generated plugins were structurally perfect with proper tests, builds, and configuration
              - **Iteration is normal** - It took three tries to get exactly what I wanted, and that's okay
              - **The MCP server handles the boilerplate** - I could focus entirely on describing functionality rather than setup 

              ## The Power of Good Tooling
              What impressed me most was that even with imperfect prompts, I got working plugins every time. The MCP server ensured proper file structure, complete test suites that actually run, build processes that work out of the box, and all configuration files properly set up.

              When tests failed, Claude diagnosed and fixed issues immediately. This is the kind of development experience that makes experimentation enjoyable rather than frustrating.

              ## A Living Tool
              **This isn't a final answer** - it's a great beginning. As developers use this tool and build more plugins, we'll discover new use cases and patterns that aren't available yet. The beauty of open source is that the tool can evolve with the community's needs.

              In all my testing so far, the results have been consistently good. I'll be building all my future production plugins this way, and I'd love to [get feedback](https://github.com/wernerglinka/metalsmith-plugin-mcp-server/issues) from other developers who try it.

              ## Try It Yourself
              The metalsmith-plugin-mcp-server is now [available on npm](https://www.npmjs.com/package/metalsmith-plugin-mcp-server):

              ### Install globally
              ```bash
              npm install -g metalsmith-plugin-mcp-server
              ```

              ### Or use directly with npx
              ```bash
              npx metalsmith-plugin-mcp-server
              ```
              Configure it in [Claude Desktop's settings](https://modelcontextprotocol.io/quickstart/user) and start scaffolding Metalsmith plugins in seconds.

              Check out the [Metalsmith Plugin MCP Server on GitHub](https://github.com/wernerglinka/metalsmith-plugin-mcp-server)

              ## Looking Forward
              This weekend project transformed my development workflow and hopefully will help others too. It's a perfect example of how AI can augment human creativity and productivity when used as a collaborative partner.

              The next time you find yourself doing repetitive development tasks, consider stepping back and asking: "What if I built a tool to do this better?" With AI as your development partner, the answer might be just a weekend away.

              The metalsmith-plugin-mcp-server is open source and available on GitHub and npm. Contributions and feedback are welcome!

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
            url: "/blog/mcp-server-development-integrating-claude-ai-with-metalsmith"
            socialTitle: "MCP Server Development: Integrating Claude AI with Metalsmith"
            socialComment: "Discover how to use Claude AI and MCP servers to automate plugin development. A step-by-step weekend project that transforms repetitive Metalsmith plugin creation into an AI-powered conversation, complete with testing examples and practical insights."

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
              - item: "experience-with-claude-github-copilot"
              - item: "switching-augment-code"
---
