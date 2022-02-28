json.extract! comment, :id, :body, :commentable_type, :commentable_id, :commenter_id, :updated_at
json.commenter comment.commenter.username