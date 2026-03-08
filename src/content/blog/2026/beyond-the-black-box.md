---
layout: blocks.njk
pageType: "blog-post"
disableDefaultFooter: true
item: "beyond-the-black-box" # used as a key for bloglist filters

seo:
  title: Beyond the Black Box | Werner Glinka
  description: "How Markdown's marked extension API turned five verbose YAML sections into one clean component — and why I never noticed the capability was there all along."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1772933210/black-box_ymlrvw.jpg"
  canonicalOverwrite: ""

blogTitle: "Beyond the Black Box"
date: 2026-03-10
author: ""
image:
  src: "v1772933210/black-box_ymlrvw.jpg"
  alt: ""
  caption:
excerpt: "How Markdown's marked extension API turned five verbose YAML sections into one clean component — and why I never noticed the capability was there all along."

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
        image: "v1772933210/black-box_ymlrvw.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Beyond the Black Box"
              header: "h1"
              subtitle: ""
              prose: ""
            date: 2026-03-10

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
              For years I've treated Markdown as a black box. You feed it text, it gives you HTML, and you don't ask questions. There's a reason for that. For a long time I ran two content models side by side in my [Metalsmith](https://metalsmith.io) sites: structured YAML sections powered by [Nunjucks templates](https://nunjucks-components.com/) for designed layouts, and traditional Markdown pages processed by the [`@metalsmith/markdown` plugin](https://github.com/metalsmith/markdown) for simpler content. The plugin handled Markdown-to-HTML conversion as a pipeline step — you configured it once and it ran over every `.md` file. I never had a reason to look inside.

              When I committed fully to the [section-components architecture](https://nunjucks-components.com/blog/building-structured-pages/) and dropped traditional Markdown pages I didn't need the `@metalsmith/markdown` plugin anymore. In its place I'm using a Nunjucks filter — `mdToHTML` — that calls `marked.parse()` directly on individual text fields inside YAML frontmatter. Instead of a plugin abstracting [`marked`](https://marked.js.org/) away behind a configuration object, I now talk to a `marked` instance directly. I could see its API. And that's when I noticed the extension system.

              As it turns out, the `@metalsmith/markdown` plugin does support passing extensions through its `engineOptions`, so the capability was always within reach. But behind the plugin's abstraction, I never noticed. The shift to a direct marked instance through a Nunjucks filter made the extension API visible in a way the plugin never did.

              ## The Problem

              Here's what page content with text, an image, an audio player and a couple of CTAs looked like when using the component system:

              ```yaml
              - sectionType: text-only
                containerTag: article
                classes: 'first-text-section'
                containerFields:
                  noMargin:
                    top: true
                    bottom: true
                  noPadding:
                    top: true
                    bottom: true
                text:
                  leadIn: 'My New Website'
                  title: 'Hello World'
                  titleTag: 'h1'
                  subTitle: 'And here, it begins'
                  prose: |-
                    This is a micro starter to build a static website with Claude and Metalsmith. When you see this page, you have successfully installed the starter. You can now chat with Claude about what you like to build.

              - sectionType: image-only
                containerTag: section
                classes: 'float-right rounded text-width'
                containerFields:
                  inContainer: true
                  noMargin:
                    top: true
                    bottom: true
                  noPadding:
                    bottom: true
                image:
                  src: '/assets/images/CLAUDE+Metalsmith.jpg'
                  alt: 'factory photo'
                  caption: ''

              - sectionType: text-only
                containerTag: article
                containerFields:
                  noMargin:
                    top: true
                    bottom: true
                  noPadding:
                    top: true
                    bottom: true
                text:
                  prose: |-
                    More prose wrapping around the image...

                    First Episode

              - sectionType: audio-only
                containerTag: section
                containerFields:
                  noMargin:
                    top: true
                    bottom: true
                  noPadding:
                    top: true
                    bottom: true
                audio:
                  mpeg: '/assets/audio/shattered-reflections.mp3'

              - sectionType: text-only
                containerTag: article
                containerFields:
                  noMargin:
                    top: true
                    bottom: true
                  noPadding:
                    top: true
                    bottom: true
                text:
                  prose: |-
                    Closing thoughts and a call to action below.

                ctas:
                  - url: '/'
                    label: 'Get Started'
                    isButton: true
                    buttonStyle: 'primary'
                  - url: '/'
                    label: 'Learn More'
                    isButton: false
              ```

              That's five sections — three text-only, one image-only, one audio-only — each carrying its own `containerTag`, `containerFields`, and margin and padding overrides, just to render one linear flow of content. And this is already the minimal version. Default options are omitted, text fields like `title` and `leadIn` are left out where they're not needed. The structure can't get much leaner than this.

              The content structure underneath is more forgiving than it looks. The `text` fields — `title`, `titleTag`, `subTitle`, `leadIn` — all default to empty and won't render if you leave them out. A minimal text section might just be `prose`. But even stripped down, every piece of content still has to pass through a nested YAML object: a `text.prose` field for a paragraph, an `image` object with `src`, `alt`, and `caption` for a photo, an `audio` object with format-specific paths, a `ctas` array with `url`, `label`, `isButton`, and `buttonStyle` for each link. And each of those lives in its own section with its own container config. The structure works. But for content that flows linearly, it fragments what should be a single narrative into a stack of discrete components.

              For a landing page where the template needs to place each element precisely, that fragmentation is justified — it's not fragmentation at all, it's precision. But for a blog post or an essay, where the content flows linearly and the author just wants to write, every section boundary is friction. Every level of nesting is an opportunity for a misaligned indent. Every array item requires its own set of keys. When you're writing a content-heavy page with multiple sections — text interspersed with images, audio embeds, call-to-action blocks — the source files become long, fragile, and hostile to anyone who has to edit them.

              I built the component system this way because I needed things Markdown doesn't provide out of the box: images with CSS classes, grouped CTA links, audio players, figures with captions. If Markdown can't express it, you need structure around it. That logic was sound. What experience eventually revealed was that `marked` — the library I was already using — could be extended to handle the sections where the content flows linearly.

              ## The Realization

              The `marked` library has a clean extension API. You can register custom token types at both block and inline level. Each extension provides three functions: `start` finds where your custom syntax begins in the source, `tokenizer` parses it into a token object, and `renderer` emits HTML. That's the whole contract.

              This means you can extend Markdown's syntax to handle images with classes, grouped links, audio embeds, and anything else — without leaving Markdown. The content stays readable. The source stays flat. And for content-heavy sections, the YAML shrinks to a component name and a body field.

              ## What I Built

              I ended up with four small extension modules plus a shared utilities package, organized as a monorepo at [github.com/wernerglinka/marked-extensions](https://github.com/wernerglinka/marked-extensions). Each extension is independently publishable to npm under the `@wernerglinka` scope, and they all share common functions — class name parsing, HTML element builders — through a dedicated shared package. That avoids the awkward dependency chain where one extension accidentally becomes a utility library for the others.

              ### Image with Class

              Standard Markdown images don't support CSS classes. This extension adds Pandoc-style attribute syntax after the image:

              ```markdown
              ![factory photo](/images/ruhr-valley.jpg){.float-right .rounded}
              ```

              This renders as:

              ```html
              <div class="float-right rounded">
                <img src="/images/ruhr-valley.jpg" alt="factory photo" />
              </div>
              ```

              The `{.classname}` convention comes from Pandoc and has been adopted by kramdown, markdown-it-attrs, and others. The dot prefix mirrors CSS selector syntax. It's the closest thing to a standard that exists for this.

              ### Link with Class

              Same idea, applied to links. Useful for inline styled links within prose:

              ```markdown
              Read the [documentation](/docs){.highlight} for details.
              ```

              Renders as a plain anchor with the class applied — no wrapper div, just an inline element.

              ### Paragraph with Class

              Any paragraph can receive a class by appending the attribute syntax:

              ```markdown
              My New Website {.lead-in}
              ```

              Renders as 

              ```html
              <p class="lead-in">My New Website</p>
              ``` 

              This eliminates the need for structured props like `leadIn` and `subTitle`. The Markdown makes that clear.

              ### Directive Blocks

              This is the workhorse. A generic block-level syntax using triple-colon fences, with a registry pattern that maps directive types to render functions:

              ```markdown
              :::cta
              [Get Started](/start){.btn .btn-primary}
              [Learn More](/docs){.btn-link}
              :::
              ```

              The directive system ships with seven built-in types — CTA groups, audio players, video players, blockquotes with attribution, figures with captions, asides, and collapsible details — and accepts custom renderers through an options object. Adding a new directive type is one function.

              Here's what the full set looks like in practice:

              ```markdown
              :::audio{.featured}
              src: /media/episode-01.mp3
              title: The First Episode
              :::

              :::video
              src: /media/intro.mp4
              poster: /images/intro-poster.jpg
              :::

              :::quote
              The best way to predict the future is to invent it.
              cite: Alan Kay
              :::

              :::figure{.wide}
              ![Ruhr Valley factory](/images/factory.jpg)
              caption: Dortmund steelworks, 1973
              :::

              :::aside{.warning}
              This requires Node.js 20 or higher.
              :::

              :::details
              summary: How does this work?
              The build pipeline processes each section sequentially,
              running the body through the extended marked instance.
              :::
              ```

              Each directive supports optional classes via `{.classname}` on the opening fence. Props use a simple `key: value` format. Everything else is content.

              ## The Before and After

              The extensions don't require a new component. They enhance the existing one. Since all the structured fields — `title`, `leadIn`, `subTitle` — already default to empty and won't render if omitted, the component can support both authoring paths: structured fields for designed sections, a Markdown body for authored content, or any combination of the two.

              Here's the same content, reimagined as a single `rich-text` component with everything in the body:

              ```yaml
              - component: rich-text
                animated: true
                body: |-
                  My New Website {.lead-in}

                  # Hello World

                  And here, it begins {.sub-title}

                  This is a micro starter to build a static website with Claude
                  and Metalsmith. When you see this page, you have successfully
                  installed the starter. You can now chat with Claude about what
                  you like to build.

                  ![factory photo](/assets/images/CLAUDE+Metalsmith.jpg){.float-right .rounded .text-width}

                  More prose wrapping around the image...

                  :::audio
                  src: /assets/audio/shattered-reflections.mp3
                  title: First Episode
                  :::

                  Closing thoughts and a call to action below.

                  :::cta
                  [Get Started](/){.btn .btn-primary}
                  [Learn More](/)
                  :::
              ```

              Same content, same result. The heading level is expressed directly in Markdown — `#` for h1 — instead of a separate `titleTag` prop. The lead-in and subtitle are styled paragraphs. The image carries its own layout classes. The audio player is a directive block. The CTAs are grouped in another. Container configuration only appears when it differs from defaults.

              Five sections became one. The content is the source. There's nothing else to misalign.

              ## One Component, Two Authoring Paths

              A single `rich-text` component covers both use cases. On a landing page where the template needs to place the title, subtitle, and CTAs independently, you fill in the structured fields — they're there, they're addressable by key, and the template can put each one exactly where the design calls for it. On a blog post or essay where the content flows linearly, you skip the structured fields entirely and put everything in the body. The author writes extended Markdown, the template renders it top to bottom, and the YAML stays minimal.

              There's a real tradeoff here, structured fields give you addressable content — a build step can extract `title` for navigation or OG tags without parsing HTML. A Markdown body is an opaque string until it hits the parser. You can't target the title separately from the prose because there are no separate fields. But for authored content, that addressability was never being used. The structure was just a verbose way to serialize linear content.

              The author chooses the approach based on what the content needs. One component to maintain, one template, no decision about which component to reach for. The structured fields are there when you need them. The body is there when you don't.

              ## Integration

              The entire integration is a single filter module. I was already using `marked` through a custom Nunjucks filter that converts Markdown strings to HTML. The only change was configuring `marked` with the extensions before the filter runs:

              ```javascript
              import { marked } from 'marked';
              import imageWithClass from '@wernerglinka/marked-image-with-class';
              import linkWithClass from '@wernerglinka/marked-link-with-class';
              import directiveBlock from '@wernerglinka/marked-directive-block';
              import paragraphWithClass from '@wernerglinka/marked-paragraph-with-class';

              marked.use({
                extensions: [paragraphWithClass(), imageWithClass(), linkWithClass(), directiveBlock()],
                mangle: false,
                headerIds: false
              });

              export const mdToHTML = (mdString) => {
                try {
                  return marked.parse(mdString);
                } catch (error) {
                  console.error('Error parsing markdown:', error);
                  return mdString;
                }
              };
              ```

              The filter function itself didn't change. It still takes a Markdown string and returns HTML. The extensions just gave Markdown the expressiveness to handle content that previously had to be broken into structured fields.

              ## The Monorepo

              The extensions live in a single repository as an npm workspace monorepo:

              ```bash
              marked-extensions/
                packages/
                  shared/              # parseClassNames, buildImageTag, wrapWithDiv
                  image-with-class/    # ![alt](src){.class}
                  link-with-class/     # [text](url){.class}
                  paragraph-with-class/ # text {.class}
                  directive-block/     # :::type ... :::
                package.json           # workspace root
              ```

              The shared package contains the common utilities — `parseClassNames` for parsing Pandoc-style attribute syntax, `buildImageTag` and `wrapWithDiv` for HTML construction, and `buildContainerClasses` for composing class strings in directive renderers. Every extension imports from `@wernerglinka/marked-extensions-shared` instead of reaching into sibling packages.

              Each package has `marked` as a peer dependency and can be installed independently or together. The workspace setup means `npm install` at the root links everything locally for development, and each package publishes to npm under the `@wernerglinka` scope.

              ## The Lesson

              The section-component architecture is the right way to build pages. It gives you precise control over layout, spacing, backgrounds, animation — everything that makes a designed page more than a stream of content. That hasn't changed, and the `rich-text` body field doesn't challenge it. It gives the same component a second authoring path for content that flows linearly.

              Building dozens of content-heavy sections with structured YAML revealed friction that only becomes visible through use — the verbosity of nested objects for simple content, the indentation errors, the feeling of fighting the format when you just want to write. That friction is what sent me looking at `marked`'s API for the first time, where I found an extension system that had been there since version 4. I'd never noticed it because the `@metalsmith/markdown` plugin sat between me and the library, and I had no reason to look underneath. It was only when the architecture simplified — section components eliminated the plugin, a direct Nunjucks filter replaced it — that the API became visible.

              The extensions are open source at [github.com/wernerglinka/marked-extensions](https://github.com/wernerglinka/marked-extensions). If you're using `marked` and feeling the same friction with content-heavy sections that don't fit neatly into structured data, they might help.

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
            url: "/blog/beyond-the-black-box/"
            socialTitle: "Beyond the Black Box"
            socialComment: "How Markdown's marked extension API turned five verbose YAML sections into one clean component — and why I never noticed the capability was there all along."

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
              - item: "metalsmith-redux-introducing-structured-content-starter"
              - item: "metalsmith-redux-building-better-webpages"
              - item: "metalsmith-redux-section-anatomy"
---
