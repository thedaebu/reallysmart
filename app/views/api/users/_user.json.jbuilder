json.extract! user, :id, :username
# json.avatar_url url_for(user.avatar)
json.vote_ids user.votes.map {|vote| vote.id}