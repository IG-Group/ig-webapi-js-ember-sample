/* jshint expr:true */
/*global Lightstreamer:true */
/*jshint unused:false*/

import {
  expect
} from 'chai';
import {
  describeModule,
  it
} from 'ember-mocha';
import sinon from 'sinon';
import Ember from 'ember';
import createLs from '../../../helpers/create-ls';

describeModule(
  'route:account/search',
  'AccountSearchRoute', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  },
  function() {
    it('exists', function() {
      let route = this.subject();
      expect(route).to.be.ok;
    });

    it('can has a deactivate hook to unsubscribe', sinon.test(function() {
      let route = this.subject();
      let spy = sinon.spy(route, 'unsubscribe');
      route.deactivate();
      spy.restore();
      sinon.assert.calledOnce(spy);
    }));

    it('tries to call model', sinon.test(function() {
      let route = this.subject();
      let stub = sinon.stub(route.store, 'findAll');
      route.model();
      sinon.assert.calledOnce(stub);
    }));

    it('builds up a search object', sinon.test(function() {
      let route = this.subject();
      sinon.stub(route, 'subscribe');
      let mockResponse = {
        markets: [{
          epic: 'FTSE',
          expiry: 'DFB',
          marketStatus: 'CLOSED',
          streamingPricesAvailable: false
        }]
      };
      let mockResults = {
        raw: [{
          epic: "FTSE",
          expiry: "DFB",
          marketStatus: "CLOSED",
          state: "assets/images/close.png",
          streamingPricesAvailable: false,
          tidyEpic: "FTSE",
          tidyExpiry: "DFB"
        }],
        streamingItems: []
      };
      route.onSearch(mockResponse);
      expect(route.results.raw).to.deep.equal(mockResults.raw);
    }));

    it('builds up a search object - edit', sinon.test(function() {
      let route = this.subject();
      route.results = Ember.Object.create({
        raw: [],
        streamingItems: []
      });
      sinon.stub(route, 'subscribe');
      let mockResponse = {
        markets: [{
          epic: 'FTSE',
          expiry: 'DFB',
          marketStatus: 'EDITS_ONLY',
          streamingPricesAvailable: false
        }]
      };
      let mockResults = {
        raw: [{
          epic: "FTSE",
          expiry: "DFB",
          marketStatus: "EDITS_ONLY",
          state: "assets/images/edit.png",
          streamingPricesAvailable: false,
          tidyEpic: "FTSE",
          tidyExpiry: "DFB"
        }],
        streamingItems: []
      };
      route.onSearch(mockResponse);
      expect(route.results.raw).to.deep.equal(mockResults.raw);
    }));

    it('builds up a search object - TRADEABLE', sinon.test(function() {
      let route = this.subject();
      route.results = Ember.Object.create({
        raw: [],
        streamingItems: []
      });
      sinon.stub(route, 'subscribe');
      let mockResponse = {
        markets: [{
          epic: 'FTSE',
          expiry: 'DFB',
          marketStatus: 'TRADEABLE',
          streamingPricesAvailable: false
        }]
      };
      let mockResults = {
        raw: [{
          epic: "FTSE",
          expiry: "DFB",
          marketStatus: "TRADEABLE",
          state: "assets/images/open.png",
          streamingPricesAvailable: false,
          tidyEpic: "FTSE",
          tidyExpiry: "DFB"
        }],
        streamingItems: []
      };
      route.onSearch(mockResponse);
      expect(route.results.raw).to.deep.equal(mockResults.raw);
    }));

    it('builds up a search object - Streaming', sinon.test(function() {
      let route = this.subject();
      route.results = Ember.Object.create({
        raw: [],
        streamingItems: []
      });
      sinon.stub(route, 'subscribe');
      let mockResponse = {
        markets: [{
          epic: 'FTSE',
          expiry: 'DFB',
          marketStatus: 'TRADEABLE',
          streamingPricesAvailable: true
        }]
      };
      let mockResults = {
        raw: [],
        streamingItems: ['L1:FTSE']
      };
      route.onSearch(mockResponse);
      expect(route.results.streamingItems).to.deep.equal(mockResults.streamingItems);
    }));

    it('can easily unsubscribe', sinon.test(function() {
      let route = this.subject({
        lsClient: sinon.stub()
      });
      route.lsClient.getLsClient = function() {
        let mock = {
          unsubscribe() {
            return true;
          }
        };
        return mock;
      };
      route.results = {
        raw: [{
          epic: "FTSE",
          expiry: "DFB",
          marketStatus: "TRADEABLE",
          state: "assets/images/open.png",
          streamingPricesAvailable: false,
          tidyEpic: "FTSE",
          tidyExpiry: "DFB"
        }],
        streamingItems: ['L1:FTSE']
      };
      let stub = sinon.stub(route.store, 'unloadAll');
      route.subscription = true;
      route.unsubscribe();
      expect(route.subscription).to.be.equal(null);
      expect(route.results.raw.length).to.be.equal(0);
      expect(route.results.streamingItems.length).to.be.equal(0);
      sinon.assert.calledOnce(stub);
    }));

    it('attempts to update the store onUpdate', sinon.test(function() {
      let route = this.subject();
      let wasCalled = false;
      this.stub(route.store, 'find').returns({
        then(fn) {
          fn({
            save: function() {
              wasCalled = true;
            }
          });
        }
      });
      let item = {
        getItemPos: function() {
          return 1;
        },
        forEachChangedField: function() {
          return 1;
        }
      };
      route.onUpdate(item);
      expect(wasCalled).to.be.true;
    }));

    it('can update the store', sinon.test(function() {
      let route = this.subject();
      let spy = sinon.spy(route.store, 'set');
      route.updateStore(route.store, 'BID', 100);
      sinon.assert.calledWith(spy, 'bidChange', 'fall');
      sinon.assert.calledWith(spy, 'BID', 100);
      sinon.assert.calledWith(spy, 'bidChange', 'fall');
    }));

    it('can set up a subscription', sinon.test(function() {
      let route = this.subject({
        lsClient: sinon.stub()
      });
      sinon.stub(route.store, 'hasRecordForId');
      sinon.stub(route.store, 'normalize');
      let spypush = sinon.stub(route.store, 'push');
      let Lightstreamer = createLs();
      route.lsClient.getLsClient = function() {
        let mock = {
          subscribe() {
            return true;
          }
        };
        return mock;
      };
      route.subscribe(true);
      sinon.assert.calledOnce(spypush);
    }));
  }
);
