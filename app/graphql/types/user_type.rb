# frozen_string_literal: true

module Types
  class UserType < Types::BaseObject
    field :id, ID, null: false
    field :password_digest, String, null: false
    field :session_token, String, null: false
    field :username, String, null: false
    field :annotations, [Types::AnnotationType], null: false
    field :comments, [Types::CommentType], null: false
    field :votes_ids, [Integer], null: false
    field :votes, [Types::VoteType], null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    def votes_ids
      list = object.votes.map {|vote| vote.id}
      return list
    end
  end
end
