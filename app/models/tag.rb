class Tag < ApplicationRecord
    validates :name, presence: true
    validates :track_id, numericality: { only_integer: true }, presence: true

    belongs_to :track,
        foreign_key: :track_id,
        class_name: "Track"
end