class User < ApplicationRecord
  acts_as_authentic do |c|
    c.login_field = :username
    c.validate_login_field = false
    c.crypto_provider = Authlogic::CryptoProviders::SCrypt
    c.validates_length_of_password_field_options = { in: 4..20 }
  end

  has_many :punches
  has_one :user_score

  validates :username, uniqueness: true, presence: true, length: { in: 4..40 }

  after_create :init_user_score

  def init_user_score
    self.create_user_score
  end

  def win_rate
    punch_count == 0 ? 0 : win_count / punch_count.to_f
  end

  def win_count
    punch_ids = self.punches.map(&:id)
    self.punches.map(&:punch_record).compact.select { |record| punch_ids.include?(record.winner_punch_id) }.count
  end

  def punch_count
    self.punches.map(&:punch_record).compact.count
  end
end
