class Punch < ApplicationRecord
  PATTERN = {
    'ROCK'     => 1,
    'PAPER'    => 2,
    'SCISSORS' => 3
  }
  PUNCH_RESULT = {
    WIN: 'win',
    LOSE: 'lose',
    DOGFALL: 'dogfall',
    WAITING: 'waiting'
  }

  belongs_to :user
  belongs_to :punch_record, optional: true

  scope :of_today, ->{ where("created_at < ? AND created_at >=?",
                                  Time.zone.now.tomorrow.beginning_of_day,
                                  Time.zone.now.beginning_of_day) }

  after_initialize :set_wager
  after_initialize :set_score_snapshoot
  after_create :decrease_score

  validates :user_id, presence: true
  validates :pattern, inclusion: { in: PATTERN.values,
            message: "%{value} is not a valid type" }

  def result
    return PUNCH_RESULT[:WAITING] if !self.published?
    return PUNCH_RESULT[:DOGFALL] if self.dogfall?
    return PUNCH_RESULT[:WIN] if self.win?
    return PUNCH_RESULT[:LOSE] if self.lose?
  end

  def published?
    self.punch_record.present?
  end

  def win?
    !self.dogfall? && self.punch_record.winner_punch_id == self.id
  end

  def lose?
    !self.dogfall? && self.punch_record.winner_punch_id != self.id
  end

  def dogfall?
    self.punch_record.winner_punch_id == 0
  end


  private

  def decrease_score
    self.user.user_score.decrease self.wager
  end

  def set_wager
    self.wager = 1
  end

  def set_score_snapshoot
    self.score_snapshoot = self.user.user_score.total_score
  end
end
