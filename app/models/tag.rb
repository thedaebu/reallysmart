class Tag < ApplicationRecord
    validates_presence_of :name, :track_id

    belongs_to :track, class_name: "Track"
end