class PunchSerializer < ActiveModel::Serializer
  attributes :id, :wager, :result, :score_snapshoot, :rival_name

  attribute :pattern do
    Punch::PATTERN.invert[object.pattern]
  end

  def user
    UserSerializer.new(object.user, show_detail_user: instance_options[:show_detail_user]).serializable_hash
  end

  def result
    object.result
  end

  def rival_name
    object.rival.present? ? object.rival.username : I18n.t('user.unknown')
  end
end
