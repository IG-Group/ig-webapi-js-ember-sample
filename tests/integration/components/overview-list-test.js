/* jshint expr:true */
import {
	expect
} from 'chai';
import {
	describeComponent,
	it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

describeComponent(
	'overview-list',
	'Integration: OverviewListComponent', {
		integration: true
	},
	function() {
		it('renders with the correct account ID', function() {
			const session = {
				session: {
					content: {
						authenticated: {
							currentAccountId: 'ABCABC',
							accounts: []
						},
					}
				}
			};
			this.set('session', session);
			this.render(hbs `{{overview-list session=session}}`);
      Ember.run(() => {
        expect(this.$().text().trim()).to.be.equal('- ABCABC');
      });
		});
	}
);
