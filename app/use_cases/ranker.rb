class Ranker
  include UseCase

  USER_LIST_KEY = "rank-user-list"
  INITIAL_SCORE = 100

  def initialize(date)
    @punch_date = date
    logger.info "="*100
    logger.info "rank calculate start"
  end

  def perform
    # punch without records should be give back the score to user
    # user without punch_record should be exclude
    # each valid user should has and only one rank each day
    $redis.del(USER_LIST_KEY)
    $redis.keys("rank-*").map{ |a| $redis.del(a) }

    refund_unmatched_punch
    enqueue_punch_result

    user_count = $redis.scard(USER_LIST_KEY)

    if user_count <= 0
      logger.warn("** no data for date: #{@punch_date}")
      return false
    end

    ActiveRecord::Base.transaction do
      Rank.of_day(@punch_date).delete_all
      while(user_id = $redis.spop(USER_LIST_KEY))
        logger.info "&"*100
        logger.info user_id
        begin
          user = User.find_by_id(user_id)
          rank = Rank.new({
            :user_id     => user_id,
            :score       => 0,
            :username    => user.username,
            :win_times   => $redis.get("rank-#{user_id}-#{Punch::PUNCH_RESULT[:WIN]}"),
            :lose_times  => $redis.get("rank-#{user_id}-#{Punch::PUNCH_RESULT[:LOSE]}"),
            :dog_times   => $redis.get("rank-#{user_id}-#{Punch::PUNCH_RESULT[:DOGFALL]}"),
            :total_times => 0,
            :punch_date  => @punch_date,
          })
          rank.total_times = rank.win_times.to_i + rank.lose_times + rank.dog_times.to_i
          rank.score       = INITIAL_SCORE + rank.win_times.to_i - rank.lose_times.to_i
          logger.info rank
          rank.save
          logger.info "#{user_id}{win:#{rank.win_times},lose:#{rank.lose_times},dog:#{rank.dog_times}}"
          Punch::PUNCH_RESULT.values[0..2].each do |s|
            $redis.del "rank-#{user_id}-#{s}"
          end
        rescue Exception => e
          logger.error e
        end
      end
    end
  end

  def refund_unmatched_punch
    Punch.of_day(@punch_date).waiting.find_in_batches do |group|
      group.each do |punch|
        begin
          ActiveRecord::Base.transaction do
            punch.user.user_score.increase punch.wager
            punch.delete
          end
        rescue
        end
      end
    end
  end

  def enqueue_punch_result
    PunchRecord.of_day(@punch_date).find_in_batches do |group|
      group.each do |punch_record|
        logger.info punch_record
        punch_record.punches.each do |punch|
          logger.info punch
          logger.info punch.user_id
          logger.info punch.result
          begin
            $redis.sadd(USER_LIST_KEY, punch.user_id) #unless $redis.sismember(USER_LIST_KEY, punch.user_id)
            $redis.incr("rank-#{punch.user_id}-#{punch.result}")
          rescue Exception => e
            logger.error e
          end
        end
      end
    end
  end

  private

  def logger
    @logger ||= Logger.new("#{Rails.root}/log/ranks.log")
  end
end