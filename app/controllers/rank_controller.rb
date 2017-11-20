class RankController < ApplicationController
  def index
    user_list = User.includes(:user_score).order("user_scores.total_score desc").limit(100)
    render json: user_list
  end

end
