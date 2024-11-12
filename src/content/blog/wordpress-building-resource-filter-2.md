---
layout: blocks.njk
draft: false
pageType: "blog-post"
disableDefaultFooter: true
item: "wordpress-building-resource-filter-2" # used as a key for bloglist filters

seo:
  title: Building an Intuitive Resource Filter for WordPress - Part 2 | Werner Glinka
  description: "Discover how to organize a complex WordPress filtering system. We'll explore the template structure, caching for performance, and how the code organization reflects user interactions while maintaining developer-friendly architecture."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1731339901/tgc2022/blogImages/wp-resource-filters/filters2_rlzdmi.jpg"
  canonicalOverwrite: ""

blogTitle: "Building an Intuitive Resource Filter for WordPress - Part 2"
date: 2024-11-02
author: ""
image:
  src: "v1731339901/tgc2022/blogImages/wp-resource-filters/filters2_rlzdmi.jpg"
  alt: ""
  caption:
excerpt: "Discover how to organize a complex WordPress filtering system. We'll explore the template structure, caching for performance, and how the code organization reflects user interactions while maintaining developer-friendly architecture."

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
        image: "v1731339901/tgc2022/blogImages/wp-resource-filters/filters2_rlzdmi.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Building an Intuitive Resource Filter for WordPress - Part 2"
              header: "h1"
              subtitle: ""
              prose: ""
            date: 2024-11-02

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
              In [Part 1](/blog/wordpress-building-resource-filter-1/) of this series, we discussed the main template, `resources.php`. In this blogpost we'll have a closer look into the filtering system that allows users to narrow down their search.

              Complete files may be viewed at [GitHub](https://github.com/wernerglinka/WP-Filter-Files/tree/main)

              ## Understanding the Filtering Logic

              When users browse content, they expect filters to work intuitively. Selecting one filter should automatically update which options make sense in other filters. For example, if users select _Blog Posts_ as a type, they should only see categories and authors with blog posts. Our `check_available_results()` function makes this possible by determining which filter options should be available based on the current selection.

              The core of our filtering system lives in the `check_available_results()` function. It accepts two parameters: the allowed post types and the current filters that have been applied. Here's how it begins:

              ```php
              function check_available_results($selected_types, $current_filters)
              {
                $cache_key = 'available_results_' . md5(serialize($selected_types) . serialize($current_filters));
                $available = wp_cache_get($cache_key);

                if (false === $available) {
                  $available = array(
                    'types' => array(),
                    'authors' => array(),
                    'categories' => array()
                );

                  $base_args = array(
                    'post_status' => 'publish',
                    'posts_per_page' => -1,
                    'fields' => 'ids'
                  );
              ```

              The function starts by checking if we've already calculated the available options for this particular combination of filters. This caching mechanism is essential because calculating available options requires several database queries. If we've seen this combination before, we can return the cached result instead of recalculating everything.

              When someone applies a filter, we need to know what other filter options remain valid. To do this, we apply all current filters except the one we're checking.

              Understanding how we determine available options is key to this filtering system. When users make selections, we know their current choice must be valid—otherwise, they could not have selected it. Using this valid selection as our starting point, we only need to find what options are valid for their next choice.

              Here's how that works:

              ```php
              if (!empty($current_filters['category']) && 
                isset($current_filters['checking']) && 
                $current_filters['checking'] !== 'category') {
                $base_args['tax_query'] = array(
                  array(
                    'taxonomy' => 'category',
                    'field' => 'slug',
                    'terms' => $current_filters['category']
                  )
                );
              }

              if (!empty($current_filters['auth']) && 
                isset($current_filters['checking']) && 
                $current_filters['checking'] !== 'author') {
                $base_args['meta_query'] = array(
                  array(
                    'key' => 'authored_by',
                    'value' => serialize(strval($current_filters['auth'])),
                    'compare' => 'LIKE'
                    )
                );
              }
              ```

              Let's say a user selected _Blog Posts_ as their content type. Since they could select it, we know blog posts exist in our system. When they want to see available categories, we only need to look within blog posts to find which categories are used. If they then select the _Technology_ category, we know both _Blog Posts_ and _Technology_ are a valid combination. To show them, available authors, we simply look for authors who have written blog posts in the _Technology_ category.

              This approach follows the user's natural selection path. Each valid choice helps narrow down the next set of valid options.

              ```php
              if (!isset($current_filters['checking']) || 
                $current_filters['checking'] === 'type') {
                foreach ($selected_types as $post_type) {
                  $type_posts = array_filter($filtered_posts, function($post) use ($post_type) {
                    return get_post_type($post) === $post_type;
                  });
                  
                  if (!empty($type_posts)) {
                    $available['types'][] = $post_type;
                  }
                }
              }
              ```

              For categories, we examine each post that matches our current filters and collect all unique categories they belong to:

              ```php
              if (!isset($current_filters['checking']) || 
                $current_filters['checking'] === 'category') {
                foreach ($filtered_posts as $post_id) {
                  $post_categories = wp_get_post_categories($post_id, array('fields' => 'all'));
                  foreach ($post_categories as $category) {
                    if ($category->slug !== 'uncategorized' && 
                      !in_array($category->slug, $available['categories'])) {
                      $available['categories'][] = $category->slug;
                    }
                  }
                }
              }
              ```

              Finally, we do the same for authors, checking who has authored the content that matches our current filters:


              ```php
              if (!isset($current_filters['checking']) || $current_filters['checking'] === 'author') {
                foreach ($filtered_posts as $post_id) {
                  $author_objects = get_field('authored_by', $post_id);
                  if (is_array($author_objects)) {
                    foreach ($author_objects as $author) {
                      if (is_object($author) && isset($author->ID)) {
                        if (!in_array($author->ID, $available['authors'])) {
                            $available['authors'][] = $author->ID;
                        }
                      }
                    }
                  }
                }
              }
              ```

              After collecting all available options, we cache the results for future use. This means the next time someone applies the same combination of filters, we can return the results instantly without querying the database again.

              This filtering system creates a smooth user experience by automatically disabling impossible combinations. If no blog posts are in the _Technology_ category, the option will be grayed out when _Blog Posts_ is selected as the type. Similarly, if an author has never written a case study, their name will be disabled when _Case Studies_ is chosen as the type.

              In our [next article](/blog/wordpress-building-resource-filter-3/), we'll explore how these options are displayed in the user interface and how we handle the interaction between different types of filters.

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
              - item: "wordpress-building-resource-filter-3"
              - item: "wordpress-building-resource-filter-4"
              - item: "wordpress-building-resource-filter-5"
---
