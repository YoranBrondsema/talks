class BlogPostSerializer < ActiveModel::Serializer
  self.root = true

  attribute :id
  attribute :title
  attribute :content
end
