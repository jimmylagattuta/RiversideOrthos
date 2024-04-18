class Api::V1::JobsController < ApplicationController
  require 'redis'
  require 'json'
  require 'uri'
  require 'net/http'

  def index
    render json: "OAR " * 1000
  end

  def pull_google_places_cache
    require 'redis'
    require 'json'
    require 'uri'
    require 'net/http'

    # Set the path to your CA certificate file
    ca_path = Rails.root.join('/config/cacert.pem').to_s
    puts "@_@ ca_path"
    puts ca_path.inspect
    # Configure Redis to use the CA bundle for SSL connections
    require 'redis'

    redis = Redis.new(
      url: ENV['REDIS_URL'],
      ssl_params: {
        ca_file: "/app/config/cacert.pem",
        verify_mode: OpenSSL::SSL::VERIFY_PEER,
        ssl_version: :TLSv1_2  # Specify the TLS version if needed
      }
    )
    
    begin
      puts redis.ping  # Test the connection
    rescue => e
      puts "Failed to connect to Redis: #{e.message}"
    end
    
    
    puts "redis"
    puts redis.inspect

  
    csrf_token = form_authenticity_token

    # Define your list of place IDs and locations
    places = [
      'ChIJvdxR8To0DogRhCRjmGXy7ts',
      'ChIJRQj7LQ5JDogR-YUMlT6K48A',
      'ChIJj8ezzWgxDogRT_5mqMYhk94'
    ]
    http = Net::HTTP.new("maps.googleapis.com", 443)
    http.use_ssl = true
    reviews = []
    count = 0

    places.each do |place|
      if count < 1
        place_id = place

        # Fetch place details from Google Places API
        encoded_place_id = URI.encode_www_form_component(place_id)
        url = URI("https://maps.googleapis.com/maps/api/place/details/json?place_id=#{encoded_place_id}&key=#{ENV['REACT_APP_GOOGLE_PLACES_API_KEY']}")
        request = Net::HTTP::Get.new(url)
        response = http.request(request)
        body = response.read_body
        parsed_response = JSON.parse(body)
        if parsed_response['status'] == 'OK'
          puts "Successfully fetched place details for place ID: #{place_id}"
          puts "Parsed response:"
          puts parsed_response.inspect
          place_details = parsed_response['result']
          puts "Place details:"
          puts place_details.inspect
          place_reviews = place_details.present? ? place_details['reviews'] || [] : []
          puts "Place reviews:"
          puts place_reviews.inspect
          puts "Merging reviews..."
          puts "Reviews before merging:"
          puts reviews.inspect
          reviews.concat(place_reviews)
          puts "Reviews after merging:"
          puts reviews.inspect
        else
          puts "Failed to retrieve place details for place ID: #{place_id}"
        end
      end
      count = count + 1
    end

    # Filter and process the reviews as needed
    filtered_reviews = []
    reviews.each do |review|
      puts "Applying review filtering logic..."
      # You can apply filtering or processing logic here
      if review['rating'] == 5
        filtered_reviews << review
      end
      puts "@___@ filtered_reviews"
      puts filtered_reviews.inspect
      puts "@___@ reviews"
      puts reviews.inspect
    end
    if redis.exists('cached_google_places_reviews')
      puts "Cached reviews found. Clearing previous cache..."
      redis.del('cached_google_places_reviews')
      puts "Previous cache cleared."
    end
    puts "Caching filtered reviews..."
    


    
    
    begin
      redis.set('cached_google_places_reviews', JSON.generate(filtered_reviews))
      puts "cached_google_places_reviews successful." # Added logging statement
    rescue => e
      puts "Error caching: #{e.message}" # Log the error message
      # Optionally, you can re-raise the exception to propagate it further
      # raise e
    end
      puts "Filtered reviews cached successfully."
      puts "Setting expiration for cache..."
      redis.expire('cached_google_places_reviews', 30.days.to_i)
      puts "Cache expiration set successfully."

      render json: { reviews: reviews, csrf_token: csrf_token }
  end

  private

  def fetch_place_id_with_caching(name)
    require 'redis'
    require 'json'
    require 'uri'
    require 'net/http'




    ca_path = "/config/cacert.pem"
    
    require 'redis'

    redis = Redis.new(
      url: ENV['REDIS_URL'],
      ssl_params: {
        ca_file: "/app/config/cacert.pem",
        verify_mode: OpenSSL::SSL::VERIFY_PEER,
        ssl_version: :TLSv1_2  # Specify the TLS version if needed
      }
    )
    
    begin
      puts redis.ping  # Test the connection
    rescue => e
      puts "Failed to connect to Redis: #{e.message}"
    end
    
    puts "Connected to Redis: #{redis.inspect}"

    cache_key = "cached_google_places_reviews"
    puts "cached_google_places_reviews"

    cached_id = nil
    if redis
      puts "this ran"
      # cached_id = redis.get(cache_key)
      # puts "cached_id"
      # puts cached_id.inspect
    end

    if cached_id
      puts "Place ID pulled from cache for '#{name}'"
      return cached_id
    end

    http = Net::HTTP.new("maps.googleapis.com", 443)
    puts "1"
    http.use_ssl = true
    puts "2"
    url = URI("https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=#{URI.encode_www_form_component(name)}&inputtype=textquery&fields=place_id&key=#{ENV['REACT_APP_GOOGLE_PLACES_API_KEY']}")
    puts "3"
    request = Net::HTTP::Get.new(url)
    puts "4"
    response = http.request(request)
    puts "5"
    if response.is_a?(Net::HTTPSuccess)
      puts "6"
      data = JSON.parse(response.body)
      puts "Parsed JSON data: #{data.inspect}" # Added logging statement
      if data['candidates'].nil? || data['candidates'].empty?
        puts "No candidates found in the response." # Added logging statement
        return # No candidates found, exit the method
      end
      
      puts "Candidates found in the response: #{data['candidates'].inspect}" # Added logging statement
      place_id = data['candidates'][0]['place_id']
      puts "Selected place_id: #{place_id}" # Added logging statement
      begin
        redis.set(cache_key, place_id, ex: 86400 * 30) # Cache for 30 days
        puts "Place_id cached successfully." # Added logging statement
      rescue => e
        puts "Error caching place_id: #{e.message}" # Log the error message
        # Optionally, you can re-raise the exception to propagate it further
        # raise e
      end
      
      puts "Place_id cached successfully." # Added logging statement
      return place_id
    end      
    nil
  end

  def fetch_reviews_with_caching(place_id)
    require 'redis'
    require 'json'
    require 'uri'
    require 'net/http'


    ca_path = "/config/cacert.pem"
    
    redis = Redis.new(
      url: ENV['REDIS_URL'],
      ssl_params: {
        ca_file: ca_path,
        verify_mode: OpenSSL::SSL::VERIFY_PEER
      }
    )
    
    begin
      puts "Redis connection test with SSL verification: #{redis.ping}"  # Should output "PONG" if successful
    rescue => e
      puts "Failed to connect to Redis with SSL verification: #{e.message}"
    end
    
    cache_key = "cached_google_places_reviews"
    cached_reviews = redis.get(cache_key)

    if cached_reviews
      puts "Google Places reviews pulled from cache for place ID: #{place_id}"
      return JSON.parse(cached_reviews)
    end

    puts "Calling Google Places API for place ID: #{place_id}"

    http = Net::HTTP.new("maps.googleapis.com", 443)
    http.use_ssl = true
    url = URI("https://maps.googleapis.com/maps/api/place/details/json?place_id=#{place_id}&fields=reviews&key=#{ENV['REACT_APP_GOOGLE_PLACES_API_KEY']}")
    request = Net::HTTP::Get.new(url)
    response = http.request(request)
    if response.is_a?(Net::HTTPSuccess)
      data = JSON.parse(response.body)
      if data['result'] && data['result']['reviews']
        reviews = data['result']['reviews']
        redis.set(cache_key, reviews.to_json, ex: 86400 * 30) # Cache for 30 day
        return reviews
      end
    end
    []
  end

  def filter_reviews_by_rating(reviews, rating)
    reviews.select { |review| review['rating'] == rating }
  end

  def filter_reviews_by_text(reviews, text_to_remove)
    reviews.map do |review|
      sentences = review['text'].split(/(?<=[.!?])\s+(?=[a-zA-Z])/)
      filtered_sentences = sentences.reject { |sentence| sentence.include?(text_to_remove) }
      review['text'] = filtered_sentences.join(' ')
      review
    end
  end
end
