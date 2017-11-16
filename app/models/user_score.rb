class UserScore < ApplicationRecord
  belongs_to :user

  validates :total_score, numericality: { greater_than_or_equal_to: 0 }

  def increase score
    self.total_score += score
    self.save
  end

  def decrease score
    self.total_score -= score
    self.save
  end
end
