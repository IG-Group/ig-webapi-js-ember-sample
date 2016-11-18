import passthrough from './config/passthrough';
export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.2.x/shorthands/
  */

  this.namespace = 'https://mirage.ig.com/gateway/deal'; // make this `api`, for example, if your API is namespaced

  passthrough.call(this);

  this.get('/positions', (schema, request) => {
    return schema.positions.all();
  });

  this.post('/session', function(db, request) {
    if (JSON.parse(request.requestBody).password === 'password' &&
        JSON.parse(request.requestBody).identifier === 'USERNAME-MIRAGE' &&
        request.requestHeaders['X-IG-API-KEY'] === '12345678912345') {
      return {
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
        "lightstreamerEndpoint": "https://mirage.ls.com",
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
      };
    } else {
      return new Mirage.Response(401, {}, {});
    }
  });

}
