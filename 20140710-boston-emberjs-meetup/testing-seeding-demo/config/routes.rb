Rails.application.routes.draw do

  resources :blog_posts

  # Seeding the database
  # !!!!! THIS IS BAD, ONLY ENABLE IN TEST ENVIRONMENT
  post '/seed_db', to: 'testing#seed_db'

  root to: "home#show"
end
