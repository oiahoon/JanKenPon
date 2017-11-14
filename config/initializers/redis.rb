# config/initializers/redis.rb
# You can probably move this to the autoload_paths in your regular config/application.rb

Rails.application.config.autoload_paths += Dir[File.join(Rails.root, "lib", "redis.rb")].each {|l| require l }