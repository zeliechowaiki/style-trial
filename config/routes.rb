Rails.application.routes.draw do

  resources :users
  resources :clothing_sets
  resources :items, only: [:create, :update, :index]
  resources :clothing_set_likes, only: [:index, :create, :destroy]
  resources :sessions, only: [:create, :destroy]

  get '/popular', to: 'clothing_sets#popular'
  get '/me', to: 'users#me'
  get '/likes', to: 'clothing_sets#likes'
  get '/notifications', to: 'clothing_set_likes#notifications'
  get 'matches', to: 'clothing_sets#matches'
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end