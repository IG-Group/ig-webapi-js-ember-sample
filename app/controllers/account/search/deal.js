import Ember from 'ember';

export default Ember.Controller.extend({
  dealService: Ember.inject.service('deal-service'),
  confirmService: Ember.inject.service('confirm-service'),
  notify: Ember.inject.service('notify'),

  /*
   * Market Object with Status, Name, Expiry, bid, offer
   * @public
   * @{Market}
   */
  market: null,

  /*
   * Deal now or deal later indicator
   * @public
   * @boolean
   */
  dealNow: true,

  /*
   * Buy or sell indicator
   * @public
   * @boolean
   */
  isBuy: true,

  /*
   * Calls confirm service when a deal reference is returned from a deal transaction
   * @public
   * @param {response}
   */
  onDeal(response /*status, data*/) {
    this.get('confirmService').confirm(response.dealReference, null, null, this.onConfirm.bind(this));
  },

  /*
   * Handles the response of a confirm call and sends a DOM notification
   * @public
   * @param {response}
   */
  onConfirm(response) {
    if (response.dealStatus === "ACCEPTED") {
      this.get('notify').success(response.dealStatus);
      return;
    }
    this.get('notify').error(response.dealStatus);
  },

  actions: {

    /*
     * Toggles dealNow boolean when user clicks Deal or order (true or false)
     * @public
     * @param option - boolean
     */
    dealNow(option) {
      this.set('dealNow', option);
    },

    /*
     * Toggles isBuy boolean when user clicks buy or sell (true or false)
     * @public
     * @param direction - boolean
     */
    changeDirection(direction) {
      this.set('isBuy', direction);
    },

    /*
     * Collates relevent deal data and gets the deal service to create an open
     * position
     * @public
     * @param {dealParams} (Market data)
     */
    openPosition(dealParams) {
      dealParams.epic = this.get('market.epic');
      dealParams.expiry = this.get('market.expiry');
      dealParams.direction = this.get('isBuy') ? 'buy' : 'sell';
      this.get('dealService').openPosition(dealParams, this.onDeal.bind(this));
    },

    /*
     * Collates relevent deal data and gets the deal service to create a working
     * order
     * @public
     * @param {dealParams} (Market data)
     */
    workingOrder(dealParams) {
      dealParams.epic = this.get('market.epic');
      dealParams.expiry = this.get('market.expiry');
      dealParams.direction = this.get('isBuy') ? 'buy' : 'sell';
      this.get('dealService').workingOrder(dealParams, this.onDeal.bind(this));
    }
  }
});
