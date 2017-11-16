namespace :punch do
  desc "every 1 minute random matching punches"
  task matching: :environment do
    Matcher.perform
  end


end
