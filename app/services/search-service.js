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
   * AJAX call for a search
   * @public
   * @param {String} market - search term
   * @param {Object} callback - method to call when AJAX call returns
   */
  search(market, callback) {
    let search = market.replace(/[^\w\s]/gi, '');

    this.get('rest').doGet(`/markets?searchTerm=${search}`, null, {
      'version': 1
    }).then(function(response, status, data) {
      callback(response);
    });
  },
});
