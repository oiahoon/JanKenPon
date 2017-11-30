namespace :punch do
  desc "every 1 minute random matching punches"
  task matching: :environment do
    Matcher.perform unless Time.current.between?(Time.parse('12:00am'), Time.parse('6:00am'))
  end


end
