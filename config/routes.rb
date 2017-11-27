Rails.application.routes.draw do

  scope '/api' do
    resources :users, only: [:create] do
      collection do
        get :me
      end
    end
    resources :user_sessions, only: [:new, :create, :destory]
    resources :user_scores
    # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
    resources :punches, only: [:index, :create]
    resources :punch_records, only: [:index]
    resources :ranks, only: [:index] do
      collection do
        get :history
      end
    end
  end
end
