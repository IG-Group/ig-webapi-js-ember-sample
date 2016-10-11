import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  /*
   * LightStreamer service
   * @public
   * @{service}
   */
	lsClient: Ember.inject.service('ls-client'),

  /*
   * Session service
   * @public
   * @{service}
   */
	session: Ember.inject.service('session'),

  /*
   * before the authenticated root is loaded we connect to LightStreamer so we
   * can create subscriptions
   * @public
   */
	beforeModel() {
		const service = this.get('lsClient');
		service.connectToLs();
		this._super(...arguments);
	},

	/*
   * Occurs after beforeModel. Create a new subscription for account values
	 * Any updates are pushed to a localStorage store which acts as the database
   * @public
   */
	activate: function() {
		const store = this.store;
    let _this = this;
		const clientLs = this.get('lsClient').getLsClient();

		const fields = ['PNL', 'EQUITY', 'FUNDS', 'MARGIN', 'AVAILABLE_TO_DEAL'];
		let accountID = `ACCOUNT:${this.get('session.session.content.authenticated.currentAccountId')}`;

		const subscription = new Lightstreamer.Subscription(
			"MERGE", accountID, fields
		);
		subscription.setRequestedSnapshot("yes");
		subscription.addListener({
			onItemUpdate: function(info) {
        // Positon of updated values in array
				const arrayPosition = info.getItemPos();
				if (!store.hasRecordForId('active-account', arrayPosition)) {
					// Push an empty record
					store.push('active-account', {
						id: arrayPosition
					});
				}

				store.find('active-account', arrayPosition).then(function(account) {
					info.forEachChangedField(function(fieldName, fieldPos, value) {
						// Set field value on the account locally-persisted instance
						account.set(fieldName, value);
					});
					// Commit the changes on the local store
					account.save();
				});
			},
      onUnsubscription() {
          _this.activate();
      }
		});
		clientLs.subscribe(subscription);
	},

  /*
   * Overrides model hook to return the correct model for the route.
   * @public
   * @{active-account}
   */
	model: function() {
		return this.store.findAll('active-account');
	},

});
