class UserSession < Authlogic::Session::Base
  authenticate_with User
  cookie_key 'jkp_user_key'
end
