import DS from 'ember-data';

export default DS.Model.extend({
  /*
   * The profit and loss attached to the account
   * @public
   * @Number
   */
	PNL: DS.attr(),

  /*
   * The equity attached to the account
   * @public
   * @Number
   */
	EQUITY: DS.attr(),

  /*
   * The funds attached to the account
   * @public
   * @Number
   */
	FUNDS: DS.attr(),

  /*
   * The margin attached to the account
   * @public
   * @Number
   */
	MARGIN: DS.attr(),

  /*
   * The amount avaliable to deal attached to the account
   * @public
   * @Number
   */
	AVAILABLE_TO_DEAL: DS.attr(),
});
