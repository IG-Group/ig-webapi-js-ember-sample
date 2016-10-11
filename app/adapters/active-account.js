import DS from 'ember-data';

/*
 * LightStreamer Adapter used to create active-account model
 * Uses localStorage to persist values
 */
export default DS.LSAdapter.extend({
  namespace: 'active-account'
});
