TestingDemo.BlogPostsNewController = Ember.Controller.extend({
  // Initially blank title and content
  title: "",
  content: "",
  /* Actions */
  actions: {
    createBlogPost: function() {
      var self = this;

      // Create a new BlogPost record
      var blogPost = this.store.createRecord('blogPost', {
        title: this.get('title'),
        content: this.get('content')
      });

      // Persist it.
      blogPost.save().then(function() {
        // If success, transition to the 'show' route
        self.transitionToRoute('blogPosts.show', blogPost);
      }, function(e) {
        // Else, show the errors
        self.set('errors', e.errors);

        // Delete the record
        // See http://discuss.emberjs.com/t/deleting-model-from-store-after-save-failure/5072/6
        blogPost.transitionTo('created.uncommitted');
        blogPost.deleteRecord();
      });
    }
  }
});
