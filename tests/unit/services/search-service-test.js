/* jshint expr:true */
import {
  expect
} from 'chai';
import {
  describeModule,
  it
} from 'ember-mocha';
import sinon from'sinon';

describeModule(
  'service:search-service',
  'SearchServiceService', {},
  function() {
    const session = {
      session: {
        content: {
          authenticated: {
            api: 'demo',
            cstToken: 'mockCst',
            ssoToken: 'mockSso'
          }
        }
      }
    };

    it('calls search endpoint', sinon.test(function() {
      let service = this.subject();
      service.session = session;

      const ajax = this.spy($, 'ajax');

      service.search('FTSE', true);
      sinon.assert.calledOnce(ajax);
    }));


    it('set the correct headers for the ajax call', sinon.test(function() {
      let service = this.subject();
      service.session = session;
      let headers = {
        "Content-Type": "application/json; charset=UTF-8",
        "Accept": "application/json; charset=UTF-8",
        "X-IG-API-KEY": 'demo',
        "CST": 'mockCst',
        "X-SECURITY-TOKEN": 'mockSso',
      };

      const ajax = this.spy($, 'ajax');

      service.search('FTSE', true);
      expect((ajax.getCall(0).args[0]).headers).to.deep.equal(headers);
    }));

    it('calls the callback', sinon.test(function() {
      let service = this.subject();
      service.session = session;
      this.stub($, 'ajax').returns({
        then(fn) {
          fn({
            dealReference: 'QWEQWE'
          }, true, true);
        }
      });
      let call = sinon.spy();

      service.search('FTSE', call);
      sinon.assert.calledOnce(call);
    }));
  }
);
