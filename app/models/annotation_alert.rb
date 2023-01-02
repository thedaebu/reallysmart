class AnnotationAlert < ApplicationRecord
    validates :annotation_id, numericality: { only_integer: true }, presence: true
    validates :comment_id, numericality: { only_integer: true }, presence: true
    validates :read, inclusion: [true, false]

    belongs_to :annotation,
        foreign_key: :annotation_id,
        class_name: "Annotation"

    has_one :annotator,
        through: :annotation,
        source: :annotator

    belongs_to :comment,
        foreign_key: :comment_id,
        class_name: "Comment"

    has_one :commenter,
        through: :comment,
        source: :commenter
end