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

  # def set_questions_and_answers(questions, answers)
  #   @questions = questions
  #   @answers = answers
  # end

  def get_response(message)
    result = @client.stream_generate_content(
      { contents: { role: 'user', parts: { text: """
      あなたは、クリティカルシンキングを教えるプロの講師です。
      今回、受講生に対して、水平思考（lateral thinking）の力をクイズを通して養ってもらうことにしました。

      ルールは下記です。

      あなた（講師）は「お題」に対して生徒から質問を受け付けます。
      生徒からの質問が「正解」とほとんど同じだった場合、「正解です」と答えたのち、既成の理論や概念にとらわれずアイデアを生み出すことができたかどうかフィードバックを行います。
      生徒からの質問が「正解」と違う場合は、生徒からの質問に対してあなた（講師）は正解と生徒からの質問内容を照らし合わせて考えて「はい」または「いいえ」、「どちらでもよい」の３種類のみで答えます。
      ※「はい」は、明確に正解と因果関係がある場合、「いいえ」は明確に正解と因果関係がない場合、「どちらでもよい」は「はい」にも「いいえ」にも当てはまらない場合に使います。

      お題と正解は下記です。
      お題：#{$random_question.content}
      正解：#{$random_answer.content}
      生徒からの質問：
      """+ message } } }
    )
    data = result.first
    text = data['candidates'][0]['content']['parts'][0]['text']
    text
  rescue StandardError => e
    Rails.logger.error("Error fetching response from Gemini: #{e.message}")
    'エラーが発生しました。後でもう一度試してください。'
  end
end
