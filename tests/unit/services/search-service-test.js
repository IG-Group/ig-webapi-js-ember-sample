/* jshint expr:true */
import {
  describeModule,
  it
} from 'ember-mocha';
import sinon from 'sinon';

describeModule(
  'service:search-service',
  'SearchServiceService', {
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

    it('calls search endpoint', sinon.test(function() {
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
      service.search('FTSE', function() {});
      sinon.assert.calledOnce(ajax);
    }));

    it('calls the callback', sinon.test(function() {
      var sessionService = this.container.lookup('service:session');
      sessionService.session = session;

      let service = this.subject();

      this.stub($, 'ajax').returns({
        then(fn) {
          fn({
            success: true
          }, true, true);
        },
        catch (fn) {
          console.log(fn);
        }
      });
      let call = sinon.spy();

      service.search('FTSE', call);
      sinon.assert.calledOnce(call);
    }));
  }
);
