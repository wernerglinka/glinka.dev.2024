---
layout: blocks.njk
pageType: "blog-post"
disableDefaultFooter: true
item: "sanatize-marketo-form" # used as a key for bloglist filters

seo:
  title: Sanitize Marketo forms | Werner Glinka
  description: "In the world of Marketo form styling, frustration is often a constant companion. With countless styles to override and a continuous requirement for tweaks, I've decided to strip all Marketo styles and begin afresh."
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1645217047/tgc2022/blogImages/sanitize-marketo-form/styling-marketo-forms_czplhw.jpg"
  canonicalOverwrite: ""

blogTitle: "How to Strip Styling from a Marketo Form"
date: 2018-06-01
author: ""
image:
  src: "v1645217047/tgc2022/blogImages/sanitize-marketo-form/styling-marketo-forms_czplhw.jpg"
  alt: ""
  caption:
excerpt: "In the world of Marketo form styling, frustration is often a constant companion. With countless styles to override and a continuous requirement for tweaks, I've decided to strip all Marketo styles and begin afresh."

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
        image: "v1645217047/tgc2022/blogImages/sanitize-marketo-form/styling-marketo-forms_czplhw.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "How to Strip Styling from a Marketo Form"
              header: "h1"
              subtitle: "And keep your sanity"
              prose: ""
            date: 2018-06-01

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
              Styling a Marketo form is often an exercise of frustration management. When you look at the page source after a form has been loaded you’ll see a stylesheet with base styles and one with theme styles in the head section. In addition you’ll find a style tag as the first element in the form itself and to top it of, inline style attributes on every form element. This is truly maddening.

              Apparently, Marketo doesn’t provide the option to download an html-only form to be styled by a client.

              So you overwrite this mess by adding **!important** to every style rule that you add in your style sheet. Then you have to change your style just a little for another form… and that requires more **!important** rules.

              I have been in this situation more times then I care to remember. Finally I had enough and decided to strip all Marketo styles and start with blank slate.

              Before we get to that point, let’s see what it actually takes to add a form to our page by looking at the code of a [Marketo example form](https://developers.marketo.com/examples/forms2/example1.html).

              ```javascript
              <script src="//app-sjst.marketo.com/js/forms2/js/forms2.js"></script>
              <form id="mktoForm_1057"></form>
              <script>
                  MktoForms2.loadForm("//app-sjst.marketo.com", "785-UHP-775", 1057, function(form){
                      //Add an onSuccess handler
                      form.onSuccess(function(values, followUpUrl){
                          //get the form's jQuery element and hide it
                          form.getFormElem().hide();
                          //return false to prevent the submission handler from taking the lead to the follow up url.
                          return false;
                      });
                  });
              </script>
              ```

              If you copy the form snippet from the Marketo form editor, as it is described [here](https://experienceleague.adobe.com/docs/marketo/using/product-docs/demand-generation/forms/form-actions/embed-a-form-on-your-website.html) you’ll not see the callback in the loadform method but you can add it yourself just like the snippet above shows. This callback is invoked after the form and its assets are fully loaded.

              My form code looks like this. You’ll have to replace `{{ marketo_form_id }}` and `{{ marketo_munchkin_id }}` with your own values. I am using this callback to create a custom event that I can then use to sanitize the form. This code goes into the html right where the form should appear.

              ```javascript
              <script src="//app-sj13.marketo.com/js/forms2/js/forms2.min.js"></script>
              <form id="mktoForm_{{ marketo_form_id }}"></form>
              <script>
                  MktoForms2.loadForm("//app-sj13.marketo.com", “{{ marketo_munchkin_id }}“, {{ marketo_form_id }}, function () {
                      var event = new CustomEvent('mktoFormLoaded');
                      document.dispatchEvent(event);
                  });
              </script>
              ```

              And then in my js file:

              ```javascript
              // function to modify and style according to design all Marketo forms
              var modifyMarketoForm = {
                  init: function () {
                      var self = this;
                      // custom event 'mktoFormLoaded' is invoked when forms are loaded
                      $(document).on('mktoFormLoaded', function () {
                          self._removeMarketoCSS();
                      });
                  },
                  _removeMarketoCSS: function () {
                      // remove the external stylesheets
                      var links = window.document.getElementsByTagName('link');
                      $(links).each(function () {
                          var thisLinkElement = $(this);
                          var thisLinkURL = thisLinkElement.attr('href');
                          if (thisLinkURL.indexOf('marketo.com') > 1) {
                              thisLinkElement.remove();
                          }
                      });
                      // and the inline styles
                      var marketoForms = $("[id*='mktoForm']");
                      marketoForms.each(function () {
                          $(this).find('style').remove();
                      });
                      // and the style attributes
                      marketoForms.each(function () {
                          $(this).find('[style]').removeAttr('style');
                      });
                  }
              };


              //the document ready function
              $(function () {
                  modifyMarketoForm.init();
              });
              ```

              And that is it. Now all Marketo styles have been eliminated and a blank CSS slate is awaiting you.

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
              - item: "case-spinning-image"
              - item: "creating-svg-line-drawing-animations"

---