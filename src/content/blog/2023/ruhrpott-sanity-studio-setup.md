---
layout: blocks.njk
pageType: "blog-post"
disableDefaultFooter: true
item: "ruhrpott-sanity-studio-setup" # used as a key for bloglist filters

seo:
  title: "Ruhrpott - Ruhrpott's studio setup | Werner Glinka"
  description: "In this blogpost we will discussing sanity studio setup for the Ruhrpott website. Ruhrpott is a website built with Metalsmith and sanity provides the content."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1681233430/sanity-studio_vtwzvw.jpg"
  canonicalOverwrite: ""

blogTitle: "Ruhrpott - Sanity studio setup"
date: 2023-01-14
author: ""
image:
  src: "v1690749428/ruhrpott-3_mjxmng.jpg"
  alt: ""
  caption:
excerpt: "In this blogpost we will discussing sanity studio setup for the Ruhrpott website. Ruhrpott is a website built with Metalsmith and sanity provides the content."

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
        image: "v1690749428/ruhrpott-3_mjxmng.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Ruhrpott - Sanity studio setup"
              header: "h1"
              subtitle: ""
              prose: ""
            date: 2023-01-14

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
              We are using Sanity Studio v3 for the Ruhrpott website. Before you read this blogpost, I'd recommend reading the [Getting Started](https://www.sanity.io/docs/create-a-schema-and-configure-sanity-studio) section on [sanity.io](https://www.sanity.io/).

              ## Studio Configuration
              
              The complete studio configuration for the Ruhrpott project, sanity.config.jsx, is shown below. Please read the [Sanity Studio Configuration](https://www.sanity.io/docs/configuration) docs for a thorough explanation. Note the file extension .jsx. This is necessary since we define some jsx in this file.

              ```javascript
              import { defineConfig } from 'sanity';
              import { deskTool } from 'sanity/desk';
              import { ruhrpottStructure } from './deskStructure';
              import { schemaTypes } from './schemas';
              import { codeInput } from '@sanity/code-input';
              import { dashboardTool } from "@sanity/dashboard";
              import { netlifyWidget } from "sanity-plugin-dashboard-widget-netlify";
              import {Card, Text} from '@sanity/ui';
              import { useLayoutEffect } from 'react';
              import { FiHome } from 'react-icons/fi';

              const returnHomeTool = () => {
                return {
                  title: 'Return Home',
                  name: 'home', // localhost:3333/my-custom-tool
                  icon: FiHome,
                  component: (props) => {
                    useLayoutEffect(() => {
                      window.location.href = 'https://ruhrpott.netlify.app';
                    }, [])
                    return (
                    <Card padding={4}>
                      <Text>Returning Home</Text>
                    </Card>
                  )},
                }
              }

              export default defineConfig({
                name: 'default',
                title: 'ruhrpott-studio',
                projectId: '<Sanity Project ID',
                dataset: 'production',
                plugins: [
                  deskTool({
                    structure: ruhrpottStructure,
                  }),
                  codeInput(),
                  dashboardTool({
                    widgets: [
                      netlifyWidget({
                          title: 'Sanity Netlify deploys',
                          sites: [
                            {
                              title: 'Website',
                              apiId: '<Netlify App ID>',
                              buildHookId: '<Netlify Build Hook ID>',
                              name: 'ruhrpott-sanity-website',
                              url: 'https://ruhrpott.netlify.app/',
                            }
                          ]
                      })
                    ]
                  }),

                ],
                tools: [returnHomeTool()],
                schema: {
                  types: schemaTypes,
                },
              });
              ```

              Here we import the user UI structure from deskStructure.js and the content schemas. We also add the [Netlify deploy widge](https://www.sanity.io/plugins/sanity-plugin-dashboard-widget-netlify)t to the [Dashboard](https://www.sanity.io/docs/dashboard-overview). With it, we can trigger a site rebuild directly from the studio dashboard. This little trick is necessary since we are using an iframe to show the studio at /admin of the Ruhrpott site.

              ## Studio UI
              
              We are using various content types for this website.

              - Settings
              - Data sources for sections on pages
              - Pages
              
              ### Settings

              We use two setting files, one for global site settings and one to define the site navigation. Both are singleton content types, meaning a content type for non-repeatable data. Unlike a content type for blogposts, which is used to create many blogpost files, we'll need only one file for the site navigation. Note that there is no edit icon next to **Setting Documents**.

              ![](https://res.cloudinary.com/glinkaco/image/upload/w_1800,f_auto/v1681233430/studio1_vywzjt.png)

              ## Data sources for sections on pages

              We use content types to define content for Ruhrpott Football clubs, cities, and also for blog authors. This data will be used to build page sections. Note the edit icon next to **All Authors**. Clicking the icon will create a new empty author file.

              ![](https://res.cloudinary.com/glinkaco/image/upload/w_1800,f_auto/v1681233430/studio2_hxjqkt.png)

              ## Pages

              There are two content types to build pages, **pages** and **blogposts**. These content types define a page, its metadata, and the various sections used to compose the page body. Note the edit icon next to **Blog Posts**. Clicking the icon will create a new empty blogpost file.

              ![](https://res.cloudinary.com/glinkaco/image/upload/w_1800,f_auto/v1681233430/studio3_htxscn.png)

              The studio UI shown above is defined with the Structure Builder API. Its definition can be found in the file `deskStructure.js`. Please read [Introduction to Structure Builder](https://www.sanity.io/docs/structure-builder-introduction) for a thorough explanation of this subject.

              ```javascript
              import {FiSettings, FiMenu, FiUsers, FiGlobe, FiDribbble, FiTool} from "react-icons/fi";

              export const ruhrpottStructure = (S) =>
                S.list()
                  .title('Root')
                  .items([
                    // Add the settings documents first
                    S.listItem()
                      .title('Settings')
                      .icon(FiTool)
                      .child(
                        S.list()
                        .title('Setting Documents')
                        .items([
                          S.listItem()
                            .title('Site Settings')
                            .icon(FiSettings)
                            .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
                          S.listItem()
                            .title('Navigation')
                            .icon(FiMenu)
                            .child(S.document().schemaType('navigation').documentId('navigation')),
                        ])
                      ),
                    S.divider(),
                    // add the data content types second
                    S.listItem().title('Authors').icon(FiUsers).child(
                      // Create a list of all authors
                      S.documentList().title('All Authors').filter('_type == "authors"')
                    ),
                    S.listItem().title('Ruhrpott Cities').icon(FiGlobe).child(
                      // Create a list of all posts
                      S.documentList().title('All Ruhrpott Cities').filter('_type == "cities"')
                    ),
                    S.listItem().title('Football Clubs').icon(FiDribbble).child(
                      // Create a list of all football clubs
                      S.documentList().title('All Football Clubs').filter('_type == "footballClubs"')
                    ),
                    S.divider(),
                    // Remove all singletons and previously defined list items from the main list
                    // at this point, only blog posts and pages remain to be listed
                    ...S.documentTypeListItems().filter(
                      (listItem) => !['siteSettings','navigation','authors','cities','footballClubs' ].includes(listItem.getId())
                    ),
                  ]);
              ```

              ## Schemas

              Schemas describe the site content. They are written in plain javascript. You can learn all about them [here](https://www.sanity.io/docs/schemas-and-forms).

              For the Ruhrpott project, I organize them into category folders: `contentTypes`, `pageSections`, `sectionBlocks`, and `elements`. They are combined in an index file and imported into `sanity.config.jsx`.
  
           
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
              - item: "ruhrpott-it-starts-with-metalsmith"
              - item: "ruhrpott-metalsmith-sanity-match-just-right"
              - item: "ruhrpott-metalsmith-sanity-source-plugin"
              - item: "ruhrpott-structured-content-sanity"  

---