import Ember from 'ember';

export default Ember.Route.extend({
  /*
   * search service
   * @public
   * @{service}
   */
  search: Ember.inject.service('search-service'),

  /*
   * account service
   * @public
   * @{service}
   */
  accountService: Ember.inject.service('account-service'),

  /*
   * LightStreamer service
   * @public
   * @{service}
   */
  lsClient: Ember.inject.service('ls-client'),

  /*
   * session service
   * @public
   * @{service}
   */
  session: Ember.inject.service('session'),

  /*
   * Timer for search
   * @public
   * @Ember.run.later
   */
  _timer: null,

  /*
   * session service
   * @public
   * @{subscription}
   */
  subscription: null,

  /*
   * Stores raw markets and streamable markets
   * @public
   * {Object}
   */
  results: Ember.Object.create({
    raw: [],
    streamingItems: []
  }),

  /*
   * Flag to toggle view of watchlists
   * @public
   * @boolean
   */
  viewingWatchlist: false,

  /*
   * Overrides model hook to return the correct model for the route.
   * @public
   * @{search}
   */
  model: function() {
    return this.store.findAll('search');
  },

  /*
   * unsubscribes to all streaming items in search when the route is exited
   * @public
   * @{search}
   */
  deactivate() {
    this.unsubscribe();
  },

  /*
   * Callaback for search. Loops over each market in the response, creating
   * extra properties and pushing them to raw results cache and streamable
   * cache.
   * Calls subscribe method afterwards.
   * @public
   * @param {Object} response - OBject from AJAX call
   */
  onSearch(response) {
    for (let i = 0; i < response.markets.length; i++) {
      const marketsData = response.markets[i];
      marketsData.tidyEpic = marketsData.epic.replace(/\./g, "_");
      marketsData.tidyExpiry = marketsData.expiry.replace(/ /g, "");
      marketsData.state = null;
      if (marketsData.marketStatus === 'EDITS_ONLY') {
        marketsData.state = 'assets/images/edit.png';
      } else if (marketsData.marketStatus === 'TRADEABLE') {
        marketsData.state = 'assets/images/open.png';
      } else {
        marketsData.state = 'assets/images/close.png';
      }

      if (this.get('results.raw').length > 30) { // 40 item limit on subscrptions
        break;
      }
      this.get('results.raw').pushObject(marketsData);
      if (marketsData.streamingPricesAvailable) {
        this.get('results.streamingItems').pushObject(`L1:${marketsData.epic}`);
      }
    }
    this.subscribe(this.onUpdate.bind(this));
  },

  /*
   * Inserts market data in to localStorage store.
   * Creates a subscription to BID and OFFER on each market.
   * @public
   * @param callaback - method to call when there is an item update
   */
  subscribe(callback) {
    const clientLs = this.get('lsClient').getLsClient();
    for (let i = 0; i < this.get('results.raw').length; i++) {
      if (!this.store.hasRecordForId('search', i)) {
        let data = {
          id: i.toString(),
          type: 'search',
          attributes: {
            epic: this.get('results.raw')[i].epic,
            expiry: this.get('results.raw')[i].expiry,
            instrumentName: this.get('results.raw')[i].instrumentName,
            state: this.get('results.raw')[i].state,
            tidyExpiry: this.get('results.raw')[i].tidyExpiry,
            BID: this.get('results.raw')[i].bid,
            OFFER: this.get('results.raw')[i].offer,
            bidChange: null,
            offerChange: null,
          }
        };
        this.store.push(this.store.normalize('search', {
          data
        }));
      }
    }
    this.set('subscription', new Lightstreamer.Subscription(
      "MERGE", this.get('results.streamingItems'), ["BID", "OFFER"]
    ));
    this.get('subscription').setRequestedMaxFrequency(0.5);
    this.get('subscription').setRequestedSnapshot("yes");
    this.get('subscription').addListener({
      onItemUpdate: callback
    });
    clientLs.subscribe(this.get('subscription'));
  },

  /*
   * Updates the search store when there is a change to s subscription value
   * @public
   * @param {Object} info
   */
  onUpdate(info) {
    const store = this.store;
    let i = info.getItemPos() - 1; // Store is zero index itemPos is not.
    store.find('search', i).then((search) => {
      info.forEachChangedField((fieldName, fieldPos, newValue) => {
        this.updateStore(search, fieldName, newValue);
      });
      search.save();
    });
  },

  /*
   * Calculates the value change of bid and offer and sets a string on the model
   * This changes a class in the DOM to indicate the change.
   * This is reset after 300ms
   * @public
   * @param {Object} store
   * @param {String} fieldName
   */
  updateStore(store, fieldName, newValue) {
    let oldValue = store.get(fieldName);
    let change = (newValue > oldValue ? 'rise' : 'fall');
    store.set(`${fieldName.toLowerCase()}Change`, change);
    store.set(fieldName, newValue);
    Ember.run.later(this, function() {
      store.set(`${fieldName.toLowerCase()}Change`, null);
    }, 300);
  },

  /*
   * unsubscribes to all streaming items in search and clears all local caches.
   * @public
   */
  unsubscribe() {
    if (this.get('subscription')) {
      const clientLs = this.get('lsClient').getLsClient();
      clientLs.unsubscribe(this.get('subscription'));
      this.get('results.raw').clear();
      this.get('results.streamingItems').clear();
      this.set('viewingWatchlist', false);
      this.get('store').unloadAll('search');
      this.set('subscription', null);
    }
  },

  actions: {
    /*
     * Calls the search service to search for a market.
     * If the search term is less than 2 characters the search is reset but nothing
     * happens. The actual search action occurs 300ms to allow for more a longer
     * string to be typed as this is triggered by the user typing.
     * @public
     * @param {String} Market - search term
     */
    search(market) {
      if (market.length <= 2) {
        this.unsubscribe();
        return;
      }
      if (this._timer) {
        Ember.run.cancel(this._timer);
      }
      this._timer = Ember.run.later(this, function() {
        Ember.run.cancel(this._timer);
        this.unsubscribe();
        this.get('search').search(market, this.onSearch.bind(this));
      }, 300);
    },

    /*
     * Transitons to the account/search/deal route passing to the controller the
     * correct market object
     * @public
     */
    deal(result) {
      this.transitionTo('account.search.deal');
      this.controllerFor('account.search.deal').set('market', result);
    },

    /*
     * Calls account service with a watchlist id to get watchlist markets
     * @public
     * @param String id watchlist Id
     */
    viewWatchlistMarkets(id) {
      this.set('viewingWatchlist', true);
      this.unsubscribe();
      return this.get('accountService').getWatchLists(id, this.onSearch.bind(this));
    },

    updateWatchlists() {
      const controller = this.controllerFor('account.search');
      controller.getWatchlistResults();
    }
  }
});
