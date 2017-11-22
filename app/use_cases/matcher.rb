class Matcher
  include UseCase

  USER_ID_LIST_KEY = "punch_user_ids"

  def initialize(batch_size = 100000)
    @batch_size = batch_size
    logger.info "="*100
    logger.info "match start"
  end

  def perform
    if matching_queue
      fight_each_other
    end
  end

  def matching_queue
    @punches = Punch.of_today.waiting.order("id desc").limit(@batch_size)
    user_ids = @punches.pluck(:user_id).uniq

    $redis.keys("punch-*").map{ |a| $redis.del(a) }
    $redis.del(USER_ID_LIST_KEY)

    user_ids.each do |user_id|
      $redis.sadd(USER_ID_LIST_KEY, user_id)
    end

    @punches.each do |punch|
      $redis.sadd("punch-#{punch.user_id}", "#{punch.id},#{punch.user_id},#{punch.pattern}")
    end
  end

  def fight_each_other
    user_a, user_b = random_fighters

    fight_over if user_a.nil? || user_b.nil?

    punch_a = $redis.srandmember "punch-#{user_a}"
    if punch_a.nil?
      $redis.srem(USER_ID_LIST_KEY, user_a)
      fight_each_other
    end

    punch_b = $redis.srandmember "punch-#{user_b}"
    if punch_a.nil?
      $redis.srem(USER_ID_LIST_KEY, user_a)
      fight_each_other
    end

    begin

      a = punch_a.split(',')
      b = punch_b.split(',')

      result = pon(a[2], b[2])

      case result
      when 'win'
        loser_punch  = b[0]
        winner_punch = a[0]
      when 'lose'
        loser_punch  = a[0]
        winner_punch = b[0]
      else
        winner_punch = loser_punch = 0
      end

      ActiveRecord::Base.transaction do
        pr = PunchRecord.create({ winner_punch_id: winner_punch.to_i })
        unless winner_punch == 0
          Punch.find_by_id(winner_punch.to_i).win pr
          Punch.find_by_id(loser_punch.to_i).lose pr
        else
          Punch.find_by_id(a[0]).dogfall pr
          Punch.find_by_id(b[0]).dogfall pr
        end
      end
    rescue Exception => e
      logger.error e
    ensure
      $redis.srem("punch-#{user_a}", punch_a)
      $redis.srem("punch-#{user_b}", punch_b)
      logger.info "A: #{punch_a} B: #{punch_b}"
    end
    fight_each_other
  end

  def random_fighters
    $redis.srandmember(USER_ID_LIST_KEY, 2)
  end

  def fight_over
    logger.info "="*100
    logger.info "match over"
    exit
  end

  def pon a, b
    c = (a.to_i - b.to_i)
    if [-2, 1].include? c
      return 'win'
    elsif [2, -1].include? c
      return 'lose'
    # elsif c == 0
    else
      return 'dogfall'
    end
  end

  private

  def logger
    @logger ||= Logger.new("#{Rails.root}/log/matches.log")
  end
end