require 'csv'

CSV.foreach("lib/questions/question.csv", headers: true) do |row|
  if Question.find_by(content: row[1]).nil?
    Question.create(content: row[1])
  end

  question_id = Question.find_by(content: row[1]).id

  2.upto(4) do |i|
    if Answer.find_by(content: row[i]).nil?
      Answer.create(content: row[i], question_id:)
    end
  end
end
