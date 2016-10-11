import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route("404", {
    path: "*path"
  });
  this.route('account', function() {
    this.route('overview');
    this.route('positions');
    this.route('orders');
    this.route('search', function() {
      this.route('deal');
    });
  });
});

export default Router;
