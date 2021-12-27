json.track do
    json.partial! '/api/tracks/track', track: @track
end

json.comments Hash.new()
json.comments do
  @track.comments.each do |comment|
    json.set! comment.id do
      json.extract! comment, :id, :body, :commenter_id, :commentable_id, :updated_at
      json.commenter comment.commenter.username
      json.votes comment.votes.length
      json.vote_ids comment.votes.map {|vote| vote.id}
    end
  end
end
