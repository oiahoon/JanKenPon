class PunchRecordsController < ApplicationController
  before_action :set_punch_record, only: [:show, :update, :destroy]

  # GET /punch_records
  def index
    @punch_records = PunchRecord.all

    render json: @punch_records
  end

  # GET /punch_records/1
  def show
    render json: @punch_record
  end

  # POST /punch_records
  def create
    @punch_record = PunchRecord.new(punch_record_params)

    if @punch_record.save
      render json: @punch_record, status: :created, location: @punch_record
    else
      render json: @punch_record.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /punch_records/1
  def update
    if @punch_record.update(punch_record_params)
      render json: @punch_record
    else
      render json: @punch_record.errors, status: :unprocessable_entity
    end
  end

  # DELETE /punch_records/1
  def destroy
    @punch_record.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_punch_record
      @punch_record = PunchRecord.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def punch_record_params
      params.require(:punch_record).permit(:punch_id, :rival_punch_id, :result)
    end
end
