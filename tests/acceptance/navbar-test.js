/* jshint expr:true */
import {
  describe,
  beforeEach,
  afterEach
} from 'mocha';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

describe('Acceptance: Navbar', function() {
  let application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    destroyApp(application);
  });
});
