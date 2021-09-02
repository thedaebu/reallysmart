json.extract! user, :id, :username
json.avatar_url url_for(user.avatar || "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--a69072fd5edeb4fcd11c80627456b97409f5475b/default_avatar_100.png")
json.vote_ids user.votes.map {|vote| vote.id}