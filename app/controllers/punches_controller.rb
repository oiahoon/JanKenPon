class PunchesController < ApplicationController
  before_action :set_punch, only: [:show]

  # GET /punches
  def index
    page_number = params[:page]
    @punches = Punch.of_today

    render json: @punches
  end

  # GET /punches/1
  def show
    render json: @punch
  end

  # POST /punches
  def create
    puts punch_params
    @punch = Punch.new(punch_params.merge({user_id: 1}))

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
