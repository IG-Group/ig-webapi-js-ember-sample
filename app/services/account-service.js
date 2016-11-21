/* jshint unused:vars */
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
   * AJAX call to switch accounts
   * @public
   * @param {String} id - Account Id to switch to
   * @param {Object} callback - method to call when AJAX call returns
   */
  switch (id, callback) {
    const data = {
      "accountId": id,
      "defaultAccount": "true"
    };

    this.get('rest').doPut('/session', JSON.stringify(data), {
      'version': 1
    }).then(function(response, status, data) {
      callback(id, ...arguments);
    });
  },

  /*
   * AJAX retrieve watchlists. With no id passed through array of watchlists is
   * returned. With a watchlist ID the marekts within the list is returned.
   * @public
   * @param {String} id - Optional. Watchlist Id
   * @param {Object} callback - method to call when AJAX call returns
   */
  getWatchLists(id, callback) {
    const url = id ? `/watchlists/${id}` : `/watchlists`;
    this.get('rest').doGet(`${url}`, null, {
      'version': 1
    }).then(function(response, status, data) {
      callback(response);
    });
  },

  /*
   * AJAX call to delete a watchlist
   * @public
   * @param {String} id - Watchlist to delete
   * @param {Object} callback - method to call when AJAX call returns
   */
  deleteWatchlist(id, callback) {
    this.get('rest').doGet(`/watchlists/${id}`, null, {
      'version': 1,
      "_method": "DELETE"
    }).then(function(response, status, data) {
      callback(response);
    });
  },

  /*
   * AJAX call to create a watchlist
   * @public
   * @param {String} name - Name of watchlist
   * @param {Object} callback - method to call when AJAX call returns
   */
  createWatchlist(name, callback) {
    const data = {
      "name": name,
    };

    this.get('rest').doPost(`/watchlists`, JSON.stringify(data), {
      'version': 1,
    }).then(function(response, status, data) {
      callback(response);
    });
  },

  /*
   * AJAX call to add a market to a watchlist
   * @public
   * @param {String} epic - Epic to add to watchlist
   * @param {String} watchlistId - Watchlist to add to
   * @param {Object} callback - method to call when AJAX call returns
   */
  addToWatchList(epic, watchlistId, callback) {

    const data = {
      "epic": epic,
    };

    this.get('rest').doPut(`/watchlists/${watchlistId}`, JSON.stringify(data), {
      'version': 1,
    }).then(function(response, status, data) {
      callback(response);
    });
  },
});
