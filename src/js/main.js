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

import Swup from 'swup';
import SwupHeadPlugin from '@swup/head-plugin';
import SwupA11yPlugin from '@swup/a11y-plugin';
import SwupBodyClassPlugin from '@swup/body-class-plugin';

const swup = new Swup({
  plugins: [
    new SwupHeadPlugin(),
    new SwupA11yPlugin(),
    new SwupBodyClassPlugin()
  ]
});

import modalVideo from "./modules/modal-video";
import tabs from "./modules/tabs";
import testimonials from "./modules/testimonials";
import navigation from "./modules/navigation";

function initPage() {

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

swup.hooks.on('page:view', () => {
  initPage();
});
