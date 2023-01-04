class Comment < ApplicationRecord
    validates :body, presence: true
    validates :commentable_id, numericality: { only_integer: true }, presence: true
    validates :commentable_type, inclusion: ["Track", "Annotation"], presence: true
    validates :commenter_id, numericality: { only_integer: true }, presence: true

    has_one :annotation_alert,
        foreign_key: :comment_id,
        class_name: "AnnotationAlert",
        dependent: :destroy

    belongs_to :commenter,
        foreign_key: :commenter_id,
        class_name: "User"

    belongs_to :commentable,
        polymorphic: true

    has_many :mentions,
        foreign_key: :comment_id,
        class_name: "Mention",
        dependent: :destroy

    has_many :votes,
        as: :voteable,
        dependent: :destroy
end