class Comment < ApplicationRecord
    validates_presence_of :body, :commentable_id, :commentable_type, :commenter_id
    validates :commentable_type, inclusion: ["Track", "Annotation"]

    has_one :annotation_alert, foreign_key: :comment_id, class_name: "AnnotationAlert", dependent: :destroy
    belongs_to :commentable, polymorphic: true
    belongs_to :commenter, class_name: "User"
    has_many :mentions, foreign_key: :comment_id, class_name: "Mention", dependent: :destroy
    has_many :votes, as: :voteable, dependent: :destroy
end