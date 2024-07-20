class RenameQuestionsIdToAnswers < ActiveRecord::Migration[7.1]
  def change
    rename_column :answers, :questions_id, :question_id
  end
end
