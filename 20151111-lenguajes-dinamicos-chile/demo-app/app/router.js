import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('bookmarks');
  this.route('bookmark', { path: '/bookmarks/:bookmark_id' });
});

export default Router;
