class Track < ApplicationRecord
    validates :title, presence: true
    validates :artist, presence: true
    validates :artwork_path, presence: true
    validates :lyrics, presence: true
    
end
