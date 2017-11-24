class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :total_score, :last_punch_at
  attribute :punch_count, if: :show_detail_user?
  attribute :win_rate, if: :show_detail_user?

  has_one :user_score

  def show_detail_user?
    instance_options[:show_detail_user]
  end

  def total_score
    object.user_score.total_score
  end

  def last_punch_at
    punch = object.punches.last
    punch.present? ? punch.created_at.strftime("%Y-%m-%d %H:%M:%S") : nil
  end

  def win_rate
    sprintf '%.2f', object.win_rate
  end

end
