/* jshint node: true */

/**
 * Ember generated config file used to define Ember environment
 * variables
 */
module.exports = function(environment) {
  var ENV = {
    LOG_STACKTRACE_ON_DEPRECATION: false,
    pace: {
      theme: 'minimal',
      color: 'blue',
    },
    contentSecurityPolicy: {
      'default-src': "'none' *",
      'font-src': "'self' *",
      'img-src': "'self' *",
      'media-src': "'self' *",
      'style-src': "'self' 'unsafe-inline' *",
      'script-src': "'self' 'unsafe-eval' *",
      'connect-src': "'self' *"
    },
    modulePrefix: 'soar-trading',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },
    APP: {
    }
  };
  ENV['ember-simple-auth'] = {
    authenticationRoute: '/',
    routeAfterAuthentication: '/account',
    routeIfAlreadyAuthenticated: '/account',
  };

  if (environment === 'development') {
    //ENV.APP.LOG_RESOLVER = true;
    //ENV.APP.LOG_ACTIVE_GENERATION = true;
    //ENV.APP.LOG_TRANSITIONS = true;
    //ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    //ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV['simple-auth'] = {
      store: 'simple-auth-session-store:ephemeral'
    };
  }

  if (environment === 'production') {

  }

  return ENV;
};
