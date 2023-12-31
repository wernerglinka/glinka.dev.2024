/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

const browserSync = require('browser-sync');
const chokidar = require('chokidar');
const msBuild = require('../metalsmith');

(async function firstRun() {
  await msBuild();
  chokidar
    .watch(['src', 'layouts'], {
      ignoreInitial: true,
      awaitWriteFinish: { pollInterval: 1000 }
    })
    .on('ready', () => {
      setTimeout(() => {
        browserSync.init({
          host: 'localhost',
          server: './build',
          port: 3000,
          injectChanges: false,
          reloadThrottle: 0
        });
      }, 1000);
    })
    .on('all', async () => {
      await msBuild();
      setTimeout(() => {
        browserSync.reload();
      }, 2000);
    });
})();