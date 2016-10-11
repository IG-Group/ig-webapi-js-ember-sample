import DS from 'ember-data';
import Ember from 'ember';

/*
 * General application adapter used to configure AJAX Request headers
 */
export default DS.RESTAdapter.extend({
  session: Ember.inject.service('session'),
  type: 'GET',
  host: Ember.computed('session.authToken', function() {
    return this.get('session.session.content.authenticated.apiHost');
  }),

  /*
   * X-SECURITY-TOKEN (ssoToken) changes when account switches so headers must be recalculated 
   */
  headers: Ember.computed('session.authToken', 'session.session.content.authenticated.ssoToken', function() {
    const session = this.get('session');
    return {
      "Content-Type": "application/json; charset=UTF-8",
      "Accept": "application/json; charset=UTF-8",
      "X-IG-API-KEY": session.session.content.authenticated.api,
      "CST": session.session.content.authenticated.cstToken,
      "X-SECURITY-TOKEN": session.session.content.authenticated.ssoToken
    };
  })
});
