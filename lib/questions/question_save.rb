require 'csv'

CSV.foreach("lib/questions/question.csv", headers: true) do |row|
  count = row.count
  question = Question.find_by(content: row[1])
  level = case row[count - 1]
          when "easy"
            :easy
          when "normal"
            :normal
          when "difficult"
            :difficult
          end

  if question.nil?
    new_question = Question.create(content: row[1], level:)
  end

  if new_question.present?
    (2..(count - 1)).each do |i|
      unless row[i].nil?
        Answer.create(content: row[i], question_id: new_question.id)
      end
    end
  end
end
