/* jshint expr:true */
import {
  describeModule,
  it
} from 'ember-mocha';
import sinon from 'sinon';


describeModule(
  'service:confirm-service',
  'ConfirmServiceService', {
    needs: ['service:rest', 'service:session']
  },
  function() {
    const mockDealRef = 'ABCABC';
    const session = {
      content: {
        authenticated: {
          api: 'demo',
          cstToken: 'mockCst',
          ssoToken: 'mockSso'
        }
      }
    };

    it('calls confirm endpoint', sinon.test(function() {
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

      service.confirm(mockDealRef, 'BUY', 2, function() {});
      sinon.assert.calledOnce(ajax);
    }));

    it('calls the callback', sinon.test(function() {
      var sessionService = this.container.lookup('service:session');
      sessionService.session = session;

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

      service.confirm(mockDealRef, 'BUY', 2, call);
      sinon.assert.calledOnce(call);
    }));
  }
);
