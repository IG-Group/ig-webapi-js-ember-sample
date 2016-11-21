 /*jshint unused:false*/
 import Ember from 'ember';

 export default Ember.Service.extend({

   /*
    * session service
    * @public
    * @{service}
    */
   session: Ember.inject.service('session'),

   /*
    * rest service
    * @public
    * @{service}
    */
   rest: Ember.inject.service('rest'),

   /*
    * AJAX call to close a position
    * @public
    * @param {Object} postion - Positon Object you want to close
    * @param {Number} size - closing size
    * @param {Object} callback - method to call when AJAX call returns
    */
   closePosition: function(position, size, callback) {
     const direction = (position.direction === 'BUY') ? 'SELL' : 'BUY';
     const data = {
       dealId: position.dealId,
       epic: null,
       expiry: null,
       direction: direction,
       size: size,
       level: null,
       orderType: "MARKET",
       timeInForce: null,
       quoteId: null
     };
     this.get('rest').doPost(`/positions/otc`, JSON.stringify(data), {
       'version': 1,
       "_method": "DELETE"
     }).then(function(response, status, data) {
       callback(response, position, size);
     });
   },

   /*
    * AJAX call to close a working order
    * @public
    * @param {String} dealId - Id of the working order. (Propert on WO Object)
    * @param {Object} callback - method to call when AJAX call returns
    */
   closeOrder: function(dealId, callback) {
     this.get('rest').doPost(`/workingorders/otc/${dealId}`, null, {
       'version': 2,
       "_method": "DELETE"
     }).then(function(response, status, data) {
       callback(response);
     });
   },

   /*
    * AJAX call to open a position
    * @public
    * @param {Object} dealParams - Variables used to create the position
    * @param {Object} callback - method to call when AJAX call returns
    */
   openPosition(dealParams, callback) {
     const data = {};
     data["epic"] = dealParams.epic;
     data["expiry"] = dealParams.expiry;
     data["direction"] = dealParams.direction ? 'BUY' : 'SELL';
     data["size"] = dealParams.size;
     data["orderType"] = 'MARKET';
     data["timeInForce"] = null;
     data["level"] = null;
     data["guaranteedStop"] = false;
     data["stopLevel"] = null;
     data["stopDistance"] = null;
     data["trailingStop"] = false;
     data["trailingStopIncrement"] = null;
     data["forceOpen"] = false;
     data["limitLevel"] = null;
     data["limitDistance"] = null;
     data["quoteId"] = null;
     data["currencyCode"] = 'GBP';

     this.get('rest').doPost(`/positions/otc`, JSON.stringify(data), {
       'version': 2
     }).then(function(response, status, data) {
       callback(response, status, data);
     });
   },

   /*
    * AJAX call to creat a working order
    * @public
    * @param {Object} dealParams - Variables used to create the position
    * @param {Object} callback - method to call when AJAX call returns
    */
   workingOrder(dealParams, callback) {
     const data = {};
     data["epic"] = dealParams.epic;
     data["expiry"] = dealParams.expiry;
     data["direction"] = dealParams.direction ? 'BUY' : 'SELL';
     data["size"] = dealParams.size;
     data["level"] = dealParams.level;
     data["forceOpen"] = null;
     data["type"] = 'STOP';
     data["currencyCode"] = 'GBP';
     data["timeInForce"] = dealParams.goodTill === 'Cancelled' ? 'GOOD_TILL_CANCELLED' : 'GOOD_TILL_DATE';
     data["goodTillDate"] = dealParams.goodTillDate;
     data["guaranteedStop"] = false;
     data["stopLevel"] = null;
     data["stopDistance"] = null;
     data["limitLevel"] = null;
     data["limitDistance"] = null;

     this.get('rest').doPost(`/workingorders/otc`, JSON.stringify(data), {
       'version': 2
     }).then(function(response, status, data) {
       callback(response, status, data);
     });
   }
 });
