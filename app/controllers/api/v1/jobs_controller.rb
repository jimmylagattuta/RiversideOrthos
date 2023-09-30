class Api::V1::JobsController < ApplicationController
    require 'open-uri'
    require 'net/http'
    require 'json'
    require 'redis'
  
    def index
      render json: "Los Angeles Orthopedic Group " * 1000
    end
  
    def pull_google_places_cache
      reviews = RedisCached.cached_google_places_reviews
  
      render json: reviews
    rescue StandardError => e
      puts "Error in pull_google_places_cache: #{e.message}"
      render json: { "error": e.message }
    end
  
    class GooglePlacesApi
      def initialize(api_key)
        @api_key = api_key
      end
  
      def get_place_details(place_id)
        url = "https://maps.googleapis.com/maps/api/place/details/json?place_id=#{place_id}&key=#{@api_key}"
  
        uri = URI.parse(url)
        http = Net::HTTP.new(uri.host, uri.port)
        http.use_ssl = (uri.scheme == 'https')
  
        request = Net::HTTP::Get.new(uri.request_uri)
  
        response = http.request(request)
        data = JSON.parse(response.body)
        if data['status'] == 'OK'
          place_details = data['result']
          return place_details
        else
          puts "Error: #{data['status']}"
          return nil
        end
      end
    end
  end
  
  class RedisCached
    def self.cached_google_places_reviews
      redis = Redis.new(url: ENV['REDIS_URL'])
      cached_data = redis.get('cached_google_places_reviews')
      reviews = JSON.parse(cached_data) if cached_data
  
      if cached_data.present?
        reviews = process_reviews(reviews)
        return JSON.generate(reviews)
      end
  
      place_ids = [
        'ChIJ6wjoflfGwoARIQ4pYyXJCN8',
        'ChIJo34riQ3GwoARLZD9o-uqI8Y',
        'ChIJfc-vNJTTwoARtN9DZQQNDRc',
        'ChIJ1e1EWx7RwoAReCY-TXXbhT4',
        'ChIJm2ksPQiZwoARG_JhTUiR0pI',
        'ChIJj3JTtm7BwoARcku_Ur8WuDE',
        'ChIJsT3iMBWHwoARLfqsCmNi-C0'
      ]
  
      reviews = []
  
      place_ids.each do |place_id|
        encoded_place_id = URI.encode_www_form_component(place_id)
        place_details = GooglePlacesApi.new(ENV['GOOGLE_PLACES_API_KEY']).get_place_details(encoded_place_id)
  
        if place_details
          place_reviews = place_details['reviews'] || []
          reviews.concat(place_reviews)
        else
          puts "Failed to retrieve place details for place ID: #{place_id}"
        end
      end
  
      redis.set("cached_google_places_reviews", JSON.generate(reviews))
      redis.expire("cached_google_places_reviews", 1.hour.to_i)
  
      reviews = process_reviews(reviews)
      JSON.generate(reviews)
    end
  
    def self.process_reviews(reviews)
      # Process and manipulate reviews here as needed
      # For example, remove specific users, filter by rating, etc.
      reviews
    end
  end
  