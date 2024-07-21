class GeminiService
  def initialize(api_key)
    @client = Gemini.new(
      credentials: {
        service: 'generative-language-api',
        api_key: api_key
      },
      options: { model: 'gemini-pro', server_sent_events: true }
    )
  end

  def get_response(message)
    result = @client.stream_generate_content(
      { contents: { role: 'user', parts: { text: "" + message } } }
    )
    data = result.first
    text = data['candidates'][0]['content']['parts'][0]['text']
    text
  rescue StandardError => e
    Rails.logger.error("Error fetching response from Gemini: #{e.message}")
    'エラーが発生しました。後でもう一度試してください。'
  end
end
