Rails.application.routes.draw do
  devise_for :users
  get 'hello_world', to: 'hello_world#index'
  root to: 'appointments#index'

  resources :appointments
end
