class PunchesController < ApplicationController
  before_action :set_punch, only: [:show]
  PER_PAGE = 100

  # GET /punches
  def index

    if params[:page]
      page_number = params[:page]
    else
      page_number = 1
    end

    @punches     = Punch.of_today.order("id desc").paginate(page: page_number, per_page: PER_PAGE)
    total_pages  = (Punch.of_today.count / PER_PAGE).ceil
    current_page = page_number

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
