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
    * AJAX call to close a position
    * @public
    * @param {Object} postion - Positon Object you want to close
    * @param {Number} size - closing size
    * @param {Object} callback - method to call when AJAX call returns
    */
   closePosition: function(position, size, callback) {
     const session = this.get('session');
     const apiHost = session.session.content.authenticated.apiHost;
     const direction = (position.direction === 'BUY') ? 'SELL' : 'BUY';
     let req = {};
     req.url = `${apiHost}/positions/otc`;
     req.headers = {
       "Content-Type": "application/json; charset=UTF-8",
       "Accept": "application/json; charset=UTF-8",
       "X-IG-API-KEY": session.session.content.authenticated.api,
       "CST": session.session.content.authenticated.cstToken,
       "X-SECURITY-TOKEN": session.session.content.authenticated.ssoToken,
       "Version": 1,
       "_method": "DELETE"
     };

     const bodyParams = {
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
     req.body = JSON.stringify(bodyParams);

     Ember.$.ajax({
       type: 'POST',
       url: req.url,
       data: req.body,
       headers: req.headers,
       async: false,
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
     const session = this.get('session');
     const apiHost = session.session.content.authenticated.apiHost;
     let req = {};
     req.url = `${apiHost}/workingorders/otc/${dealId}`;
     req.headers = {
       "Content-Type": "application/json; charset=UTF-8",
       "Accept": "application/json; charset=UTF-8",
       "X-IG-API-KEY": session.session.content.authenticated.api,
       "CST": session.session.content.authenticated.cstToken,
       "X-SECURITY-TOKEN": session.session.content.authenticated.ssoToken,
       "Version": 2,
       "_method": "DELETE"
     };

     Ember.$.ajax({
       type: 'DELETE',
       url: req.url,
       data: {},
       headers: req.headers,
       async: false,
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
     const session = this.get('session');
     const apiHost = session.session.content.authenticated.apiHost;
     let req = {};
     req.url = `${apiHost}/positions/otc`;
     req.headers = {
       "Content-Type": "application/json; charset=UTF-8",
       "Accept": "application/json; charset=UTF-8",
       "X-IG-API-KEY": session.session.content.authenticated.api,
       "CST": session.session.content.authenticated.cstToken,
       "X-SECURITY-TOKEN": session.session.content.authenticated.ssoToken,
       "Version": 2,
     };

     const bodyParams = {};
     bodyParams["epic"] = dealParams.epic;
     bodyParams["expiry"] = dealParams.expiry;
     bodyParams["direction"] = dealParams.direction ? 'BUY' : 'SELL';
     bodyParams["size"] = dealParams.size;
     bodyParams["orderType"] = 'MARKET';
     bodyParams["timeInForce"] = null;
     bodyParams["level"] = null;
     bodyParams["guaranteedStop"] = false;
     bodyParams["stopLevel"] = null;
     bodyParams["stopDistance"] = null;
     bodyParams["trailingStop"] = false;
     bodyParams["trailingStopIncrement"] = null;
     bodyParams["forceOpen"] = false;
     bodyParams["limitLevel"] = null;
     bodyParams["limitDistance"] = null;
     bodyParams["quoteId"] = null;
     bodyParams["currencyCode"] = 'GBP';
     req.body = JSON.stringify(bodyParams);

     Ember.$.ajax({
       type: 'POST',
       url: req.url,
       data: req.body,
       headers: req.headers,
       async: false,
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
     const session = this.get('session');
     const apiHost = session.session.content.authenticated.apiHost;
     let req = {};
     req.url = `${apiHost}/workingorders/otc`;
     req.headers = {
       "Content-Type": "application/json; charset=UTF-8",
       "Accept": "application/json; charset=UTF-8",
       "X-IG-API-KEY": session.session.content.authenticated.api,
       "CST": session.session.content.authenticated.cstToken,
       "X-SECURITY-TOKEN": session.session.content.authenticated.ssoToken,
       "Version": 2,
     };

     const bodyParams = {};
     bodyParams["epic"] = dealParams.epic;
     bodyParams["expiry"] = dealParams.expiry;
     bodyParams["direction"] = dealParams.direction ? 'BUY' : 'SELL';
     bodyParams["size"] = dealParams.size;
     bodyParams["level"] = dealParams.level;
     bodyParams["forceOpen"] = null;
     bodyParams["type"] = 'STOP';
     bodyParams["currencyCode"] = 'GBP';
     bodyParams["timeInForce"] = dealParams.goodTill === 'Cancelled' ? 'GOOD_TILL_CANCELLED' : 'GOOD_TILL_DATE';
     bodyParams["goodTillDate"] = dealParams.goodTillDate;
     bodyParams["guaranteedStop"] = false;
     bodyParams["stopLevel"] = null;
     bodyParams["stopDistance"] = null;
     bodyParams["limitLevel"] = null;
     bodyParams["limitDistance"] = null;
     req.body = JSON.stringify(bodyParams);

     Ember.$.ajax({
       type: 'POST',
       url: req.url,
       data: req.body,
       headers: req.headers,
       async: false,
     }).then(function(response, status, data) {
       callback(response, status, data);
     });
   }
 });
