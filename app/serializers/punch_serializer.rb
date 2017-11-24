class PunchSerializer < ActiveModel::Serializer
  attributes :id, :wager, :result, :score_snapshoot, :rival_name

  belongs_to :user

  attribute :pattern do
    Punch::PATTERN.invert[object.pattern]
  end

  def result
    object.result
  end

  def rival_name
    object.rival.present? ? object.rival.username : I18n.t('user.unknown')
  end
end
