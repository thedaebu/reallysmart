class Mention < ApplicationRecord
    validates :comment_id, numericality: { only_integer: true }, presence: true
    validates :mentionee_id, numericality: { only_integer: true }, presence: true
    validates :mentioner_id, numericality: { only_integer: true }, presence: true
    validates :read, inclusion: [true, false], presence: true

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
