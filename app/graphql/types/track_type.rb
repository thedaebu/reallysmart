# frozen_string_literal: true

module Types
  class TrackType < Types::BaseObject
    field :artist, String, null: false
    field :artwork_path, String, null: false
    field :id, ID, null: false
    field :lyrics, String, null: false
    field :title, String, null: false
    field :total_comments, [Types::CommentType], null: false
    field :total_votes, [Types::VoteType], null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    def total_comments
      object.comments + object.annotation_comments
    end

    def total_votes
      object.annotation_votes + object.annotation_comment_votes + object.comment_votes
    end
  end
end
