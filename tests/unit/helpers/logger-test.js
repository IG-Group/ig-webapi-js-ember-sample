/* jshint expr:true */
import {
	expect
} from 'chai';
import {
	describe,
	it,
	beforeEach,
	afterEach
} from 'mocha';
import {
	logger
} from 'soar-trading/helpers/logger';
import sinon from 'sinon';

describe('LoggerHelper', function() {

	beforeEach(() => {
		sinon.spy(console, 'log');
	});

	afterEach(function() {
		console.log.restore();
	});

	it('logs to the console', function() {
		logger(`I'm logging`);
		expect(console.log).to.be.called;
	});
});
