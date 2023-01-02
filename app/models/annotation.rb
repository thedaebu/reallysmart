class Annotation < ApplicationRecord
    validates :annotator_id, numericality: { only_integer: true }, presence: true
    validates :body, presence: true
    validates :end_index, numericality: { only_integer: true }, presence: true
    validates :start_index, numericality: { only_integer: true }, presence: true
    validates :track_id, numericality: { only_integer: true }, presence: true

    has_many :alerts,
        foreign_key: :annotation_id,
        class_name: "AnnotationAlert"

    belongs_to :annotator,
        foreign_key: :annotator_id,
        class_name: "User"

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