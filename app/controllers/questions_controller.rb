class QuestionsController < ApplicationController
  def home
    @question = Question.order('RANDOM()').first
    @answer = @question.answers.order('RANDOM()').first

    session[:current_question] = @question
    session[:current_answer] = @answer
  end
end
