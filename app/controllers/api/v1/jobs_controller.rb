class Api::V1::JobsController < ApplicationController
  def index
    render json: "Los Angeles Orthopedic Group " * 1000
  end

  def pull_google_places_cache
    puts "Reached pull_google_places_cache action" # Add this line for debugging
    csrf_token = form_authenticity_token
    puts "CSRF token: #{csrf_token}" # Add this line for debugging
    reviews = GooglePlacesCached.cached_google_places_reviews
    puts "Retrieved reviews: #{reviews}" # Add this line for debugging
    render json: { reviews: reviews, csrf_token: csrf_token }
  end
end

class GooglePlacesCached
  require 'redis'
  require 'json'
  require 'uri'
  require 'net/http'
  def self.remove_user_by_name(users, name)
      users.reject! { |user| user['user'] && user['user']['name'] == name }
    end
    

  def self.cached_google_places_reviews
    # user = User.create(email: "mail@test.com", password: "1234test", password_confirmation: "1234test")
    # users = User.all
    # users.each do |user|
      # puts "user"
      # puts user.inspect
    # end
    user = User.last
    puts "*" * 100
    puts "user.last"
    puts user.inspect
    puts "*" * 100
    redis = Redis.new(url: ENV['REDIS_URL'], timeout: 0.7)
    puts "Connected to Redis: #{redis.inspect}"
  
    # Set a test key-value pair
    # redis.set('test_key', 'test_value')
    # puts "Set test_key to test_value"
  
    # Retrieve the value from Redis
    value = redis.get('test_key')
    # puts "Retrieved value for test_key: #{value}"
    # cached_data = redis.get('cached_google_places_reviews')
    # puts "redis line 31 cached_data inspect"
    # puts cached_data.inspect
    # reviews = JSON.parse(cached_data) if cached_data
    # if cached_data.present?
    #   # Parse the JSON data into an array of hashes
    #   users = JSON.parse(cached_data)

    #   # Call the class method to remove the user with name "Pdub .."
    #   remove_user_by_name(users, 'Pdub ..')
    #   filtered_reviews = users.select { |review| review['rating'] == 5 }

    #   # Convert the updated data back to a JSON string
    #   updated_reviews = JSON.generate(filtered_reviews)
    #   return updated_reviews
    # end
    # place_ids = [
    #   'ChIJ6wjoflfGwoARIQ4pYyXJCN8',
    #   'ChIJo34riQ3GwoARLZD9o-uqI8Y',
    #   'ChIJfc-vNJTTwoARtN9DZQQNDRc',
    #   'ChIJ1e1EWx7RwoAReCY-TXXbhT4',
    #   'ChIJm2ksPQiZwoARG_JhTUiR0pI',
    #   'ChIJj3JTtm7BwoARcku_Ur8WuDE',
    #   'ChIJsT3iMBWHwoARLfqsCmNi-C0'
    # ]
    # http = Net::HTTP.new("maps.googleapis.com", 443)
    # http.use_ssl = true
    # reviews = []
    # place_ids.each do |place_id|
    #   encoded_place_id = URI.encode_www_form_component(place_id)
    #   url = URI("https://maps.googleapis.com/maps/api/place/details/json?place_id=#{encoded_place_id}&key=#{ENV['REACT_APP_GOOGLE_PLACES_API_KEY']}")
    #   request = Net::HTTP::Get.new(url)
    #   response = http.request(request)
    #   body = response.read_body
    #   parsed_response = JSON.parse(body)

    #   if parsed_response['status'] == 'OK'
    #     place_details = parsed_response['result']
    #     place_reviews = place_details.present? ? place_details['reviews'] || [] : []
    #     reviews.concat(place_reviews)
    #   else
    #     puts "Failed to retrieve place details for place ID: #{place_id}"
    #   end
    # end

    # redis.set("cached_google_places_reviews", JSON.generate(reviews))
    # redis.expire("cached_google_places_reviews", 30.days.to_i)
    # cached_reviews = redis.get("cached_google_places_reviews")
    # reviews = JSON.parse(cached_reviews) if cached_reviews

    # if cached_reviews.present?
    #   # Parse the JSON data into an array of hashes
    #   users = JSON.parse(cached_reviews)

    #   # Call the class method to remove the user with name "Pdub .."
    #   remove_user_by_name(users, 'Pdub ..')

    #   # Convert the updated data back to a JSON string
    #   updated_reviews = JSON.generate(users)

    #   return updated_reviews
    # end

    # return { reviews: "No cached reviews" }
    return value

  end
end
