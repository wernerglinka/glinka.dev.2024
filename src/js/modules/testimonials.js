/**
 * Manage testimonials display
 * @params {*} none
 * @return {function} initializes a testiomonials display
 */
const testimonials = (function() {
  const init = () => {
    const allTestimonials = document.querySelectorAll(".js-testimonials blockquote");
    
    /**
     * Set the container to the height of the tallest testimonial
     * loop through all testimonials to find the tallest one 
     * 
     * TODO: check if container is higher than tallest testimonial
     * this may happen if the testimonials are in a column and the
     * other column determines the overall height.
     */
    let tallestTestimonial = 0;
    allTestimonials.forEach(testimonial => {
      if (testimonial.offsetHeight > tallestTestimonial) {
        tallestTestimonial = testimonial.offsetHeight;
      }
    });
    // set testimonials container to the height of the tallest tab content
    const testimonialsContainer = document.querySelector(".js-testimonials");
    if (testimonialsContainer) {
      testimonialsContainer.style.height = `${tallestTestimonial}px`;
    };

    
    /**
     * Observe viewport width changes and update tab content height
     */
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach(entry => {
        // loop through all testimonials to find the tallest one
        let tallestTestimonial = 0;
        allTestimonials.forEach(testimonial => {
          if (testimonial.offsetHeight > tallestTestimonial) {
            tallestTestimonial = testimonial.offsetHeight;
          }
        });
        // set testimonials container to the height of the tallest tab content
        const testimonialsContainer = document.querySelector(".js-testimonials");
        if (testimonialsContainer) {
          testimonialsContainer.style.height = `${tallestTestimonial}px`;
        };
      });
    });

    resizeObserver.observe(document.body);

    /**
     * Cycle through the testimonials
     */
    let currentTestimonial = 0;
    const TIME = 10000;
    const cycleTestimonials = () => {
      // hide all testimonials
      allTestimonials.forEach(testimonial => {
        testimonial.parentElement.classList.remove("active");
      });
      // show current testimonial
      allTestimonials[currentTestimonial].parentElement.classList.add("active");
      // increment current testimonial
      currentTestimonial++;
      // reset current testimonial to 0 if it exceeds the number of testimonials
      if (currentTestimonial >= allTestimonials.length) {
        currentTestimonial = 0;
      }

      // necessary so this works with barba
      // only start another cycle if the testimonials are on the page
      let timer;
      const testimonialsContainer = document.querySelector(".js-testimonials");
      if (testimonialsContainer) {
        timer = setTimeout(cycleTestimonials, TIME);
      } else {
        clearTimeout(timer);
      }
    }

    // start cycle testimonials every 5 seconds
    setTimeout(cycleTestimonials, TIME);
  };


  return { init };
})();

export default testimonials;