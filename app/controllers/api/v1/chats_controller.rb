class Api::V1::ChatsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

  def create
    message = params[:message]
    api_key = ENV['GOOGLE_API_KEY']
    gemini_service = GeminiService.new(api_key)
    response_text = gemini_service.get_response(message)
    render json: { response: response_text }
  end
end
