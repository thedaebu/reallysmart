class Mutations::UpdateComment < Mutations::BaseMutation
    argument :body, String, required: true
    argument :commentable_id, Integer, required: true
    argument :commentable_type, String, required: true
    argument :commenter_id, Integer, required: true
    argument :commenter_name, String, required: true
    argument :id, ID, required: true

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