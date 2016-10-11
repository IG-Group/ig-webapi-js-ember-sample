import Ember from 'ember';

/*
 * Shown when user is logged o
 */
export default Ember.Component.extend({
  session: Ember.inject.service(),
  actions: {

    /*
     * invalidateSession Logs the user out.
     */
    invalidateSession() {
      localStorage.removeItem('lsClient');
      this.get('session').invalidate();
    }
  }
});
