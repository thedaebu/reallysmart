# frozen_string_literal: true

module Types
  class UserType < Types::BaseObject
    field :id, ID, null: false
    field :password_digest, String, null: false
    field :session_token, String, null: false
    field :username, String, null: false
    field :votes, [Types::VoteType], null: false
    field :vote_ids, [Integer], null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    def vote_ids
      object.votes.map{|vote| vote.id}
    end
  end
end
