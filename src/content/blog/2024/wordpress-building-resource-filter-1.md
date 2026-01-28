---
layout: blocks.njk
draft: false
pageType: "blog-post"
disableDefaultFooter: true
item: "wordpress-building-resource-filter-1" # used as a key for bloglist filters

seo:
  title: Building an Intuitive Resource Filter for WordPress - Part 1 | Werner Glinka
  description: "This filter implementation safely handles user input, efficiently manages database queries through caching, and organizes the display code logically through template parts while avoiding the dreaded 'No Resources Found' message. Instead of letting users select filter combinations that would yield no results, it intelligently turns off invalid filter options."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1731284817/tgc2022/blogImages/wp-resource-filters/filters_vmprhk.jpg"
  canonicalOverwrite: ""

blogTitle: "Building an Intuitive Resource Filter for WordPress - Part 1"
date: 2024-11-01
author: ""
image:
  src: "v1731284817/tgc2022/blogImages/wp-resource-filters/filters_vmprhk.jpg"
  alt: ""
  caption:
excerpt: "This filter implementation avoids the dreaded 'No Resources Found' message. Instead of letting users select filter combinations that would yield no results, it intelligently turns off invalid filter options."

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
        image: "v1731284817/tgc2022/blogImages/wp-resource-filters/filters_vmprhk.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Building an Intuitive Resource Filter for WordPress - Part 1"
              header: "h1"
              subtitle: ""
              prose: ""
            date: 2024-11-01

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
              ## Building the Resources Template

              I have been working on the website for [reDesignED](https://redesign-education.org/), a nonpartisan research, design, and service organization dedicated to addressing today's educational challenges. reDesignED offers a wealth of information through various types of content - from research papers and case studies to blog posts and whitepapers. All of these resources are accessible through their WordPress-powered website.

              While building this resource library, we faced a fundamental challenge: How do we make a diverse collection of educational content easily discoverable without overwhelming users? The solution needed to be robust and intuitive, allowing users to find relevant resources with just a few clicks.

              ![](https://res.cloudinary.com/glinkaco/image/upload/v1731285239/tgc2022/blogImages/wp-resource-filters/filters-view_vbxfpk.png)

              We implemented a filtering system that offers multiple ways to explore the content: users can search by keywords, browse by category, filter by author, or focus on specific resource types. However, one crucial requirement emerged during development: We wanted to prevent user frustration by avoiding the dreaded "No Resources Found" message. Instead of letting users select filter combinations that would yield no results, we built a system that intelligently turns off invalid options.

              This series of blog posts chronicles our journey in building this filtering system, sharing the technical solutions and lessons learned along the way. Whether you're building a resource library, a product catalog, or any other filterable content in WordPress, these insights should prove valuable.

              When building complex functionality in WordPress, organizing code logically and maintainably is essential. Our resource filtering system splits its code across several files, each with a specific responsibility. This separation helps keep the code manageable and maintainable and makes debugging easier.

              The main template file, `resources.php`, lives in the `template-parts` directory alongside other templates. This file orchestrates the overall flow of our filtering system. It processes user input, builds queries, and coordinates the display of our filtered content.

              The display logic is divided into three template files in the `inc/resources directory`: `card.php` handles the display of individual resource items, `filters.php` handles the filtering interface, and `results.php` handles the results list and pagination. This separation allows us to modify how things look without touching the underlying logic.

              All the functional code—the functions that power our filtering system—is located in `inc/resources/function.php`. This includes functions for URL generation, category management, author retrieval, and the crucial filtering logic that determines which options should be available based on current selections.

              <pre><code class='file-hierarchy'>
              wp-content/
                └── themes/
                    └── my-theme/
                        ├── inc/
                        │   └── resources
                        │       ├── card.php
                        │       ├── filters.php
                        │       ├── functions.php
                        │       └── results.php
                        ├── template-parts/
                        │   └──resources.php
                        └── functions.php
              </code></pre>

              The above file structure is free to download on [GitHub](https://github.com/wernerglinka/WP-Filter-Files/tree/main). I'd recommend reviewing the code and using this series of blog posts as a guide.

              With this organization in place, let's explore how the main template, `resources.php`, brings everything together.

              At the very beginning of our template, we establish some fundamental parameters that will control how our content is displayed. These constants define things like how many resources appear on each page and how our pagination will look:


              ```php
              define('RESOURCES_PER_PAGE', 10);
              define('PAGINATION_END_SIZE', 2);
              define('PAGINATION_MID_SIZE', 2);
              define('MAX_CARD_TITLE_LENGTH', 44);

              ```

              Before proceeding with content processing, the template performs several important security checks. First, it verifies that [Advanced Custom Fields](https://www.advancedcustomfields.com/) is available, as we rely on its functionality. Then, when a search is submitted, it validates the [security nonce](https://developer.wordpress.org/apis/security/nonces/) to prevent [cross-site request forgery attacks](https://owasp.org/www-community/attacks/csrf):

              ```php
              if (!function_exists('get_sub_field')) {
                return;
              }

              if (isset($_GET['keyword-search']) || isset($_GET['category']) || isset($_GET['auth']) || isset($_GET['type'])) {
                if (!isset($_GET['resources_nonce']) || !wp_verify_nonce($_GET['resources_nonce'], 'resources_filter')) {
                  wp_die(__('Invalid security token sent.', 'rde01'));
                }
              }
              ```

              The next section deals with processing user input. All URL parameters are collected and sanitized to ensure they're safe to use. Furthermore, if someone is performing a search, we implement [rate limiting](https://www.imperva.com/learn/application-security/rate-limiting/) to prevent abuse of our search functionality:

              ```php
              $params = get_sanitized_resource_params();

              if (!empty($params['keyword-search'])) {
                  $rate_limit_check = handle_search_rate_limit();
                  if (is_wp_error($rate_limit_check)) {
                      wp_die($rate_limit_check->get_error_message());
                  }
              }
              ```

              Now, we move into the content preparation phase. The template retrieves the allowed post types from an Advanced Custom Fields field. For better performance, it then uses [WordPress's caching system](https://developer.wordpress.org/advanced-administration/performance/cache/) to fetch categories and their hierarchical structure efficiently. This approach prevents unnecessary database queries on each page load. Similarly, it gathers all authors who have created content of the specified types:

              ```php
              $selected_types = get_sub_field('resource_types');
              if (empty($selected_types)) {
                  return;
              }

              $cache_key = 'resource_categories_' . md5(serialize($selected_types));
              $categories_with_children = wp_cache_get($cache_key);
              if (false === $categories_with_children) {
                  $categories_with_children = get_categories_with_children(0, $selected_types);
                  wp_cache_set($cache_key, $categories_with_children, '', HOUR_IN_SECONDS);
              }

              $authors = get_all_authors($selected_types);
              ```

              With all this preliminary data, we can now construct the query that will retrieve our filtered resources. The template builds this query based on several possible parameters: the content type, how many items to show per page, and what order to display them in. If the user has applied any filters, these are added to the query as well.

              The query construction forms the heart of our filtering system. It starts with basic parameters and then layers on any additional filtering criteria the user has selected:

              ```php
              $query_args = array(
                  'post_type' => $params['type'] ? array($params['type']) : $selected_types,
                  'posts_per_page' => RESOURCES_PER_PAGE,
                  'paged' => $params['paged'],
                  'orderby' => 'date',
                  'order' => 'DESC',
                  'post_status' => 'publish',
                  'no_found_rows' => false,
                  'update_post_meta_cache' => true,
                  'update_post_term_cache' => true
              );
              ```

              When a user selects a specific category, we add a taxonomy query. This tells WordPress only to return posts from that particular category:

              ```php
              if (!empty($params['category'])) {
                  $query_args['tax_query'] = array(
                      array(
                          'taxonomy' => 'category',
                          'field' => 'slug',
                          'terms' => $params['category']
                      )
                  );
              }
              ```

              For author filtering, we use a meta query. This is necessary because authors are stored in a custom field rather than using WordPress's default author system:

              ```php
              if (!empty($params['auth'])) {
                  $query_args['meta_query'] = array(
                      array(
                          'key' => 'authored_by',
                          'value' => serialize(strval($params['auth'])),
                          'compare' => 'LIKE'
                      )
                  );
              }
              ```

              If the user has entered a search term, we add it to the query. WordPress will then search through titles and content to find matching resources:

              ```php
              if (!empty($params['keyword-search'])) {
                  $query_args['s'] = $params['keyword-search'];
              }
              ```

              It's helpful to see exactly what query is being run during development or troubleshooting. We include a debug section that shows the query parameters to administrators when WordPress debug mode is enabled:
                     
              ```php
              if (WP_DEBUG && current_user_can('manage_options')) {
                  echo '<pre>';
                  echo 'Query Args: ';
                  print_r($query_args);
                  echo '</pre>';
              }
              ```

              With our query fully constructed, we can execute it and check for any errors:

              ```php
              $query = new WP_Query($query_args);
              $error = handle_resource_query_errors($query);
              ```

              The final section of our template handles the display of our filtered resources. We use WordPress template parts to keep our code organized and maintainable. The filters sidebar is loaded first, passing along all the parameters it needs to show the current state and available options:

              ```php
              get_template_part('inc/resources/filters', null, array(
                  'params' => $params,
                  'selected_types' => $selected_types,
                  'categories' => $categories_with_children,
                  'authors' => $authors
              ));
              ```

              If our query encounters any errors, we display an error message. Otherwise, we show the filtered results using another template part:

              ```php
              if (is_wp_error($error)) {
                  echo '<div class="results" data-loading="false">';
                  echo '<div class="no-results">';
                  echo esc_html($error->get_error_message());
                  echo '</div>';
                  echo '</div>';
              } else {
                  get_template_part('inc/resources/results', null, array(
                      'query' => $query,
                      'params' => $params
                  ));
              }
              ```

              This template safely handles user input, efficiently manages database queries through caching, and organizes the display code logically through template parts.

              This template serves as the foundation for our resource filtering system. In the [following article](/blog/wordpress-building-resource-filter-2/), we'll explore how the filtering logic works and how we determine which filter options should be available based on the current selection.

              Complete files may be viewed at [GitHub](https://github.com/wernerglinka/WP-Filter-Files/tree/main).

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
            url: "/blog/wordpress-building-resource-filter-1"
            socialTitle: "Building an Intuitive Resource Filter for WordPress - Part 1"
            socialComment: "This filter implementation avoids the dreaded 'No Resources Found' message. Instead of letting users select filter combinations that would yield no results, it intelligently turns off invalid filter options."
            
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
              - item: "wordpress-building-resource-filter-5"
              - item: "wordpress-building-resource-filter-4"
              - item: "wordpress-building-resource-filter-3"
              - item: "wordpress-building-resource-filter-2"
---
