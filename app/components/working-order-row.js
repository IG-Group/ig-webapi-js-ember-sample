import Ember from 'ember';

export default Ember.Component.extend({
  /*
   * pnlService
   * @public
   * @Object
   */
  pnlService: Ember.inject.service('pnl-service'),

  tagName: 'tr',

  /*
   * workingOrder Object with details on position and related market details.
   * @public
   * @{workingOrder}
   */
  item: null,

  /*
  * Run on init to set up subscription for latest prices for each epic
  * this.onLatestUpdate callback passed through
  * @public
  */
  setUpSubscription: function() {
    this.get('pnlService')
      .subscribe(this.get('item.marketData.epic'), this.get('item.workingOrderData.direction'), this.onLatestUpdate.bind(this));
  }.on('init'),

  /*
  * Retrieves the latest price for market and updates it on the WO
  * @public
  */
  onLatestUpdate(data) {
    data.forEachField((fieldName, fieldPos, latest) => {
      this.get('item').setProperties({
        latest
      });
    });
  },

  actions: {
    /*
    * Sends the delete action to the route along with the WO Object
    * @public
    */
    delete(item) {
      this.sendAction('delete', item);
    }
  }
});
