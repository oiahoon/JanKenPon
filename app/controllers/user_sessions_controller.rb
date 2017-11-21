class UserSessionsController < ApplicationController
  def create
    user_session = UserSession.new(user_session_params)
    if user_session.save
      render json: current_user
    else
      api_bad_request([I18n.t("user_session.errors.full_messages")], :unauthorized)
    end
  end

  def destroy
    current_user_session.destroy
    render json: I18n.t("user_session.logout.message")
  end

  private

  def user_session_params
    params.require(:user_session).permit(:username, :password, :remember_me)
  end
end
