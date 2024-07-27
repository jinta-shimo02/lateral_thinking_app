class Question < ApplicationRecord
  has_many :answers, dependent: :destroy

  enum level: {
    easy: 1,
    normal: 2,
    difficult: 3
  }
end
