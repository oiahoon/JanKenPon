class PunchRecord < ApplicationRecord
  RESULT_WIN  = 'win'
  RESULT_LOSE = 'lose'
  RESULT_EVEN = 'even'


  def win?
    self.result == RESULT_WIN
  end

  def lose?
    self.result == RESULT_LOSE
  end
  
  def dogfall?
    self.result == RESULT_EVEN
  end


end
