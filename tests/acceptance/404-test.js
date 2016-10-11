/* jshint expr:true */
import {
  describe,
  it,
  beforeEach,
  afterEach
} from 'mocha';
import { expect } from 'chai';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

describe('Acceptance: 404', function() {
  let application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    destroyApp(application);
  });

  it('can visit /404 with a redirect', function() {
    visit('/adasd');

    andThen(function() {
      expect(currentPath()).to.equal('404');
    });
  });
  it('can visit /404 with a redirect and navigate home', function() {
    visit('/adasd');
    click('#404-home');
    andThen(function() {
      expect(currentPath()).to.equal('index');
    });
  });
});
