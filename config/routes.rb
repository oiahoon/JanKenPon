Rails.application.routes.draw do

  resources :punch_records
  scope '/api' do
    resources :users, only: [:create]
    resources :user_sessions, only: [:new, :create, :destory]
    resources :user_scores
    # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
    resources :punches
    get 'rank/today'
  end
end
