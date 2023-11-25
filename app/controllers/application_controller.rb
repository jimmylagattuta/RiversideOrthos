class ApplicationController < ActionController::Base
  include ActionController::Cookies
  before_action :authenticate_user
  before_action :set_cors_headers, unless: :api_request?
  after_action :set_cors_headers, unless: :api_request?
  protect_from_forgery with: :null_session

  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :invalid_record

  def redirect_to_root
    redirect_to root_path
  end

  private

  def verified_request?
    super || valid_authenticity_token?(session, request.headers['X-CSRF-Token'])
  end

  def current_user
    # Implement your logic to retrieve the current user
  end

  def record_not_found(errors)
    # Handle the ActiveRecord::RecordNotFound error
  end

  def invalid_record(invalid)
    # Handle the ActiveRecord::RecordInvalid error
  end

  def authenticate_user
    # Implement your logic to authenticate the user
    # Uncomment the following line if you want to restrict unauthorized access
    # render json: 'Not authorized', status: :unauthorized unless current_user
  end

  def set_cors_headers
    allowed_origins = ['https://www.laorthos.com', 'https://laorthos.com']
    allowed_methods = 'POST, GET, OPTIONS'
    allowed_headers = 'Content-Type, Authorization'

    headers['Access-Control-Allow-Origin'] = allowed_origins.include?(request.headers['Origin']) ? request.headers['Origin'] : ''
    headers['Access-Control-Allow-Methods'] = allowed_methods
    headers['Access-Control-Allow-Headers'] = allowed_headers
    headers['Access-Control-Max-Age'] = '31536000'
  end

  def api_request?
    request.path.start_with?('/api')
  end
end
