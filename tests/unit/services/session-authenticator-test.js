/* jshint expr:true */
import {
  expect
} from 'chai';
import {
  describeModule,
  it
} from 'ember-mocha';
import sinon from 'sinon';

describeModule(
  'service:session-authenticator',
  'SessionAuthenticatorService', {
    // Specify the other units that are required for this test.
    needs: ['service:session']
  },
  function() {
    it('can reset an invalid state', function() {
      let service = this.subject();
      service.session = {
        authenticationFailed: true,
        set: function(prop, val) {
          this.authenticationFailed = val;
        }
      };
      service.resetInvalidSessionState();
      expect(service.session.authenticationFailed).to.be.equal(null);
    });

    it('can handle an auth rejection', function() {
      let service = this.subject();
      service.session = {
        authenticationFailed: false,
        set: function(prop, val) {
          this.authenticationFailed = val;
        }
      };
      let spy = sinon.spy();
      service.handleAuthRejection(spy);
      expect(service.session.authenticationFailed).to.be.equal(true);

      sinon.assert.calledOnce(spy);
    });

    it('can get request headers data', function() {
      let service = this.subject();
      let mockAuthData = {
        api: 'mockAPI',
        username: 'user',
        password: 'pass'
      };
      let mockData = {
        identifier: "user",
        password: "pass"
      };
      expect(service.getRequestHeaders(mockAuthData).data).to.deep.equal(JSON.stringify(mockData));
    });

    it('can get request headers headers', function() {
      let service = this.subject();
      let mockAuthData = {
        api: 'mockAPI',
        username: 'user',
        password: 'pass'
      };
      let mockData = {
        "Content-Type": "application/json; charset=UTF-8",
        "Accept": "application/json; charset=UTF-8",
        "X-IG-API-KEY": 'mockAPI',
        "Version": "2"
      };
      expect(service.getRequestHeaders(mockAuthData).headers).to.deep.equal(mockData);
    });

    it('can handle an auth success and call resovle', function() {
      let service = this.subject();
      let mockAuthData = {
        api: 'mockAPI'
      };
      let mockResponse = {
        clientId: 'ABCABC',
        currentAccountId: 'XYZXYZ',
        lightstreamerEndpoint: 'mockEnd'
      };
      let mockCallback = sinon.spy();
      let jqXHR = {
        getResponseHeader: function(prop) {
          return `mock${prop}`;
        }
      };
      service.handleAuthSuccess(mockAuthData, mockCallback, mockResponse, jqXHR);
      sinon.assert.calledOnce(mockCallback);
    });

    it('makes an ajax call to authenticate', sinon.test(function() {
      let service = this.subject();
      let mockAuthData = {
        api: 'mockAPI',
        username: 'user',
        password: 'pass'
      };

      const ajax = this.spy($, 'ajax');

      service.authenticate(mockAuthData, true, true);
      sinon.assert.calledOnce(ajax);
    }));

    it('calls handleAuthSuccess on success', sinon.test(function() {
      let service = this.subject();
      let mockAuthData = {
        api: 'mockAPI',
        username: 'user',
        password: 'pass'
      };
      let jqXHR = {
        getResponseHeader: function(prop) {
          return `mock${prop}`;
        }
      };

      this.stub($, 'ajax').returns({
        then(fn) {
          fn({
            response: 'mock'
          }, true, jqXHR);
        }
      });

      const ajax = this.spy(service, 'handleAuthSuccess');
      let resolve = sinon.stub();
      let reject = sinon.stub();

      service.authenticate(mockAuthData, resolve, reject);
      sinon.assert.calledOnce(ajax);
    }));


  }
);
