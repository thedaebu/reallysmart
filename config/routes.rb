Rails.application.routes.draw do
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "graphql#execute"
  end
  post "/graphql", to: "graphql#execute"

  mount ActionCable.server => '/cable'

  root to: "static_pages#root"
  resources :status, only: [:index]
  namespace :api do
    resources :accounts, only: [:show]
    resources :annotations, only: [:show, :create, :update, :destroy]
    resources :comments, only: [:show, :create, :update, :destroy]
    resources :notifications, only: [:update]
    resources :searches, only: [:index]
    resource :session, only: [:create, :destroy]
    resources :tags, only: [:index]
    resources :tracks, only: [:index, :show]
    resource :users, only: [:create, :update]
    resources :votes, only: [:show, :create, :destroy]
  end
end
