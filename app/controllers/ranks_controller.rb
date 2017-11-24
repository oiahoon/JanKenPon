class RanksController < ApplicationController
  before_action :set_rank, only: [:show]

  # GET /ranks
  def index
    user_list = User.includes(:user_score, punches: :punch_record).order("user_scores.total_score desc").limit(100)
    render json: user_list
  end

  # GET /ranks/history?date=
  def history
    unless params[:date]
      return render json: { error: [I18n.t("ranks.params.date.missing")] },\
                   status: :bad_request
    end
    begin
      date = Date.parse(params[:date])
      @ranks = Rank.of_day(date).order("score desc")
      render json: @ranks

    rescue Exception => e
      p e
      render json: e.message, status: :bad_request
    end
  end


  private
    def set_rank
      @rank = Rank.find(params[:date])
    end
end
