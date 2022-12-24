class Mention < ApplicationRecord
    validates :comment_id, presence: true
    validates :mentionee_id, presence: true
    validates :mentioner_id, presence: true
    validates :read, inclusion: [true, false]

    belongs_to :comment,
        foreign_key: :comment_id,
        class_name: "Comment"

    belongs_to :mentionee,
        foreign_key: :mentionee_id,
        class_name: "User"

    belongs_to :mentioner,
        foreign_key: :mentioner_id,
        class_name: "User"
end
