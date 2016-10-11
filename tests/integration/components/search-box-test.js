/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const mockAccountService = Ember.Service.extend({
  getWatchLists: function() {
    return true;
  }
});

describeComponent(
  'search-box',
  'Integration: SearchBoxComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      this.register('service:account-service', mockAccountService);
      this.inject.service('account-service', { as: 'accountService' });
      this.render(hbs`{{search-box}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);
