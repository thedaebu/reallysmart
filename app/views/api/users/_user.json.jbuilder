json.extract! user, :id, :username
json.vote_ids user.votes.map {|vote| vote.id}