import Ember from 'ember';

export default Ember.Controller.extend({

  /*
   * account service
   * @public
   * @{service}
   */
  accountService: Ember.inject.service('account-service'),

  /*
   * Array of watchlists
   * @public
   * @Array
   */
  watchlists: [],

  /*
   * Retrieves Watchlist array on init. Therefore, list will only update on
   * re-entry of the route.
   * @public
   * @Promise
   */
  getWatchlistResults: function() {
    this.get('accountService').getWatchLists(null, this.onGetWatchlistResults.bind(this));
  }.on('init'),

  /*
   * Sets local Watchlist array to the array from the AJAX response
   * The response is sorted by name.
   * @public
   */
  onGetWatchlistResults(response) {
    this.set('watchlists', response.watchlists.sort(this.compare));
  },
});
