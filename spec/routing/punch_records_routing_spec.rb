require "rails_helper"

RSpec.describe PunchRecordsController, type: :routing do
  describe "routing" do

    it "routes to #index" do
      expect(:get => "/punch_records").to route_to("punch_records#index")
    end


    it "routes to #show" do
      expect(:get => "/punch_records/1").to route_to("punch_records#show", :id => "1")
    end


    it "routes to #create" do
      expect(:post => "/punch_records").to route_to("punch_records#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/punch_records/1").to route_to("punch_records#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/punch_records/1").to route_to("punch_records#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/punch_records/1").to route_to("punch_records#destroy", :id => "1")
    end

  end
end
