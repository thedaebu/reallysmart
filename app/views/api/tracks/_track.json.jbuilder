json.extract! track, :id, :title, :artist, :artwork_path, :lyrics
json.annotation_ids track.annotations.map { |annotation| annotation.id }
json.comment_ids track.comments.map {|comment| comment.id }