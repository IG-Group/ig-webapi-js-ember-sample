import Ember from 'ember';

/*
 * helper to view information from a hbs in the console
 * @public
 * @String
 */
export function logger(object) {
   console.log(object);
}

export default Ember.Helper.helper(logger);
