/* jshint expr:true */
// import { expect } from 'chai';
import {
  describeModule,
  it
} from 'ember-mocha';
import sinon from 'sinon';

describeModule(
  'service:account-service',
  'AccountServiceService', {
    // Specify the other units that are required for this test.
    needs: ['service:rest', 'service:session']
  },
  function() {
    const session = {

      content: {
        authenticated: {
          api: 'demo',
          cstToken: 'mockCst',
          ssoToken: 'mockSso'
        }
      }

    };

    it('calls watchlist endpoint', sinon.test(function() {
      var sessionService = this.container.lookup('service:session');
      sessionService.session = session;

      let service = this.subject();

      const ajax = this.stub($, 'ajax').returns({
        then(fn) {
          fn({
            success: true
          }, true, true);
        },
        catch (fn) {
          console.log(fn);
        }
      });

      service.getWatchLists(null, function() {});
      sinon.assert.calledOnce(ajax);
    }));

    it('calls watchlist endpoint for delete', sinon.test(function() {
      var sessionService = this.container.lookup('service:session');
      sessionService.session = session;

      let service = this.subject();

      const ajax = this.stub($, 'ajax').returns({
        then(fn) {
          fn({
            success: true
          }, true, true);
        },
        catch (fn) {
          console.log(fn);
        }
      });

      service.deleteWatchlist('null', function() {});
      sinon.assert.calledOnce(ajax);
    }));

    it('calls watchlist endpoint for create', sinon.test(function() {
      var sessionService = this.container.lookup('service:session');
      sessionService.session = session;

      let service = this.subject();

      const ajax = this.stub($, 'ajax').returns({
        then(fn) {
          fn({
            success: true
          }, true, true);
        },
        catch (fn) {
          console.log(fn);
        }
      });

      service.createWatchlist('null', function() {});
      sinon.assert.calledOnce(ajax);
    }));

    it('calls watchlist endpoint for adding', sinon.test(function() {
      var sessionService = this.container.lookup('service:session');
      sessionService.session = session;

      let service = this.subject();

      const ajax = this.stub($, 'ajax').returns({
        then(fn) {
          fn({
            success: true
          }, true, true);
        },
        catch (fn) {
          console.log(fn);
        }
      });

      service.addToWatchList('null', 'null', function() {});
      sinon.assert.calledOnce(ajax);
    }));

    it('calls switch endpoint', sinon.test(function() {
      var sessionService = this.container.lookup('service:session');
      sessionService.session = session;

      let service = this.subject();

      const ajax = this.stub($, 'ajax').returns({
        then(fn) {
          fn({
            success: true
          }, true, true);
        },
        catch (fn) {
          console.log(fn);
        }
      });

      service.switch('1234', function() {});
      sinon.assert.calledOnce(ajax);
    }));
  }
);
