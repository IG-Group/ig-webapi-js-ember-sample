import Ember from 'ember';

export default Ember.Route.extend({
  /*
   * account service
   * @public
   * @{service}
   */
  accountService: Ember.inject.service('account-service'),

  /*
   * session service
   * @public
   * @{service}
   */
  session: Ember.inject.service('session'),

  /*
   * light streamer service
   * @public
   * @{service}
   */
  lsClient: Ember.inject.service('ls-client'),

  /*
   * Overrides model hook to return the correct model for the route.
   * @public
   * @{account}
   */
  model: function() {
    return this.store.findAll('account');
  },

  /*
   * Resets authenticated values and restarts light streamer so that so
   * that the correct account values are streamed.
   * @public
   * @{account}
   * @param id String id of the new active account
   * @param {response} response object from the AJAX call
   * @param {status}
   * @param {data}
   *
   */
  onSwitch(id, response, status, data) {
    this.set('session.session.content.authenticated.currentAccountId', id);
    this.set('session.session.content.authenticated.ssoToken', data.getResponseHeader('X-SECURITY-TOKEN'));
    this.get('lsClient').restart(true);
  },

  actions: {
    /*
     * Calls the account service to switch account.
     * @public
     * @param id String The id os the account to switch to
     */
    switchAccount(id) {
      this.get('accountService').switch(id, this.onSwitch.bind(this));
    }
  }
});
