class MonthlyJob
  include Sidekiq::Worker

  def perform
    require 'uri'
    require 'net/http'
    require 'json'
    require 'redis'

    # Define your list of predefined place IDs (similar to LA Orthos)
    places = [
      'ChIJvdxR8To0DogRhCRjmGXy7ts',
      'ChIJRQj7LQ5JDogR-YUMlT6K48A',
      'ChIJj8ezzWgxDogRT_5mqMYhk94'
    ]

    http = Net::HTTP.new("maps.googleapis.com", 443)
    http.use_ssl = true
    reviews = []

    places.each do |place_id|
      # Fetch place details from Google Places API
      encoded_place_id = URI.encode_www_form_component(place_id)
      url = URI("https://maps.googleapis.com/maps/api/place/details/json?place_id=#{encoded_place_id}&key=#{ENV['REACT_APP_GOOGLE_PLACES_API_KEY']}")
      request = Net::HTTP::Get.new(url)
      response = http.request(request)
      body = response.read_body
      parsed_response = JSON.parse(body)

      if parsed_response['status'] == 'OK'
        place_details = parsed_response['result']
        place_reviews = place_details['reviews'] || []
        reviews.concat(place_reviews)
      else
        puts "Failed to retrieve place details for place ID: #{place_id}"
      end
    end

    # Optionally filter the reviews
    filtered_reviews = reviews.select { |review| review['rating'] == 5 }

    # Connect to Redis and cache the filtered reviews
    redis = Redis.new(url: ENV['REDIS_URL'])
    if redis.exists('cached_google_places_reviews')
      redis.del('cached_google_places_reviews')
    end
    redis.set('cached_google_places_reviews', JSON.generate(filtered_reviews))
    redis.expire('cached_google_places_reviews', 30.days.to_i)
  rescue StandardError => e
    puts "Error in MonthlyJob: #{e.message}"
  end
end