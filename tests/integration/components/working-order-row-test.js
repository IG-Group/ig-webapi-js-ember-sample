/* jshint expr:true */
/*jshint unused:false*/

import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import createLs from '../../helpers/create-ls';
import {
	beforeEach,
} from 'mocha';

const mockPnlService = Ember.Service.extend({
  subscribe: function() {
    return true;
  }
});

describeComponent(
  'working-order-row',
  'Integration: WorkingOrderRowComponent',
  {
    integration: true
  },
  function() {

    const item = {
      marketData: {
        instrumentName: 'FTSE 100',
        expiry: 'DFB',
      },
      workingOrderData: {
        direction: 'BUY',
        orderSize: 1,
        level: '100',
        goodTill: 'GTC'
      },
      liveData: {
        latest: '100',
      }
    };

    beforeEach(function() {
      this.register('service:pnl-service', mockPnlService);
      this.inject.service('pnl-service', { as: 'pnlService' });
      let Lightstreamer = createLs();
    });

    it('renders', function() {
      this.set('item', item);
      this.render(hbs`{{working-order-row item=item}}`);
      expect(this.$().text().indexOf('FTSE 100')).to.have.above(0);
    });

    it('calls the delete service', function() {
      let wasClalled = false;
      this.set('delete', () => {
        wasClalled = true;
      });

      this.set('item', item);
      this.render(hbs`{{working-order-row item=item delete=(action delete)}}`);
      Ember.run.next(() => {
        $('button:first').click();
        expect(wasClalled).to.be.true;
      });
    });
  }
);
