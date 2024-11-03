class MonthlyJob
  include Sidekiq::Worker

  def perform
    require 'uri'
    require 'net/http'
    require 'json'
    require 'redis'
    # Define your list of place IDs and locations
    places = [
      'ChIJvdxR8To0DogRhCRjmGXy7ts',
      'ChIJRQj7LQ5JDogR-YUMlT6K48A',
      'ChIJj8ezzWgxDogRT_5mqMYhk94'
    ]
    http = Net::HTTP.new("maps.googleapis.com", 443)
    http.use_ssl = true
    reviews = []

    places.each do |place|
      place_id = place

      # Fetch place details from Google Places API
      encoded_place_id = URI.encode_www_form_component(place_id)
      url = URI("https://maps.googleapis.com/maps/api/place/details/json?place_id=#{encoded_place_id}&key=#{ENV['REACT_APP_GOOGLE_PLACES_API_KEY']}")
      request = Net::HTTP::Get.new(url)
      response = http.request(request)
      body = response.read_body
      parsed_response = JSON.parse(body)
      if parsed_response['status'] == 'OK'
        # puts "Successfully fetched place details for place ID: #{place_id}"
        # puts "Parsed response:"
        # puts parsed_response.inspect
        place_details = parsed_response['result']
        # puts "Place details:"
        # puts place_details.inspect
        place_reviews = place_details.present? ? place_details['reviews'] || [] : []
        # puts "Place reviews:"
        # puts place_reviews.inspect
        # puts "Merging reviews..."
        # puts "Reviews before merging:"
        # puts reviews.inspect
        reviews.concat(place_reviews)
        # puts "Reviews after merging:"
        # puts reviews.inspect
      else
        puts "Failed to retrieve place details for place ID: #{place_id}"
      end
    end

    # Filter and process the reviews as needed
    filtered_reviews = []
    reviews.each do |review|
      # puts "Applying review filtering logic..."
      # You can apply filtering or processing logic here
      if review['rating'] == 5 && review['author_name'] != 'Pdub ..'
        filtered_reviews << review
      end
    end


    require 'redis'

    redis = Redis.new(
      url: ENV['REDIS_URL'],
      ssl_params: { verify_mode: OpenSSL::SSL::VERIFY_NONE }  # Disable SSL verification
    )
    
    begin
      # puts redis.ping  # Test the connection
    rescue => e
      puts "Failed to connect to Redis: #{e.message}"
    end
    
    
    if redis.exists('cached_google_places_reviews')
      # puts "Cached reviews found. Clearing previous cache..."
      redis.del('cached_google_places_reviews')
      # puts "Previous cache cleared."
    end
    # puts "Caching filtered reviews..."
    


    
    
    begin
      redis.set('cached_google_places_reviews', JSON.generate(filtered_reviews))
      # puts "cached_google_places_reviews successful." # Added logging statement
    rescue => e
      puts "Error caching: #{e.message}" # Log the error message
      # Optionally, you can re-raise the exception to propagate it further
      # raise e
    end
    # puts "Filtered reviews cached successfully."
    # puts "Setting expiration for cache..."
    redis.expire('cached_google_places_reviews', 30.days.to_i)
    # puts "Cache expiration set successfully."
  rescue StandardError => e
    puts "Error in MonthlyJob: #{e.message}"
  end
end
