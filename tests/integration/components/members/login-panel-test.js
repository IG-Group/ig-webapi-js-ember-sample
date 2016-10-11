/* jshint expr:true */
import {
	expect
} from 'chai';
import {
	describeComponent,
	it
} from 'ember-mocha';
import {
	beforeEach,
} from 'mocha';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

describeComponent(
	'members/login-panel',
	'Integration: MembersLoginPanelComponent', {
		integration: true,
	},
	function() {
		beforeEach(function() {
			this.set('password', 'password');
			this.set('username', 'password');
			this.set('api', 'passwordpassword');
		});

		it('renders with login disabled', function() {
			this.render(hbs `{{members/login-panel}}`);
			expect(this.$('#login-submit').prop('disabled')).to.be.true;
		});

		it('renders with login disabled with password entered', function() {
			this.render(hbs `{{members/login-panel password=password}}`);
			expect(this.$('#login-submit').prop('disabled')).to.be.true;
		});

		it('renders with login disabled with username entered', function() {
			this.render(hbs `{{members/login-panel username=username}}`);
			expect(this.$('#login-submit').prop('disabled')).to.be.true;
		});

		it('renders with login disabled with api entered', function() {
			this.render(hbs `{{members/login-panel api=api}}`);
			expect(this.$('#login-submit').prop('disabled')).to.be.true;
		});

		it('renders with login disabled with api less than 15 char', function() {
			this.set('api', 'password');
			this.render(hbs `{{members/login-panel password=password username=username api=api}}`);
			expect(this.$('#login-submit').prop('disabled')).to.be.true;
		});

		it('renders with login disabled with password with special char', function() {
			this.set('password', 'password--==');
			this.render(hbs `{{members/login-panel password=password username=username api=api}}`);
			expect(this.$('#login-submit').prop('disabled')).to.be.true;
		});

		it('renders with login enabled with all entered', function() {
			this.render(hbs `{{members/login-panel password=password username=username api=api}}`);
			expect(this.$('#login-submit').prop('disabled')).to.be.false;
		});

		it('renders with login enabled can call authenticate', function() {
			let wasCalled = false;
			let session = Ember.Object.create({
				authenticate() {
					wasCalled = true;
					return {
						catch () {}
					};
				}
			});
			this.set('session', session);
			this.render(hbs `{{members/login-panel session=session password=password username=username api=api}}`);
			this.$('#login-submit').click();
			expect(wasCalled).to.be.true;
		});

		it('authentication will fail with no credentials', function() {
			let wasCalled = false;
			let session = Ember.Object.create({
				authenticate() {
					return {
						catch () {
							wasCalled = true;
						}
					};
				}
			});
			this.set('session', session);
			this.render(hbs `{{members/login-panel session=session password=password username=username api=api}}`);
			this.$('#login-submit').click();
			expect(wasCalled).to.be.true;
		});
	}
);
