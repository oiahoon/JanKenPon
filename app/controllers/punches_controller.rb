class PunchesController < ApplicationController
  before_action :set_punch, only: [:show]
  before_action :require_login
  PER_PAGE = 100

  # GET /punches
  def index
    current_page = params[:page].presence || 1
    @punches     = Punch.includes({user: [:user_score, punches: :punch_record]},  :punch_record).
                         of_today.of_user(current_user.id).
                         order("punches.id desc").
                         paginate(page: current_page, per_page: PER_PAGE)

    render json: @punches, show_detail_user: true
  end

  # GET /punches/1
  def show
    render json: @punch
  end

  # POST /punches
  def create
    unless Time.zone.now > Time.zone.parse("11pm") ||  Time.zone.now < Time.zone.parse("6am")
      @punch = Punch.new(punch_params.merge({user_id: current_user.id}))
      if @punch.save
        render json: @punch, status: :ok
      else
        render json: { error: @punch.errors.values.flatten }, status: :unprocessable_entity
      end
    else
      render json: { error:[I18n.t("punch.out_of_time_range")] }, status: :not_acceptable
    end
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_punch
      @punch = Punch.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def punch_params
      params.require(:punch).permit(:pattern)
    end
end
