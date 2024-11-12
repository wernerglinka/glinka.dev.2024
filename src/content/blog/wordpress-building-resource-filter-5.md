---
layout: blocks.njk
draft: false
pageType: "blog-post"
disableDefaultFooter: true
item: "wordpress-building-resource-filter-5" # used as a key for bloglist filters

seo:
  title: Building an Intuitive Resource Filter for WordPress - Part 5 | Werner Glinka
  description: "Security meets usability in this deep dive into protecting filter interactions. Learn how we maintain secure state across filter combinations while keeping the user experience smooth and response times quick."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1731355505/tgc2022/blogImages/wp-resource-filters/secure-filters_etkugs.jpg"
  canonicalOverwrite: ""

blogTitle: "Building an Intuitive Resource Filter for WordPress - Part 5"
date: 2024-11-09
author: ""
image:
  src: "v1731355505/tgc2022/blogImages/wp-resource-filters/secure-filters_etkugs.jpg"
  alt: ""
  caption:
excerpt: "Security meets usability in this deep dive into protecting filter interactions. Learn how we maintain secure state across filter combinations while keeping the user experience smooth and response times quick."

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
        image: "v1731355505/tgc2022/blogImages/wp-resource-filters/secure-filters_etkugs.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Building an Intuitive Resource Filter for WordPress - Part 5"
              header: "h1"
              subtitle: ""
              prose: ""
            date: 2024-11-09

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
              In [Part 4](/blog/wordpress-building-resource-filter-4/) of this series, we discussed building the results display using cards and paging. In this installment, we'll review securing filter interactions while ensuring a smooth user experience.

              Complete files may be viewed at [GitHub](https://github.com/wernerglinka/WP-Filter-Files/tree/main)

              ## Securing Filter Interactions

              Security must be integral to the design when building interactive features like a filtering system. Our resource filtering system uses [WordPress nonces](https://developer.wordpress.org/apis/security/nonces/) to protect against unauthorized actions and potential [cross-site request forgery (CSRF)](https://owasp.org/www-community/attacks/csrf) attacks.

              When building an interactive filtering system, proper URL handling isn't just about maintaining state - it's a crucial part of security. Our system generates three distinct types of URLs, each with its own requirements and security considerations.

              The most complex are our filter URLs. Each time a user applies a filter, we need to maintain both their current selections and our security measures.

              ```php
              function get_filtered_url($new_params = array())
              {
                // Get current parameters
                $current_params = array();

                // Maintain category parameter
                if (isset($_GET['category'])) {
                  $current_params['category'] = sanitize_text_field($_GET['category']);
                }

                // Maintain author parameter
                if (isset($_GET['auth'])) {
                  $current_params['auth'] = sanitize_text_field($_GET['auth']);
                }

                // Maintain search parameter
                if (isset($_GET['keyword-search'])) {
                  $current_params['keyword-search'] = sanitize_text_field($_GET['keyword-search']);
                }

                // Maintain type parameter
                if (isset($_GET['type'])) {
                  $current_params['type'] = sanitize_text_field($_GET['type']);
                }

                // Always add nonce
                $current_params['resources_nonce'] = wp_create_nonce('resources_filter');

                // Merge with new parameters (new ones will override existing ones)
                $params = array_merge($current_params, $new_params);

                // Generate URL
                return add_query_arg($params, get_permalink());
              }
              ```

              This function serves as our central point for generating secure filter URLs. Whether a user is selecting a category, choosing an author, or applying a type filter, `get_filtered_url()` ensures their current selections are maintained while keeping the interaction secure.

              Centralizing our filter URL generation in `get_filtered_url()` provides several benefits:

              - Security tokens are consistently applied
              - Filter state is reliably maintained
              - Parameters are properly sanitized
              - URL generation logic is encapsulated
              - Future modifications only need to happen in one place

              In our main template, we verify this security token before processing any filter requests.

              ```php
              // Verify nonce if form submitted for search or filtering
              if (isset($_GET['keyword-search']) || isset($_GET['category']) || isset($_GET['auth']) || isset($_GET['type'])) {
                if (!isset($_GET['resources_nonce']) || !wp_verify_nonce($_GET['resources_nonce'], 'resources_filter')) {
                  wp_die(__('Invalid security token sent.', 'rde01'));
                }
              }
              ```

              The security flow involves a series of steps. First, we generate a fresh nonce when generating a filter link or form. Then, when a user clicks a filter or submits a search, the request includes this nonce. Before processing the request, we verify that the nonce is valid. If the nonce is missing or invalid, we stop processing to prevent potential attacks.

              This security implementation serves multiple purposes. It prevents unauthorized filter manipulation while protecting against CSRF attacks. It ensures requests come from legitimate users and maintains security across all filter combinations.

              Beyond nonces, we also implement input sanitization.

              ```php
              function get_sanitized_resource_params() {
                return array(
                  'category' => isset($_GET['category']) ? sanitize_text_field($_GET['category']) : null,
                  'auth' => isset($_GET['auth']) ? absint($_GET['auth']) : null,
                  'type' => isset($_GET['type']) ? sanitize_key($_GET['type']) : null,
                  'keyword-search' => isset($_GET['keyword-search']) ? sanitize_text_field($_GET['keyword-search']) : null,
                  'paged' => isset($_GET['paged']) ? max(1, absint($_GET['paged'])) : 1
                );
              }
              ```

              This sanitization function provides several layers of security. All text inputs undergo proper sanitization, while numeric values are forced to be integers. The function rejects invalid input entirely, and each parameter type receives appropriate handling based on its expected format.

              One challenge we faced was maintaining security tokens across multiple filter combinations. Consider a user who first selects a category, then performs a search, and finally filters by author. Each step needs to maintain the security context while preserving the existing filters. Our solution was to centralize URL generation in get_filtered_url(), ensuring every interaction remains secure without compromising functionality.

              We also implemented rate limiting for searches.

              ```php
              function handle_search_rate_limit() {
                $user_ip = $_SERVER['REMOTE_ADDR'];
                $rate_key = 'search_rate_' . md5($user_ip);
                $search_count = get_transient($rate_key);
                
                // Allow 10 searches per minute
                $max_searches = 10;
                $time_window = MINUTE_IN_SECONDS;

                if ($search_count >= $max_searches) {
                  return new WP_Error(
                    'rate_limit_exceeded',
                    sprintf( __('Search limit of %d requests per minute exceeded. Please try again later.', 'rde01'), $max_searches ) );
                }

                set_transient($rate_key, ($search_count ? $search_count + 1 : 1), $time_window);
                return true;
              }
              ```

              This prevents potential abuse of the search functionality while maintaining a good user experience for legitimate users.

              The key takeaway is that security in an interactive system isn't just about adding individual security measures - it's about designing the system to maintain security across all possible user interactions. By centralizing our security handling and carefully considering the user flow, we've created a system that's both secure and user-friendly.

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
