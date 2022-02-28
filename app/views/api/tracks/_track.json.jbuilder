json.extract! track, :id, :title, :artist, :artwork_path, :lyrics
json.comment_ids track.comments.map {|comment| comment.id }