class Api::V1::JobsController < ApplicationController
  require 'redis'
  require 'json'
  require 'uri'
  require 'net/http'

  def index
    render json: "OAR " * 1000
  end

  def pull_google_places_cache
    csrf_token = form_authenticity_token
    place_names = ["Orthopaedic Associates of Riverside", "Orthopaedic Associates of Riverside - La Grange", "Orthopaedic Associates of Riverside - Chicago"]
    reviews = []
    place_ids = []  # Array to store place IDs

    place_names.each do |place_name|
      puts "place_name"
      puts place_name
      place_id = fetch_place_id_with_caching(place_name)
      if place_id
        place_reviews = fetch_reviews_with_caching(place_id)
        five_star_reviews = filter_reviews_by_rating(place_reviews, 5)
        filtered_reviews = filter_reviews_by_text(five_star_reviews, 'negative reviews')
        reviews.concat(filtered_reviews)
        place_ids << place_id  # Add place ID to the array
      else
        puts "Place ID not found for '#{place_name}'"
      end
    end

    # Output collected place IDs
    puts "Collected Place IDs: #{place_ids.join(', ')}"

    render json: { reviews: reviews, csrf_token: csrf_token }
  end

  private

  def fetch_place_id_with_caching(name)
    redis = Redis.new(url: ENV['REDIS_URL'])
    puts "Connected to Redis: #{redis.inspect}"

    cache_key = "place_id_#{name}"
    puts "Cache_key: #{cache_key}"

    cached_id = nil
    if redis.get(cached_key)
      redis.get(cache_key)
      puts "Cached_id: #{cached_id}"

    else

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
      if data['candidates'] && !data['candidates'].empty?
        puts "7"
        place_id = data['candidates'][0]['place_id']
        redis.set(cache_key, place_id, ex: 86400) # Cache for 1 day
        return place_id
      end
    end
    nil
  end

  def fetch_reviews_with_caching(place_id)
    redis = Redis.new(url: ENV['REDIS_URL'])
    cache_key = "google_places_reviews_#{place_id}"
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
        redis.set(cache_key, reviews.to_json, ex: 86400 * 30) # Cache for 1 day
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
