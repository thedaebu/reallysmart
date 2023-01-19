class AnnotationAlert < ApplicationRecord
    validates_presence_of :annotation_id, :comment_id, :read
    validates :read, inclusion: [true, false]

    belongs_to :annotation, class_name: "Annotation"
    belongs_to :comment, class_name: "Comment"
    has_one :commenter, through: :comment, source: :commenter
end