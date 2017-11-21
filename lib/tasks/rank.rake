namespace :rank do
  desc "calculate today's rank list, at am 00:01 each day"
  task calculating: :environment do
    Ranker.perform(Date.yesterday.to_s)
  end

end
