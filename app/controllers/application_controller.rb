class ApplicationController < ActionController::API
  include ::ActionController::Cookies
  include ActionController::HttpAuthentication::Basic::ControllerMethods
  include Rails::Pagination

  before_action :load_authlogic

  private
  def current_user_session
    return @current_user_session if defined?(@current_user_session)
    @current_user_session = UserSession.find
  end

  def current_user
    return @current_user if defined?(@current_user)
    @current_user = current_user_session && current_user_session.user
  end

  def require_login
    unless current_user.present?
      api_bad_request({ login: false, error: 'please login first' })
    end
  end

  def api_bad_request(body = nil)
    render json: {error: body}, status: 400
  end

  def api_server_error(body = nil)
    render json: {error: body}, status: 500
  end

  def load_authlogic
    Authlogic::Session::Base.controller = Authlogic::ControllerAdapters::RailsAdapter.new(self)
  end
end
