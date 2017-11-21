class Rank < ApplicationRecord

  scope :of_day, ->(date) { where(punch_date: date) }
  has_one :user

end
