# frozen_string_literal: true

module Types
  class CommentType < Types::BaseObject
    field :body, String, null: false
    field :commentable_id, Integer, null: false
    field :commentable_type, String, null: false
    field :commenter_name, String, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :id, ID, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :votes, [Types::VoteType]

    def commenter_name
      object.commenter.username
    end
  end
end
