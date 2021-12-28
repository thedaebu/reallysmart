json.extract! comment, :id, :body, :commentable_type, :commentable_id, :updated_at
json.commenter comment.commenter.username
json.number_of_votes comment.votes.length
json.vote_ids comment.votes.map {|vote| vote.id}