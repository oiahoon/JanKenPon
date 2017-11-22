# Use this file to easily define all of your cron jobs.
#
# It's helpful, but not entirely necessary to understand cron before proceeding.
# http://en.wikipedia.org/wiki/Cron

# Example:
#
# set :output, "/path/to/my/cron_log.log"
#
# every 2.hours do
#   command "/usr/bin/some_great_command"
#   runner "MyModel.some_method"
#   rake "some:great:rake:task"
# end
#
# every 4.days do
#   runner "AnotherModel.prune_old_records"
# end
# 1.minute 1.day 1.week 1.month 1.year is also supported
#
# Learn more: http://github.com/javan/whenever

every 1.minute do
  rake "punch:matching"
end


every :day, :at => '12:01am' do
  rake "score:renew"
end

every :day, :at => '12:02am' do
  rake "rank:calculating"
end