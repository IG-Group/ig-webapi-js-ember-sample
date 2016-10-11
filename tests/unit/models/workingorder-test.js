/* jshint expr:true */
import { expect } from 'chai';
import {
  describeModel,
  it
} from 'ember-mocha';

describeModel(
  'workingorder',
  'Workingorder',
  {
    // Specify the other units that are required for this test.
      needs: []
  },
  function() {
    // Replace this with your real tests.
    it('exists', function() {
      let model = this.subject();
      // const store = this.store();
      expect(model).to.be.ok;
    });
  }
);
