class Annotation < ApplicationRecord
    validates :body, presence: true
    validates :annotator_id, presence: true
    validates :track_id, presence: true
    validates :start_index, presence: true
    validates :end_index, presence: true

    belongs_to :annotator,
        foreign_key: :annotator_id,
        class_name: "User"

    belongs_to :track,
        foreign_key: :track_id,
        class_name: "Track"

    has_many :comments, 
        as: :commentable

    has_many :votes,
        as: :voteable
end
