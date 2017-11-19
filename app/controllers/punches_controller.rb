class PunchesController < ApplicationController
  before_action :set_punch, only: [:show]
  before_action :require_login
  PER_PAGE = 100

  # GET /punches
  def index
    current_page = params[:page].presence || 1
    @punches     = paginate Punch.of_today.of_user(current_user.id).includes(:user).order("id desc"), per_page: PER_PAGE

    render json: @punches
  end

  # GET /punches/1
  def show
    render json: @punch
  end

  # POST /punches
  def create
    @punch = Punch.new(punch_params.merge({user_id: current_user.id}))
    if @punch.save
      render json: @punch, status: :created, location: @punch
    else
      render json: @punch.errors, status: :unprocessable_entity
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
