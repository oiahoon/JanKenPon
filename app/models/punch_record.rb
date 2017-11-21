class PunchRecord < ApplicationRecord
  has_many :punches


  def self.of_day date
    self.where("DATE(created_at) = ?", Date.parse(date))
  end
end
