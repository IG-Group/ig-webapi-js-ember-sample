import Ember from 'ember';

export default Ember.Service.extend({
  /*
   * LightStreamer service
   * @public
   * @{service}
   */
  lsClient: Ember.inject.service('ls-client'),

  /*
   * Subscribes to specific account data
   * @public
   * @parma {String} accountId
   * @param {Object} callback - method to call to deal with a field update
   * @param {Object} failure - method to call when there is an unsubscription
   */
  subscribe(accountId, callback, failure) {
    const clientLs = this.get('lsClient').getLsClient();
    const fields = ['PNL', 'EQUITY', 'FUNDS', 'MARGIN', 'AVAILABLE_TO_DEAL'];
    const accountID = `ACCOUNT:${accountId}`;
    const subscription = new Lightstreamer.Subscription(
      "MERGE", accountID, fields
    );
    subscription.addListener({
      onItemUpdate: callback,
      onUnsubscription: failure,
    });
    clientLs.subscribe(subscription);
  },
});
