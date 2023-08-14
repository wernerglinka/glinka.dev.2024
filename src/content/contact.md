---
layout: blocks.njk
bodyClasses: "blocks-page has-full-height-image contact"
pageType: page

seo:
  title: Contact | Werner Glinka
  description: "I specialize in working with a diverse range of clients, from established corporate entities to new startups, globally. My expertise encompasses building static websites and popular content management systems such as WordPress, Drupal and others. I am passionate about supporting non-profit organizations and offer pro bono website development services. If you know any non-profits that could benefit from a website, please encourage them to reach out to me."
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