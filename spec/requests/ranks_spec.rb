require 'rails_helper'

RSpec.describe "Ranks", type: :request do
  describe "GET /ranks" do
    it "works! (now write some real specs)" do
      get ranks_path
      expect(response).to have_http_status(200)
    end
  end
end
