class UserScore < ApplicationRecord
  belongs_to :user

  validates :total_score, numericality: { greater_than_or_equal_to: 0 }

  # unfreezing + decrease
  def losing score
    self.freeze_score -= score
    self.save
  end

  # unfeezing + increase
  def earning score
    self.total_score += score * 2
    self.freeze_score -= score
    self.save
  end

  def freezing score
    self.total_score -= score
    self.freeze_score += score
    self.save
  end

  def unfreezing score
    self.total_score += score
    self.freeze_score -= score
    self.save
  end

  def increase score
    self.total_score += score
    self.save
  end

  def decrease score
    self.total_score -= score
    self.save
  end
end
