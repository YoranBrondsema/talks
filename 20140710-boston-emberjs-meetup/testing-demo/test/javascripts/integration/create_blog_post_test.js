"use strict";

module("Create a blog post", {
  teardown: function() {
    TestingDemo.reset();
  }
});

var title = "Any title";
var content = "Any content";

test("Empty title outputs an error", function() {
  expect(2);

  visit('/');

  fillIn('.title', "");
  fillIn('.content', content);
  click('.submit');

  andThen(function() {
    equal(find('.error').length, 1, "Shows only one error message");
    equal(find('.error').text(), "Please give a title", "Shows the correct message");
  });
});

test("Empty content outputs an error", function() {
  expect(2);

  visit('/');

  fillIn('.title', title);
  fillIn('.content', "");
  click('.submit');

  andThen(function() {
    equal(find('.error').length, 1, "Shows only one error message");
    equal(find('.error').text(), "Please give a content", "Shows the correct message");
  });
});

test("Submit with valid title and content redirects to the post", function() {
  expect(3);

  visit('/');

  fillIn('.title', title);
  fillIn('.content', content);
  click('.submit');

  andThen(function() {
    equal(currentRouteName(), "blogPosts.show", "Transitions to the show route");

    equal(find('.title').text(), title, "Shows the title");
    equal(find('.content').text(), content, "Shows the content");
  });
});

test("Submitting issues a POST request to the '/blog_posts' endpoint", function() {
  expect(3);

  $.mockjax({
    type: "POST",
    url: "/blog_posts"
  });

  visit('/');

  fillIn('.title', title);
  fillIn('.content', content);
  click('.submit');

  andThen(function() {
    var requests = $.mockjax.mockedAjaxCalls();

    equal(requests.length, 1, "Issues only one request");

    var request = requests[0];
    // Parse the request data
    var blog_post_data = JSON.parse(request.data).blog_post;

    equal(blog_post_data.title, title, "Contains the right title");
    equal(blog_post_data.content, content, "Contains the right content");
  });
});
