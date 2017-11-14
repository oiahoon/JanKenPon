class UserSessionsController < ApplicationController
  def create
    user_session = UserSession.new(user_session_params)
    if user_session.save
      render json: current_user
    else
      api_bad_request(user_session.errors.full_messages)
    end
  end

  def destroy
    current_user_session.destroy
    render plain: "OK"
  end

  private

  def user_session_params
    params.require(:user_session).permit(:username, :password, :remember_me)
  end
end
