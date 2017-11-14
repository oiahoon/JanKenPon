class Punch < ApplicationRecord
  PATTERN = {
    'ROCK'     => 1,
    'PAPER'    => 2,
    'SCISSORS' => 3
  }
  belongs_to :user
  has_one :punch_record

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

  def win?
    (self.punch_record.win? && self.player_a?) ||
    (self.punch_record.lose? && self.player_b?)
  end

  def lose?
    (self.punch_record.lose? && self.player_a?) ||
    (self.punch_record.win? && self.player_b?)
  end
  
  def dogfall?
    self.punch_record.dogfall?
  end

  def player_a?
    self.punch_record.punch_id == self.id
  end

  def player_b?
    self.punch_record.rival_punch_id == self.id
  end

  # def win
  #   PunchRecord.transaction do
  #     self.user.user_score.earning(self.wager)
  #     self.update_attibute(:result, RESULT_WIN)
  #   end
  # end
  
  # def lose
  #   PunchRecord.transaction do
  #     self.user.user_score.losing(self.wager)
  #     self.update_attibute(:result, RESULT_LOSE)
  #   end
  # end

  # def dogfall
  #   self.user.user_score.unfreezing(self.wager)
  #   self.update_attibute(:result, RESULT_EVEN)
  # end
  
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
