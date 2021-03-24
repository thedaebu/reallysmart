json.extract! annotation, :id, :body, :annotator_id, :track_id, :start_index, :end_index, :annotator
json.annotator annotation.annotator.username
json.comment_ids annotation.comments.map {|comment| comment.id }