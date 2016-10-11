/* jshint expr:true */
/*jshint unused:false*/
import {
	describe,
	it,
	beforeEach,
	afterEach
} from 'mocha';
import {
	expect
} from 'chai';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';
import {
	authenticateSession,
	invalidateSession
} from '../helpers/ember-simple-auth';
import createLs from '../helpers/create-ls';
import Ember from 'ember';

let lsMock = Ember.Service.extend({
	lsClient: {
		subscribe() {
			return 1;
		}
	},
	connectToLs: function() {
		console.log("Acceptance Mock!");
	},
	getLsClient: function() {
		return 'lsClient';
	},
});

describe('Acceptance: Login - The different login flows', function() {
	let application;

	beforeEach(() => {
		application = startApp();
		application.register('service:mockLs', lsMock);
		application.inject('route', 'lsClient', 'service:mockLs');
		let Lightstreamer = createLs();
	});

	afterEach(function() {
		destroyApp(application);
	});

	it('can login and then not access login page', function() {
		visit('/');
		authenticateSession(application, {
			userId: 1,
			otherData: 'some-data'
		});
		visit('');
		andThen(function() {
			expect(currentPath()).to.equal('index');
		});
	});

	it('can not visit account section when unauthorized', function() {
		invalidateSession(application);
		visit('/account');
		andThen(function() {
			expect(currentPath()).to.equal('index');
		});
	});
});
