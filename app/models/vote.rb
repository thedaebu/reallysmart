class Vote < ApplicationRecord
    validates :voteable_id, numericality: { only_integer: true }, presence: true
    validates :voteable_type, inclusion: ["Annotation", "Comment"], presence: true
    validates :voter_id, numericality: { only_integer: true }, presence: true

    belongs_to :voteable,
        polymorphic: true
end