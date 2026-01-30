---
layout: blocks.njk
pageType: "blog-post"
disableDefaultFooter: true
item: "scheduled-publishing-for-static-sites" # used as a key for bloglist filters

seo:
  title: Scheduled Publishing for Static Sites | Werner Glinka
  description: "Static site generators produce a frozen snapshot of your content at build time. Here is how to add scheduled publishing using a date-based plugin and automated daily builds."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1769646426/scheduled_vqokc9.jpg"
  canonicalOverwrite: ""

blogTitle: "Scheduled Publishing for Static Sites"
date: 2026-01-12
author: ""
image:
  src: "v1769646426/scheduled_vqokc9.jpg"
  alt: ""
  caption:
excerpt: "Static site generators produce a frozen snapshot of your content at build time. Here is how to add scheduled publishing using a date-based plugin and automated daily builds."

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
        image: "v1769646426/scheduled_vqokc9.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Scheduled Publishing for Static Sites"
              header: "h1"
              subtitle: ""
              prose: ""
            date: 2026-01-12

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
              Static site generators produce a frozen snapshot of your content at build time. This is their strength—fast, secure, easy to host—but it creates a challenge when you want content to appear on a specific future date. There is no server running to check the calendar and decide what to show. Whatever exists at build time is what gets published.

              This limitation surfaces in different contexts. For writers who like to batch their work—writing several posts when inspiration strikes and then spacing out publication—it means either keeping drafts somewhere and remembering to publish them manually, or committing and deploying on the exact day each post should go live. Neither fits a workflow where you want to write freely and let the publishing take care of itself.

              In business contexts, the stakes are higher. Product launches, press releases, and partnership announcements often need to go live at a precise date and time, coordinated with other marketing activities. When I was building sites for corporate clients, this came up repeatedly. Legal and PR teams don't want to hear that someone needs to manually push a button at 9 AM Eastern on announcement day. They want the content staged and ready, with confidence that it will appear exactly when planned.

              ## Available Approaches

              Several solutions exist, each with trade-offs.

              **Manual publishing** is the simplest. Keep a `draft: true` frontmatter flag, and when you're ready to publish, set it to `false` and deploy. This works, but it requires someone to act at the right moment. For a personal blog, that might mean fifty-two minor interruptions per year. For a business announcement, it means someone's morning depends on not forgetting.

              **Headless CMS with scheduling** is another option. Services like Contentful, Sanity, or Netlify CMS can trigger builds when scheduled content becomes due, sometimes down to the minute. This adds infrastructure and moves your content out of your repository, which may or may not suit your preferences. For teams already using a headless CMS, this is often the path of least resistance.

              **Serverless functions** can check dates at request time and return appropriate content. This works, but it undermines the static site model—you're essentially adding a dynamic layer that requires maintenance and costs to operate. It also introduces latency and potential points of failure.

              **Scheduled builds** take a different approach. Instead of checking dates at request time, you rebuild the site periodically and let the build process decide what to include. If you rebuild daily, content scheduled for today appears in today's build. The site remains fully static between builds. For tighter timing, you can increase the build frequency—hourly builds give you hourly granularity.

              ## The Scheduled Build Approach

              For my Metalsmith blog, I went with scheduled builds. The implementation has two parts: a plugin that filters content by date and an automated trigger that rebuilds the site daily.

              You actually don't need a separate `draft` property alongside a scheduled date. The scheduled date itself tells you everything: if it's in the future, exclude the content; if it's today or past, include it. One property serves as the single source of truth, preventing confusion when `draft: true` appears in a file that's been live for months.

              The inline plugin runs early in the build pipeline:

              ```javascript
              .use((files, metalsmith, done) => {
                if (!isProduction) {
                  done();
                  return;
                }

                const today = new Date();
                today.setHours(0, 0, 0, 0);

                for (const filepath of Object.keys(files)) {
                  const scheduledDate = files[filepath].scheduledDate;

                  if (!scheduledDate) {
                    continue;
                  }

                  const scheduled = new Date(scheduledDate);
                  scheduled.setHours(0, 0, 0, 0);

                  if (scheduled > today) {
                    delete files[filepath];
                  } else {
                    delete files[filepath].scheduledDate;
                  }
                }

                done();
              })
              ```

              Files without a `scheduledDate` pass through unchanged and are published immediately. Files with a future date are removed from the build. Files whose due date has arrived are included, with the scheduling metadata cleaned up so they don't appear in the rendered output.

              The development check at the top means scheduled content remains visible when working locally. You can preview everything regardless of dates, but production builds respect the schedule.

              For the daily trigger, GitHub Actions provides free cron-based workflows. A simple workflow file pings a Netlify build hook every morning:

              ```yaml
              name: Scheduled Build

              on:
                schedule:
                  - cron: '0 6 * * *'
                workflow_dispatch:

              jobs:
                trigger:
                  runs-on: ubuntu-latest
                  steps:
                    - name: Trigger Netlify build
                      run: curl -X POST -d {} ${{ secrets.NETLIFY_BUILD_HOOK }}
              ```

              Netlify build hooks are URLs that trigger a deploy when called. You create one in your site settings, store it as a GitHub secret, and the workflow handles the rest. The `workflow_dispatch` trigger allows manual builds from the GitHub interface when you don't want to wait for the schedule.

              ## Using It

              Adding scheduled content is straightforward. Set `scheduledDate` in frontmatter to the date the post should go live:

              ```yaml
              ---
              title: My Scheduled Post
              scheduledDate: 2026-02-15
              layout: blog-post.njk
              ---
              ```

              When the daily build runs on February 15, 2026, or any day after, this post will be included. Before that date, it simply doesn't exist on the built site.

              For content that should be published immediately, omit `scheduledDate` entirely. The plugin ignores files without the property.

              ## Eleventy Equivalent

              The same approach works for Eleventy using computed data. In a directory data file, check `scheduledDate` and set `permalink: false` for future content:

              ```javascript
              module.exports = {
                eleventyComputed: {
                  permalink: (data) => {
                    if (shouldExclude(data)) {
                      return false;
                    }
                    return data.permalink;
                  },
                  eleventyExcludeFromCollections: (data) => {
                    return shouldExclude(data);
                  },
                },
              };

              function shouldExclude(data) {
                if (process.env.NODE_ENV === 'development') {
                  return false;
                }

                if (data.scheduledDate) {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  const scheduled = new Date(data.scheduledDate);
                  scheduled.setHours(0, 0, 0, 0);
                  return scheduled > today;
                }

                return false;
              }
              ```

              The GitHub Actions workflow remains identical because it simply triggers a build regardless of which generator you use.

              ## Scaling to Tighter Timing

              For business announcements that need to go live at a specific hour, the same architecture scales by adjusting the cron schedule. Hourly builds give you hourly precision:

              ```yaml
              on:
                schedule:
                  - cron: '0 * * * *' # Every hour on the hour
              ```

              You could extend the plugin to check times as well as dates if needed. The frontmatter might become `scheduledDate: 2026-02-15T09:00:00-05:00` to specify 9 AM Eastern. The comparison logic remains similar—parse the datetime, compare it to now, and include or exclude accordingly.

              For truly critical timing where even an hour's variance is unacceptable, a headless CMS with minute-level scheduling or a small serverless function might be more appropriate. But for many business needs, hourly builds strike a reasonable balance between precision and simplicity.

              ## Local Scheduling with macOS

              If you prefer keeping everything local without external services, macOS offers a few options for triggering builds on a schedule.

              **Lingon** (from [peterborgapps.com/lingon](https://www.peterborgapps.com/lingon/)) provides a GUI for macOS's `launchd` system. You point it at a shell script, set a schedule, and it runs reliably in the background—even when you're logged out or no apps are open. This is the closest thing to a proper cron job on macOS and the most reliable local option.

              The script itself is simple:

              ```bash
              #!/bin/zsh

              curl -X POST https://api.netlify.com/build_hooks/YOUR_HOOK_ID
              ```

              Make it executable with `chmod +x netlify-build.sh` and configure Lingon to run it on your preferred schedule.

              **Calendar** can also trigger builds if you don't want to install additional software. Calendar events can open files when they fire, so the same shell script works (**use the `.command` extension so macOS executes it in Terminal**). Create an event, add a custom alert set to "Open file," and point it at your script.

              You can enhance the script with logging and notifications:

              ```bash
              #!/bin/zsh

              LOG="$HOME/netlify-build.log"

              if curl -fsS -X POST https://api.netlify.com/build_hooks/YOUR_HOOK_ID; then
                echo "$(date): build triggered" >> "$LOG"
              else
                echo "$(date): build FAILED" >> "$LOG"
                osascript -e 'display notification "Netlify build failed" with title "Calendar Build"'
              fi
              ```

              The limitation is that Calendar must be running and your Mac awake—if your laptop is closed or asleep, the event won't fire. For casual personal use this is often fine, but it's not as dependable as Lingon or GitHub Actions.

              **Bookmarklets** offer the most portable option. Save this as a bookmark:

              ```javascript
              javascript:fetch('https://api.netlify.com/build_hooks/your-hook-id',{method:'POST'});void(0)
              ```

              One click triggers the build from any browser. This works on any device—Mac, iPad, phone—wherever you have a browser. It's manual rather than scheduled, but sometimes that's exactly what you want.

              Years ago, I used this approach after a service outage made an executive nervous about an upcoming press release. She didn't want to depend on automated systems or wait for someone else to be available at the critical moment. We added the bookmarklet to her browser, and she triggered the build herself early that morning. Sometimes the simplest solution is the most reliable one.

              None of these local approaches travel as well as GitHub Actions. If your Mac is off, asleep, or you're away with only a phone, the scheduled builds won't happen. For guaranteed daily builds regardless of circumstances, a server-side solution remains the most dependable choice. But for writers who are typically at their desk and want to avoid external dependencies, local scheduling works well.

              ## Considerations

              GitHub Actions scheduled workflows aren't guaranteed to run at exact times. If their runners are busy, your build might be a few minutes late. For daily blog publishing, this is negligible. For a product launch coordinated with a press release, you should trigger the build slightly early and let the content filtering handle the rest, or use a more reliable trigger mechanism.

              If you're working on a series of connected posts, consider keeping them in a branch until you're satisfied with all of them. Merge to main when they're ready, and let the scheduled dates roll them out. That way, your main branch doesn't contain half-finished thoughts even if they're not yet being published.

              This approach works best when you control the entire pipeline. If you're collaborating with others, make sure everyone understands that `scheduledDate` determines publication. The absence of a visible `draft` flag might confuse contributors who expect to see it.

              For business sites with compliance requirements, document the scheduling mechanism so stakeholders understand how and when content goes live. The simplicity of the approach—a date in frontmatter, a daily build—is easy to explain and audit.

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
            url: "/blog/scheduled-publishing-for-static-sites/"
            socialTitle: "Scheduled Publishing for Static Sites"
            socialComment: "Static site generators produce a frozen snapshot of your content at build time. Here is how to add scheduled publishing using a date-based plugin and automated daily builds."
---
