---
layout: blocks.njk
pageType: "blog-post"
disableDefaultFooter: true
item: "ai-assisted-journey-with-project-metallurgy" # used as a key for bloglist filters

seo:
  title: "My AI-Assisted Journey with Project Metallurgy | Werner Glinka"
  description: "As a developer, I've been integrating AI tools into my daily workflow. My AI journey evolved from ChatGPT to Claude, which felt like having a human co-programmer. Then GitHub Copilot eliminated context-switching, followed by Claude Code automating entire workflows."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1741063961/tgc2022/blogImages/ai-journey/ai-header_feifza.jpg"
  canonicalOverwrite: ""

blogTitle: "My AI-Assisted Journey with Project Metallurgy"
date: 2025-03-04
author: ""
image:
  src: "v1741063961/tgc2022/blogImages/ai-journey/ai-header_feifza.jpg"
  alt: ""
  caption:
excerpt: "My AI journey evolved from ChatGPT to Claude, which felt like having a human co-programmer. Then GitHub Copilot eliminated context-switching, followed by Claude Code automating entire workflows."

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
        image: "v1741063961/tgc2022/blogImages/ai-journey/ai-header_feifza.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "My AI-Assisted Journey with Project Metallurgy"
              header: "h1"
              subtitle: ""
              prose: ""
            date: 2025-03-04
          
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
              ## The Evolution of Client Needs

              I've been a web developer for what seems like forever. Over the years, I've witnessed numerous industry shifts, but one of the most significant changes came from an unexpected direction: client security concerns.

              In recent years, more clients have begun requesting [static websites](https://jamstack.org/generators/). Their reasoning is sound: better security and improved performance. As malware and ransomware attacks became front-page news, clients who previously insisted on dynamic websites suddenly prioritized security. Static sites, lacking databases and server-side processing, offered protection against SQL injections and many common vulnerabilities.

              As a developer, I welcomed this shift. Building static websites is a refreshing return to the fundamentals – clean HTML, CSS, and JavaScript without the overhead of complex CMS platforms. The simplicity brings a certain joy to the craft and allows for blazing-fast performance that makes developers and users happy.
              
              ## The Content Management Dilemma

              However, this technical renaissance had a significant drawback. While developing static sites was enjoyable from a technical perspective, managing content became a nightmare for non-technical users. The average marketing professional who comfortably navigates WordPress's admin panel doesn't want to learn Git, open a code editor, or understand the difference between Markdown and HTML.

              I still remember the moment this problem crystallized for me. A long-term client called, frustrated because they needed to update a product description on their new static site:

              > "I just want to change three words on our homepage. Why do I need to always email you instead of doing it myself like before?"

              She was right. The technical benefits of static sites were clear to me, but they would be meaningless if the content couldn't be easily updated by those who needed to manage it. This conversation sparked an idea: What if I could build a simple GUI application that allows non-technical users to update content on static sites without touching code? Thus, the concept of Project Metallurgy was born. 
              
              ## Venturing into Unknown Territory

              The concept seemed straightforward: Create a desktop application with a form-based interface for content editing. Users can make changes, and the app handles the technical aspects of updating the static site. The problem? I had never built a desktop application before, and my expertise was firmly in web development.

              After researching different options, [Electron](https://www.electronjs.org/) emerged as the natural choice. It would allow me to leverage my existing JavaScript skills while creating a cross-platform desktop experience. But despite my years of web development experience, building an Electron app presented a steep learning curve.

              I spent weeks watching tutorials, reading documentation, and experimenting with basic examples. Progress was slow. The web-to-desktop development shift involved new concepts, different architectural patterns, and unfamiliar tooling. While I could build simple prototypes, creating a production-ready application that non-technical users could rely on seemed increasingly daunting.
              
              ## The AI Turning Point

              That's when AI entered the picture, though not by deliberate choice. [ChatGPT](https://openai.com/blog/chatgpt) had dominated the tech headlines for a while; initially skeptical, I decided to try it with a specific Electron problem I'd been stuck on for days.

              The results were immediate and impressive. Within minutes, I had a working solution and, more importantly, an explanation that helped me understand where I'd gone wrong. This first experience was eye-opening – AI wasn't just providing answers but accelerating my learning process.

              My journey with AI tools evolved rapidly. While ChatGPT initially impressed me, I soon discovered [Claude](https://claude.ai/), which provided a noticeably more personal experience. Working with Claude felt less like interacting with a tool and more like collaborating with a human co-programmer. The conversations were more natural, and Claude better contextualized my project's architecture and goals.

              From then on, AI became my coding companion as I built the application. When I needed to implement file system access for the first time in Electron, AI provided code examples and security considerations. When I struggled with IPC communication between the main and renderer processes, AI offered clear explanations that documentation had made needlessly complex.

              ## The Rollercoaster Experience

              Working with AI as I developed this application became a rollercoaster. One moment, it would provide brilliant, well-thought-out approaches that saved work hours. The next, it would forget basic context or confidently suggest nonsensical solutions.

              I remember asking for help implementing a file-watching system to detect changes in the content directory. The AI responded with a comprehensive solution that addressed my immediate need and anticipated edge cases I hadn't considered. It felt like working with a senior developer who had built similar systems before.

              Yet, in the same conversation, when I asked how to integrate this new functionality with the existing codebase, the AI suddenly seemed to forget everything about the project's architecture we had discussed extensively. It suggested approaches that contradicted our earlier decisions and would have introduced unnecessary complexity.

              This unpredictability meant I couldn't simply hand control to the AI. Instead, **I had to become an effective collaborator, learning to provide clear context, ask specific questions, and carefully evaluate suggestions against my understanding of best practices and the project's needs**.

              ## Architectural Transformation

              As development progressed, I faced another challenge. My initial implementation used plain JavaScript with minimal structure, and it was becoming unwieldy as features were added. The AI suggested refactoring with [Vite/React](https://electron-vite.org/), which would improve modularity and maintainability.

              This was a significant architectural shift, but the transition was smoother with AI assistance than I could have managed alone. We refactored the codebase incrementally, module by module, maintaining functionality while improving code quality. The AI helped generate component structures, suggested state management patterns, and identified potential issues in my implementation.

              What struck me most during this process was how AI complemented my development style. When I explained that I preferred functional programming approaches with dependency injection, its suggestions were tailored accordingly. When I emphasized the importance of separating concerns, it helped ensure each module had a single responsibility. It respected my preference for robust documentation and clean architecture without imposing its own opinions.

              ## Beyond Just Coding

              The benefits of AI extend beyond writing code. It helped me draft [comprehensive documentation](https://jsdoc.app/), create user guides for non-technical clients, and generate test cases that covered edge scenarios I might have overlooked. When I struggled to explain complex technical concepts to clients, the AI provided clear explanations that anyone could understand.

              Testing was another area where AI proved invaluable. The AI recommended [Jest](https://jestjs.io/) for unit testing and helped generate test suites that achieved high coverage. What previously would have taken days of tedious writing and debugging was reduced to hours of collaborative refinement.

              ## The Reality Check

              Despite these benefits, working with AI wasn't without frustrations. The longer a session continued, the more likely the AI would lose context or make basic mistakes. I learned to start fresh conversations for new features rather than continuing endless threads.

              There were also times when the AI confidently provided incorrect information, particularly about Electron-specific behaviors or edge cases in the filesystem API. I learned to verify suggestions against documentation and test thoroughly before implementation.

              The most valuable lesson was understanding that **AI functions best as a thought partner and accelerator, not a replacement for developer judgment**. It could generate boilerplate, suggest approaches, and help troubleshoot issues, but the final architecture decisions and quality control remained my responsibility.

              ## Where I Am Today

              [Metallurgy](https://github.com/wernerglinka/---smelter) is close to being the tool I envisioned, allowing non-technical users to update content on static websites easily. They can modify product descriptions, update images, and publish blog posts without knowing HTML or Git. Static sites maintain their security and performance advantages while content management becomes accessible to everyone.

              Metallurgy still needs more work, and I invite interested developers to check out the GitHub repo. I am open to new ideas and would love to discuss future enhancements. I plan some blog posts about Metallurgy that I will write in detail about.

              AI has assisted me in accelerating my journey from web developer to desktop application creator, but it wasn't without challenges. Like many developers today, I've had to develop new skills—not just in Electron and desktop development but also in effectively collaborating with AI tools.

              ## My Evolution Through AI Tools

              As my project grew in complexity, so did my AI toolkit. While Claude.io's browser-based interface is excellent for conceptual discussions, it created a workflow bottleneck. I found myself constantly switching between the browser and VSCode, copying and pasting code snippets back and forth.

              [GitHub Copilot](https://copilot.github.com/) was the next logical step in my AI journey. Its direct integration into [VSCode](https://code.visualstudio.com/) eliminated the context-switching problem, allowing me to receive suggestions directly within my development environment. This felt like a significant upgrade – the AI was now meeting me where I worked rather than requiring me to seek it out.

              The evolution continued with [Augment Code](https://augmentcode.io/), which took the VSCode integration to another level by working with my entire workspace context. Rather than making isolated suggestions based on the current file, it can understand relationships between components across the codebase, making its recommendations more architecturally sound.

              The most transformative step came just last week with [Claude Code](https://claude.ai/code), Anthropic's agentic command-line tool. Claude Code can autonomously execute tasks through the command line, unlike previous AI coding assistants that merely suggested code. It can analyze the codebase, plan refactoring strategies, implement changes, run tests, and cycle through improvements with minimal human intervention.

              What makes Claude Code particularly powerful is its ability to maintain deep context about the entire project while executing multiple steps in a workflow. For instance, when I needed to refactor how the application handled file paths across various components, Claude Code could identify all affected files, design a consistent approach, implement the changes, ensure tests passed, and commit the results. This task would have previously taken hours of careful consideration.

              The tool also excels at handling repetitive tasks. When implementing new features that follow established architectural patterns in my codebase, Claude Code can generate all necessary components, tests, and integration points while maintaining consistency with existing code. This isn't just about saving time; it's about maintaining quality and coherence across the project. But as I said before, **trust but verify**. Even Claude Code may [hallucinate](https://en.wikipedia.org/wiki/Hallucination_(artificial_intelligence)). 

              ## Looking Forward

              The next phase of this journey is to make Metallurgy an open-source project. Other developers encounter similar challenges with managing static site content, and a community-supported solution could benefit many. AI will continue to play a role in this evolution by helping to manage contributions, improve documentation, and refine features based on community feedback.

              I don't believe AI will replace developers – the rollercoaster experience of brilliant insights followed by bogus mistakes makes that clear. However, it has fundamentally changed how I approach development problems and expanded my ability as a single developer.

              For those just beginning to incorporate AI into their development workflow, I offer this advice: treat AI as a collaborative partner rather than an autopilot. Be specific in your requests, verify suggestions against established best practices, and don't be afraid to start fresh when conversations go off track. Most importantly, maintain your developer judgment – AI is a powerful tool, but you remain the architect of your solutions.

              Development has changed dramatically with the introduction of AI tools, and those of us navigating this new territory are simultaneously pioneers and guinea pigs. The ride is unpredictable, sometimes frustrating, but ultimately transformative. I'm excited to see where it leads next.

              Any comments? Find me on [Bluesky](https://bsky.app/profile/wernerglinka.bsky.social).

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
            url: "/blog/ai-assisted-journey-with-project-metallurgy"
            socialTitle: "My AI-Assisted Journey with Project Metallurgy"
            socialComment: "My AI journey evolved from ChatGPT to Claude, which felt like having a human co-programmer. Then GitHub Copilot eliminated context-switching, followed by Claude Code automating entire workflows"
        
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
              - item: "switching-augment-code"
              - item: "experience-with-claude-github-copilot"
---