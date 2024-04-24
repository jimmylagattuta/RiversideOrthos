class FallbackController < ActionController::Base
  # Handle HTML GET requests for unmatched routes
  def index
    render file: 'public/index.html', layout: false
  end

  # Handle all other types of unmatched requests
  def all
    respond_to do |format|
      format.json { render json: { error: "Not Found" }, status: :not_found }
      format.html { render file: 'public/404.html', status: :not_found, layout: false }
      format.any { head :not_found }
    end
  end
end
