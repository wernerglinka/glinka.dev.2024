---
layout: blocks.njk
pageType: "blog-post"
disableDefaultFooter: true
item: "wordpress-static-website" # used as a key for bloglist filters

seo:
  title: Who needs a WordPress website? | Werner Glinka
  description: "Most contractors use WordPress sites but rarely update them, leading to security issues. Static websites could be a better fit, offering speed, security, low maintenance, and ease of content updates."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1645206748/tgc2022/blogImages/wordpress-static-website/contractors_ksplcd.jpg"
  canonicalOverwrite: ""

blogTitle: "Who needs a WordPress website?"
date: 2018-03-15
author: ""
image:
  src: "v1645206748/tgc2022/blogImages/wordpress-static-website/contractors_ksplcd.jpg"
  alt: ""
  caption:
excerpt: "Most contractors use WordPress sites but rarely update them, leading to security issues. Static websites could be a better fit, offering speed, security, low maintenance, and ease of content updates."

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
        image: "v1645206748/tgc2022/blogImages/wordpress-static-website/contractors_ksplcd.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Who needs a WordPress website?"
              header: "h1"
              subtitle: "Sometimes a static website will do just fine"
              prose: ""
            date: 2018-03-15

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
              I recently finished a major renovation project on my house. During that time, I had the opportunity to speak to many contractors about their websites. I had visited their sites during the hiring process and noticed that almost all of them were built using WordPress.

              I had to ask why. Turns out the majority had no idea why they used WordPress. In many cases a friend or somebody else they knew recommended WordPress because it was so easy to use — they could update content themselves. When I asked how often they do actually update their sites, most said never. If they did need an update, they said they would hire somebody they know to do it for them.      

              That set me on a quest to learn more about this issue. I found that mid-sized businesses often do have WordPress sites for the reasons outlined above, but they almost never update the site themselves. They have neither the manpower nor the expertise, and the backend work intimidates many. Hell breaks loose when their site gets delisted from Google because it has been hacked and is silently serving porn or “pills from Canada” emails.

              So they hire a firm to maintain the site… figures.

              Many of these websites are pure brochure sites, so there really is no need for a database or a server site language.

              So why do agencies sell WordPress sites to these small/medium sized businesses? Because they can and it is so easy to build one. Install WP in five minutes, get a nice looking template and voila… instant website. Only a minimum of website-building expertise is needed. If you know how to wield a hammer, everything will start to look like a nail…

              At the end of this VERY informal survey I had anecdotal evidence that most of these businesses would benefit from a static website, which offers:

              - No periodic plugin or security updates
              - No special hosting requirements
              - Faster response
              - More secure site
              
              Content would continue to be updated by a third party, so that would not change. By implementing a static site, these businesses would save money while having a faster and safer website.

              Building static websites sounds so very 1980s. Basically these sites consist of HTML, CSS and JavaScript files stored on a server, that’s all. Given today’s wealth of building tools, a static website can be built for a cost similar to that of a WP site, only with a much lower maintenance cost. And if you like to blog, a static site works for that, too.

              I will explore this subject further. I have built several static sites using Metalsmith, Gulp and other JavaScript-based frontend tools. While I believe there is a place for a CMS-based website, many smaller businesses may be well served with a static solution.

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
              - item: "developer-fatique" 

---