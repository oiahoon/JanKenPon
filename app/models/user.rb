class User < ApplicationRecord
  acts_as_authentic do |c|
    c.validate_login_field = false
    c.crypto_provider = Authlogic::CryptoProviders::SCrypt
  end

  has_many :punch
  has_one :user_score

end
