/* global window, document */

/**
 * Manage filtered rich list display
 * 
 * @params {*} none
 * @return {function} initializes a filtered rich list display
 */
const listFilters = ( function() {

  const hideAllListItems = ( list ) => {
    const listItems = list.querySelectorAll( "li" );

    // use promise all to insure that all list items are hidden before
    // any new items are shown
    const allHidePromises = [];

    listItems.forEach( ( item ) => {
      item.style.opacity = 1;

      const hidePromise = new Promise( ( resolve, reject ) => {
        ( function fade() {
          if ( ( item.style.opacity -= .1 ) < 0 ) {
            item.style.display = "none";
            resolve();
          } else {
            setTimeout( fade, 50 );
          }
        } )();
      } );

      allHidePromises.push( hidePromise );
    } );

    return Promise.all( allHidePromises );
  };

  const showAllListItems = ( list, display ) => {
    const listItems = list.querySelectorAll( "li" );
    listItems.forEach( ( item ) => {
      item.style.opacity = 0;
      item.style.display = display || "block";

      ( function fade() {
        let val = parseFloat( item.style.opacity );
        if ( !( ( val += .1 ) > 1 ) ) {
          item.style.opacity = val;
          setTimeout( fade, 50 );
        }
      } )();
    } );

  };

  const showThisListItem = ( list, category, display ) => {
    const listItems = list.querySelectorAll( "li" );
    listItems.forEach( ( item ) => {
      if ( item.dataset.categories.includes( category ) ) {
        item.style.opacity = 0;
        item.style.display = display || "block";

        ( function fade() {
          let val = parseFloat( item.style.opacity );
          if ( !( ( val += .1 ) > 1 ) ) {
            item.style.opacity = val;
            setTimeout( fade, 50 );
          }
        } )();
      }
    } );
  };


  const init = () => {
    const allListFilters = document.querySelectorAll( ".js-list-filters" );

    allListFilters.forEach( listFilters => {
      // get all filter buttons of this filter
      const filterButtons = listFilters.querySelectorAll( "li" );
      // get the filter targets of this filter
      const filterTargets = listFilters.nextElementSibling;

      filterButtons.forEach( filterButton => {
        // attach click event to each filter button
        filterButton.addEventListener( "click", ( e ) => {
          // reset active state for all filter buttons
          filterButtons.forEach( filterButton => {
            filterButton.classList.remove( "active" );
          } );
          // set active state for this filter button
          e.target.classList.add( "active" );

          // get the filter value
          const filterBy = e.target.innerText;

          if ( filterBy === "all" ) {
            showAllListItems( filterTargets );
          } else {
            // hide all list items
            hideAllListItems( filterTargets )
              .then( () => {
                // show list items that match filter value
                showThisListItem( filterTargets, filterBy );
              } );
          }
        } );
      } );
    } );
  };

  return { init };
} )();

export default listFilters;
