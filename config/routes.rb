Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "static_pages#root"

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create]
    resource :session, only: [:create, :destroy]
    resources :tracks, only: [:index, :show]
    resources :annotations, only: [:show, :create]
    resources :comments, only: [:show, :create]
    resources :votes, only: [:show, :create, :destroy]
    resources :searches, only: [:index]
    resources :tags, only: [:index]
  end
  
end
