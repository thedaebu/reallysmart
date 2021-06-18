class Track < ApplicationRecord
    validates :title, presence: true
    validates :artist, presence: true
    validates :artwork_path, presence: true
    validates :lyrics, presence: true

    has_many :annotations,
        foreign_key: :track_id,
        class_name: "Annotation"

    has_many :comments,
        as: :commentable

    has_many :tags,
        foreign_key: :track_id,
        class_name: "Tag"
end
