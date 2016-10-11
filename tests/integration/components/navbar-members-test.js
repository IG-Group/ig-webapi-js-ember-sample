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
	'navbar-members',
	'Integration: NavbarMembersComponent', {
		integration: true
	},
	function() {
		it('renders', function() {
			this.render(hbs `{{navbar-members}}`);
			expect(this.$()).to.have.length(1);
		});
		it('can call invalidate session', function() {
			this.register('service:session', Ember.Service.extend({
				invalidate() {
					return Ember.RSVP.Promise.resolve({
						session: {}
					});
				},
			}));
			this.on('invalidate', function(val) {
				const actual = {
					session: {}
				};
				Ember.assert.deepEqual(val, actual);
			});
			this.render(hbs `{{navbar-members}}`);
			this.$('#logout').click();
		});
	}
);
