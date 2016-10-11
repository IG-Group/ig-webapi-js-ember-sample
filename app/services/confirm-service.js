 /*jshint unused:false*/
import Ember from 'ember';

export default Ember.Service.extend({
  /*
   * session service
   * @public
   * @{service}
   */
	session: Ember.inject.service('session'),


  /*
   * AJAX call to confirm a trade
   * @public
   * @param {String} dealRef - passed through to confirm the trade
   * @param {Object} postion - passed on to the callback
   * @param {Nunber} size - passed on to the callback
   * @param {Object} callback - method to call to deal with a field update
   */
	confirm: function(dealRef, position, size, callback) {
		const session = this.get('session');
    const apiHost = session.session.content.authenticated.apiHost;
		let req = {};
		req.url = `${apiHost}/confirms/${dealRef}`;
		req.headers = {
			"Content-Type": "application/json; charset=UTF-8",
			"Accept": "application/json; charset=UTF-8",
			"X-IG-API-KEY": session.session.content.authenticated.api,
			"CST": session.session.content.authenticated.cstToken,
			"X-SECURITY-TOKEN": session.session.content.authenticated.ssoToken,
		};

		Ember.$.ajax({
			type: 'GET',
			url: req.url,
			data: null,
			headers: req.headers,
			async: false,
		}).then(function(response, status, data) {
			callback(response, position, size);
		});
	}
});
