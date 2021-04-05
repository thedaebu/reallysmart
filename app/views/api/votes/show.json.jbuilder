json.vote do
    json.partial! 'api/votes/vote', vote: @vote
end

json.user do
    json.extract! @vote.voter, :id, :username
    json.vote_ids @vote.voter.votes.map {|vote| vote.id}
end