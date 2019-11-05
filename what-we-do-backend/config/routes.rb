Rails.application.routes.draw do
  resources :contents
  resources :media
  resources :groups
  resources :users
  post '/login', to: 'users#login'
  post '/usersearch', to: 'users#search'
  post '/user-groups', to: 'groups#getGroups'
  post '/user-content', to: 'contents#getContent'
  post '/groups/:id/suggest', to: 'groups#suggest'
  post '/add-content', to: 'contents#add'
  post '/remove-content', to: 'contents#remove'
  post '/groups/:id/invite', to: 'groups#invite'
  #For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
