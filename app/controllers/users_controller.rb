class UsersController < ApplicationController
  def create
    user = User.new(user_params)
    if user.save
      UserSession.create(user, true)
      render_api_json(api_settings['users']['success_code'],
                      { id: current_user.id, username: current_user.username })
    else
      render_api_json(api_settings['users']['fail_code'],
                      user.errors.full_messages)
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :password_confirmation)
  end
end
