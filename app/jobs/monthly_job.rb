class MonthlyJob
  include Sidekiq::Worker

  def perform
    require 'uri'
    require 'net/http'
    require 'json'
    require 'redis'
    puts "running" * 100
    # Define your list of place IDs and locations
    places = [
      'ChIJ6wjoflfGwoARIQ4pYyXJCN8',
      'ChIJo34riQ3GwoARLZD9o-uqI8Y',
      'ChIJfc-vNJTTwoARtN9DZQQNDRc',
      'ChIJ1e1EWx7RwoAReCY-TXXbhT4',
      'ChIJm2ksPQiZwoARG_JhTUiR0pI',
      'ChIJj3JTtm7BwoARcku_Ur8WuDE',
      'ChIJsT3iMBWHwoARLfqsCmNi-C0'
    ]
    puts "1"
    http = Net::HTTP.new("maps.googleapis.com", 443)
    puts "2"
    http.use_ssl = true
    puts "3"
    reviews = []

    places.each do |place|
      puts "4"
      place_id = place
      puts "5"


      # Fetch place details from Google Places API
      puts "6"
      encoded_place_id = URI.encode_www_form_component(place_id)
      puts "7"
      url = URI("https://maps.googleapis.com/maps/api/place/details/json?place_id=#{encoded_place_id}&key=#{ENV['REACT_APP_GOOGLE_PLACES_API_KEY']}")
      puts "8"
      request = Net::HTTP::Get.new(url)
      puts "9"
      response = http.request(request)
      puts "10"
      body = response.read_body
      puts "11"
      parsed_response = JSON.parse(body)
      puts "12"
      if parsed_response['status'] == 'OK'
        puts "13"
        place_details = parsed_response['result']
        puts "14"
        place_reviews = place_details.present? ? place_details['reviews'] || [] : []
        puts "15"
        reviews.concat(place_reviews)
        puts "16"
      else
        puts "17"
        puts "Failed to retrieve place details for place ID: #{place_id}"
      end
    end

    # Filter and process the reviews as needed
    filtered_reviews = []
    puts "18"
    reviews.each do |review|
      puts "19"
      puts review.inspect
      # You can apply filtering or processing logic here
      if review['rating'] == 5 && review['author_name'] != 'Pdub ..'
        puts "20"
        filtered_reviews << review
        puts "21"
      end
    end
    puts "22"
    redis = Redis.new(url: ENV['REDIS_URL'])
    puts "23"
    redis.set('cached_google_places_reviews', JSON.generate(filtered_reviews))
    puts "24"
    redis.expire('cached_google_places_reviews', 30.days.to_i)
    puts "25"
  rescue StandardError => e
    puts "26"
    puts "Error in monthly_job fetch_google_places_reviews: #{e.message}"
  end
end
