Rails.application.routes.draw do
  root to: 'appointments#index'

  resources :appointments
end
