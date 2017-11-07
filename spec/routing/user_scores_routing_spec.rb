require "rails_helper"

RSpec.describe UserScoresController, type: :routing do
  describe "routing" do

    it "routes to #index" do
      expect(:get => "/user_scores").to route_to("user_scores#index")
    end


    it "routes to #show" do
      expect(:get => "/user_scores/1").to route_to("user_scores#show", :id => "1")
    end


    it "routes to #create" do
      expect(:post => "/user_scores").to route_to("user_scores#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/user_scores/1").to route_to("user_scores#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/user_scores/1").to route_to("user_scores#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/user_scores/1").to route_to("user_scores#destroy", :id => "1")
    end

  end
end
