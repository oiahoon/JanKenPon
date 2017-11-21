Rails.application.config.session_store :redis_store, {
  servers: "redis://redis:6379/0/session",
  key:           '_jkp-session',
  path:          '/',
  domain:        nil,   # accepted domain, for example '.example.com'
  expire_after:  nil,   # the session will be expired in X seconds unless active
  secure:        false, # if true, cookie is valid only on https
  httponly:      true   # if true, javascript can't access the cookie
}