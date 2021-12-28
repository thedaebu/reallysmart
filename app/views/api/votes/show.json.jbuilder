json.vote do
    json.partial! 'api/votes/vote', vote: @vote
end