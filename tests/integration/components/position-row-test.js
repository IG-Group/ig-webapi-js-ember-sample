/* jshint expr:true */
/*jshint unused:false*/

import {
  expect
} from 'chai';
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
  'position-row',
  'Integration: PositionRowComponent', {
    integration: true
  },
  function() {

    const item = {
      market: {
        instrumentName: 'FTSE 100',
        expiry: 'DFB',
      },
      position: {
        direction: 'BUY',
        dealSize: 1,
        openLevel: '100',
      },
      marketData: {
        latest: '100',
        pnl: '0'
      }
    };

    beforeEach(function() {
      this.register('service:pnl-service', mockPnlService);
      this.inject.service('pnl-service', { as: 'pnlService' });
      let Lightstreamer = createLs();
    });

    it('renders', function() {
      this.set('item', item);
      this.render(hbs `{{position-row item=item}}`);
      expect(this.$().text().indexOf('FTSE 100')).to.have.above(0);
    });

    it('can switch to edit mode', function() {
      this.set('item', item);
      this.render(hbs `{{position-row item=item}}`);
      $('button:first').click();
      expect(this.$('tr form div').children().length).to.be.equal(3);
    });

    it('can switch to edit mode and back', function() {
      this.set('item', item);
      this.render(hbs `{{position-row item=item}}`);
      $('button:first').click();
      $('button:nth-child(3)').click();
      expect(this.$('tr form div').children().length).to.be.equal(1);
    });

    it('changes to enabled with valid size input', function() {
      this.set('item', item);
      this.render(hbs `{{position-row item=item}}`);
      $('button:first').click();
      this.$('input:first').val(0.1);
      this.$('input:first').trigger('keyup');
      this.$('input:first').change();
      Ember.run.next(() => {
        expect($('button:nth-child(2)').is(':disabled')).to.be.false;
      });
    });

    it('stays disabled with invalid size', function() {
      this.set('item', item);
      this.render(hbs `{{position-row item=item}}`);
      $('button:first').click();
      this.$('input:first').val(10);
      this.$('input:first').trigger('keyup');
      this.$('input:first').change();

      Ember.run.next(() => {
        expect($('button:nth-child(2)').is(':disabled')).to.be.true;
      });
    });

    it('calls close when clicked', function() {
      let wasClalled = false;
      this.set('close', () => {
        wasClalled = true;
      });

      this.set('item', item);
      this.render(hbs `{{position-row item=item close=(action close)}}`);
      $('button:first').click();
      this.$('input:first').val(0.1);
      this.$('input:first').trigger('keyup');
      this.$('input:first').change();
      Ember.run.next(() => {
        $('button:nth-child(2)').click();
        expect(wasClalled).to.be.true;
      });
    });
  }
);
