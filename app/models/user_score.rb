class UserScore < ApplicationRecord
  belongs_to :user

  validates :total_score, numericality: { greater_than_or_equal_to: 0 }

  def increase score
    self.update_attributes(total_score: self.total_score + score)
  end

  def decrease score
    self.update_attributes(total_score: self.total_score - score)
  end
end
