import DS from 'ember-data';

export default DS.Model.extend({

  /*
   * State of market (open, closed, etc)
   * @public
   * @String
   */
  state: DS.attr(),

  /*
   * epic of the market
   * @public
   * @String
   */
  epic: DS.attr(),

  /*
   * Expiry of market (DFB or date)
   * @public
   * @String
   */
  expiry: DS.attr(),

  /*
   * Name of market
   * @public
   * @String
   */
  instrumentName: DS.attr(),

  /*
   * A tidy ver of expiry to display
   * @public
   * @String
   */
  tidyExpiry: DS.attr(),

  /*
   * Bid price of the market
   * @public
   * @Number
   */
  BID: DS.attr(),

  /*
   * Offer price of the market
   * @public
   * @Number
   */
  OFFER: DS.attr(),

  /*
   * If the change in old value and new value is a rise or fall
   * @public
   * @String
   */
  bidChange: DS.attr(),

  /*
   * If the change in old value and new value is a rise or fall
   * @public
   * @String
   */
  offerChange: DS.attr(),
});
