class Vote < ApplicationRecord
    validates :voteable_id, presence: true
    validates :voteable_type, presence: true
    validates :voter_id, presence: true

    belongs_to :voteable, 
        polymorphic: true
        
    belongs_to :voter,
        foreign_key: :voter_id,
        class_name: "User"
end