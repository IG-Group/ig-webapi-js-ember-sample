import Ember from 'ember';

export default Ember.Route.extend({
  actions: {

    /*
     * If the deal.js controller throws an error the route will transition
     * @public
     */
    error() {
      this.transitionTo('/account/search');
    },

    /*
     * If no market is present on this route there will be a transition
     * @public
     */
    didTransition() {
      if (!this.controllerFor("account/search/deal").get("market")) {
        this.transitionTo('/account/search');
      }
    },

  }
});
