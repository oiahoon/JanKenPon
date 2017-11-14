class User < ApplicationRecord
  acts_as_authentic do |c|
    c.login_field = :username
    c.validate_login_field = false
    c.crypto_provider = Authlogic::CryptoProviders::SCrypt
    c.validates_length_of_password_field_options = { in: 4..20 }
  end

  has_many :punch
  has_one :user_score

  validates :username, uniqueness: true, presence: true, length: { in: 4..40 }
end
