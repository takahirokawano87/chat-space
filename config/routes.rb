Rails.application.routes.draw do
  root 'groups#index'
  devise_for :users
  resources :users, only: [:index, :edit, :update, :search]
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
  end
end
