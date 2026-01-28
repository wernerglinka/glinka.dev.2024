---
layout: blocks.njk
draft: false
pageType: "blog-post"
disableDefaultFooter: true
item: "metalsmith-redux-bundled-components-plugin" # used as a key for bloglist filters

seo:
  title: "The Missing Piece: How I Built the Metalsmith Bundled Components Plugin with Claude | Werner Glinka"
  description: "Building a Metalsmith plugin with Claude revealed that effective AI collaboration isn't about prompt engineering—it's about exploring problems through dialogue until solutions emerge naturally."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1757871402/build-with-ai_rvsi68.jpg"
  canonicalOverwrite: ""

blogTitle: "The Missing Piece: How I Built the Metalsmith Bundled Components Plugin with Claude"
date: 2025-09-14
author: ""
image:
  src: "v1757871402/build-with-ai_rvsi68.jpg"
  alt: ""
  caption:
excerpt: "Building a Metalsmith plugin with Claude revealed that effective AI collaboration isn't about prompt engineering—it's about exploring problems through dialogue until solutions emerge naturally."

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
        image: "v1757871402/build-with-ai_rvsi68.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "The Missing Piece"
              titleCase: false
              header: "h1"
              subtitle: "How I Built the Metalsmith Bundled Components Plugin with Claude"
              prose: ""
            date: 2025-09-14

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
              In my Metalsmith Redux series, I've been exploring [component-based architecture](/blog/metalsmith-redux-building-better-webpages/) for static sites. The [Structured Content Starter](/blog/metalsmith-redux-introducing-structured-content-starter/) demonstrates how this approach can be used – pages built entirely from reusable sections, each with its own template, styles, and behavior. But there was a critical piece missing from the ecosystem: asset bundling.

              The [Section Anatomy](/blog/metalsmith-redux-section-anatomy/) post hints at the challenge. When you have dozens of components, each with CSS and JavaScript dependencies, how do you create bundles without manual maintenance? Traditional approaches, such as SCSS imports and individual module loading, work but create maintenance headaches. Components aren't truly self-contained if you need to wire up their assets manually.

              This became the perfect opportunity to explore AI-assisted development. What emerged wasn't just the [Metalsmith Bundled Components plugin](https://github.com/wernerglinka/metalsmith-bundled-components), but a methodology for collaborative development with [Claude](https://claude.ai) that any developer can adopt.

              ## The Real Problem: Component Independence at Scale

              The Structured Content Starter works nicely with a handful of components. But scale it to production – 30+ section types, shared partials, conditional dependencies – and asset management becomes unwieldy. You need automatic discovery of component assets across multiple directories, dependency resolution that respects component relationships, and build-time optimization producing single, cacheable bundles. You also need validation to catch configuration errors early, all with zero runtime overhead.

              Without this infrastructure, the component-based approach remains difficult to handle. With it, you can build sites where components are truly independent modules.

              ## Starting with Exploration, Not Execution

              I started by _kicking the tires_ with Claude – exploring a possible solution through discussion. These initial discussions are crucial and often overlooked in AI development narratives.

              My conversations with Claude weren't about code at all:

              **Me**: "I'm building component-based Metalsmith sites, and each component has its own CSS and JavaScript. Right now, I'm manually managing these dependencies. There has to be a better way."

              **Claude**: "Tell me more about how your components are structured. How do they currently reference each other?"

              **Me**: "Well, a hero section might use a CTA partial, which uses a button partial. Each has its own styles, but I'm manually importing them in the right order."

              **Claude**: "So you need to understand the dependency chain. How do other systems handle this?"

              This wasn't planning – we were exploring the problem, not rushing toward a solution.

              ## Kicking the Tires

              These early discussions meandered productively. We discussed npm's dependency management, why WebPack's approach was overkill for this use case, the uniqueness of Metalsmith plugins, and how other static site generators tackle similar challenges. None of this directly produced code, but it allowed me to form a mental model.

              **Me**: "What if components could somehow declare what they need?"

              **Claude**: "Like a package.json for each component?"

              **Me**: "Maybe, but simpler. I don't need versioning, just 'this component needs these other components.'"

              **Claude**: "What would that look like?"

              We explored this for several sessions before writing any code. The manifest pattern didn't appear fully formed – it evolved through these exploratory discussions.

              ## From Exploration to Discovery

              The transition from "kicking tires" to "building something" was gradual. Our discussions naturally evolved from "what if" to "how about".

              ### The Manifest Emergence

              Through our explorations, patterns emerged:

              **Me**: "So each component would have some kind of declaration file?"

              **Claude**: "Right. It could list its assets and dependencies. What should we call it?"

              **Me**: "In the Node world, it would be package.json, but that's taken and means something specific."

              **Claude**: "How about manifest.json? It's a manifest of what the component contains and needs."

              **Me**: "That works. What would it look like?"

              Together, we arrived at this:

              ```json
              { 
                "name": "hero",
                "type": "section",
                "styles": ["hero.css"],
                "scripts": ["hero.js"],
                "dependencies": ["ctas", "text", "image"],
                "validation": {
                  "required": ["sectionType"],
                  "properties": {
                    "isFullScreen": { "type": "boolean" }
                  }
                }
              }
              ```

              The validation section wasn't in our first draft. It emerged when we discussed:

              **Me**: "I keep making mistakes like putting 'false' as a string in YAML, which is always truthy in JavaScript."

              **Claude**: "The manifest could include validation rules. Catch those errors at build time."

              **Me**: "Oh, that's interesting. Show me what that might look like."

              ### The Methodology That Emerged

              Through building this plugin, a clear methodology emerged for AI-assisted development:

              ### Start with Exploration, Not Specifications

              Don't begin with "Build me X." Start with "I want to do this..." and build the project context together. These "kicking the tires" sessions are where breakthroughs happen.

              ### Let Understanding Evolve

              Our first discussions about component dependencies were vague. But through dialogue, we developed mental models. The manifest pattern emerged from understanding, not prescription.

              ### Embrace Productive Meandering

              Not every discussion produced code. We explored dead ends and rejected approaches. This wasn't wasted time - it's how understanding develops.

              ### Document the Journey

              I used a CLAUDE.md file to capture not just decisions but the whole process of getting there:

              ```yaml
              ## Early Explorations

              ### Session 1: Problem Space
              Discussed manual dependency management pain points. Explored how other ecosystems handle dependencies. Identified key requirements: simplicity, explicitness, and validation.

              ### Session 2: Possible Approaches
              Considered convention-based discovery (too implicit). Explored code analysis (too complex). Discussed the manifest approach (promising).

              ### Session 3: Manifest Design
              Started with minimal structure. Added validation after discussing common YAML mistakes. Decided against versioning (unnecessary complexity).
              ```

              ### Recognize When to Shift Gears

              The transition from exploration to implementation comes naturally. You'll know when you've explored enough and it's time to build. It was when we could clearly articulate what problem we're solving, why existing solutions don't work, how our approach would work, and what success looks like.

              ## The Complete Development Arc

              Looking back, the development followed this pattern:

              The **exploration phase** involved several sessions of problem exploration, domain understanding, prior art exploration, and pattern discovery. This led to the **discovery phase** with multiple iterations where the manifest pattern emerged, along with our dependency resolution approach, validation requirements, and the decision to use PostCSS integration.

              The **implementation phase** involved collaborative coding with constant dialogue, testing against real projects, refining based on discoveries, and documenting decisions as we went. This continues into the ongoing **refinement phase**, incorporating community feedback, handling edge cases, optimizing performance, and improving documentation.

              ## Dependency Resolution

              Once we had manifests, we needed to process them. I initially described this as "figuring out the right order," but Claude recognized this as a classic computer science problem: _topological sorting_.

              Our discussion went something like:

              **Me**: "If component A needs component B, and B needs component C, we need C's CSS first, then B's, then A's."

              **Claude**: "That's topological sorting – ordering items based on dependencies. We'll also need to detect circular dependencies."

              **Me**: "Right, like if A depends on B, and B depends on A."

              **Claude**: "Exactly. Here's how we could approach it..."

              What emerged was something like this:

              ```javascript
              function resolveDependencyOrder(componentMap) {
                const visited = new Set();
                const visiting = new Set();
                const order = [];

                function visit(name, path = []) {
                  if (visited.has(name)) return;

                  // This check for cycles came from our discussion about
                  // what could go wrong with dependencies
                  if (visiting.has(name)) {
                    const cycle = [...path, name].join(' → ');
                    throw new Error(`Circular dependency detected: ${cycle}`);
                  }

                  visiting.add(name);
                  const component = componentMap.get(name);
                  if (!component) {
                    // This error handling emerged when we discussed
                    // what happens with typos in dependency names
                    throw new Error(`Unknown dependency: ${name}`);
                  }

                  component.dependencies.forEach(dep => {
                    visit(dep, [...path, name]);
                  });

                  visiting.delete(name);
                  visited.add(name);
                  order.push(name);
                }

                componentMap.forEach((_, name) => visit(name, []));
                return order;
              }
              ```

              The algorithm wasn't predetermined – it developed through our exploration of edge cases and failure modes.

              ## PostCSS: A Discovery, Not a Decision

              Initially, I struggled with whether to use SCSS or CSS, but I always try to use as few dependencies as possible, so I stayed with modern CSS. During a discussion about modern CSS workflows, Claude inquired about my current CSS processing approach, and I mentioned autoprefixing and minification needs:

              **Me**: "The CSS needs vendor prefixes and should be minified for production."

              **Claude**: "PostCSS is the standard tool for this – it has autoprefixer and cssnano plugins."

              **Me**: "PostCSS it is."

              ## Practical Lessons for Your Next Project

              Start with conversation, not code. Begin by talking to the AI like you'd talk to a colleague. Start with "I'm trying to figure out...", not "Given the following constraints and requirements, generate a solution that..."

              Don't rush from problem to solution. Spend time in the uncertain space between. That's where discoveries live. As Yogi Berra said, "_You've got to be very careful if you don't know where you are going, because you might not get there._" Sometimes, not knowing your exact destination is what lets you find where you actually need to be.

              Document explorations, not just outcomes. Your CLAUDE.md should capture dead ends, abandoned approaches, and "what if" discussions. They're as valuable as final decisions. Since Claude reviews this file at the start of each session, it serves as both memory and guidance - reminding Claude what didn't work and reinforcing what did.

              Recognize productive meandering. Not every discussion needs immediate action. Building shared understanding through exploration is productive work.

              Trust the process. You don't need to know exactly where you're going when you start. Trust that exploration with AI will reveal a path forward.

              ## The Value of "Kicking the Tires"

              This exploratory approach is what separates AI-assisted development from simple code generation. When you start with exploration, solutions emerge that you wouldn't have conceived alone. Understanding develops organically through dialogue. Architecture evolves from actual needs, not theoretical frameworks. The final product reflects deep understanding, not surface implementation.

              The manifest pattern wasn't my idea or Claude's – it emerged from kicking the tires. The validation system wasn't planned; it emerged from discussing pain points. The PostCSS integration wasn't predetermined – it arose from evaluating options.

              ## The Complete Picture

              With this plugin, the structured content approach moved from concept to production-ready implementation. But more importantly, the development process showed that effective AI collaboration starts with exploration, not execution.

              The Component Library showcases what's possible. The Structured Content Starter provides the foundation. The Bundled Components plugin makes it scale.

              Together, they demonstrate that the future of development isn't about commanding AI to generate code. It's about exploring problems together, kicking the tires until you understand the space, then building solutions that emerge from that understanding.

              ## Could I Have Just Used a Bundler?

              After reading this, you might wonder – why not just use Rollup or esbuild? It's a fair question.

              Yes, existing bundlers could handle the dependency resolution and concatenation. But the exploration with Claude revealed why a custom solution made sense. Metalsmith components aren't JavaScript modules – in my case, they're Nunjucks template files with associated assets. The manifest pattern would still be needed to bridge that gap. The validation layer catching YAML configuration errors wouldn't come from a bundler. The integration with Metalsmith's pipeline would require adaptation.

              And I must admit that I really don't like to use WebPack. You should not need a PhD in computer science to bundle some CSS files. Part of what drove me to build a custom solution was the desire for a solution that any developer could easily understand by reading the code. More importantly, building this with Claude taught me what I actually needed. Now I understand the problem enough to know I built the right thing.

              ## Open Source in the Age of AI

              The Metalsmith ecosystem, like most open source communities, hasn't grappled with AI-assisted development yet. This creates an interesting moment – we're establishing precedents without guidelines.

              Some developers view AI-generated code with suspicion.

              But here’s my take: using AI is a choice. At the end of the day, you are the one responsible for the code. You still need to understand it, review it, test it, and refine it—just like any other code.

              That’s the crux of it. AI collaboration doesn’t lower standards; it changes the process. Instead of staring at a blank page, you’re working with a tireless thinking partner who can help you reach the first draft faster. The craft remains the same—it’s the path that looks different.

              Any comments? Let me know on [Bluesky](https://bsky.app/profile/wernerglinka.bsky.social).

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
            url: "/blog/metalsmith-redux-bundled-components-plugin"
            socialTitle: "The Missing Piece: How I Built the Metalsmith Bundled Components Plugin with Claude"
            socialComment: "Building a Metalsmith plugin with Claude revealed that effective AI collaboration isn't about prompt engineering—it's about exploring problems through dialogue until solutions emerge naturally."

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
              - item: "experience-with-claude-github-copilot"
              - item: "switching-augment-code"
              - item: "ai-assisted-journey-with-project-metallurgy"
---
