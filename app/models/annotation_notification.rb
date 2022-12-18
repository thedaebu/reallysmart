class AnnotationNotification < ApplicationRecord
    validates :annotation_id, presence: true
    validates :comment_id, presence: true
    validates :commenter_id, presence: true
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

    belongs_to :commenter,
        foreign_key: :commenter_id,
        class_name: "User"
end