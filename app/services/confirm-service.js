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
   * AJAX call to confirm a trade
   * @public
   * @param {String} dealRef - passed through to confirm the trade
   * @param {Object} postion - passed on to the callback
   * @param {Nunber} size - passed on to the callback
   * @param {Object} callback - method to call to deal with a field update
   */
	confirm: function(dealRef, position, size, callback) {
    this.get('rest').doGet(`/confirms/${dealRef}`, null, {
      'version': 1
    }).then(function(response, status, data) {
      callback(response, position, size);
    });
	}
});
