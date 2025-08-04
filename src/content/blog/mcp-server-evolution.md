---
layout: blocks.njk
draft: false
pageType: "blog-post"
disableDefaultFooter: true
item: "mcp-server-evolution" # used as a key for bloglist filters

seo:
  title: "MCP Server Development: The Evolution of a Metalsmith Plugin MCP Server | Werner Glinka"
  description: "Metalsmith Plugin MCP Server is a good example of how AI can assist in development. But what started over a weekend turned into a real development framework, shaped by real-world usage, trial-and-error, and a growing understanding of how AI needs to be guided, not just invited."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1754347564/mcp-server-evolution_edooir.jpg"
  canonicalOverwrite: ""

blogTitle: "MCP Server Development: The Evolution of a Metalsmith Plugin MCP Server"
date: 2025-08-05
author: ""
image:
  src: "v1754347564/mcp-server-evolution_edooir.jpg"
  alt: ""
  caption:
excerpt: "Metalsmith Plugin MCP Server is a good example of how AI can assist in development. But what started over a weekend turned into a real development framework, shaped by real-world usage, trial-and-error, and a growing understanding of how AI needs to be guided, not just invited."

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
        image: "v1754347564/mcp-server-evolution_edooir.jpg"
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
            date: 2025-08-05

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
              When I first wrote about [building `metalsmith-plugin-mcp-server`](/blog/mcp-server-development-integrating-claude-ai-with-metalsmith) over a weekend, I thought I was finished. The tool worked, it saved time, and it was a great showcase of how AI can assist in development. But as any developer knows, you don’t really know what you’ve built until you use it in production.

              What followed was a period of discovery, equal parts frustration and progress, that reshaped the project. What started as a quick utility turned into a foundational development framework, proven by real-world usage, trial-and-error, and a growing understanding of how AI needs to be guided, not just invited.

              ## The Honeymoon Phase

              At first, everything went smoothly. I used the MCP server to update some existing plugins. The scaffolding worked. Tests passed. Builds succeeded. But then came GitHub releases, and that’s where things unraveled.

              ## When Releases Become Nightmares... sort of

              No matter what I tried, automating GitHub releases just wouldn’t work, they constantly needed manual intervention. `release-it` kept throwing authentication errors, each one more cryptic than the last. The token seemed fine, but the process failed anyway.

              The conversation with Claude during one particularly frustrating session went something like this:

              _Me: "The release is failing again with a different error."_

              _Claude: "Let me fix the npm publishing configuration..."_

              _Me: "NO! We only release to GitHub, not npm!"_

              Claude had tried to be "helpful" by enabling npm publishing, which promptly failed because of my 2FA settings. This was just one example of a pattern I was starting to see: Claude going "off script" in its eagerness to help.

              ## The Simple Fix That Changed Everything

              The fix turned out to be really simple. We ditched token-based authentication and instead leaned on the GitHub CLI, which already handled authentication securely and reliably.

              ```json
              {
                "github": {
                  "release": false
                },
                "hooks": {
                  "before:git": "gh --version || (echo 'GitHub CLI not found...' && exit 1)",
                  "after:git:release": "gh release create v${version} --title 'v${version}' --notes-file CHANGELOG.md || echo 'Release failed but git succeeded'"
                }
              }
              ```

              This change not only solved the release problem, it taught a broader lesson: good tools must be defensive against well-meaning but misguided assistance.

              ## When the AI Goes Off Script

              As I continued updating eight different plugins, more patterns emerged. Claude had a habit of interpreting instructions loosely. It often created simplified templates instead of using official ones, fixed things that weren’t broken, and improvised instead of relying on the MCP tooling.

              Another memorable exchange:

              _Me: "Use the MCP server to get the CLAUDE.md template"_

              _Claude: "I'll create a helpful CLAUDE.md file for you..."_

              _Me: "NO! Use the get-template command!"_

              _Claude: "You're absolutely right - I didn't follow instructions and created my own version instead of using the MCP server's template... I kept making assumptions and taking actions instead of following your explicit instructions to use MCP server templates verbatim."_

              That’s when it clicked: the AI wasn’t failing because it was bad. It was failing because it had too much leeway.

              ## Guardrails, Not Guesswork

              The solution was to introduce constraints, clear rules that AI assistants must follow. This led to the creation of a `CLAUDE.md` file, which now serves as a kind of rule book for AI behavior in the repo. It includes rules like:

              ```markdown
              ### CRITICAL RULES for AI Assistants

              1. **ALWAYS use MCP server templates verbatim** - Never create simplified versions
              2. **ALWAYS use `list-templates` first** to see what's available
              3. **NEVER improvise or create custom implementations** when MCP server provides templates
              4. **When validation recommends templates**, use the exact commands provided

              ### Common Mistakes to AVOID

              **❌ Wrong Approach:**
              - Creating custom CLAUDE.md content instead of using `get-template plugin/CLAUDE.md`
              - Scaffolding entire new plugins when you just need a template
              - Making up template content or "simplifying" official templates

              **✅ Correct Approach:**
              - Use `list-templates` to see what's available
              - Use `get-template <template-name>` to get exact content
              - Follow validation recommendations exactly as provided
              ```

              By codifying these expectations, we moved away from hoping the AI would "get it right" and toward a structured collaboration where the AI knows the limits of its role.

              ## A Smarter Way to Develop: The Three-Phase Model

              This experience also led us to rethink the entire development workflow. We realized that strict rules are useful early on, but they can become stifling later in the creative process. That’s why I adopted a three-phase model:

              **Phase 1: Scaffolding** — Use MCP tools strictly. Templates are non-negotiable. Structure must be respected.  
              **Phase 2: Functional Development** — This is where creativity belongs. Optimize for your use case, iterate, improve.  
              **Phase 3: Release and Validation** — Return to structure. Validate with MCP tools, ensure compliance, and release using battle-tested patterns.

              This model acknowledges that different stages of development require different mindsets—and that rigid systems must give way to flexibility at the right moments.

              ## Testing in Isolation

              One of the most important changes was the creation of a dedicated test environment. After Claude tried to be “helpful” by modifying production plugins (and even attempted unauthorized npm publishes), it became clear: we needed a sandbox.

              Having exerienced first hand how clever Claude can get to be "helpful", I manually built a testlab with 13 forked plugins, renamed from `metalsmith-*` to `test-*`, each living in its own GitHub repo. I also created a website that used all 13 plugins. The process was tedious, cloning, scrubbing git histories, renaming everything, but it gave me complete confidence that nothing could impact production code.

              This test site became our integration testbed. Any changes to the MCP server would now be evaluated against a real, non-trivial Metalsmith site.

              ## From Version 0.1.0 to 1.0.0

              The tool has evolved a lot since its weekend inception. Version 0.1.0 was little more than a proof of concept. By 0.7.0, validation had been modernized and hardened. At 0.17.1, it was battle-tested, with defensive programming and clear feedback loops.

              Yesterday, we hit 1.0.0, a version grounded in experience, shaped by frustration, and guided by real-world needs.

              Each of my eight production plugins contributed something: more helpful error messages, improved validation logic, better documentation, and clear documentation of anti-patterns.

              ## What I Learned About AI-Assisted Development

              If I had to boil it all down:

              - **Context is critical.** The `CLAUDE.md` file provides persistent guidance for AI, session after session.  
              - **Show, don’t tell.** Instead of explaining how to use a tool, just use it in front of the AI. It learns better that way.  
              - **Design defensively.** Assume the AI will go off script. Build in confirmations, warnings, and protective defaults.  
              - **Use real-world complexity.** Only diverse, messy examples can expose the cracks in your approach.  
              - **Embrace the journey.** What seems like a failure today often becomes tomorrow’s feature.

              ## The Workflow That Works

              Today, a successful workflow looks like this:

              1. Start with context:  
                ```bash
                cd your-plugin
                npx metalsmith-plugin-mcp-server@latest install-claude-md .
                ```

              2. Ask Claude to read and summarize it.

              3. Let Claude discover available tools via `validate-plugin`.

              4. Begin development using the phased model above.

              It’s a dance now, not a tug-of-war.

              ## Looking Ahead

              Reaching version 1.0.0 is just the beginning. We’re working on:

              - Pre-release validation hooks  
              - Template diff tools  
              - Automated updates with built-in safety checks  
              - CI/CD integration  
              - Ecosystem analytics and metadata

              All of it builds on the same philosophy: structure first, freedom later, then structure again.

              Today, `metalsmith-plugin-mcp-server` is a framework shaped by dozens of real-world use cases, improved by trial, error, and conversation. Every time Claude ignored instructions, it taught us something. Every workaround became part of the architecture.

              What began as a 48-hour sprint to address a personal annoyance has grown into a useful framework for AI-assisted plugin development.

              Have you built tools that evolved through real-world usage? What lessons did you learn? Share your experiences on [Bluesky](https://bsky.app/profile/wernerglinka.bsky.social).

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
            url: "/blog/mcp-server-evolution"
            socialTitle: "MCP Server Development: Integrating Claude AI with Metalsmith"
            socialComment: "Metalsmith Plugin MCP Server is a good example of how AI can assist in development. But what started over a weekend turned into a real development framework, shaped by real-world usage, trial-and-error, and a growing understanding of how AI needs to be guided, not just invited."

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
