class Mention < ApplicationRecord
    validates :mentionable_id, presence: true
    validates :mentionable_type, inclusion: ["Track", "Annotation"], presence: true
    validates :mentionee_id, presence: true
    validates :mentioner_id, presence: true
    validates :read, inclusion: [true, false]

    belongs_to :mentionable,
        polymorphic: true

    belongs_to :mentionee,
        foreign_key: :mentionee_id,
        class_name: "User"

    belongs_to :mentioner,
        foreign_key: :mentioner_id,
        class_name: "User"
end
