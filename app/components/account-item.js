import Ember from 'ember';

export default Ember.Component.extend({
  balanceService: Ember.inject.service('balance-service'),
  item: null,

  /*
   * setUpSubscription Occurs on init.
   * Sets up subscriptions for each Accounts financial data
   */
  setUpSubscription: function() {
    this.get('balanceService')
      .subscribe(this.get('item.id'), this.onBalanceUpdate.bind(this), this.setUpSubscription.bind(this));
  }.on('init'),

  /*
   * onBalanceUpdate
   * @param data Object
   * Updates each the correct balance property when an update is received from LightStreamer
   */
  onBalanceUpdate(data) {
    data.forEachField((fieldName, fieldPos, latest) => {
      Ember.set(this.get('item'), fieldName, latest);
    });
  },

  actions: {
    /*
     * switchAccount
     * @param id String account Id
     */
    switchAccount(id) {
      this.sendAction('switchAccount', id);
    }
  }
});
