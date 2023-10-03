if ENV['RUN_SCHEDULER'] == 'true' && defined?(Sidekiq)
    require 'rufus-scheduler'
    require 'sidekiq-scheduler'
    
    scheduler = Rufus::Scheduler.new
  
    scheduler.every '2m', overlap: false do
      puts "*" * 1000
      MonthlyJob.perform_async
    end
  end