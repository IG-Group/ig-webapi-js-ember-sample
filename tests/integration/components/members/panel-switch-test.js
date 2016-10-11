/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'members/panel-switch',
  'Integration: MembersPanelSwitchComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#members/panel-switch}}
      //     template content
      //   {{/members/panel-switch}}
      // `);

      this.render(hbs`{{members/panel-switch}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);
