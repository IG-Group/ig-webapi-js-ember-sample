import Ember from 'ember';

export default Ember.Route.extend({
  /*
   * deal service
   * @public
   * @{service}
   */
  dealService: Ember.inject.service('deal-service'),

  /*
   * confirm service
   * @public
   * @{service}
   */
  confirmService: Ember.inject.service('confirm-service'),

  /*
   * notify service
   * @public
   * @{service}
   */
  notify: Ember.inject.service('notify'),

  /*
   * Overrides model hook to return the correct model for the route.
   * @public
   * @{position}
   */
  model: function() {
    return this.store.findAll('position');
  },

  /*
   * When exiting route unload all positions so they are up to date when
   * the route is re-entered
   * @public
   */
  deactivate: function() {
    this.get('store').unloadAll('position');
    this.refresh();
  },

  /*
   * Calls the confirm service with a deal ref. to confirm the position close
   * @public
   * @param {response} Extracts deal number
   * @param {position} - used in onConfirm()
   * @param size Number - used in onConfirm()
   */
  onClose(response, position, size) {
    this.get('confirmService').confirm(response.dealReference, position, size, this.onConfirm.bind(this));
  },

  /*
   * Receives a confirm response and updates the user. If the closing size is
   * equal to the position dealSize the positions store is refreshed.
   * @public
   * @param {response} Extracts deal status
   * @param {position
   * @param size Number
   */
  onConfirm(response, position, size) {
    if (size.toString() === position.dealSize.toString() && response.dealStatus === "ACCEPTED") {
      this.get('store').unloadAll('position');
    }
    this.refresh();
    if (response.dealStatus === "ACCEPTED") {
      this.get('notify').success(response.dealStatus);
    } else {
      this.get('notify').error(response.dealStatus);
    }
  },

  actions: {
    /*
     * Calls the deal service to close a position
     * @public
     */
    close(position, size) {
      this.get('dealService').closePosition(position, size, this.onClose.bind(this));
    }
  }
});
