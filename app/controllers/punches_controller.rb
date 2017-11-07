class PunchesController < ApplicationController
  before_action :set_punch, only: [:show, :update, :destroy]

  # GET /punches
  def index
    @punches = Punch.all

    render json: @punches
  end

  # GET /punches/1
  def show
    render json: @punch
  end

  # POST /punches
  def create
    @punch = Punch.new(punch_params)

    if @punch.save
      render json: @punch, status: :created, location: @punch
    else
      render json: @punch.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /punches/1
  def update
    if @punch.update(punch_params)
      render json: @punch
    else
      render json: @punch.errors, status: :unprocessable_entity
    end
  end

  # DELETE /punches/1
  def destroy
    @punch.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_punch
      @punch = Punch.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def punch_params
      params.require(:punch).permit(:pattern, :user_id)
    end
end
