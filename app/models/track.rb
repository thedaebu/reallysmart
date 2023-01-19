class Track < ApplicationRecord
    validates_presence_of :artist, :artwork_path, :lyrics, :spotify_path, :title

    has_many :annotations, foreign_key: :track_id, class_name: "Annotation"
    has_many :annotation_votes, through: :annotations, source: :votes
    has_many :annotation_comments, through: :annotations, source: :comments
    has_many :annotation_comment_votes, through: :annotation_comments, source: :votes
    has_many :comments, as: :commentable
    has_many :comment_votes, through: :comments, source: :votes
end