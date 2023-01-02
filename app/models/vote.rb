class Vote < ApplicationRecord
    validates :voteable_id, numericality: { only_integer: true }, presence: true
    validates :voteable_type, inclusion: ["Annotation", "Comment"], presence: true
    validates :voter_id, numericality: { only_integer: true }, presence: true

    belongs_to :voteable,
        polymorphic: true

    belongs_to :voter,
        foreign_key: :voter_id,
        class_name: "User"
end