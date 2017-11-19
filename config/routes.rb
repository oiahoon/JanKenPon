Rails.application.routes.draw do

  resources :punch_records
  scope '/api' do
    resources :users, only: [:create] do
      collection do
        get :me
      end
    end
    resources :user_sessions, only: [:new, :create, :destory]
    resources :user_scores
    # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
    resources :punches
    resources :rank only: [:index]
    end
    get 'rank/today'
  end
end
