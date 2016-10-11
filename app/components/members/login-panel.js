import Ember from 'ember';

/*
 * Login Panel - Front end validation
 */
export default Ember.Component.extend({
  session: Ember.inject.service('session'),

  username: '',

  /*
   * String array of environments
   * @public
   * @array
   */
  environments: Ember.String.w('Demo Production'),

  selectedEnvironemnt: 'Demo',

  /*
   * formatUsername String IG usernames are validated using this format
   */
  formatUsername: Ember.computed('username', 'selectedEnvironemnt', function() {
    if (this.get('selectedEnvironemnt') === 'Demo') {
      return `DEMO-${this.get('username').toUpperCase()}-LIVE`;
    }
    return `${this.get('username').toUpperCase()}-LIVE`;
  }),

  password: '',

  api: localStorage.getItem('api') || '',

  hasResponseMessage: null,

  validUsername: Ember.computed.gte('username.length', 5),

  /*
   * validapi boolean every api key is 15 characters long
   */
  validapi: Ember.computed.gte('api.length', 15),
  validPassword: Ember.computed.match('password', /^[a-zA-Z]\w{3,14}$/),

  isValid: Ember.computed.and('validUsername', 'validPassword'),
  validWithApi: Ember.computed.and('isValid', 'validapi'),

  isDisabled: Ember.computed.not('validWithApi'),

  actions: {

    /*
     * changeEnvironment
     * @public
     * @param {env} selected environment
     */
    changeEnvironment(env) {
      this.set('selectedEnvironemnt', env);
    },

    /*
     * authenticate initiates authenticator by calling the application authenticator.
     * @catch invalid user details. Informs user there hasbeen an issue.
     */
    authenticate() {
      this.set('hasResponseMessage', null);
      const {
        formatUsername,
        password,
        api,
        selectedEnvironemnt
      } = this.getProperties('formatUsername', 'password', 'api', 'selectedEnvironemnt');
      return this.get('session').authenticate('authenticator:application', formatUsername, password, api, selectedEnvironemnt)
        .catch(() => {
          this.set('hasResponseMessage', "Invalid login. Please try again.");
        });
    }
  }
});
