import {
  Factory
} from 'ember-cli-mirage';

export default Factory.extend({

    "accountType": "CFD",
    "accountInfo": {
      "balance": 9970.0,
      "deposit": 0.0,
      "profitLoss": 0.0,
      "available": 9970.0
    },
    "currencyIsoCode": "GBP",
    "currencySymbol": "£",
    "currentAccountId": "XZ6GL",
    "lightstreamerEndpoint": "https://demo-apd.marketdatasystems.com",
    "accounts": [{
      "accountId": "XZ6GK",
      "accountName": "Demo-Spread bet",
      "preferred": false,
      "accountType": "SPREADBET"
    }, {
      "accountId": "XZ6GL",
      "accountName": "Demo-CFD",
      "preferred": true,
      "accountType": "CFD"
    }],
    "clientId": "100617578",
    "timezoneOffset": 0,
    "hasActiveDemoAccounts": true,
    "hasActiveLiveAccounts": false,
    "trailingStopsEnabled": false,
    "reroutingEnvironment": null,
    "dealingEnabled": true

});
