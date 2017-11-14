class UsersController < ApplicationController
  def create
    user = User.new(user_params)
    if user.save
      UserSession.create(user, true)
      render json: user
    else
      api_bad_request(user.errors.full_messages)
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :password_confirmation)
  end
end
