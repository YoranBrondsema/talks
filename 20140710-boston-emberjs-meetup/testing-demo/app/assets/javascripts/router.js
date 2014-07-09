// For more information see: http://emberjs.com/guides/routing/

TestingDemo.Router.map(function() {
  this.resource('blogPosts', { path: 'blog_posts' }, function() {
    this.route('new');
    this.route('show', { path: '/:blog_post_id' });
  });
});
