class AddColumnToQuestions < ActiveRecord::Migration[7.1]
  def change
    add_column :questions, :level, :integer
  end
end
