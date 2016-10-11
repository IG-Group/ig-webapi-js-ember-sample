import DS from 'ember-data';

export default DS.Model.extend({

  /*
   * Market information e.g:
   * "instrumentName": "Spot Gold",
   * "expiry": "DFB",
   * "epic": "CS.D.USCGC.TODAY.IP",
   * "instrumentType": "CURRENCIES",
   * "lotSize": 1.0,
   * "high": 1342.36,
   * "low": 1332.66,
   * "percentageChange": 0.24,
   * "netChange": 3.18,
   * "bid": 1340.74,
   * "offer": 1341.04,
   * "updateTime": "16:33:01",
   * "updateTimeUTC": "15:33:01",
   * "delayTime": 0,
   * "streamingPricesAvailable": true,
   * "marketStatus": "TRADEABLE",
   * "scalingFactor": 1
   * @public
   * @Object
   */
  market: DS.attr(),

  /*
   * Postion information e.g:
   * "contractSize": 1.0,
   * "createdDate": "2016/09/20 08:10:18:000",
   * "createdDateUTC": "2016-09-20T07:10:18",
   * "dealId": "DIAAAAAZLMYXCA9",
   * "dealReference": "EDP2GFMFURUL4TP",
   * "size": 0.9,
   * "direction": "BUY",
   * "limitLevel": null,
   * "level": 1316.86,
   * "currency": "GBP",
   * "controlledRisk": false,
   * "stopLevel": null,
   * "trailingStep": null,
   * "trailingStopDistance": null
   * @public
   * @Object
   */
  position: DS.attr(),
});
