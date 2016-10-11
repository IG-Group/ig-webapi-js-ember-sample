import DS from 'ember-data';

/*
 * Normalizes the payload for the workingOrders model becuase it does not come
 * back with an ID on the JSON. Loops over each order in the payload and
 * and creates an ID on it that is equal to its index.
 * This is pushed to a results array and the orders model is set to the new
 * results array.
 */
export default DS.RESTSerializer.extend({
	normalizePayload: function(payload) {
		const result = [];
		payload.workingOrders.forEach(function(obj, index) {
			obj['id'] = index;
			result.push(obj);
		});
		return {
			'workingorder': result
		};
	}
});
