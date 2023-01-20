class Mention < ApplicationRecord
    validates_presence_of :comment_id, :mentionee_id, :mentioner_id
    validates :read, inclusion: [true, false]

    belongs_to :comment, class_name: "Comment"
    belongs_to :mentionee, class_name: "User"
    belongs_to :mentioner, class_name: "User"
end
