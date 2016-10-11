/* jshint expr:true */
/*jshint unused:false*/

import {
  describe,
  it,
  beforeEach,
  afterEach
} from 'mocha';
import {
  expect
} from 'chai';
import startApp from '../../helpers/start-app';
import destroyApp from '../../helpers/destroy-app';
import createLs from '../../helpers/create-ls';
import {
  authenticateSession,
} from '../../helpers/ember-simple-auth';
import sinon from 'sinon';

describe('Acceptance: AccountSearch', function() {
  let application;

  beforeEach(function() {
    application = startApp();
    let Lightstreamer = createLs();
  });

  afterEach(function() {
    destroyApp(application);
  });

  it('can visit /account/search', function() {
    visit('/');
    authenticateSession(application, {
      userId: 1,
      lsEndPoint: 'mock',
      currentAccountId: 'ABCABC',
      cstToken: '123123',
      ssoToken: 'ssosso',
      accounts: []
    });
    visit('/account/search');

    andThen(function() {
      expect(currentPath()).to.equal('account.search.index');
    });
  });
});
