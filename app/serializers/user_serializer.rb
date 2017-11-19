class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :total_score, :last_punch_at, :win_rate

  has_one :user_score
  cached
  delegate :cache_key, to: :object

  def total_score
    object.user_score.total_score
  end

  def last_punch_at
    punch = object.punch.last
    punch.present? ? punch.created_at.to_s(:db) : nil
  end

  def win_rate
    punch_list = Punch.joins("LEFT JOIN punch_records ON punches.punch_record_id = punch_records.winner_punch_id")\
                      .where(user_id: object.id)
                  # .where("punches.punch_record_id IS NOT NULL AND punches.punch_record_id > 0")\
                  # .where("punch_records.winner_punch_id")
    win_times = 0
    punch_list.each do |rst|
      win_times += 1 if rst.win?
    end
    sprintf '%.2f', (win_times.to_f / punch_list.count)
  end
end
