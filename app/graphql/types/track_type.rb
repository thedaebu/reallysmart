# frozen_string_literal: true

module Types
  class TrackType < Types::BaseObject
    field :id, ID, null: false
    field :artist, String, null: false
    field :artwork_path, String, null: false
    field :lyrics, String, null: false
    field :title, String, null: false
    field :annotations, [Types::AnnotationType], null: false
    field :annotation_votes, [Types::VoteType], null: false
    field :annotation_comments, [Types::CommentType], null: false
    field :annotation_comment_votes, [Types::VoteType], null: false
    field :comments, [Types::CommentType], null: false
    field :comment_votes, [Types::VoteType], null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
