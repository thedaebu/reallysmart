class Annotation < ApplicationRecord
    validates :annotator_id, presence: true
    validates :annotator_name, presence: true
    validates :body, presence: true
    validates :end_index, presence: true
    validates :start_index, presence: true
    validates :track_id, presence: true

    belongs_to :annotator,
        foreign_key: :annotator_id,
        class_name: "User"

    has_many :notifications,
        foreign_key: :annotation_id,
        class_name: "AnnotationNotification"

    has_many :comments,
        as: :commentable,
        dependent: :destroy

    belongs_to :track,
        foreign_key: :track_id,
        class_name: "Track"

    has_many :votes,
        as: :voteable,
        dependent: :destroy
end