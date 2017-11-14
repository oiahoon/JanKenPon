require 'rails_helper'

RSpec.describe "PunchRecords", type: :request do
  describe "GET /punch_records" do
    it "works! (now write some real specs)" do
      get punch_records_path
      expect(response).to have_http_status(200)
    end
  end
end
