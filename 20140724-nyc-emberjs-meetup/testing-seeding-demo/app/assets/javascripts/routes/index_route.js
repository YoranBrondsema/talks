TestingDemo.IndexRoute = Ember.Route.extend({
  beforeModel: function() {
    this.transitionTo('blogPosts.new');
  }
});
