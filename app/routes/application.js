import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {

  /*
   * session service
   * @public
   * @{service}
   */
  session: Ember.inject.service('session'),

  /*
   * LightStreamer service
   * @public
   * @{service}
   */
  lsClient: Ember.inject.service('ls-client'),

  /*
   * Sets up window listener to invalidate seesion when the window is closed
   * @public
   */
  activate: function() {
    const _this = this;

    Ember.$(window).on('beforeunload', () => {
      if (_this.get('session.isAuthenticated')) {
        _this.get('session').invalidate();
      }
    });
  },

  /*
   * If session is authenticated move to the account route
   * @public
   */
  beforeModel() {
    if (this.get('session.isAuthenticated')) {
      this.transitionTo('account');
    }
  },

  actions: {
    /*
     * If the app loads with an error reset and logout
     * @public
     * @{service}
     */
    error() {
      this.get('session').invalidate();
    },
  }
});
