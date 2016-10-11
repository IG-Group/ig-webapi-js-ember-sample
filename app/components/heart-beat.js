import Ember from 'ember';

/*
 * Subscripes to LightStreamer Heartbeat updates to verify connection
 * Updating time field for every update
 */
export default Ember.Component.extend({
  lsClient: Ember.inject.service('ls-client'),
  time: null,

  /*
   * init
   * Creation of subscription to LS Heartbeat.
   */
  init() {
    this._super(...arguments);
    const _this = this;
    const clientLs = this.get('lsClient').getLsClient();

    // Field to subscribe to
    const fields = ['HEARTBEAT'];

    // mode, item and fields
    // http://www.lightstreamer.com/docs/client_javascript_uni_api/Subscription.html
    const subscription = new Lightstreamer.Subscription(
      "MERGE", 'TRADE:HB.U.HEARTBEAT.IP', fields
    );
    subscription.setRequestedSnapshot("yes");
    subscription.addListener({

      // Optional info Object returned from lightstreamer
      onItemUpdate: function(/*info*/) {
        let date = new Date();
        let time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        _this.set('time', time);
      },
      onSubscriptionError() {
        _this.set('time', 'Hearbeat error.');
      },
      onUnsubscription() {
          _this.set('time', 'Heartbeat stopped.');
          _this.init();
      }
    });
    clientLs.subscribe(subscription);
  },
});
