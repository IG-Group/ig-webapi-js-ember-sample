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
  'service:deal-service',
  'DealServiceService', {
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
    const mockSize = 1;
    let mockPosition = {
      direction: 'BUY',
      dealId: 'ABCABC'
    };
    const mockDealId = 'ABCABC';

    it('calls otc endpoint', sinon.test(function() {
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

      service.closePosition(mockPosition, mockSize, function() {});
      sinon.assert.calledOnce(ajax);
    }));

    it('selects the correct close direction when original was buy', sinon.test(function() {
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

      service.closePosition(mockPosition, mockSize, function() {});
      expect(JSON.parse(ajax.getCall(0).args[0].data).direction).to.be.equal('SELL');
    }));

    it('selects the correct close direction when original was Sell', sinon.test(function() {
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
      mockPosition.direction = 'SELL';
      service.closePosition(mockPosition, mockSize, function() {});
      expect(JSON.parse(ajax.getCall(0).args[0].data).direction).to.be.equal('BUY');
    }));

    it('calls WO endpoint', sinon.test(function() {
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

      service.closeOrder(mockDealId, function() {});
      sinon.assert.calledOnce(ajax);
    }));

    it('calls the callback when closing a position', sinon.test(function() {
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

      service.closePosition('BUY', 2, call);
      sinon.assert.calledOnce(call);
    }));

    it('calls the callback when closing a WO', sinon.test(function() {
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

      service.closeOrder('BUY', call);
      sinon.assert.calledOnce(call);
    }));

    it('calls the callback when opening a position', sinon.test(function() {
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

      service.openPosition({
        epic: 'XYZXYZ',
        expiry: 'DFB',
        direction: true,
        size: 1,
      }, call);
      sinon.assert.calledOnce(call);
    }));

    it('calls the callback when opening a WO', sinon.test(function() {
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

      service.workingOrder({
        epic: 'XYZXYZ',
        expiry: 'DFB',
        direction: true,
        size: 1,
        level: 1000,
        goodTill: 'Cancelled',
        goodTillDate: null,
      }, call);
      sinon.assert.calledOnce(call);
    }));
  }
);
