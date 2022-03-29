class Mutations::DeleteComment < Mutations::BaseMutation
    argument :id, Integer, required: true

    field :errors, [String], null: false

    def resolve(id:)
        comment = Comment.find(id)
        if comment
            comment.destroy
            {
                errors: []
            }
        else
            {
                errors: ['The comment does not exist.']
            }
        end
    end
end