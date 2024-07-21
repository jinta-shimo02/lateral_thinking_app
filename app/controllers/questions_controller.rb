class QuestionsController < ApplicationController

  def home
    random_question = Question.order('RANDOM()').first
    random_answer = random_question.answers.order('RANDOM()').first
    set_questions_and_answers(random_question, random_answer)
  end
end
