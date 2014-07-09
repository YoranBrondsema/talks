Rails.application.routes.draw do

  resources :blog_posts

  root to: "home#show"
end
