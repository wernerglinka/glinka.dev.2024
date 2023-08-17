---
layout: blocks.njk
bodyClasses: "blocks-page has-full-height-image home"

seo:
  title: Werner Glinka - Portfolio
  description: "Web development for global clients, from corporates to startups. Skilled in WordPress, Drupal, and Metalsmith static sites. Passionate about aiding non-profits."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1646849499/tgc2022/social_yitz6j.png"
  canonicalOverwrite: ""

sections:
  - container: section
    description: hidden page title when using a full page image banner
    containerFields:
      disabled: false
      containerId: ''
      containerClass: 'sr-only page-title'
      inContainer: false
      background:
        color: ''
        image: ''
        isDark: false
    columns:
      - column:
        blocks:
          - name: text
            blockClass: ""
            title: "Werner Glinka - Web Developer - Portfolio"
            header: "h1"
            textlength: '60'
            apstyle: true
            subtitle: ""
            prose: >-

  - container: section # section || article || aside
    description: "full page banner"
    containerFields:
      disabled: false
      containerId: "banner"
      containerClass: "banner"
      inContainer: false
      background:
        color: ""
        image: ""
        isDark: false
    columns:
      - column:
        blocks:
          - name: full-page-image
            blockClass: ""
            image: 
              src: "v1688513430/bob-dylan-mural_anzmom.jpg"
              alt: "Minneapolis Uptown"
              caption: "Photo by @tjbednar on freeImages.com"
            text:
              prefix: "My Latest Project"
              title: Minneapolis
              header: "h2"
              subtitle: "Minneapolis is a proof-of-concept project to use a WordPress backend as a Content Management System for a Metalsmith static site generator."
              prose: ""
            ctas:
              - url: "/blog/minneapolis-using-wordpress-headless-cms-metalsmith/"
                label: "Read about it here"
                isExternal: false
                isButton: false
                buttonStyle: ""
            scrollTarget: "section1" 
  
  - container: section # section || article || aside
    description: "section with about header"
    containerFields:
      disabled: false
      containerId: "section1"
      containerClass: "introduction"
      inContainer: false
      background:
        color: ""
        image: ""
        isDark: false
    columns:
      - column:
        blocks:
          - name: image
            blockClass: ""
            src: "v1690302881/walking_gdi8qg.jpg"
            alt: "walking"
            caption: ""
            fitimage: true
      - column:
        blocks:
          - name: text
            blockClass: "intro-text more-space"
            title: ""
            header: ""
            subtitle: ""
            prose: |-
              ## About
              My name is Werner Glinka. I craft high-quality websites for clients worldwide.
    columnsDirection: "" # reverse || "" (default)

  - container: article # section || article || aside
    description: "section with work overview and testimonials"
    containerFields:
      disabled: false
      containerId: "testimonials"
      containerClass: "proof"
      inContainer: false
      background:
        color: ""
        image: ""
        isDark: false
    columns:
      - column:
        blocks:
          - name: testimonials
            blockClass: "more-space"
            source: "testimonials"
            scope: "selections" # all || selections
            selections:
              - item: "247"
              - item: "1185"
              - item: "busse"
              - item: "loma"
              - item: "ltse"     
      - column:
        blocks:
          - name: tabs
            blockClass: "work"
            source: "work"
            selections:
              - item: "skills"
              - item: "clients"
              - item: "openSource"
            
    columnsDirection: "reverse" # reverse || "" (default)

  - container: section # section || article || aside
    description: "section with project header"
    containerFields:
      disabled: false
      containerId: ""
      containerClass: "introduction"
      inContainer: false
      background:
        color: ""
        image: ""
        isDark: false
    columns:
      - column:
        blocks:
          - name: image
            blockClass: ""
            src: "v1690303185/42_k7rygt.jpg"
            alt: "the ultimate answer, 42"
            caption: ""
            fitimage: true
      - column:
        blocks:
          - name: text
            blockClass: "intro-text more-space"
            title: ""
            header: ""
            subtitle: ""
            prose: |-
              ## Projects
              My open-source projects focus on structured content & user-friendly editing for static web sites.

              <a class="featured-link" href="/projects">Learn more</a>
    columnsDirection: "" # reverse || "" (default)

  - container: section # section || article || aside
    description: "section with project cards"
    containerFields:
      disabled: false
      containerId: ""
      containerClass: "projects"
      inContainer: false
      background:
        color: ""
        image: ""
        isDark: false
    columns:
      - column:
        blocks:
          - name: cards
            blockClass: ""
            source: "projects"
            scope: "selections" # all || selections
            horizontal: false
            selections:
              - item: "ruhrpott"
              - item: "mpls"
              - item: "components"   

  - container: section # section || article || aside
    description: "section with portfolio header"
    containerFields:
      disabled: false
      containerId: ""
      containerClass: "portfolio"
      inContainer: false
      background:
        color: ""
        image: ""
        isDark: false
    columns:
      - column:
        blocks:
          - name: text
            blockClass: "customers more-space"
            title: ""
            header: ""
            subtitle: ""
            prose: "<span>[24]7</span> . <span>AI&You</span> . <span class='highlight'>Busse Design</span> . <span>Code Savvy</span> . <span>Conducive</span> . <span>Coraid</span> . <span>FDAP</span> . <span>German American Artist</span> . <span class='highlight'>Goetz&Eckland</span> . <span>Instart Logic</span> . <span>Jasper</span> . <span>Kings Mountain Online</span> . <span class='highlight'>Loma Communications</span> . <span>LTSE</span> . <span>MarketTools</span> . <span>Monotyp</span>e . <span class='highlight'>Netomi</span> . <span>Paula Schaefer Law</span> . <span class='highlight'>PerimeterX</span> . <span>Peninsula Museum of Art</span> . <span>Power Reviews</span> . <span>Safebreach</span> . <span>Schuhmacher Electric</span> . <span>SkylineGroup</span> . <span>Tableau</span> . <span class='highlight'>Technovation[MN]</span> . <span>Witness</span>"
      - column:
        blocks:
          - name: text
            blockClass: "intro-text more-space"
            title: ""
            header: ""
            subtitle: ""
            prose: |-
              ## Portfolio
              A sample of websites I have build

              <a class="featured-link" href="/portfolio">See my portfolio</a>
    columnsDirection: "reverse" # reverse || "" (default)
              
  - container: section # section || article || aside
    description: "section recent blogs header"
    containerFields:
      disabled: false
      containerId: ""
      containerClass: "introduction"
      inContainer: false
      background:
        color: ""
        image: ""
        isDark: false
    columns:
      - column:
        blocks:
          - name: image
            blockClass: ""
            src: "v1690302881/one-way_zusow3.jpg"
            alt: "show me the way"
            caption: ""
            fitimage: true
      - column:
        blocks:
          - name: text
            blockClass: "intro-text more-space"
            title: ""
            header: ""
            subtitle: ""
            prose: |-
              ## Recent Blogs
              My blog is a random string of notes to myself, but who knows, someone else may benefit... No guarantees! 
              
              <a class="featured-link" href="/blog">See all blog posts</a>
    columnsDirection: "" # reverse || "" (default)

  - container: section # section || article || aside
    description: "section with recent blogposts"
    containerFields:
      disabled: false
      containerId: ""
      containerClass: "recent-blogs"
      inContainer: true
      background:
        color: ""
        image: ""
        isDark: false
    columns:
      - column:
        blocks:
          - name: recent-blogs
            blockClass: ""
            quantity: 4
            horizontal: true

  - container: section # section || article || aside
    description: "section with contact form and info"
    containerFields:
      disabled: false
      containerId: "contact"
      containerClass: "contact"
      inContainer: false
      background:
        color: ""
        image: ""
        isDark: false
    columns:
      - column:
        blocks:
          - name: contact-form
            blockClass: ""
      - column:
        blocks:
          - name: contact-info
            blockClass: ""
            copyrightOwner:
              name: "Werner Glinka"
              url: "https://glinka.co"
              tel: "650.867.0778"
              notice: "© 2023 Werner Glinka"
            socialLinks:
            - label: "LinkedIn"
              icon: linkedin
              url: "https://www.linkedin.com/in/werner-glinka-2a427/"
            - label: "Github"
              icon: github
              url: "https://github.com/wernerglinka"
---