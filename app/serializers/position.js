import DS from 'ember-data';
import Ember from 'ember';

/*
 * Normalizes the payload for the positions model becuase it does not come
 * back with an ID on the JSON. Loops over each position in the payload and
 * and creates an ID on it that is equal to its index.
 * This is pushed to a results array and the position model is set to the new
 * results array.
 */
export default DS.RESTSerializer.extend({
	normalizePayload: function(payload) {
		const result = [];
		payload.positions.forEach(function(obj, index) {
			obj['id'] = index;
			result.push(Ember.Object.create(obj));
		});
		return {
			'positions': result
		};
	}
});
