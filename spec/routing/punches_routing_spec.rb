require "rails_helper"

RSpec.describe PunchesController, type: :routing do
  describe "routing" do

    it "routes to #index" do
      expect(:get => "/punches").to route_to("punches#index")
    end


    it "routes to #show" do
      expect(:get => "/punches/1").to route_to("punches#show", :id => "1")
    end


    it "routes to #create" do
      expect(:post => "/punches").to route_to("punches#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/punches/1").to route_to("punches#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/punches/1").to route_to("punches#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/punches/1").to route_to("punches#destroy", :id => "1")
    end

  end
end
