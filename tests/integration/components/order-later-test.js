/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';

describeComponent(
  'order-later',
  'Integration: OrderLaterComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      this.render(hbs`{{order-later}}`);
      expect(this.$()).to.have.length(1);
    });

    it('date picker is shown when goodTill is set to date', function() {
      this.set('goodTill', 'Date');
      this.render(hbs`{{order-later goodTill=goodTill}}`);
      expect(this.$('#date-picker')).to.have.length(1);
    });

    it('toggles goodTill', function() {
      this.render(hbs`{{order-later}}`);
      this.$('select').val('Date').change();
      return wait().then(() => {
        expect(this.$('#date-picker')).to.have.length(1);
        this.$('select').val('Cancelled').change();
      })
      .then(wait)
      .then(() => {
        expect(this.$('#date-picker')).to.have.length(0);
      });
    });
  }
);
