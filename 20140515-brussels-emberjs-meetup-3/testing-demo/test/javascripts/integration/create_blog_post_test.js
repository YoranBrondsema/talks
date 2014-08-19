module("Create a blog post", {
  teardown: function() {
    TestingDemo.reset();
  }
});

var title = "Any title";
var content = "Any content";

test("Invalid title", function() {
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

test("Invalid content", function() {
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

test("Valid parameters and redirects to the post", function() {
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

test("Issues a POST request to the '/blog_posts' endpoint", function() {
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
    var blog_post_data = JSON.parse(request.data).blog_post;
    equal(blog_post_data.title, title, "Contains the right title");
    equal(blog_post_data.content, content, "Contains the right content");
  });
});

















// module("Create a blog post", {
//   teardown: function() {
//     // Clear all mocked AJAX endpoints.
//     $.mockjaxClear();

//     TestingDemo.reset();
//   }
// });

// var title = "This is a title";
// var content = "This is content";

// test("No title given", function() {
//   expect(2);

//   visit('/');

//   fillIn('.title', "");
//   fillIn('.content', content);
//   click('.submit');

//   andThen(function() {
//     equal(find('.error').length, 1, "Shows one error message");
//     equal(find('.error').text(), "Please give a title", "Shows the right error message");
//   });
// });

// test("No content given", function() {
//   expect(2);

//   visit('/');

//   fillIn('.title', title);
//   fillIn('.content', "");
//   click('.submit');

//   andThen(function() {
//     equal(find('.error').length, 1, "Shows one error message");
//     equal(find('.error').text(), "Please give a content", "Shows the right error message");
//   });
// });

// test("Valid title and content", function() {
//   expect(4);

//   visit('/');

//   fillIn('.title', title);
//   fillIn('.content', content);
//   click('.submit');

//   andThen(function() {
//     equal(find('.error').length, 0, "Shows no error message");

//     // We transitioned routes
//     equal(currentRouteName(), "blogPosts.show", "We transitioned to the 'show' route");
//     // Shows the blog post data
//     equal(find(".title").text(), title, "Shows the title of the blog post");
//     equal(find(".content").text(), content, "Shows the content of the blog post");
//   });
// });

// test("It hits the API", function() {
//   expect(3);

//   visit('/');

//   // Mock the POST request
//   $.mockjax({
//     type: "POST",
//     url: "/blog_posts",
//   });

//   fillIn('.title', title);
//   fillIn('.content', content);
//   click('.submit');

//   andThen(function() {
//     var requests = $.mockjax.mockedAjaxCalls();

//     equal(requests.length, 1, "One request was made");

//     // Parameters
//     var blog_post = JSON.parse(requests[0].data).blog_post;
//     equal(blog_post.title, title, "The correct title is sent");
//     equal(blog_post.content, content, "The correct content is sent");
//   });
// });
