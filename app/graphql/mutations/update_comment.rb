class Mutations::UpdateComment < Mutations::BaseMutation
    argument :body, String, required: false
    argument :commentable_id, Integer, required: false
    argument :commentable_type, String, required: false
    argument :commenter_id, Integer, required: false
    argument :commenter_name, String, required: false
    argument :id, Integer, required: false

    field :comment, Types::CommentType, null: false
    field :errors, [String], null: false

    def resolve(body:, commentable_id:, commentable_type:, commenter_id:, commenter_name:, id:)
        comment = Comment.find(id)
        if comment.update(body: body, commentable_id: commentable_id, commentable_type: commentable_type, commenter_id: commenter_id, commenter_name: commenter_name)
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