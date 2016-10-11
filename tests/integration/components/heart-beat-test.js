/* jshint expr:true */
/* jshint unused:vars */
import {
  expect
} from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const mockLsService = Ember.Service.extend({
  getLsClient: function() {
    return {
      subscribe: function() {
        return true;
      },
    };
  }
});

describeComponent(
  'heart-beat',
  'Integration: HeartBeatComponent', {
    integration: true
  },
  function() {
    it('renders', function() {
      this.register('service:ls-client', mockLsService);
      this.inject.service('ls-client', { as: 'lsClient' });
      this.set('clientLs', {
        getLsClient() {
          return {
            subscribe() {
              console.log('hi');
            }
          };
        }
      });
      this.render(hbs `{{heart-beat clientLs=clientLs}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);
