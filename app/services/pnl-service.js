import Ember from 'ember';

export default Ember.Service.extend({
  /*
   * LightStreamer service
   * @public
   * @{service}
   */
  lsClient: Ember.inject.service('ls-client'),

  /*
   * Creates a subsricption to BID or OFFER for a certain market based on
   * direction. BID === SELL and OFFER === BUY
   * Used to calculate PNL.
   * @public
   * @param {String} epic - The epci to subscribe to
   * @param {String} direction - 'BUY' or 'SELL' choose the correct
   *  field to subscribe to.
   * @param {Object} callback - method to call to deal with a field update
   * @param {Object} failure - method to call when there is an unsubscription
   */
  subscribe(epic, direction, callback, failure) {
    const latestDirection = (direction === 'BUY') ? ['BID'] : ['OFFER'];
    const clientLs = this.get('lsClient').getLsClient();
    const market = [`MARKET:${epic}`];
    const subscription = new Lightstreamer.Subscription(
      "MERGE", market, latestDirection
    );
    subscription.addListener({
      onItemUpdate: callback,
      onUnsubscription: failure,
    });
    clientLs.subscribe(subscription);
  },
});
