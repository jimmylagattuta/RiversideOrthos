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
        puts "parsed_response['status'] == 'OK'"
        puts "parsed_response"
        puts parsed_response.inspect
        place_details = parsed_response['result']
        puts "place_details"
        puts place_details.inspect
        place_reviews = place_details.present? ? place_details['reviews'] || [] : []
        puts "place_reviews"
        puts place_reviews.inspect
        puts "reviews before"
        puts reviews.inspect
        reviews.concat(place_reviews)
        puts "reviews after"
        puts reviews.inspect
      else
        puts "Failed to retrieve place details for place ID: #{place_id}"
      end
    end

    # Filter and process the reviews as needed
    filtered_reviews = []
    reviews.each do |review|
      puts "a"
      # You can apply filtering or processing logic here
      if review['rating'] == 5 && review['author_name'] != 'Pdub ..'
        filtered_reviews << review
      end
    end
    redis = Redis.new(url: ENV['REDIS_URL'])
    if redis.exists('cached_google_places_reviews')
      puts "b"
      redis.del('cached_google_places_reviews')
      puts "c"
    end
    redis.set('cached_google_places_reviews', JSON.generate(filtered_reviews))
    puts "d"
    redis.expire('cached_google_places_reviews', 30.days.to_i)
    puts "e"
  rescue StandardError => e
    puts "Error in monthly_job fetch_google_places_reviews: #{e.message}"
  end
end
