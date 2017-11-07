require 'rails_helper'

RSpec.describe "Punches", type: :request do
  describe "GET /punches" do
    it "works! (now write some real specs)" do
      get punches_path
      expect(response).to have_http_status(200)
    end
  end
end
