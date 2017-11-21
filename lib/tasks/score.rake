namespace :score do
  desc "renew all user's score, at 00:00"
  task renew: :environment do
    UserScore.update_all(total_score: 100)
  end

end
