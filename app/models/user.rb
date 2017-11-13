class User < ApplicationRecord
  has_many :punch
  has_one :user_score

end
