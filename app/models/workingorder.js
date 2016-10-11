import DS from 'ember-data';

export default DS.Model.extend({

  /*
   * Working order information e.g:
   * "dealId": "DIAAAAAZXGZRFA3",
   * "direction": "BUY",
   * "epic": "IX.D.MIB.CASH.IP",
   * "orderSize": 1,
   * "orderLevel": 16900.0,
   * "timeInForce": "GOOD_TILL_CANCELLED",
   * "goodTillDate": null,
   * "goodTillDateISO": null,
   * "createdDate": "2016/09/26 14:50:07:000",
   * "createdDateUTC": "2016-09-26T13:50:07",
   * "guaranteedStop": false,
   * "orderType": "STOP",
   * "stopDistance": null,
   * "limitDistance": null,
   * "currencyCode": "GBP",
   * "dma": false
   * @public
   * @Object
   */
  workingOrderData: DS.attr(),

  /*
   * Market information e.g:
   * "instrumentName": "Italy 40",
   * "exchangeId": "IND_MIB_GBL",
   * "expiry": "DFB",
   * "marketStatus": "TRADEABLE",
   * "epic": "IX.D.MIB.CASH.IP",
   * "instrumentType": "INDICES",
   * "lotSize": 1.0,
   * "high": 16236.5,
   * "low": 16193.5,
   * "percentageChange": 0.12,
   * "netChange": 20.0,
   * "bid": 16223.5,
   * "offer": 16231.5,
   * "updateTime": "16:41:27",
   * "updateTimeUTC": "15:41:27",
   * "delayTime": 0,
   * "streamingPricesAvailable": true,
   * "scalingFactor": 1
   * @public
   * @Object
   */
  marketData: DS.attr(),
});
