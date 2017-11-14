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

  # def matching_queue
  #   @match_list = Punch.match_list
  # end

  # def fight_each_other
  #   @match_list.
  # end


end