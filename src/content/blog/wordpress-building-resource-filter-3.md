---
layout: blocks.njk
draft: false
pageType: "blog-post"
disableDefaultFooter: true
item: "wordpress-building-resource-filter-3" # used as a key for bloglist filters

seo:
  title: Building an Intuitive Resource Filter for WordPress - Part 3 | Werner Glinka
  description: "Learn how our filtering system intelligently shows only valid options. By using the current selection as a starting point, we ensure users never hit a 'No Results' message while keeping the code efficient and maintainable."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1731339901/tgc2022/blogImages/wp-resource-filters/filter-with-cup_tibfhc.jpg"
  canonicalOverwrite: ""

blogTitle: "Building an Intuitive Resource Filter for WordPress - Part 3"
date: 2024-11-04
author: ""
image:
  src: "v1731339901/tgc2022/blogImages/wp-resource-filters/filter-with-cup_tibfhc.jpg"
  alt: ""
  caption:
excerpt: "Learn how our filtering system intelligently shows only valid options. By using the current selection as a starting point, we ensure users never hit a 'No Results' message while keeping the code efficient and maintainable."

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
        image: "v1731339901/tgc2022/blogImages/wp-resource-filters/filter-with-cup_tibfhc.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Building an Intuitive Resource Filter for WordPress - Part 3"
              header: "h1"
              subtitle: ""
              prose: ""
            date: 2024-11-04

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
              In [Part 2](/blog/wordpress-building-resource-filter-2/) of this series, we discussed the filter system. In this blogpost we'll have a closer look into the presentation layer of the filter system.

              Complete files may be viewed at [GitHub](https://github.com/wernerglinka/WP-Filter-Files/tree/main)

              ## Rendering the Filter Interface

              After determining which filter options are available, we need to present these choices to our users in a clear and accessible way. Our template parts handle this presentation layer, with `filters.php` being the cornerstone of the user interface. Let's explore how we build this interface to be functional and user-friendly.

              The filters component begins with a search form that allows users to find resources by keyword.

              ```clike
                <form action="<?php echo esc_url(get_permalink()); ?>" method="get" class="keyword-search">
                  <label for="keyword-search"><?php esc_html_e('Search Keywords', 'rde01'); ?></label>
                  <div class="input-wrapper">
                      <input type="text" 
                          id="keyword-search" 
                          name="keyword-search" 
                          class="keyword-search"
                          value="<?php echo esc_attr($params['keyword-search'] ?? ''); ?>"
                          placeholder="<?php esc_attr_e('Search resources...', 'rde01'); ?>"
                      >

                    <?php
                      // Always include the nonce
                      printf(
                        '<input type="hidden" name="resources_nonce" value="%s">',
                        wp_create_nonce('resources_filter')
                      );

                      // Add hidden inputs for any active filters
                      $filter_params = array('category', 'auth', 'type', 'paged');
                      foreach ($filter_params as $param) {
                        if (!empty($params[$param])) {
                          printf(
                            '<input type="hidden" name="%s" value="%s">',
                            esc_attr($param),
                            esc_attr($params[$param])
                          );
                        }
                      }
                    ?>

                    <button type="submit" class="button inverted">
                      <?php
                        $icon_path = get_template_directory() . '/icons/search.svg';
                        if (file_exists($icon_path)) {
                          include $icon_path;
                        }
                      ?>
                      <span class="screen-reader-text">
                        <?php echo esc_html_x('Search Keywords', 'search keywords button', 'rde01'); ?>
                      </span>
                    </button>
                  </div>
              </form>
              ```

              Notice how we maintain security by including a nonce field and preserving the user's current search term by populating the input value. We also ensure proper labeling for accessibility. The form includes hidden inputs for active filters, ensuring they persist during a search.

              When displaying category filters, we need to show both the current selection and available options.

              ```clike
              <div class="categories filter-item">
                <label><?php esc_html_e('Select a category', 'rde01'); ?></label>
                <div class="current-filter-item">
                  <?php
                  if (!empty($params['category'])) {
                      $category = get_category_by_slug($params['category']);
                      echo $category ? esc_html($category->name) : esc_html__('All Categories', 'rde01');
                  } else {
                      esc_html_e('All Categories', 'rde01');
                  }
                  ?>
                </div>
                <ul class="filter-list">
                    <?php print_categories_list($categories); ?>
                </ul>
              </div>
              ```

              The `print_categories_list()` function handles the heavy lifting of displaying categories. It uses our availability data to determine which categories should be clickable.

              ```clike
              function print_categories_list($categories, $level = 0)
              {
                $current_filters = array(
                  'checking' => 'category',
                  'type' => isset($_GET['type']) ? $_GET['type'] : null,
                  'auth' => isset($_GET['auth']) ? $_GET['auth'] : null
                );
                
                $available = check_available_results(get_sub_field('resource_types'), $current_filters);

                // First, show the "All Categories" option
                if ($level === 0) {
                  $current_params = array();
                  if (isset($_GET['auth'])) {
                    $current_params['auth'] = $_GET['auth'];
                  }
                  if (isset($_GET['type'])) {
                    $current_params['type'] = $_GET['type'];
                  }
                  $url = add_query_arg($current_params, get_permalink());
                  echo '<li><a href="' . esc_url($url) . '">All Categories</a></li>';
                }

                foreach ($categories as $category) {
                  if ($category->slug !== 'uncategorized') {
                    $indent = str_repeat('&nbsp;', $level * 4);
                    
                    if (in_array($category->slug, $available['categories'])) {
                      $url = get_filtered_url(array('category' => $category->slug));
                      echo '<li>' . $indent . '<a href="' . esc_url($url) . '">' . esc_html($category->name) . '</a></li>';
                    } else {
                      echo '<li class="disabled">' . $indent . '<span>' . esc_html($category->name) . '</span></li>';
                    }

                    if (!empty($category->children)) {
                      print_categories_list($category->children, $level + 1);
                    }
                  }
                }
              }
              ```

              For authors, we follow a similar pattern but with some special handling for the author information stored in custom fields.

              ```clike
              <div class="authors filter-item">
                <label><?php esc_html_e('Select an author', 'rde01'); ?></label>
                <div class="current-filter-item">
                  <?php
                  $author_name = '';
                  if (!empty($params['auth'])) {
                      $author_name = get_field('person_name', $params['auth']);
                  }
                  echo esc_html($author_name ?: __('All Authors', 'rde01'));
                  ?>
                </div>
                <ul class="filter-list">
                  <?php print_authors_list($authors); ?>
                </ul>
              </div>
              ```

              The type filter rounds out our filtering interface, showing the different content types available.

              ```clike
              <div class="types filter-item">
                <label><?php esc_html_e('Filter by type', 'rde01'); ?></label>
                <div class="current-filter-item">
                  <?php
                  if (!empty($params['type'])) {
                    $post_type_obj = get_post_type_object($params['type']);
                    echo $post_type_obj ? esc_html($post_type_obj->labels->name) : esc_html__('Unknown Type', 'rde01');
                  } else {
                    esc_html_e('All Types', 'rde01');
                  }
                  ?>
                </div>
                <ul class="filter-list">
                  <?php print_types_list($selected_types); ?>
                </ul>
              </div>
              ```

              Finally, we provide a way to clear all active filters.

              ```clike
              <?php if (!empty($params['category']) || !empty($params['auth']) || !empty($params['keyword-search']) || !empty($params['type'])): ?>
                <div class="clear-filters">
                  <a href="<?php echo esc_url(get_permalink()); ?>" class="button">
                    <?php esc_html_e('Clear Filters', 'rde01'); ?>
                  </a>
                </div>
              <?php endif; ?>
              ```

              This interface design follows several principles:
              - It always shows the current state of the filters
              - It turns off options that would lead to no results
              - It maintains all active filters when applying a new one
              - It provides clear visual feedback about what's selected
              - It includes proper accessibility attributes

              In our [next article](/blog/wordpress-building-resource-filter-4/), we'll explore how we display the filtered results and handle pagination for large result sets.

              Complete files may be viewed at [GitHub](https://github.com/wernerglinka/WP-Filter-Files/tree/main)

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
              - item: "wordpress-building-resource-filter-4"
              - item: "wordpress-building-resource-filter-5"
---
