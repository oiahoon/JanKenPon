Rails.application.config.session_store :redis_store, servers: "redis://redis:6379/0/session"
