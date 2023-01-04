class Mutations::UpdateMention < Mutations::BaseMutation
    argument :id, ID, required: true

    field :mention, Types::MentionType, null: false
    field :errors, [String], null: false

    def resolve(id:)
        mention = Mention.find(id)
        mention[:read] = true
        if mention.save
            {
                mention: mention,
                errors: []
            }
        else
            {
                mention: nil,
                errors: mention.errors.full_messages
            }
        end
    end
end