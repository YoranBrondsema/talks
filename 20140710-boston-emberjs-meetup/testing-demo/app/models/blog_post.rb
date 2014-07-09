class BlogPost < ActiveRecord::Base
  validates_presence_of :title, message: "Please give a title"
  validates_presence_of :content, message: "Please give a content"
end
