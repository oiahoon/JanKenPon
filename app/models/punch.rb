class Punch < ApplicationRecord
  RESULT_WIN  = 'win'
  RESULT_LOSE = 'lose'
  RESULT_EVEN = 'even'

  PATTERN = {
    'ROCK'     => 1,
    'PAPER'    => 2,
    'SCISSORS' => 3
  }
  belongs_to :user

  scope :of_yesterday, ->{ where("created_at < ? AND created_at >=?",
                                  Time.zone.now.beginning_of_day,
                                  Time.zone.now.yesterday.beginning_of_day) }

  scope :of_today, ->{ where("created_at < ? AND created_at >=?",
                                  Time.zone.now.tomorrow.beginning_of_day,
                                  Time.zone.now.beginning_of_day) }

  after_initialize :set_wager
  after_initialize :set_score_snapshoot
  after_create :freeze_score

  validates :user_id, presence: true
  validates :pattern, inclusion: { in: PATTERN.values,
            message: "%{value} is not a valid type" }

  def win
    Punch.transaction do
      self.user.user_score.earning(self.wager)
      self.update_attibute(:result, RESULT_WIN)
    end
  end

  def win?
    self.result == RESULT_WIN
  end

  def lose
    Punch.transaction do
      self.user.user_score.losing(self.wager)
      self.update_attibute(:result, RESULT_LOSE)
    end
  end

  def lose?
    self.result == RESULT_LOSE
  end

  def dogfall
    self.user.user_score.unfreezing(self.wager)
    self.update_attibute(:result, RESULT_EVEN)
  end

  def dogfall?
    self.result == RESULT_EVEN
  end


  private
  def freeze_score
    self.user.user_score.freezing(self.wager)
  end

  def set_wager
    self.wager = 1
  end

  def set_score_snapshoot
    self.score_snapshoot = self.user.user_score.total_score
  end
end
