json.comment do
    json.partial! 'api/comments/comment', comment: @comment
end

json.commenter @comment.commenter