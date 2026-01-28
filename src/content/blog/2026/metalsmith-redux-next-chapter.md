---
layout: blocks.njk
scheduledDate: today
pageType: "blog-post"
disableDefaultFooter: true
item: "metalsmith-redux-the-next-chapter" # used as a key for bloglist filters

seo:
  title: "Metalsmith Redux - The Next Chapter | Werner Glinka"
  description: "How a component library, a Claude SKILL, and ongoing collaboration are opening website building to newcomers."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1768098407/CLAUDE_Metalsmith_kdjdl1.jpg"
  canonicalOverwrite: ""

blogTitle: "Metalsmith Redux - The Next Chapter"
date: 2026-01-06
author: ""
image:
  src: "v1768098407/CLAUDE_Metalsmith_kdjdl1.jpg"
  alt: ""
  caption:
excerpt: "From blog series to living infrastructure. The Metalsmith Component Library has grown, and we're building a SKILL that lets Claude guide beginners through creating real websites."

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
        image: "v1768098407/CLAUDE_Metalsmith_kdjdl1.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: "Metalsmith Redux"
              title: "The Next Chapter"
              titleCase: false
              header: "h1"
              subtitle: "From blog series to living infrastructure"
              prose: ""
            date: 2026-01-06

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
              The [Metalsmith Redux series concluded](/blog/metalsmith-redux-conclusion/) with a validated thesis: simplicity scales better than complexity, and the platform is enough. We demonstrated that component-based static sites built on [Metalsmith’s](https://metalsmith.io/) stable foundation can handle sophisticated requirements without framework overhead.

              That was October 2025. Since then, the infrastructure has continued to evolve. The [Component Library](https://metalsmith-components.com/) has grown significantly. And we’re now working on something that feels like a natural culmination of everything the series explored: a [SKILL](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) that enables [Claude](https://claude.ai) to guide complete beginners through building websites via conversation.

              ## The Component Library Today

              [metalsmith-components.com](https://metalsmith-components.com/) has evolved from documentation into a comprehensive distribution system. It now includes dozens of section components—heroes, media sections, testimonials, CTAs, feature grids, pricing tables, accordions, and more. Each component has its own [reference page](https://metalsmith-components.com/references/) that explains what it does, which properties it accepts, and how to configure it.

              Every component is downloadable as a ZIP archive that contains the Nunjucks template, CSS, JavaScript (when needed), a manifest declaring dependencies, and an install script. The install script handles dependency chains automatically. If a hero component requires an icon partial that isn’t in your project, the script fetches and installs it. No manual dependency management, no configuration files to maintain.

              The [repository is open on GitHub](https://github.com/wernerglinka/metalsmith-components). Suggestions and pull requests are welcome. The goal has always been to build something others can use and extend.

              ## Building a SKILL for Claude

              Here’s where the story takes an interesting turn. Claude Code supports SKILLS—structured documents that teach Claude specific workflows and methodologies. We’re developing a SKILL that lets Claude help newcomers build Metalsmith websites through conversation alone.

              The workflow looks like this: Someone opens Claude Code in an empty folder and says, “_I want to build a website for my photography business._” Claude guides them through a discovery conversation—what’s the site’s purpose, what should visitors see first, what actions should they take. Based on those answers, Claude sets up the project, downloads the appropriate components from the library, creates pages with the correct [frontmatter](https://dev.to/dailydevtips1/what-exactly-is-frontmatter-123g) structure, and iterates on feedback.

              I’ve tested this extensively. I built a complete five-page website for a fictional PR firm called “WeCommunicate” through conversation alone. The process revealed friction points: background colors not applying correctly due to missing CSS classes, components expecting data in specific file locations, and the development server not detecting changes to data files. Each friction point fed back into improvements—to the SKILL, to the starter repository, to the component library’s install scripts.

              ## How the SKILL Works

              The SKILL isn’t magic. It’s a document that teaches Claude how the component system works: where files go, what patterns to follow, what questions to ask during discovery, and how to troubleshoot common issues. It references the component library documentation, the starter repository structure, and the manifest system that enables dependency resolution.

              What makes this effective is the same thing that made the component architecture work in the first place: explicit, well-documented structure. When Claude fetches a component, it knows exactly what files will arrive, what the manifest describes, and what properties each section accepts. The structured frontmatter that humans find readable is precisely the kind of explicit, machine-parseable format that enables AI assistance.

              The SKILL includes phases: environment check, project setup, discovery dialog, component selection, iterative page building, and deployment guidance. It emphasizes not skipping the discovery phase—rushing to build without understanding what the site needs produces worse results than taking time to ask the right questions first.

              ## The Collaboration Pattern

              This entire infrastructure emerged through collaboration with Claude. The [Bundled Components plugin](https://github.com/wernerglinka/metalsmith-bundled-components) wasn’t built from a specification. It evolved through exploratory dialogue—kicking the tires, discussing edge cases, letting patterns emerge organically. The manifest system, the validation logic, and the dependency resolution—none of these were planned up front. They developed through iterative conversation.

              The SKILL followed the same pattern. Initial versions missed things. Testing revealed gaps. Each gap became a learning opportunity, documented and fed back into refinements. The friction points from building WeCommunicate became explicit guidance in the SKILL: always add the first-section class to heroes below fixed headers, use data files via source references rather than inline frontmatter for blurbs, restart the server after adding new data files.

              This is what AI-assisted development actually looks like. Not code generated on command, but a methodology that emerges from doing the work together.

              ## Why This Matters

              The series demonstrated that you don’t need complex frameworks to build component-based sites. The SKILL takes this further: you don’t need to understand the internals to benefit from the architecture. Someone who’s never touched Metalsmith, never written YAML frontmatter, never configured a build pipeline can still produce a real, deployable website—because Claude knows how all the pieces fit together.

              The same principles that made Metalsmith a joy to work with—simplicity, modularity, explicit configuration—turn out to be precisely what make it AI-friendly. Not because the system was designed for AI, but because good architecture serves everyone who works with it.

              ## Looking Forward

              The SKILL is designed for [Claude Code](https://code.claude.com/docs/en/overview) running in [VS Code](https://code.visualstudio.com/). As Claude Desktop’s capabilities evolve—particularly around GitHub connectivity—simpler paths for non-technical users may emerge. The infrastructure supports this: the component library serves ZIP files via HTTP, the starter repository is public, and deployment to [Netlify](https://www.netlify.com/) requires only a GitHub account and a few clicks.

              The component library continues to grow. The starter repositories are maintained based on real-world testing. The SKILL improves with each iteration.

              What started as a blog series reintroducing Metalsmith has become a complete system for building websites—from the foundational architecture to the component distribution to the conversational workflow that ties it all together. Each piece reinforces the others. The structured approach that makes components portable also makes them machine-readable. The manifest system that enables intelligent bundling also enables intelligent installation. The explicit configuration that humans can understand also enables AI assistance.

              This is web development that compounds.

              The [Component Library](https://metalsmith-components.com/) showcases what’s possible. The [Structured Content Starter](https://github.com/wernerglinka/metalsmith2025-structured-content-starter) and [Bundled Components plugin](https://github.com/wernerglinka/metalsmith-bundled-components) provide the tools. The [Component Builder SKILL](https://github.com/wernerglinka/metalsmith-component-builder-skill) opens the door for newcomers.

              Questions about building websites with Metalsmith? Find me on Bluesky.

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
            url: "/blog/metalsmith-redux-the-next-chapter"
            socialTitle: "Metalsmith Redux - The Next Chapter"
            socialComment: "How a component library, a Claude SKILL, and ongoing collaboration are opening website building to newcomers."

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
              - item: "metalsmith-redux-conclusion"
---
