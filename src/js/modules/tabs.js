/**
 * Manage tabs display
 * @params {*} none
 * @return {function} initializes a tabs display
 */
const tabs = (function() {
  const init = () => {
    const allTabsContainers = document.querySelectorAll(".js-tabs");
    
    allTabsContainers.forEach(tabsContainer => {
      const allTabs = tabsContainer.querySelectorAll(".tab-label");
      const allTabContents = tabsContainer.querySelectorAll(".tab-content");

      // loop through all tab contents and find the tallest one
      let tallestTabContent = 0;
      allTabContents.forEach(tabContent => {
        if (tabContent.offsetHeight > tallestTabContent) {
          tallestTabContent = tabContent.offsetHeight;
        }
      });
      // set tab contents to the height of the tallest tab content
      const tabsContent = document.querySelector(".tabs-content");
      if (tabsContent) {
        document.querySelector(".tabs-content").style.height = `${tallestTabContent}px`;
      };

      // observe viewport width changes and update tab content height
      const resizeObserver = new ResizeObserver((entries) => {
        entries.forEach(entry => {
          // loop through all tab contents and find the tallest one
          let tallestTabContent = 0;
          allTabContents.forEach(tabContent => {
            if (tabContent.offsetHeight > tallestTabContent) {
              tallestTabContent = tabContent.offsetHeight;
            }
          });
          // set tab contents to the height of the tallest tab content
          const tabsContent = document.querySelector(".tabs-content");
          if (tabsContent) {
            document.querySelector(".tabs-content").style.height = `${tallestTabContent}px`;
          };
        });
      });

      resizeObserver.observe(document.body);

      allTabs.forEach(tab => {
        tab.addEventListener("click", (e) => {
          e.stopPropagation();
          e.preventDefault();

          allTabs.forEach(tab => {
            tab.classList.remove("active");
            tab.children[0].removeAttribute("aria-selected");
          });
          tab.classList.add("active");
          tab.children[0].setAttribute("aria-selected", "true");
          // convert allTabs nodelist to array and get index of clicked tab
          const clickedTabIndex = Array.prototype.slice.call(allTabs).indexOf(tab);
          // remove active class from all tab contents
          allTabContents.forEach(tabContent => tabContent.classList.remove("active"));
          // add active class to tab content with same index as clicked tab
          allTabContents[clickedTabIndex].classList.add("active");
        });
      });
    });
  };

  return { init };
})();

export default tabs;