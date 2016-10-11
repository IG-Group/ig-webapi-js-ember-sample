import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'tr',
  classNames: ['result'],

  /*
   * notify service
   * @public
   * @{service}
   */
  notify: Ember.inject.service('notify'),
  
  /*
   * accountService
   * @public
   * @Object
   */
  accountService: Ember.inject.service('account-service'),
  /*
   * Result Object (See Search Model for properties)
   * @public
   * {result}
   */
  result: null,

  /*
   * Array of watchlists
   * @public
   * @Array
   */
  watchlists: null,

  /*
   * Sets local Watchlist array to the array from the AJAX response
   * The response is sorted by name.
   * @public
   */
  onEditWatchlist(response) {
    if (response.status === "SUCCESS") {
      this.get('notify').success(response.status);
    } else {
      this.get('notify').error(response.status);
    }
  },

  /*
   * sends deal action to the route
   * @public
   */
  click() {
    this.sendAction('deal', this.get('result'));
  },

  actions: {
    addToWatchlist(epic, watchlistId) {
      this.get('accountService').addToWatchList(epic, watchlistId, this.onEditWatchlist.bind(this));
    }
  },
});
