class Vote < ApplicationRecord
    validates :voter_id, presence: true
    validates :voteable_type, presence: true
    validates :voteable_id, presence: true

    belongs_to :voter,
        foreign_key: :voter_id,
        class_name: "User"
        
    belongs_to :voteable, 
        polymorphic: true
end
