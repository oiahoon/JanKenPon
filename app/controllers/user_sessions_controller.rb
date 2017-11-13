class UserSessionsController < ApplicationController
  def create
    user_session = UserSession.new(user_session_params)
    if user_session.save
      render_api_json(api_settings['user_sessions']['success_code'],
                      { id: current_user.id, username: current_user.username })
    else
      render_api_json(api_settings['user_sessions']['fail_code'],
                      user_session.errors.full_messages)
    end
  end

  def destroy
    current_user_session.destroy
    render_api_json(api_settings['user_sessions']['success_code'])
  end

  private

  def user_session_params
    params.require(:user_session).permit(:username, :password, :remember_me)
  end
end
