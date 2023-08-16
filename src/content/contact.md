---
layout: blocks.njk
bodyClasses: "blocks-page has-full-height-image contact"
pageType: page

seo:
  title: Contact | Werner Glinka
  description: "Web development for global clients, from corporates to startups. Skilled in WordPress, Drupal, and static sites. Passionate about aiding non-profits, I offer free services for non-profits."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1646849499/tgc2022/social_yitz6j.png"
  canonicalOverwrite: ""

sections:
  - container: section
    description: page banner
    containerFields:
      animateSection: false
      disabled: false
      containerId: page-banner
      containerClass: page-banner
      inContainer: false
      background:
        color: ''
        image: v1691444612/contact_hi0ofu.jpg
        isDark: false
    columns:
      - blocks:
          - name: page-banner
            blockClass: ''
            text:
              prefix: ''
              title: Contact
              header: h1
              textlength: ''
              apstyle: true
              subtitle: Drop me a line
              prose: ''

  - container: section # section || article || aside
    description: "section with contact form and info"
    containerFields:
      disabled: false
      containerId: ""
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