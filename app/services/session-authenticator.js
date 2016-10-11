import Ember from 'ember';

export default Ember.Service.extend({
  /*
   * Name of the authenticator (Used when this is called)
   * @public
   * @{String}
   */
	name: 'sessionAuthenticator',

  /*
   * session service
   * @public
   * @{service}
   */
	session: Ember.inject.service(),

  /*
   * AJAX login call
   * @public
   * @param {Object} authData
   * @param {Object} resolve
	 * @param {Object} reject
   */
	authenticate(authData, resolve, reject) {
		let requestHeaders = this.getRequestHeaders(authData);

		this.resetInvalidSessionState();

		Ember.$.ajax(requestHeaders).then((response, msg, jqXHR) => {
			Ember.run(() => {
				this.handleAuthSuccess(authData, resolve, response, jqXHR);
			});
		}, this.handleAuthRejection.bind(this, reject));
	},

  /*
   * Creates headers for login AJAX call
   * @public
   * @param {Object} authData
   */
	getRequestHeaders(authData) {
    let apiHost = (authData.selectedEnvironemnt === 'Demo') ? 'https://demo-api.ig.com/gateway/deal' : 'https://api.ig.com/gateway/deal';
		let requestHeaders = {
			dataType: 'json',
			type:  'POST',
			url: `${apiHost}/session`,
		};
		requestHeaders.headers = {
			"Content-Type": "application/json; charset=UTF-8",
			"Accept": "application/json; charset=UTF-8",
			"X-IG-API-KEY": authData.api,
			"Version": "2"
		};

		requestHeaders.data = JSON.stringify({
			identifier: authData.username,
			password: authData.password
		});

		return requestHeaders;
	},

  /*
   * rejects the authentication Promise
   * @public
   * @param {Object} reject
   */
	handleAuthRejection(reject) {
		let session = this.get('session');
		session.set('authenticationFailed', true);
		reject();
	},

  /*
   * Resets a authentication
   * @public
   */
	resetInvalidSessionState() {
		let session = this.get('session');
		session.set('authenticationFailed', null);
	},

  /*
   * Resolves the authentication promise sending back the correct response data
   * @public
   * @param {Object} authData
   * @param {Object} resolve
   * @param {Object} response
   * @param {Object} jqXHR
   */
	handleAuthSuccess(authData, resolve, response, jqXHR) {
		let cst = jqXHR.getResponseHeader('CST');
		let sso = jqXHR.getResponseHeader('X-SECURITY-TOKEN');
    // Server to retrieve data from
    let apiHost = (authData.selectedEnvironemnt === 'Demo') ? 'https://demo-api.ig.com/gateway/deal' : 'https://api.ig.com/gateway/deal';
		localStorage.setItem('api', authData.api);
		let responseData = {
			apiHost: apiHost,
			authenticator: 'authenticator:application',
			clientId: response.clientId,
			currentAccountId: response.currentAccountId,
      accounts: response.accounts,
			lsEndPoint: response.lightstreamerEndpoint,
			cstToken: cst,
			ssoToken: sso,
			api: authData.api
		};

		resolve(responseData);
	}
});
