import Ember from 'ember';

/*
 * Properties for the deal now ticket
 */
export default Ember.Component.extend({
  /*
   * The bid or offer size
   * @public
   * @Number
   */
  size: null,

  /*
   * If the size is greater than 0
   * @public
   * @boolean
   */
  validSize: Ember.computed.gte('size', 0.1),

  /*
   * Whether the submit button should be enabled based off the validSize
   * @public
   * @Number
   */
  isDisabled: Ember.computed.not('validSize'),

  actions: {
    /*
     * openPosition
     * Send the action to the route with all params
     */
    openPosition() {
      this.sendAction('openPosition', {
        size: this.get('size'),
      });
    }
  }
});
