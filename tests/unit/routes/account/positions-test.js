/* jshint expr:true */
import { expect } from 'chai';
import {
  describeModule,
  it
} from 'ember-mocha';
import sinon from 'sinon';

describeModule(
  'route:account/positions',
  'AccountPositionsRoute',
  {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  },
  function() {
    it('exists', function() {
      let route = this.subject();
      expect(route).to.be.ok;
    });

    it('attempts to get the model', function() {
      let route = this.subject();
      let stub = sinon.stub(route.store, 'findAll');
      route.model();
      sinon.assert.calledOnce(stub);
    });

    it('unloads all on deactivate', function() {
      let route = this.subject();
      let stub = sinon.stub(route.store, 'unloadAll');
      sinon.stub(route, 'refresh');
      route.deactivate();
      sinon.assert.calledOnce(stub);
    });

    it('unloads all on deactivate', function() {
      let route = this.subject();
      let stub = sinon.stub(route.store, 'unloadAll');
      sinon.stub(route, 'refresh');
      route.deactivate();
      sinon.assert.calledOnce(stub);
    });

    it('confirms on close', function() {
      let route = this.subject({
        confirmService: {
          confirm: sinon.stub(),
        }
      });
      const response = { dealReference: '1234'};
      route.onClose(response, true, true);
      sinon.assert.calledOnce(route.confirmService.confirm);
    });

  }
);
