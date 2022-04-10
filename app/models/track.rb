class Track < ApplicationRecord
    validates :artist, presence: true
    validates :artwork_path, presence: true
    validates :lyrics, presence: true
    validates :spotify_path, presence: true
    validates :title, presence: true

    has_many :annotations,
        foreign_key: :track_id,
        class_name: "Annotation"

    has_many :annotation_votes,
        through: :annotations,
        source: :votes

    has_many :annotation_comments,
        through: :annotations,
        source: :comments

    has_many :annotation_comment_votes,
        through: :annotation_comments,
        source: :votes

    has_many :comments,
        as: :commentable

    has_many :comment_votes,
        through: :comments,
        source: :votes

    has_many :tags,
        foreign_key: :track_id,
        class_name: "Tag"
end