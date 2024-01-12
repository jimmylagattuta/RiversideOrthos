if ENV['RUN_SCHEDULER'] == 'true' && defined?(Sidekiq)
    require 'rufus-scheduler'
    require 'sidekiq-scheduler'
    require 'redis'
    require 'json'
    require 'uri'
    require 'net/http'
    scheduler = Rufus::Scheduler.new
  
    scheduler.every '30d', overlap: false do
      puts "*_*_" * 10
      puts "monthly job has triggered"
      redis = Redis.new(url: ENV['REDIS_URL'], timeout: 0.7)
      puts "Connected to Redis: #{redis.inspect}"
      redis.set('test_key', 'test_value_updated after 5 minutes')
      puts "*_*_" * 10
      # MonthlyJob.perform_async
    end
  end