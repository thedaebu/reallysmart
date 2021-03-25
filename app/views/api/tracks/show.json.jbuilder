json.track do
    json.partial! '/api/tracks/track', track: @track
end

# json.annotations @track.annotations

# json.annotations track.annotations.map{|annotation| annotation }

json.annotations Hash.new()
json.annotations do
  @track.annotations.each do |annotation|
    json.set! annotation.id do
      json.extract! annotation, :id, :body, :annotator_id, :track_id, :start_index, :end_index
      json.annotator annotation.annotator.username
    end
  end  
end

json.comments Hash.new()
json.comments do
  @track.comments.each do |comment|
    json.set! comment.id do
      json.extract! comment, :id, :body, :commenter_id, :commentable_id
      json.commenter comment.commenter.username
    end
  end
end