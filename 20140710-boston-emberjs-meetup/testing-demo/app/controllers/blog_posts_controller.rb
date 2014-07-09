class BlogPostsController < ApplicationController
  respond_to :json

  def create
    blog_post = BlogPost.create(
      title: params[:blog_post][:title],
      content: params[:blog_post][:content]
    )

    respond_with blog_post
  end

  def show
    respond_with BlogPost.find(params[:id])
  end
end
