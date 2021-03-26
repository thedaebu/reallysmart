json.annotation do
    json.partial! '/api/annotations/annotation', annotation: @annotation
end

json.comments Hash.new()
json.comments do
  @annotation.comments.each do |comment|
    json.set! comment.id do
      json.extract! comment, :id, :body, :commenter_id, :commentable_id, :updated_at
      json.commenter comment.commenter.username
      json.votes comment.votes.length
    end
  end
end