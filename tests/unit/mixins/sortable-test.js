/* jshint expr:true */
import {
  expect
} from 'chai';
import {
  describe,
  it
} from 'mocha';
import Ember from 'ember';
import SortableMixin from 'soar-trading/mixins/sortable';

describe('SortableMixin', function() {
  it('sorts by Id', function() {
    let SortableObject = Ember.Object.extend(SortableMixin);
    let subject = SortableObject.create();
    let array = [{
      id: 1,
      name: 'Z'
    }, {
      id: 2,
      name: 'A'
    }, {
      id: 3,
      name: 'E'
    }, {
      id: 4,
      name: 'Y'
    }];
    let expected = [{
      id: 2,
      name: 'A'
    }, {
      id: 3,
      name: 'E'
    }, {
      id: 4,
      name: 'Y'
    }, {
      id: 1,
      name: 'Z'
    }];

    expect(expected).to.deep.equal(array.sort(subject.compare));
  });
});
