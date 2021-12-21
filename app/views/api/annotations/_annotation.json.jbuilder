json.extract! annotation, :id, :body, :annotator_id, :track_id, :start_index, :end_index
json.annotator annotation.annotator.username
json.comment_ids annotation.comments.map {|comment| comment.id }
json.votes annotation.votes.length
json.vote_ids annotation.votes.map {|vote| vote.id}