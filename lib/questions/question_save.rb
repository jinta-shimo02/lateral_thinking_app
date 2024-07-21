require 'csv'

CSV.foreach("lib/questions/question.csv", headers: true) do |row|
  count = row.count
  question = Question.find_by(content: row[1])

  if question.nil?
    new_question = Question.create(content: row[1])
  end

  if new_question.present?
    (2..count).each do |i|
      unless row[i].nil?
        Answer.create(content: row[i], question_id: new_question.id)
      end
    end
  end
end
