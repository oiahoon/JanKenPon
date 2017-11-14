class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :total_score

  has_one :user_score

  def total_score
    object.user_score.total_score
  end
end
