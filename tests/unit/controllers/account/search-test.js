/* jshint expr:true */
import { expect } from 'chai';
import {
  describeModule,
  it
} from 'ember-mocha';
import sinon from 'sinon';

describeModule(
  'controller:account/search',
  'AccountSearchController',
  {
    // Specify the other units that are required for this test.
    // needs: []
  },
  function() {
    // Replace this with your real tests.
    it('exists', function() {
      let controller = this.subject({
        accountService: {
          getWatchLists: sinon.stub(),
        }
      });
      expect(controller).to.be.ok;
    });
  }
);
