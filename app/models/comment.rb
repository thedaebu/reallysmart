class Comment < ApplicationRecord
    validates :body, presence: true
    validates :commenter_id, presence: true
    validates :commentable_type, presence: true
    # in: %w(small medium large)
    validates :commentable_id, presence: true

    belongs_to :commenter,
        foreign_key: :commenter_id,
        class_name: "User"

    belongs_to :commentable, polymorphic: true

    has_many :votes,
        as: :voteable
        
end
