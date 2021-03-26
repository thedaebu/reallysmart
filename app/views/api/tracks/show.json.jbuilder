json.track do
    json.partial! '/api/tracks/track', track: @track
end

json.annotations Hash.new()
json.annotations do
  @track.annotations.each do |annotation|
    json.set! annotation.id do
      json.extract! annotation, :id, :body, :annotator_id, :track_id, :start_index, :end_index
      json.annotator annotation.annotator.username
      json.comment_ids annotation.comments.map {|comment| comment.id }
      json.votes annotation.votes.length
    end
  end  
end

json.comments Hash.new()
json.comments do
  @track.comments.each do |comment|
    json.set! comment.id do
      json.extract! comment, :id, :body, :commenter_id, :commentable_id, :updated_at
      json.commenter comment.commenter.username
      json.votes comment.votes.length
    end
  end
end
