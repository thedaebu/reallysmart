json.comment do
    json.partial! 'api/comments/comment', comment: @comment
end

json.votes Hash.new()
json.votes do
  @comment.votes.each do |vote|
    json.set! vote.id do
      json.partial! 'api/votes/vote', vote: vote
    end
  end
end