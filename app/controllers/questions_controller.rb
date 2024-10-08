class QuestionsController < ApplicationController
  def home
    puts params[:level]
    @question = Question.where(level: params[:level]).order('RANDOM()').first
    @answer = @question.answers.order('RANDOM()').first

    session[:current_question] = @question
    session[:current_answer] = @answer

    @question_json = @question.to_json
    @answer_json = @answer.to_json
  end
end
