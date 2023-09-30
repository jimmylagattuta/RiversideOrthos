class Api::V1::JobsController < ApplicationController
    require 'open-uri'
    require 'net/http'
    require 'json'
  
    def index
      render json: "Midland Orthopedic Group " * 1000
    end
  
    def pull_yelp_cache
      api_key = ENV['GOOGLE_PLACES_API_KEY']
      if api_key.nil? || api_key.empty?
        render json: { "error": "Please set the GOOGLE_PLACES_API_KEY environment variable." }
        return
      end
      places_api = GooglePlacesApi.new(api_key)
      
      # Replace 'YOUR_PLACE_ID_TO_LOOKUP' with an actual place ID to retrieve details
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
        place_details = places_api.get_place_details(encoded_place_id)
  
        if place_details
          # Assuming 'reviews' is an array in place_details that contains reviews
          place_reviews = place_details['reviews'] || []
          reviews.concat(place_reviews)
        else
          puts "Failed to retrieve place details for place ID: #{place_id}"
        end
      end
  
      render json: reviews
    end
  
    class GooglePlacesApi
      def initialize(api_key)
        @api_key = api_key
      end
  
      def get_place_details(place_id)
        url = "https://maps.googleapis.com/maps/api/place/details/json?place_id=#{place_id}&key=#{@api_key}"
  
        begin
          uri = URI.parse(url)
          http = Net::HTTP.new(uri.host, uri.port)
          http.use_ssl = (uri.scheme == 'https')
  
          request = Net::HTTP::Get.new(uri.request_uri)
  
          response = http.request(request)
          data = JSON.parse(response.body)
          if data['status'] == 'OK'
            place_details = data['result']
            # Process and use place_details as needed
            return place_details
          else
            puts "Error: #{data['status']}"
            return nil
          end
        rescue OpenURI::HTTPError => e
          puts "HTTP Error: #{e.message}"
          return nil
        rescue JSON::ParserError => e
          puts "JSON Parsing Error: #{e.message}"
          return nil
        end
      end
    end
  end
  