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
  'route:account/orders',
  'AccountOrdersRoute', {},
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

    it('unloads all on delete', function() {
      let route = this.subject();
      let stub = sinon.stub(route.store, 'unloadAll');
      sinon.stub(route, 'refresh');
      route.onDelete();
      sinon.assert.calledOnce(stub);
    });
  }
);
