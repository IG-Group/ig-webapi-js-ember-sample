/* jshint expr:true */
// import {
//   expect
// } from 'chai';
import {
  describeModule,
  it
} from 'ember-mocha';
import sinon from 'sinon';

describeModule(
  'controller:account/search/deal',
  'AccountSearchDealController', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  },
  function() {
    it('calls confirm service on a deal', function() {
      let controller = this.subject({
        confirmService: {
          confirm: sinon.stub(),
        }
      });
      controller.onDeal({
        dealReference: '123'
      });
      sinon.assert.calledOnce(controller.confirmService.confirm);
    });

    it('sends out a success notif', function() {
      let controller = this.subject({
        notify: {
          success: sinon.stub(),
        }
      });
      controller.onConfirm({
        dealStatus: 'ACCEPTED'
      });
      sinon.assert.calledOnce(controller.notify.success);
      sinon.assert.calledWith(controller.notify.success, 'ACCEPTED');
    });

    it('sends out a failure notif', function() {
      let controller = this.subject({
        notify: {
          error: sinon.stub(),
        }
      });
      controller.onConfirm({
        dealStatus: 'FAILED'
      });
      sinon.assert.calledOnce(controller.notify.error);
      sinon.assert.calledWith(controller.notify.error, 'FAILED');
    });
  }
);
