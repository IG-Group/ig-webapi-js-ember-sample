import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({

  /*
   * session
   * @public
   * @{session}
   */
  session: Ember.inject.service('session'),

  /*
   * Account Type (CFD, Spreadbet)
   * @public
   * @String
   */
  accountType: DS.attr('string'),

  /*
   * is it the preferred account
   * @public
   * @boolean
   */
  preferred: DS.attr('boolean'),

  /*
   * Enabled or disabled account
   * @public
   * @String
   */
  status: DS.attr('string'),

  /*
   * Boolean on whether the account is in use in the application
   * loops through accounts and matches the id of account to the current to
   * active account ID
   * @public
   * @returns boolean
   */
  active: Ember.computed('session.session.content.authenticated.currentAccountId', function() {
    for (let i = 0; i < this.get('session.session.content.authenticated.accounts.length'); i++) {
      if (this.get('id') === this.get('session.session.content.authenticated.currentAccountId')) {
        return true;
      }
    }
    return false;
  }),

  /*
   * preferred account
   * @public
   * @String
   */
  accountName: DS.attr('string'),

  /*
   * The currency attached to the account (GBP, USD, etc.)
   * @public
   * @String
   */
  currency: DS.attr('string'),

  /*
   * The profit and loss attached to the account
   * @public
   * @Number
   */
  PNL: null,

  /*
   * The equity attached to the account
   * @public
   * @Number
   */
  EQUITY: null,

  /*
   * The funds attached to the account
   * @public
   * @Number
   */
  FUNDS: null,

  /*
   * The margin attached to the account
   * @public
   * @Number
   */
  MARGIN: null,

  /*
   * The amount avaliable to deal attached to the account
   * @public
   * @Number
   */
  AVAILABLE_TO_DEAL: null
});
