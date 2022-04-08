class Mutations::CreateVote < Mutations::BaseMutation
    argument :voteable_id, Integer, required: true
    argument :voteable_type, String, required: true
    argument :voter_id, Integer, required: true

    field :vote, Types::VoteType, null: false
    field :errors, [String], null: false

    def resolve(voteable_id:, voteable_type:, voter_id:)
        vote = Vote.new(voteable_id: voteable_id, voteable_type: voteable_type, voter_id: voter_id)
        if vote.save()
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