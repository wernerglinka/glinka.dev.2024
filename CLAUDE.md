# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

```bash
npm start         # Development with watch mode and live reload (port 3000)
npm run build     # Production build
npm run serve     # Serve built site without rebuild
npm run fix       # Format and lint (prettier + eslint)
npm run depcheck  # Check for unused dependencies
```

## Architecture Overview

This is a Metalsmith static site generator portfolio website. Pages are built using a block-based architecture where content is defined entirely in YAML frontmatter rather than markdown body content.

### Build Pipeline (metalsmith.js)

The build orchestrates plugins in this order:
1. Load global metadata from `src/content/data/` (site.json, testimonials, work, projects)
2. Filter drafts (shown in dev, hidden in production)
3. Create blog collection from `blog/*.md` sorted by date descending
4. Generate pagination metadata via `metalsmith-sectioned-blog-pagination`
5. Apply Nunjucks templates with custom filters
6. Process external links (add target="_blank" for external URLs)
7. Syntax highlight with Prism
8. Compile SCSS → CSS with PostCSS
9. Bundle JS with esbuild
10. (Production only) Minify HTML, generate sitemap.xml and robots.txt

### Block-Based Page Structure

Pages use `layout: blocks.njk` and define sections in frontmatter:

```yaml
sections:
  - container: section  # section | article | aside | div
    containerFields:
      containerId: "my-section"
      containerClass: "my-class"
      inContainer: true
      background:
        color: "#fff"
        image: "cloudinary-image-id.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: text  # Determines which block template renders
            title: "..."
            prose: "Markdown content here"
```

Available blocks in `templates/blocks/`: text, image, cards, cta, testimonials, tabs, video, blog-banner, page-banner, full-page-image, recent-blogs, related-blogs, contact-form, contact-info, and others.

### Client-Side JavaScript

Entry point: `src/js/main.js`

Uses Swup for PJAX-style page transitions. Modules in `src/js/modules/` are conditionally initialized based on DOM selectors (e.g., `.js-testimonials`, `.js-tabs`). Re-initialization happens on `swup.hooks.on('page:view')`.

### Nunjucks Filters (nunjucks-filters/index.js)

Key filters:
- `mdToHTML` - Convert markdown strings to HTML (for prose fields)
- `blogDate` - Format dates for display
- `filterList`, `getSelections` - Filter arrays by matching properties
- `dump` - Debug output for objects

### Images

Images use Cloudinary CDN. The prefix URL is in `src/content/data/site.json` as `metadata.site.imagePrefix`. Use the `<cloudinary-image>` web component in templates.

## Code Style

- JavaScript only (no TypeScript)
- ES6+ modules throughout (`"type": "module"` in package.json)
- ESLint with airbnb + prettier presets
- Prettier: 2-space indent, 120 char line width, trailing commas
- Node.js >= 20.0.0 required

## Skills

When writing JavaScript or CSS for this project, use these skills:

- `/javascript-development` - For JavaScript code: Metalsmith plugins, browser scripts, Node.js tooling. Enforces functional programming patterns, ES6+ features, JSDoc documentation, and Mocha testing.
- `/css-layouts` - For CSS layouts: Modern intrinsic design, container queries, fluid responsive techniques. Consult this skill first when implementing CSS layouts.
