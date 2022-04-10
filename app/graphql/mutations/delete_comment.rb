class Mutations::DeleteComment < Mutations::BaseMutation
    argument :id, ID, required: true

    field :comment, Types::CommentType, null: false
    field :errors, [String], null: false

    def resolve(id:)
        comment = Comment.find(id)
        if comment.destroy
            {
                comment: comment,
                errors: []
            }
        else
            {
                comment: nil,
                errors: comment.errors.full_messages
            }
        end
    end
end