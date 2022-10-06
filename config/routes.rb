Rails.application.routes.draw do
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "graphql#execute"
  end
  post "/graphql", to: "graphql#execute"

  root to: "static_pages#root"
  resources :status, only: [:index]
  namespace :api do
    resources :users, only: [:show, :create]
    resource :session, only: [:create, :destroy]
    resources :tracks, only: [:index, :show]
    resources :annotations, only: [:show, :create, :update, :destroy]
    resources :comments, only: [:show, :create, :update, :destroy]
    resources :votes, only: [:show, :create, :destroy]
    resources :searches, only: [:index]
    resources :tags, only: [:index]
  end
end
