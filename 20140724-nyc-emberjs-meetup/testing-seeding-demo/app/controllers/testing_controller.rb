class TestingController < ApplicationController
  respond_to :json

  # Takes the following parameters
  # {
  #   title
  #   content
  # }
  def seed_db
    # Clean the database
    BlogPost.destroy_all

    # Create a blog post
    blog_post = BlogPost.create(
      title: params[:title],
      content: params[:content]
    )
    
    respond_with blog_post
  end
end
