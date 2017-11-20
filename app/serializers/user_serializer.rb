class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :total_score, :last_punch_at, :win_rate

  has_one :user_score

  def total_score
    object.user_score.total_score
  end

  def last_punch_at
    punch = object.punch.last
    punch.present? ? punch.created_at.to_s(:db) : nil
  end

  def win_rate
    punch_list = Punch.joins(:punch_record).includes(:punch_record)
                      .where(user_id: object.id)
    win_times = 0
    return 0 if punch_list.blank?
    punch_list.each do |rst|
      win_times += 1 if rst.win?
    end
    sprintf '%.2f', (win_times.to_f / punch_list.count)
  end
end
