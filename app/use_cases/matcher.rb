class Matcher
  include UseCase

  def initialize(batch_size = 100000)
    @batch_size = batch_size
  end

  def perform
    if matching_queue
      fight_each_other
    end
  end

  def matching_queue
    Punch.of_today.waiting.order("id desc").limit(@batch_size).each do |punch|
      $redis.sadd("punch-#{punch.user_id}", "#{punch.id},#{punch.user_id},#{punch.pattern}")
    end
  end

  def fight_each_other
    @match_list.
  end


end