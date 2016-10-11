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
   * AJAX call for a search
   * @public
   * @param {String} market - search term
   * @param {Object} callback - method to call when AJAX call returns
   */
  search(market, callback) {
    const session = this.get('session');
    const apiHost = session.session.content.authenticated.apiHost;
    let search = market.replace(/[^\w\s]/gi, '');

    const req = {};
    req.method = "GET";
    req.url = `${apiHost}/markets?searchTerm=${search}`;
    req.headers = {
      "Content-Type": "application/json; charset=UTF-8",
      "Accept": "application/json; charset=UTF-8",
      "X-IG-API-KEY": session.session.content.authenticated.api,
      "CST": session.session.content.authenticated.cstToken,
      "X-SECURITY-TOKEN": session.session.content.authenticated.ssoToken,
    };

    Ember.$.ajax({
      type: req.method,
      url: req.url,
      data: {},
      headers: req.headers,
      async: false,
      mimeType: req.binary ? 'text/plain; charset=x-user-defined' : null
    }).then(function(response, status, data) {
      callback(response);
    });
  },
});
