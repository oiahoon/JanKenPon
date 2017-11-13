class ApplicationController < ActionController::API
  include ::ActionController::Cookies
  include ActionController::HttpAuthentication::Basic::ControllerMethods

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

  def render_api_json(status, body = nil)
    render json: { status: status, body: body }
  end

  def api_settings
    @api_settings ||= YAML::load(File.open("#{Rails.root}/config/api_settings.yml"))
  end

  def load_authlogic
    Authlogic::Session::Base.controller = Authlogic::ControllerAdapters::RailsAdapter.new(self)
  end
end
