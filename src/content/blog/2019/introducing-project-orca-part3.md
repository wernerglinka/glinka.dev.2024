---
layout: blocks.njk
pageType: "blog-post"
disableDefaultFooter: true
item: "introducing-project-orca-part3" # used as a key for bloglist filters

seo:
  title: Introducing Project Orca - Part 3 | Werner Glinka
  description: "Nunjucks, a JavaScript-based templating engine, is used in Project ORCA. Offering features such as variables, loops, conditionals, block inheritance, includes, and macros."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1645224098/tgc2022/blogImages/orca1/orca_ahjaat.jpg"
  canonicalOverwrite: ""

blogTitle: "Introducing Project Orca - Part 3"
date: 2019-01-18
author: ""
image:
  src: "v1645224098/tgc2022/blogImages/orca1/orca_ahjaat.jpg"
  alt: ""
  caption:
excerpt: |-
  "Nunjucks, a JavaScript-based templating engine, is used in Project ORCA. Offering features such as variables, loops, conditionals, block inheritance, includes, and macros."

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
        image: "v1645224098/tgc2022/blogImages/orca1/orca_ahjaat.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Introducing Project Orca"
              header: "h1"
              subtitle: "Part 3"
              prose: ""
            date: 2019-01-18

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
              In the initial installment, [Introducing Project Orca - Part 1](/blog/introducing-project-orca-part1/), I outlined the circumstances under which a static website would be the right choice, and also furnished a succinct summary of the Metalsmith static site generator. In the follow-up post, [Introducing Project Orca - Part 2](/blog/introducing-project-orca-part2/), I elucidated the workings of Metalsmith.

              In today's entry, I aim to give you a brief initiation to the [templating engine](https://en.wikipedia.org/wiki/Web_template_system) deployed in Project ORCA.

              I was on the lookout for a templating engine grounded in JavaScript and favoring a [Twig](https://twig.symfony.com/doc/2.x/tags/if.html) like syntax, and that's when I stumbled upon [Nunjucks](https://mozilla.github.io/nunjucks/). Interestingly, both these engines share a common predecessor, [Jinja](https://jinja.palletsprojects.com/en/3.0.x/), which in turn drew its inspiration from [Django’s](https://www.djangoproject.com/) templates. (For those unfamiliar, Django is a high-level Python Web framework). Mozilla is responsible for the maintenance of Nunjucks.

              Nunjucks operates as a token-based templating system, with built-in support for variables, loops, and conditionals. It extends its functionality to encompass advanced page composition with features such as block inheritance, includes, layout inheritance, custom tags, and macros. You can dive into the detailed Nunjucks documentation [here](https://mozilla.github.io/nunjucks/api.html).

              To help you visualize, here's an example of a Nunjucks template:

              ```html
              <!doctype html>
              <html lang="en" itemscope="" itemtype="”http://schema.org/Article”">
                <head>
                  {% include "head.html" %}
                </head>

                <body id="onTop" class="{{ body_classes }} isLoading">
                  {% include "browser-upgrade.html" %}

                  <div class="container">
                    <div class="has-columns cf">
                      <section class="main">
                        {% if title %}
                        <h1 class="page-title">{{ title }}</h1>
                        {% endif %}
                        <ul class="blog-list-vertical list-unstyled">
                          {% for blogpost in pagination.files %}            
                          <li class="cf">
                            <a href="/{{ blogpost.path | makePermalink }}">
                              <div class="blog-list-vertical__img" style="background-image: url({{ blogpost.tn }})"></div>
                            </a>
                            <div class="blog-info">
                              <a href="/{{ blogpost.path | makePermalink }}"><h2>{{ blogpost.title }}</h2></a>
                              <p>
                                by {% for index, author in blogpost.blogAuthors %}{{ author.title }}{% if not loop.last %}, {% endif %}{% endfor %}
                                <br>on {{ blogpost.date | dateFilter("MMMM D, YYYY") }}
                              </p>
                            </div>
                          </li>       
                          {% endfor %}
                        </ul>

                        {% include "pager.html" %}

                        </section>
                        <aside class="sidebar">
                          <h3>Blog Categories:</h3>
                          {% include "categories-list.html" %}

                          <h3>Tags</h3>
                          {% include "tags-list.html" %}

                          <h3>Featured Posts</h3>
                          <ul class="blog-list-overview">
                            {% for featuredBlogPost in featuredBlogPosts %}
                            <li>
                              <ul class="list-unstyled">
                                <li class="blog-post-title"><a href="/{{ featuredBlogPost.path }}/">{{ featuredBlogPost.title }}</a></li>
                                <li><a class="read-more-link" href="/{{ featuredBlogPost.path }}/">Read it <span>»</span></a></li>
                              </ul>
                            </li>
                            {% endfor %}
                          </ul>
                        </aside>
                      </div>
                    </div>

                    {% block footer %}
                    {% include "footer.html" %}
                    {% endblock %}

                    <a id="toTopButton" href="#onTop"><i class="icon icon-arrow-up"></i></a>
                
                    {% block body_scripts %}
                    {% include "scripts.html" %}
                    {% endblock %}
                  </div>
                </body>
              </html>
              ```

              This example uses various features of Nunjucks and many act very similar to their Javascript cousins.

              ### Variables
              This example shows a variable `body_classes` being added to a static class `isLoading`.

              ```html
              <body id="onTop" class="{{ body_classes }} isLoading"> ... </body>
              ```

              ### include

              `include` imports other templates in place. This allows the use of common page elements. For example:

              ```html
              <head>
                  {% include "head.html" %}
              </head>
              ```

              ### if
              `if` allows conditional rendering like the example below:

              ```html
              {% if title %}
                  <h1 class="page-title">{{ title }}</h1>
              {% endif %}
              ```

              ### for
              `for` allows to iterate over arrays and objects. In the example below I create all list items by iterating over an object called `featuredBlogPosts`.

              ```html
              <ul class="blog-list-overview">
                  {% for featuredBlogPost in featuredBlogPosts %}
                  <li>
                      <ul class="list-unstyled">
                      <li class="blog-post-title"><a href="/{{ featuredBlogPost.path }}/">{{ featuredBlogPost.title }}</a></li>
                      <li><a class="read-more-link" href="/{{ featuredBlogPost.path }}/">Read it <span>»</span></a></li>
                      </ul>
                  </li>
                  {% endfor %}
              </ul>
              ```

              ### Filters
              From the Nunjucks Docs: "_Filters are essentially functions that can be applied to variables. They are called with a pipe operator (|) and can take arguments._". In the example below the path to a blogpost is transformed into a permalink with the filter function `makePermalink`.

              ```html
              <a href="/{{ blogpost.path | makePermalink }}"><h2>{{ blogpost.title }}</h2></a>
              ```

              ### Template Inheritance
              Again from the Nunjucks docs: "_Template inheritance is a way to make it easy to reuse templates. When writing a template, you can define "blocks" that child templates can override._". 
              
              In the following illustration, I define a block labeled `footer` and subsequently include `footer.html`. Consequently, any template that extends from this primary template can now enhance or replace the content within this block.

              ```html
              {% block footer %}
                  {% include "footer.html" %}
              {% endblock %}
              ```

              For a thorough understanding of Nunjucks, you can refer to the complete documentation [here](https://mozilla.github.io/nunjucks/templating.html). Additionally, I'd suggest taking a look at [Chris Coyier's](https://chriscoyier.net/) article, [Building A Static Site With Components Using Nunjucks](https://www.smashingmagazine.com/2018/03/static-site-with-nunjucks/), published on the Smashing Magazine website, for his unique perspective on how to effectively use Nunjucks.

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
              - item: "conscious-uncoupling-drupal-metalsmith"
              - item: "introducing-project-orca-part1"
              - item: "introducing-project-orca-part2"
              - item: "metalsmith-layouts-nunjucks"

---