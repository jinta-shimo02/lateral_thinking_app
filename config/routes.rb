Rails.application.routes.draw do
  root 'static_pages#top'
  get 'home', to: 'questions#home'

  namespace :api do
    namespace :v1 do
      resources :chats, only: :create
    end
  end
end
