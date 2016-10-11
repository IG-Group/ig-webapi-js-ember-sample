import Ember from 'ember';

export default Ember.Route.extend({
  /*
   * deal service
   * @public
   * @{service}
   */
	dealService: Ember.inject.service('deal-service'),

  /*
   * Overrides model hook to return the correct model for the route.
   * @public
   * @{workingorder}
   */
	model: function() {
		return this.store.findAll('workingorder');
	},

  /*
   * When exiting route unload all working order so they are up to date when
   * the route is re-entered
   * @public
   */
	deactivate: function() {
		this.get('store').unloadAll('workingorder');
		this.refresh();
	},

  /*
   * When a working order is deleted, refresh the store.
   * @public
   */
	onDelete(/*response*/) {
		this.get('store').unloadAll('workingorder');
		this.refresh();
	},
	actions: {

    /*
     * Calls the deal service to delete a working order
     * @public
     * @param {item} working order object
     */
		delete(item) {
			this.get('dealService').closeOrder(item.dealId, this.onDelete.bind(this));
		}
	}
});
