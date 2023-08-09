/* global window, document, localStorage */

// load the youTube video JS api
// https://developers.google.com/youtube/iframe_api_reference
// This code loads the IFrame Player API code asynchronously.
const tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// use a promise to manage the async onYouTubeIframeAPIReady function
window.videoAPIReady = new Promise(resolve => {
  // upon YouTube API Ready we resolve the promise
  // we can then initialize video players in other modules
  // e.g. videoAPIReady.then(() => {})
  window.onYouTubeIframeAPIReady = () => resolve();
});

import barba from "@barba/core";
import barbaCSS from "@barba/css";
// Note that when using BarbaCSS the leave() and enter() hook are not executed.
// Only the before- and after- hooks are executed.
barba.use(barbaCSS);

import modalVideo from "./modules/modal-video";
import tabs from "./modules/tabs";
import scrollToTarget from "./modules/scroll-to-target";
import testimonials from "./modules/testimonials";
import navigation from "./modules/navigation";

function initPage() {

  barba.init({
    transitions: [
      {
        // "home" is used in the transition class attribute.
        name: "home",
        once() {},
      },
      {
        // "fade" is used in the transition class attribute.
        name: "fade",
        to: {
          namespace: ["barbaPage"],
        },
        beforeLeave(data) {},
        leave() {},
        afterLeave() {},
        enter() {},
      },
    ],
  });

  barba.hooks.enter(() => {
    navigation.init();
    if (document.querySelector(".js-testimonials")) {
      testimonials.init();
    } 
    if (document.querySelector(".js-tabs")) {
      tabs.init();
    }
    if (document.querySelector(".js-modal-video")) {
      modalVideo.init();
    }
  });

  navigation.init();
  if (document.querySelector(".js-testimonials")) {
    testimonials.init();
  }
  if (document.querySelector(".js-tabs")) {
    tabs.init();
  }
  if (document.querySelector(".js-modal-video")) {
    modalVideo.init();
  }
}

window.addEventListener("load", function() {
  initPage();
});
