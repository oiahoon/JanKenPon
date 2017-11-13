class PunchSerializer < ActiveModel::Serializer
  attributes :id, :wager, :result

  belongs_to :user

  def result
    if object.result.empty?
      "waiting"
    else
      object.result
    end
  end

  attribute :pattern do
    Punch::PATTERN.invert[object.pattern]
  end

end
