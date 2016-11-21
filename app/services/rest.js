import Ember from 'ember';

const restService = Ember.Service.extend({
  /*
   * session service
   * @public
   * @{service}
   */
  session: Ember.inject.service(),

  /*
   * session service alias because Ember simple auth session object is ridiculously
   * long and pointless
   * @public
   * @{service}
   */
  sessionService: Ember.computed.alias('session.session.content.authenticated'),

  /*
   * Ajax host url
   * @public
   * @{String}
   */
  host: Ember.computed('sessionService.apiHost', function() {
    return this.get('sessionService.apiHost');
  }),

  /*
   * Shared headers for all Ajax calls
   * @public
   * @{Object}
   */
  headers: Ember.computed('sessionService.ssoToken', function() {
    const session = this.get('sessionService');
    return {
      "Content-Type": "application/json; charset=UTF-8",
      "Accept": "application/json; charset=UTF-8",
      "X-IG-API-KEY": session.api,
      "CST": session.cstToken,
      "X-SECURITY-TOKEN": session.ssoToken,
    };
  }),

  /*
   * Ajax call method
   * @public
   * @param {String} endpoint url
   * @param {Object} AJAX content body
   * @param {Object} Optional headers to add
   * @param {String} AJAX method
   * @return {Promise}
   */
  request(url, data = null, headers = {}, method = 'GET') {
    return Ember.$.ajax({
      type: method,
      url: `${this.get('host')}${url}`,
      data: data,
      headers: this.appendHeaders(headers),
      async: false,
    });
  },

  /*
   * Adds optional headers to pass through on an ajax call
   * @public
   * @param {Object} - optional headers to pass through to ajax call
   * @return {Object}
   */
  appendHeaders(options = {}) {
    return Object.assign(options, this.get('headers'));
  }

});

['Get', 'Post', 'Put', 'Delete'].forEach(function(meth) {
  restService.reopen({
    [`do${meth}`]: function(url, data, headers) {
      return this.request(url, data, headers, meth);
    },
  });
});

export default restService;
