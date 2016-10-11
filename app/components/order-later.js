import Ember from 'ember';

/*
 * Properties for the order ticket
 */
export default Ember.Component.extend({

  /*
   * The bid or offer size
   * @public
   * @Number
   */
  size: null,

  /*
   * The price when to execute the trade
   * @public
   * @Number
   */
  price: null,

  /*
   * If the size is greater than 0
   * @public
   * @boolean
   */
  validSize: Ember.computed.gte('size', 0.1),

  /*
   * If the price is greater than 0
   * @public
   * @boolean
   */
  validPrice: Ember.computed.gte('price', 0.1),

  /*
   * Good till type. Defaults to Cancelled.
   * @public
   * @boolean
   */
  goodTill: 'Cancelled',

  /*
   * String array of Good Till types
   * @public
   * @array
   */
  goodTills: Ember.String.w('Cancelled Date'),

  /*
   * The GTD chosen. Unix timestamp.
   * @public
   * @Number
   */
  goodTillDate: null,

  /*
   * Whether to show the date picker based off GT choice
   * @public
   * @boolean
   */
  showDatePicker: Ember.computed('goodTill', function() {
    if (this.get('goodTill') === 'Date') {
      return true;
    }
    return false;
  }),

  /*
   * Basic validation of size and price
   * @public
   * @boolean
   */
  valid: Ember.computed.and('validSize', 'validPrice'),

  /*
   * Should the trade be sent
   * @public
   * @boolean
   */
  isDisabled: Ember.computed.not('valid'),

  actions: {
    /*
     * changeGoodTill
     * @public
     * @param GT String - Good Till type
     */
    changeGoodTill(GT) {
      this.set('goodTill', GT);
    },

    /*
     * changeGoodTill
     * @public
     * @param date Date String - Good Till date
     *
     */
    selectDate(date) {
      this.set('goodTillDate', new Date(date).getTime());
    },

    /*
     * workingOrder
     * Send the action to the route with all params
     */
    workingOrder() {
      this.sendAction('workingOrder', {
        direction: this.get('isBuy'),
        size: this.get('size'),
        level: this.get('price'),
        goodTill: this.get('goodTill'),
        goodTillDate: this.get('goodTillDate')
      });
    }
  }
});
