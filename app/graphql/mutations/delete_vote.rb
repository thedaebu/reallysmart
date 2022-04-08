class Mutations::DeleteVote < Mutations::BaseMutation
    argument :id, ID, required: true

    field :vote, Types::VoteType, null: false
    field :errors, [String], null: false

    def resolve(id:)
        vote = Vote.find(id)
        if vote.destroy
            {
                vote: vote,
                errors: []
            }
        else
            {
                vote: nil,
                errors: vote.errors.full_messages
            }
        end
    end
end