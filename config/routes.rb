Rails.application.routes.draw do

  scope '/api' do
    resources :user_sessions, only: [:new, :create, :destory]
    resources :user_scores
    # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
    resources :punches
    get 'rank/today'
  end
end
