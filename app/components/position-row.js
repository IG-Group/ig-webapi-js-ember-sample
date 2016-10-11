import Ember from 'ember';

export default Ember.Component.extend({
  /*
   * pnlService
   * @public
   * @Object
   */
  pnlService: Ember.inject.service('pnl-service'),

  tagName: 'tr',

  /*
   * Whether the user has clicked on 'close'
   * @public
   * @boolean
   */
  isClosing: false,

  /*
   * Postion Object with details on position and related market details.
   * @public
   * @{Position}
   */
  item: null,

  /*
   * Closing size value
   * @public
   * @Number
   */
  size: null,
  /*
   * Observers the size of the position. Updates the PNL when there is a
   * partial close.
   * @public
   */
  updateSize: Ember.observer('item.position.dealSize', function() {
    this.onSizeUpdate();
  }),

  /*
   * Whenther to enable the close button. If the entered size is within the
   * deal size.
   * @public
   * @returns boolean
   */
  isDisabled: Ember.computed('size', function() {
    const position = this.get('item.position');
    const size = this.get('size');
    if (size > 0 && size <= position.dealSize) {
      return false;
    }
    return true;
  }),


  /*
   * Run on init to set up subscription for latest prices for each epic
   * this.onPnlUpdate callback passed through
   * @public
   * @{Position}
   */
  setUpSubscription: function() {
    this.get('pnlService')
      .subscribe(this.get('item.market.epic'), this.get('item.position.direction'), this.onPnlUpdate.bind(this), this.setUpSubscription.bind(this));
  }.on('init'),

  /*
   * retrieves latest price for current epic and sets new pnl and price (latest)
   * @public
   * @param {data} LightStreamer Object
   */
  onPnlUpdate(data) {
    data.forEachField((fieldName, fieldPos, latest) => {
      let pnl = this.caluculatePnl(
        this.get('item.position.direction'),
        latest,
        this.get('item.position.openLevel'),
        this.get('item.position.dealSize')
      );
      this.get('item').setProperties({
        latest,
        pnl
      });
    });
  },

  /*
   * Updates pnl when there is a partial close
   * @public
   */
  onSizeUpdate() {
    this.set('item.pnl', this.caluculatePnl(
      this.get('item.position.direction'),
      this.get('item.latest'),
      this.get('item.position.openLevel'),
      this.get('item.position.dealSize')
    ));
  },

  /*
   * Calculates pnl based off direction
   * @public
   * @param {String} direction - position direction
   * @param {Number} latest - the latest price of the epic
   * @param {Number} openLevel - the level the epic was opened at
   * @param {Number} dealSize - The size of the position
   * @returns Number PNL value
   */
  caluculatePnl(direction, latest, openLevel, dealSize) {
    if (direction === 'BUY') {
      return ((latest - openLevel) * dealSize).toFixed(2);
    }
    return ((openLevel - latest) * dealSize).toFixed(2);
  },

  actions: {

    /*
     * Updates the row class to indicate if the postion is closing or not.
     * Each Postion row has a unique ID to target.
     * Toggles the isClosing property.
     * @public
     * @param {position}
     */
    toggleClass(position) {
      Ember.$(`#${position.dealId}`).toggleClass('inline-close');
      this.set('size', null);
      this.toggleProperty('isClosing');
    },

    /*
     * Sends the closing action to the route with the position data and the
     * closing size.
     * Toggles isClosing to false.
     * @public
     */
    close() {
      this.sendAction('close', this.get('item.position'), this.get('size'));
      this.send('toggleClass', this.get('item.position'));
    }
  }
});
