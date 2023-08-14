---
layout: blocks.njk
draft: false
pageType: "blog-post"
disableDefaultFooter: true
item: "metalsmith-lever-api" # used as a key for blogpost filters

seo:
  title: Building job pages with Metalsmith and the Lever postings API | Werner Glinka
  description: "Discover the integration of dynamic job listings onto static websites using Lever's Postings REST API and Metalsmith, a flexible Static Site Generator. This post details how a custom Metalsmith plugin fetches job data from the Lever API and transforms it into a file object"
  socialImage: "https://res.cloudinary.com/glinkaco/image/upload/v1645473940/tgc2022/blogImages/metalsmith-lever-api/header_iojiti.jpg"
  canonicalOverwrite: ""

blogTitle: "Building Job pages with Metalsmith and the Lever Postings API"
date: 2018-11-10
author: ""
image:
  src: "v1645473940/tgc2022/blogImages/metalsmith-lever-api/header_iojiti.jpg"
  alt: ""
  caption:
excerpt: "Discover the integration of dynamic job listings onto static websites using Lever's Postings REST API and Metalsmith, a flexible Static Site Generator. This post details how a custom Metalsmith plugin fetches job data from the Lever API and transforms it into a file object"

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
        image: "v1645473940/tgc2022/blogImages/metalsmith-lever-api/header_iojiti.jpg"
        isDark: false
    columns:
      - column:
        blocks:
          - name: blog-banner
            blockClass: ""
            text:
              prefix: ""
              title: "Building Job pages with Metalsmith and the Lever Postings API"
              header: "h1"
              subtitle: ""
              prose: ""
            date: 2018-11-10
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
              Some of my clients manage their recruitment processes using Lever, a comprehensive recruiting software solution. One of Lever's compelling features is its [Postings REST API](https://github.com/lever/postings-api). This tool provides Lever's clients with the ability to seamlessly integrate job listings onto their websites, keeping potential applicants informed about the latest opportunities available.

              One particular client is leveraging the power of Metalsmith to create their static website. [Metalsmith](https://www.metalsmith.io/), a renowned Static Site Generator built on NodeJS, distinguishes itself with its remarkable simplicity and flexibility. It's essentially a fine-tuned machine that transports files from a source to a destination directory. Along the journey, it accommodates plugins to modify these files.

              Let's delve into the core mechanisms of Metalsmith:

              - Firstly, Metalsmith reads the source files from a given directory, transmuting these files into JavaScript Objects. 

              - With these JavaScript Objects ready, we can now summon an array of Plugins to transform them further. These manipulations occur at the object level, tweaking properties or altering their values as required. For those who are interested in a deeper exploration of Metalsmith's operations, I recommend my post, [Introducing Project Orca - Part 2](/blog/introducing-project-orca-part2/), where I delve into the nitty-gritty of how this works.

              - In its final stage, Metalsmith transforms the manipulated JavaScript Objects back into files, and places them in the destination directory.

              Through its elegant and intuitive framework, Metalsmith becomes an invaluable ally in web development, offering an appealing balance of simplicity and power.

              ![](https://res.cloudinary.com/glinkaco/image/upload/w_1800,f_auto/v1645474174/tgc2022/blogImages/metalsmith-lever-api/metalsmith-with-plugins_cmycip.svg)

              Indeed, Metalsmith's architecture makes it perfectly adapted to dynamically add pages during the build process. A fundamental part of this capability lies in its custom plugins, which are capable of executing a variety of tasks.

              In this case, during the build process, a custom Metalsmith plugin sends a request to the Lever API. This request yields a JSON object containing all job data. The plugin then takes this data and transmutes it into a Metalsmith file object. 

              This newly created file object is added to the wider collection of Metalsmith files. From there, it undergoes the same processing as any other page, providing a seamless integration of dynamic content into the static site.

              Essentially, we retrieve the Job object from the Lever API, morph it into a Metalsmith file object, and then let Metalsmith work its magic.

              To better understand the process, let's consider an example of a Lever Job object based on their API documentation:

              ```javascript
              {
                "additionalPlain": "The Lever Story\n\nWe participated in Y Combinator in summer 2012, … and hiring a diverse workforce.",
                "additional": "<div><b style="\"font-size:" 18px\"="">The Lever Story</b></div><div><br></div><div>We participated in Y Combinator in summer 2012, … hiring a diverse workforce.</div>",
                "categories": {
                  "commitment": "Full Time",
                  "department": "Sales",
                  "location": "Toronto",
                  "team": "Account Executive"
                },
                "createdAt": 1502907172814,
                "descriptionPlain": "Work at Lever\n\nLever builds software for teams…well-designed, real-time apps.",
                "description": "<div><b style="\"font-size:" 18px\"="">Work at Lever</b></div><div><br></div><div>Lever builds software for teams…well-designed, real-time apps.</div>",
                "id": "ff7ef527-b0d3-4c44-836a-8d6b58ac321e",
                "lists": [
                  {
                    "text": "About the Gig:",
                    "content": "<li>You will be responsible …across North America</li><li>You will be a Top Hat … your territory</li><li>You will grow … relationships through the schools</li><li>You will educate professors…our platform in their classrooms</li><li>You will run demonstrations… North America)</li>"
                  },
                  {
                    "text": "About You:",
                    "content": "<li>You are highly motivated…communication skills</li><li>You have previous…are incredibly eager to learn!</li><li>You are detail-oriented and a self-starter</li><li>You have completed … experience</li><li>You will also … team as required</li>"
                  }
                ],
                "text": "Account Director (Inside/Outside Hybrid Sales)",
                "hostedUrl": "https://jobs.lever.co/leverdemo/ff7ef527-b0d3-4c44-836a-8d6b58ac321e",
                "applyUrl": "https://jobs.lever.co/leverdemo/ff7ef527-b0d3-4c44-836a-8d6b58ac321e/apply"
              }
              ```

              Some of the fields are not really that descriptive but here is my interpretation of what we are looking at:

              - **text** : the job title
              - **id** : the job ID
              - **categories/commitment** : job status - Full/half time
              - **categories/department** : the job department:
              - **categories/location** : the job location
              - **categories/team** : job group - a team in a department
              - **lists** : this is a list of objects, each having a text and content property. This can be used to describe the various aspects of a job
              - **description and descriptionPlain** : describing jobs at this company. description is a html string while descriptionPlain is a plain text string
              - **additional and additionalPlain** : Used to describe the hiring company
              - **hostedURL** : URL of the Lever Job listing page
              - **applyURL** : URL of the form to apply for this job

              To convert the Lever job JSON into a Metalsmith file object, I built a simple plugin. Within this plugin, I incorporated several Node.js modules, specifically for the purpose of fetching the JSON data from the Lever server and formatting the template string for the target page HTML in an easily understandable manner.

              Utilizing these modules, the plugin effectively integrates the dynamic job data into our static website structure, offering a streamlined method for presenting this information to our site visitors.

              Let's review the plugin to see how it's constructed and how it accomplishes this task:

              - [request](https://www.npmjs.com/package/request) - a simple HTTP client to make calls to the Lever Postings API.
              - [common-tags](https://www.npmjs.com/package/common-tags) - a set of well-tested, commonly used template literal tag functions for use in ES2015+.

              ```javascript
              var request = require('request');
              var commonTags = require('common-tags');

              /**
              * Metalsmith plugin to create static pages from lever api data
              */
              function plugin() {
                'use strict';

                return function (files, metalsmith, done) {

                  var companyUID = "LEVER_CUSTOMER_ID";
                  var url = "https://api.lever.co/v0/postings/";
                  var leverAPI = url + companyUID + "?mode=json";
                  var jobObj = {};
                  var j;
                  var fileContent, fileName, page;
                  var jobProse = "";

                  // get data from the Lever API
                  request.get(leverAPI, function (error, response, data) {
                    if (error) {
                        return console.dir(error);
                    }
                    // parse lever json into js object
                    jobObj = JSON.parse(data);

                    // build the job pages
                    jobObj.forEach(function (job) {

                      jobProse = "";
                      for (j = 0; job.lists.length > j; j++) {
                        jobProse += "<h2>" + job.lists[j].text + "</h2>";
                        jobProse += "<ul>" + job.lists[j].content + "</ul>";
                      }

                      fileContent = commonTags.html`
                        <div class="content-wrapper">
                          <div class="careers-title-wrapper">
                            <div class="title-wrapper">
                              <h1>${job.text}</h1>
                              <ul class="list-unstyled list-inline">
                                <li>${job.categories.location}</li>
                                <li>${job.categories.team}</li>
                                <li>${job.categories.commitment}</li>
                              </ul>
                            </div>
                            <div class="job-application">
                              <a href="${job.applyUrl}" class="btn btn-default btn-b3">Apply for this Job</a>
                            </div>
                          </div>
                          <div class="scroll-wrapper">
                            <div class="job-verbiage">
                              <div class="job-description">
                                ${job.descriptionPlain}
                              </div>
                              <div class="job-requirements">
                                ${jobProse}
                              </div>
                              <div class="additional-info">
                                ${job.additionalPlain}
                              </div>
                            </div>
                          </div>
                        </div>
                      `;

                      // key for the files array
                      fileName = "jobs/" + job.id + ".html";
                      page = {
                        layout: "jobs-page.html",
                        title: job.text,
                        description: “You really want this job",
                        body_classes: "careers",
                        contents: new Buffer(fileContent)
                      };
                      // add page to metalsmith object
                      files[fileName] = page;
                    });
                    done();
                  });
                };
              }

              module.exports = plugin;
              ```

              The underlying mechanics of the plugin are rather straightforward:

              1. Firstly, the plugin sends a request to the Lever job listings endpoint: `https://api.lever.co/v0/postings/<LEVER_CUSTOMER_ID>?mode=json`. This effectively fetches the most recent job listings data from the Lever server.

              2. Once we have the response JSON data, the plugin converts this into a Javascript object. This conversion process makes it possible for us to manipulate and structure the data in a way that aligns with the site's existing content format.

              3. The plugin then iteratively builds the content of each job page by inserting the relevant object properties into the HTML template string. This mechanism ensures each job listing is consistently formatted and presented.

              4. Next, we designate the job page key for the Metalsmith files object. In our case, this key is determined by the job's unique id, provided by the Lever job data. As an example, if we consider the job id from the sample job listed above, our key would look like this: _jobs/ff7ef527-b0d3-4c44-836a-8d6b58ac321e.html_.

              5. After identifying the page key, we define the page object using the pre-formatted template string and various metadata elements. These include information such as the page template that Metalsmith will utilize.

              6. Finally, we add the newly created page to the Metalsmith files object.

              With these steps completed, Metalsmith can take over and execute the remaining aspects of the build process. Upon completion, you will find a new `jobs` folder within the Metalsmith destination directory, housing our newly created job files, including our example file `ff7ef527-b0d3-4c44-836a-8d6b58ac321e.html` among others.
              
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
              - item: "building-responsive-progressive-image-component"
              - item: "build-badges-section"
              - item: "metalsmith-starters"

---