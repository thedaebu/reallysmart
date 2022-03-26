class Mutations::DeleteVote < Mutations::BaseMutation
    argument :id, Integer, required: true

    field :errors, [String], null: false

    def resolve(id:)
        vote = vote.find(id)
        if vote
            vote.destroy
            {
                errors: []
            }
        else
            {
                errors: ['The vote does not exist.']
            }
        end
    end
end