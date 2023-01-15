import * as Sentry from '@sentry/browser';

function init() {
  Sentry.init({dsn: "https://d2df9a7d37914f65885e0d2c949123ac@sentry.io/1502050"});

}

function log(error) {
  Sentry.captureException(error);

}

export default {
  init,
  log
}