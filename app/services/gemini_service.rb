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
      { contents: { role: 'user', parts: { text: "#{pronpt($random_question, $random_answer)}"+ message } } }
    )
    data = result.first
    text = data['candidates'][0]['content']['parts'][0]['text']
    text
  rescue StandardError => e
    Rails.logger.error("Error fetching response from Gemini: #{e.message}")
    'エラーが発生しました。後でもう一度試してください。'
  end
end

def pronpt(question, answer)
  text = <<~EOS
    今から水平思考クイズを開催いたします。
    水平思考クイズとは、別名「ウミガメのスープ」と言われていて、出題者が出した問題に対して、回答者が質問を繰り返し、解答を導き出すクイズのことです。

    あなたは、水平思考クイズの出題者です。
    問題と解答は以下のとおりです。

    問題：#{question.content}
    解答：#{answer.content}

    回答者から質問が来ますので、以下のルールで答えてください。

    ルールは以下のとおりです。
    
    ・回答者からの質問が「解答」と違う場合は、「解答」と「質問」を比較して、「はい」「いいえ」「関係ありません」と答えてください。
    ・回答者からの質問が「解答」と同じような意味の場合は、「正解です！」と答えてください。
    ・回答者からの質問に、「解答」と同じ単語が含まれていた場合は、「正解です！」と答えてください。

    回答者からの質問：
  EOS
  text
end
