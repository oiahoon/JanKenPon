class Punch < ApplicationRecord
  PATTERN = {
    'JAN' => 1,   # SCISSORS
    'KEN' => 2,   # ROCK
    'PON' => 3    # PAPER
  }
  PUNCH_RESULT = {
    WIN: 'win',
    LOSE: 'lose',
    DOGFALL: 'dogfall',
    WAITING: 'waiting'
  }

  belongs_to :user
  belongs_to :punch_record, optional: true

  scope :of_today, -> { where("created_at < ? AND created_at >=?",
                                  Time.zone.now.tomorrow.beginning_of_day,
                                  Time.zone.now.beginning_of_day) }
  scope :of_user, ->(user_id) { where("user_id = ?", user_id) }
  scope :waiting, -> { where("punch_record_id IS NULL") }

  before_create :set_wager
  before_create :set_score_snapshoot
  before_create :decrease_score

  validates :user_id, presence: true
  validates :pattern, inclusion: { in: PATTERN.values,
            message: "%{value} #{I18n.t('punch.pattern.invalid')}" }

  validate :user_score_greater_than_wager, :on => :create


  def result
    return PUNCH_RESULT[:WAITING] if !self.published?
    return PUNCH_RESULT[:DOGFALL] if self.dogfall?
    return PUNCH_RESULT[:WIN] if self.win?
    return PUNCH_RESULT[:LOSE] if self.lose?
  end

  def published?
    self.punch_record.present?
  end

  def win punch_record
    self.user.user_score.increase(self.wager * 2)
    self.update_attribute(:punch_record_id, punch_record.id)
  end

  def lose punch_record
    self.update_attribute(:punch_record_id, punch_record.id)
  end

  def dogfall punch_record
    self.user.user_score.increase self.wager
    self.update_attribute(:punch_record_id, punch_record.id)
  end

  def win?
    self.published? &&\
      !self.dogfall? && self.punch_record.winner_punch_id == self.id
  end

  def lose?
    self.published? &&\
      !self.dogfall? && self.punch_record.winner_punch_id != self.id
  end

  def dogfall?
    self.published? &&\
      self.punch_record.winner_punch_id == 0
  end

  private

  def user_score_greater_than_wager
    if self.user.user_score.total_score < self.wager
      errors.add(:user, I18n.t("user_score.not_enough"))
    end
  end

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
