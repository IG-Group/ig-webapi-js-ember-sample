import DS from 'ember-data';

/*
 * LightStreamer Adapter used to create search model
 */
export default DS.LSAdapter.extend({
	primaryKey: 'id',
	namespace: 'search'
});
