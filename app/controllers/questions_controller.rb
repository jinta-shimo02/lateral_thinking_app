class QuestionsController < ApplicationController

  def home
    # With an API key
    # client = Gemini.new(
    #   credentials: {
    #     service: 'generative-language-api',
    #     api_key: ENV['GOOGLE_API_KEY']
    #   },
    #   options: { model: 'gemini-pro', server_sent_events: true }
    # )

    # result = client.stream_generate_content(
    #   { contents: { role: 'user', parts: { text: 'おはようございます、本日の天気を教えていただけないでしょうか' } } }
    # )

    # data = result.first

    # # data = JSON.parse(result.first)

    # text = data['candidates'][0]['content']['parts'][0]['text']

    # puts text
  end
end
