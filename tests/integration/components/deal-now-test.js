/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'deal-now',
  'Integration: DealNowComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#deal-now}}
      //     template content
      //   {{/deal-now}}
      // `);

      this.render(hbs`{{deal-now}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);
