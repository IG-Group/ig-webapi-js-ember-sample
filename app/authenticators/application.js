import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';

/*
 * Session authenticator
 */
export default Base.extend({
  sessionAuthenticator: Ember.inject.service(),
  sessionService: Ember.inject.service('session'),

  /*
   * restore - used for silent authentication when reloading an application
   * @param data Object authentication data
   */
  restore(data) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      if (Ember.isEmpty(data.cstToken)) {
        reject(data);
      } else {
        resolve(data);
      }
    });
  },

  /*
   * authenticate - used for authentication when logining in
   * @param username String
   * @param password String
   * @param api String
    * @param selectedEnvironemnt String
   */
  authenticate(username, password, api, selectedEnvironemnt) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      this.get('sessionAuthenticator').authenticate({
        username: username,
        password,
        api,
        selectedEnvironemnt
      }, resolve, reject);
    });
  },

});
