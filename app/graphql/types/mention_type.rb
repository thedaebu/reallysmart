# frozen_string_literal: true

module Types
  class MentionType < Types::BaseObject
    field :body, String, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :id, ID, null: false
    field :mentioner_name, String, null: false
    field :read, Boolean, null: false
    field :track, Types::TrackInfoType, null: false
    field :type, String, null: false

    def body
      object.commentable_type == "Track" ? "" : object.commentable.body
    end
    def mentioner_name
      object.mentioner.username
    end
    def track
      object.commentable_type == "Track" ? object.commentable.slice(:artist, :title) : object.commentable.track.slice(:artist, :title)
    end
    def type
      "Mention"
    end
  end
end
