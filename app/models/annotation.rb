class Annotation < ApplicationRecord
    validates_presence_of :annotator_id, :body, :end_index, :start_index, :track_id
    validates_with AnnotationValidator, :on => :create

    has_many :alerts, foreign_key: :annotation_id, class_name: "AnnotationAlert", dependent: :destroy
    belongs_to :annotator, class_name: "User"
    has_many :comments, as: :commentable, dependent: :destroy
    belongs_to :track, class_name: "Track"
    has_many :votes, as: :voteable, dependent: :destroy
end