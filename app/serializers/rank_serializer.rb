class RankSerializer < ActiveModel::Serializer
  attributes :id, :username, :score, :win_rate, :total_times, :date

  def win_rate
    sprintf '%.2f', (object.win_times.to_f / object.total_times)
  end

  def date
    object.punch_date
  end
end
