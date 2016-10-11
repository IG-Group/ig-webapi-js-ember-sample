import DS from 'ember-data';

/*
 * PrimaryKey, that would usually be ID, is now accountId
 */
export default DS.RESTSerializer.extend({
	primaryKey: 'accountId',
});
