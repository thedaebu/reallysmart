class Vote < ApplicationRecord
    validates_presence_of :voteable_id, :voteable_type, :voter_id
    validates :voteable_type, inclusion: ["Annotation", "Comment"]

    belongs_to :voteable, polymorphic: true
end