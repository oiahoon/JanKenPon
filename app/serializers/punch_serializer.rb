class PunchSerializer < ActiveModel::Serializer
  attributes :id, :wager, :result, :result_score

  belongs_to :user

  attribute :pattern do
    Punch::PATTERN.invert[object.pattern]
  end

  def result
    if object.result.empty?
      "waiting"
    else
      object.result
    end
  end

  def result_score
    case object.result
    when Punch::RESULT_EVEN
      object.score_snapshoot
    when Punch::RESULT_WIN
      object.score_snapshoot + object.wager
    when Punch::RESULT_LOSE
      object.score_snapshoot - object.wager
    else
      'waiting'
    end
  end

end
