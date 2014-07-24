"use strict";

/* === DATA === */
var Seed = {};
Seed.blog_post = {
  title: "Integration testing in Ember.js",
  content: "It's fun!"
}

module("View a blog post", {
  /* === SEED DATABASE === */
  setup: function() {
    // Halt the tests (this is a QUnit call)
    stop();

    // Do not start the Ember application yet
    TestingDemo.deferReadiness();

    // Send the seed 
    // ic-ajax wraps jQuery Promises into Ember.js Promises
    ic.ajax.request({
      type: "POST",
      url: "/seed_db", // our seeding endpoint
      dataType: "json",
      data: Seed.blog_post // we give some data
    }).then(function(data) {
      // Retrieve the id
      Seed.blog_post.id = data.blog_post.id;

      // Start the Ember.js application
      TestingDemo.advanceReadiness();

      // We can start running tests now too
      start();
    });
  },
  teardown: function() {
    TestingDemo.reset();
  }
});

/* === HELPERS === */
var blog_post = Seed.blog_post;
var url = function() {
  return "/blog_posts/" + blog_post.id;
}

/* === TESTS === */
test("It shows the title", function() {
  visit(url());

  andThen(function() {
    equal(find(".title:contains(\"" + blog_post.title + "\")").length, 1, "Shows the title");
  });
});

test("It shows the content", function() {
  visit(url());

  andThen(function() {
    equal(find(".content:contains(\"" + blog_post.content + "\")").length, 1, "Shows the content");
  });
});
