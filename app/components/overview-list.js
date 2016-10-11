import Ember from 'ember';

export default Ember.Component.extend({

  /*
   * Session Object containing authentication data
   * @public
   * @Object
   */
	session: Ember.inject.service('session'),

  /*
   * Easy access to the current account.
   * @public
   * @String
   */
	activeAccount: Ember.computed('session.session.content.authenticated.currentAccountId', function() {
		return this.get('session.session.content.authenticated.currentAccountId');
	}),

  /*
   * Active account does not return account name. Compares all account ID's to
   * the current account and returns the correct account name.
   * @public
   * @Object
   */
  activeName: Ember.computed('session.session.content.authenticated.currentAccountId', function() {
		for (let i = 0; i < this.get('session.session.content.authenticated.accounts.length'); i++) {
      if (this.get('session.session.content.authenticated.accounts')[i].accountId === this.get('session.session.content.authenticated.currentAccountId')) {
        return this.get('session.session.content.authenticated.accounts')[i].accountName;
      }
    }
	}),
});
