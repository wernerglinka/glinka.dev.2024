---
layout: blocks.njk
pageType: "blog-post"
disableDefaultFooter: true
item: "wordpress-building-resource-filter-4" # used as a key for bloglist filters

seo:
  title: Building an Intuitive Resource Filter for WordPress - Part 4 | Werner Glinka
  description: "Explore how we present filtered resources with proper pagination. From accessible card layouts to smooth navigation between pages, see how the display system handles both small and large result sets effectively."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1731350277/tgc2022/blogImages/wp-resource-filters/filter-with-cups_nzwthi.jpg"
  canonicalOverwrite: ""

blogTitle: "Building an Intuitive Resource Filter for WordPress - Part 4"
date: 2024-11-06
author: ""
image:
  src: "v1731350277/tgc2022/blogImages/wp-resource-filters/filter-with-cups_nzwthi.jpg"
  alt: ""
  caption:
excerpt: "Explore how we present filtered resources with proper pagination. From accessible card layouts to smooth navigation between pages, see how the display system handles both small and large result sets effectively."

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
        image: "v1731350277/tgc2022/blogImages/wp-resource-filters/filter-with-cups_nzwthi.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Building an Intuitive Resource Filter for WordPress - Part 4"
              header: "h1"
              subtitle: ""
              prose: ""
            date: 2024-11-06

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
              In [Part 3](/blog/wordpress-building-resource-filter-3/) of this series, we discussed the presentation layer of the filter system. In this blogpost we'll examine how to present the results.

              Complete files may be viewed at [GitHub](https://github.com/wernerglinka/WP-Filter-Files/tree/main)

              ## Building the Results Display

              When users filter their content, it becomes crucial to present the results clearly and manage large result sets effectively. Our `results.php` template handles this presentation, working with individual resource cards to create a cohesive display system.

              The results section begins by showing users exactly what they're looking at.

              ```php
              <div class="results-count">
                <?php
                $total_results = $query->found_posts;
                $start_count = (($paged - 1) * RESOURCES_PER_PAGE) + 1;
                $end_count = min($start_count + RESOURCES_PER_PAGE - 1, $total_results);

                printf(
                    esc_html__('Showing %1$s-%2$s of %3$s resources', 'rde01'),
                    number_format_i18n($start_count),
                    number_format_i18n($end_count),
                    number_format_i18n($total_results)
                );
                ?>
              </div>
              ```

              This counter tells users exactly where they are in the result set. For example, _Showing 1-10 of 42 resources_. Notice how we use `number_format_i18n()` to ensure numbers are formatted according to the user's locale settings.

              The resource list itself is straightforward but includes important accessibility considerations

              ```php
              <ul class="resources-list">
                <?php if ($query->have_posts()): ?>
                  <?php while ($query->have_posts()):
                    $query->the_post(); 
                    get_template_part('inc/resources/card');
                  endwhile; ?>
                  <?php wp_reset_postdata(); ?>
                <?php else: ?>
                  <li class="no-results">
                    <?php esc_html_e('No resources found.', 'rde01'); ?>
                  </li>
                <?php endif; ?>
              </ul>
              ```

              Each resource is displayed using a card template. Let's look at how individual cards present our content.

              ```php
              <li <?php post_class('resource-card-wrapper'); ?>>
                <article class="resource-card">
                  <?php if ($card_type): ?>
                  <div class="resource-type">
                    <?php echo $card_type; ?>
                  </div>
                  <?php endif; ?>

                  <?php if (has_post_thumbnail()): ?>
                  <div class="card-thumbnail">
                    <a href="<?php echo esc_url(get_permalink()); ?>" 
                      aria-hidden="true" tabindex="-1">
                        <?php 
                        the_post_thumbnail('medium', array(
                          'alt' => get_the_title()
                        )); 
                        ?>
                    </a>
                  </div>
                  <?php endif; ?>

                  <div class="card-content">
                    <header class="card-header">
                      <h3 class="card-title">
                        <a href="<?php echo esc_url(get_permalink()); ?>">
                          <?php echo $truncated_title; ?>
                        </a>
                      </h3>
                    </header>

                    <?php if (!empty($author_names)): ?>
                    <div class="author">
                      <span class="screen-reader-text">
                        <?php esc_html_e('Authors:', 'rde01'); ?>
                      </span>
                      <?php echo esc_html(implode(', ', $author_names)); ?>
                    </div>
                    <?php endif; ?>

                    <time class="published" datetime="<?php echo esc_attr($machine_date); ?>">
                      <span class="screen-reader-text">
                        <?php esc_html_e('Published on:', 'rde01'); ?>
                      </span>
                      <?php echo esc_html($date); ?>
                    </time>
                  </div>
                </article>
              </li>
              ``` 

              Each card presents a consistent structure with the resource type, thumbnail, title, authors, and publication date. Notice the careful attention to accessibility with proper ARIA attributes and screen reader text.

              ### Pagination

              For larger result sets, pagination becomes essential. Our pagination system provides comprehensive navigation options:

              ```php
              <?php if ($query->max_num_pages > 1): ?>
                <nav class="pagination" aria-label="<?php esc_attr_e('Resources navigation', 'rde01'); ?>">
                  <div class="pagination-links">
                    <?php
                    // Previous page
                    if ($paged > 1) {
                      $prev_link = get_filtered_url(array('paged' => $paged - 1));
                      printf( '<a href="%s" class="prev page-numbers">%s</a>', esc_url($prev_link), esc_html__('Previous', 'rde01') );
                    }

                    // Page numbers
                    $total_pages = $query->max_num_pages;
                    $current_page = $paged;

                    // Start pages
                    for ($i = 1; $i <= min(PAGINATION_END_SIZE, $total_pages); $i++) {
                      $link = get_filtered_url(array('paged' => $i));
                      printf( '<a href="%s" class="page-numbers%s">%s</a>', esc_url($link), $current_page === $i ? ' current' : '', number_format_i18n($i) );
                    }

                    // Middle pages
                    for ($i = max(PAGINATION_END_SIZE + 1, $current_page - PAGINATION_MID_SIZE); $i <= min($current_page + PAGINATION_MID_SIZE, $total_pages - PAGINATION_END_SIZE); $i++) {
                      if ($i > PAGINATION_END_SIZE && $i < $current_page - PAGINATION_MID_SIZE) {
                        echo '<span class="page-numbers dots">&hellip;</span>';
                        $i = $current_page - PAGINATION_MID_SIZE;
                        continue;
                      }
                      $link = get_filtered_url(array('paged' => $i));
                      printf( '<a href="%s" class="page-numbers%s">%s</a>', esc_url($link), $current_page === $i ? ' current' : '', number_format_i18n($i) );
                    }

                    // End pages
                    for ($i = max($total_pages - PAGINATION_END_SIZE + 1, $current_page + PAGINATION_MID_SIZE + 1);
                      $i <= $total_pages;
                      $i++) {
                      if ($i < $total_pages - PAGINATION_END_SIZE && $i > $current_page + PAGINATION_MID_SIZE) {
                        echo '<span class="page-numbers dots">&hellip;</span>';
                        $i = $total_pages - PAGINATION_END_SIZE;
                        continue;
                      }
                      $link = get_filtered_url(array('paged' => $i));
                      printf( '<a href="%s" class="page-numbers%s">%s</a>', esc_url($link), $current_page === $i ? ' current' : '', number_format_i18n($i) );
                    }

                    // Next page
                    if ($paged < $query->max_num_pages) {
                      $next_link = get_filtered_url(array('paged' => $paged + 1));
                      printf( '<a href="%s" class="next page-numbers">%s</a>', esc_url($next_link), esc_html__('Next', 'rde01') );
                    }
                    ?>
                  </div>
                </nav>
              <?php endif; ?>
              ```

              The pagination system displays:

              - Previous and Next links when appropriate
              - A set number of pages at the start and end
              - The current page and a few pages around it
              - Ellipses to indicate skipped page numbers
              - All while maintaining any active filters

              Most importantly, all links in the pagination maintain the current filter state using our `get_filtered_url()` function. This ensures users keep their filter state when moving between pages.

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
            url: "/blog/wordpress-building-resource-filter-4"
            socialTitle: "Building an Intuitive Resource Filter for WordPress - Part 4"
            socialComment: "Explore how we present filtered resources with proper pagination. From accessible card layouts to smooth navigation between pages, see how the display system handles both small and large result sets effectively."


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
              - item: "wordpress-building-resource-filter-1"
              - item: "wordpress-building-resource-filter-2"
              - item: "wordpress-building-resource-filter-3"
              - item: "wordpress-building-resource-filter-5"
---
