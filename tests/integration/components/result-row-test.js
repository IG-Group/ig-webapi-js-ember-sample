/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'result-row',
  'Integration: ResultRowComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#result-row}}
      //     template content
      //   {{/result-row}}
      // `);

      this.render(hbs`{{result-row}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);
