/* jshint expr:true */
// import { expect } from 'chai';
import {
  describeModule,
  it
} from 'ember-mocha';
import sinon from 'sinon';

describeModule(
  'service:account-service',
  'AccountServiceService',
  {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  },
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

    it('calls watchlist endpoint', sinon.test(function() {
      let service = this.subject();
      service.session = session;

      const ajax = this.spy($, 'ajax');

      service.getWatchLists(null, true);
      sinon.assert.calledOnce(ajax);
    }));

    it('calls watchlist endpoint for delete', sinon.test(function() {
      let service = this.subject();
      service.session = session;

      const ajax = this.spy($, 'ajax');

      service.deleteWatchlist('null', true);
      sinon.assert.calledOnce(ajax);
    }));

    it('calls watchlist endpoint for create', sinon.test(function() {
      let service = this.subject();
      service.session = session;

      const ajax = this.spy($, 'ajax');

      service.createWatchlist('null', true);
      sinon.assert.calledOnce(ajax);
    }));

    it('calls watchlist endpoint for adding', sinon.test(function() {
      let service = this.subject();
      service.session = session;

      const ajax = this.spy($, 'ajax');

      service.addToWatchList('null', 'null', true);
      sinon.assert.calledOnce(ajax);
    }));

    it('calls switch endpoint', sinon.test(function() {
      let service = this.subject();
      service.session = session;

      const ajax = this.spy($, 'ajax');

      service.switch('1234', true);
      sinon.assert.calledOnce(ajax);
    }));
  }
);
