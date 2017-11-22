class PunchSerializer < ActiveModel::Serializer
  attributes :id, :wager, :result, :score_snapshoot

  belongs_to :user

  attribute :pattern do
    Punch::PATTERN.invert[object.pattern]
  end

  def result
    object.result
  end

end
