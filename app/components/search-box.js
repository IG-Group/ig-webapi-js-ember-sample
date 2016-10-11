import Ember from 'ember';
import compare from '../mixins/sortable';
export default Ember.Component.extend(compare, {

  /*
   * Search term
   * @public
   * @String
   */
  market: '',

  /*
   * Name of new Watchlist
   * @public
   * {String}
   */
  newWatchlistName: null,

  /*
   * accountService
   * @public
   * @Object
   */
  accountService: Ember.inject.service('account-service'),

  /*
   * notify service
   * @public
   * @{service}
   */
  notify: Ember.inject.service('notify'),

  /*
   * If the user is creating a new watchlist
   * @public
   * @{boolean}
   */
  isEditing: false,

  /*
   * Array of watchlists
   * @public
   * @Array
   */
  watchlists: [],

  /*
   * Whether to display watchlists in the DOM
   * @public
   * @Boolean
   */
  showWatchlists: false,

  /*
   * Sets local Watchlist array to the array from the AJAX response
   * The response is sorted by name.
   * @public
   */
  onGetWatchlist(response) {
    this.set('watchlists', response.watchlists.sort(this.compare));
  },

  /*
   * Sets local Watchlist array to the array from the AJAX response
   * The response is sorted by name.
   * @public
   */
  onEditWatchlist(response) {
    if (response.status === "SUCCESS") {
      this.get('notify').success(response.status);
      this.getWatchlists();
    } else {
      this.get('notify').error(response.status);
    }
  },

  /*
   * Retrieves Watchlist array on init. Therefore, list will only update on
   * re-entry of the route.
   * @public
   * @Promise
   */
  getWatchlists: function() {
    this.get('accountService').getWatchLists(null, this.onGetWatchlist.bind(this));
  }.on('init'),

  actions: {

    /*
     * Sends the search action to the route along with the search term
     * @public
     */
    search() {
      this.sendAction('search', this.get('market'));
    },

    /*
     * Whenther Watchlists should be shown of not
     * @public
     * @returns boolean
     */
    viewWatchlist() {
      if (this.get('showWatchlists')) {
        return this.set('showWatchlists', false);
      }
      return this.set('showWatchlists', true);
    },

    /*
     * Sends action to the route to view the markets within a specifc watchlist
     * (id)
     * @public
     */
    viewWatchlistMarkets(id) {
      this.sendAction('viewWatchlistMarkets', id);
    },


    /*
     * Sends action to the route to delete a watchlist
     * (id)
     * @public
     */
    deleteWatchlist(id) {
      this.get('accountService').deleteWatchlist(id, this.onEditWatchlist.bind(this));
      this.sendAction('updateWatchlists');
    },

    /*
     * Toggles editting watchlist
     * @public
     */
    toggleEdit() {
      this.set('isEditing', !this.get('isEditing'));
    },

    /*
     * Sends action to the route to delete a watchlist
     * (id)
     * @public
     */
    createWatchlist() {
      if (this.get('newWatchlistName')) {
        this.get('accountService').createWatchlist(this.get('newWatchlistName'), this.onEditWatchlist.bind(this));
        this.set('newWatchlistName', null);
        this.set('isEditing', !this.get('isEditing'));
        this.sendAction('updateWatchlists');
      }
    },
  }
});
