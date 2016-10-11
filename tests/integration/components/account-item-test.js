/* jshint expr:true */
/*global Lightstreamer:true */

import {
  expect
} from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import createLs from '../../helpers/create-ls';
import Ember from 'ember';

const mockBalanceService = Ember.Service.extend({
  subscribe: function() {
    return true;
  }
});

describeComponent(
  'account-item',
  'Integration: AccountItemComponent', {
    integration: true
  },
  function() {
    it('renders with preferred account', function() {
			this.register('service:balance-service', mockBalanceService);
			this.inject.service('balance-service', { as: 'balanceService' });
      Lightstreamer = createLs();

      const item = {
        id: 'ABCABC',
        preferred: true,
        accountType: 'CFD',
        accountName: 'Demo-Spread bet',
        currency: 'GBP',
        status: 'ENABLED',
        FUNDS: 0,
        MARGIN: 0,
        EQUITY: 0,
        AVAILABLE_TO_DEAL: 0,
        PNL: 0,
      };
      this.set('item', item);
      this.render(hbs `{{account-item item=item}}`);
      expect(this.$(".panel-title").text().trim()).to.be.equal('ABCABC - Preferred');
    });
  }
);
