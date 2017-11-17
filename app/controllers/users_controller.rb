class UsersController < ApplicationController
  before_action :require_login, except: [:create]


  def create
    user = User.new(user_params)
    if user.save
      UserSession.create(user, true)
      render json: user
    else
      api_bad_request(user.errors.full_messages)
    end
  end

  def me
    render json: current_user
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :password_confirmation)
  end
end
