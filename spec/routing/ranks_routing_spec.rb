require "rails_helper"

RSpec.describe RanksController, type: :routing do
  describe "routing" do

    it "routes to #index" do
      expect(:get => "/ranks").to route_to("ranks#index")
    end


    it "routes to #show" do
      expect(:get => "/ranks/1").to route_to("ranks#show", :id => "1")
    end


    it "routes to #create" do
      expect(:post => "/ranks").to route_to("ranks#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/ranks/1").to route_to("ranks#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/ranks/1").to route_to("ranks#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/ranks/1").to route_to("ranks#destroy", :id => "1")
    end

  end
end
