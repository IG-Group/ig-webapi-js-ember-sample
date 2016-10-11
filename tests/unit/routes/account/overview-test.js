/* jshint expr:true */
//import { expect } from 'chai';
import {
  describeModule,
  it
} from 'ember-mocha';
import sinon from 'sinon';

describeModule(
  'route:account/overview',
  'AccountOverviewRoute',
  {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  },
  function() {
    it('tries to call model', sinon.test(function() {
      let route = this.subject();
      let stub = sinon.stub(route.store, 'findAll');
      route.model();
      sinon.assert.calledOnce(stub);
    }));
  }
);
