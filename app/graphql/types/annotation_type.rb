# frozen_string_literal: true

module Types
  class AnnotationType < Types::BaseObject
    field :body, String, null: false
    field :annotator_id, Integer, null: false
    field :annotator_name, String, null: false
    field :end_index, Integer, null: false
    field :id, ID, null: false
    field :start_index, Integer, null: false
    field :track_id, Integer, null: false
    field :votes, [Types::VoteType], null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    def votes
      object.votes
    end
  end
end
