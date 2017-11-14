class UserSerializer < ActiveModel::Serializer
  attributes :id, :username

  has_one :user_score
end
