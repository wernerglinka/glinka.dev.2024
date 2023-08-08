/* global window, document */

/**
 * scroll to target
 * @params {*} none
 * @return {function} initialize scroll to target functionality
 */
 const scrollToTarget = (function() {
  const init = () => {
    const allLinks = document.querySelectorAll(".js-scroll-to");
    for (const link of allLinks) {
      link.href = `#${link.dataset.scrolltarget}`;
    }

    
  };

  return { init };
})();

export default scrollToTarget;
