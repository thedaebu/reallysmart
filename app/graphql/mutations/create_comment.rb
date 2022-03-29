class Mutations::CreateComment < Mutations::BaseMutation
    argument :body, String, required: false
    argument :commentable_id, String, required: false
    argument :commentable_type, String, required: false
    argument :commenter_id, String, required: false
    argument :commenter_name, String, required: false

    field :comment, Types::CommentType, null: false
    field :errors, [String], null: false

    def resolve(body:, commentable_id:, commentable_type:, commenter_id:, commenter_name:)
        comment = Comment.new(body: body, commentable_id: commentable_id, commentable_type: commentable_type, commenter_id: commenter_id, commenter_name: commenter_name)
        if comment.save
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