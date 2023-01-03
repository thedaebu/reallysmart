# frozen_string_literal: true

module Types
  class AnnotationAlertType < Types::BaseObject
    field :body, String, null: false
    field :commenter, String, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :id, ID, null: false
    field :read, Boolean, null: false
    field :track, Types::TrackInfoType, null: false
    field :type, String, null: false

    def body
      object.annotation.body
    end
    def commenter
      object.commenter.username
    end
    def track
      object.annotation.track.slice(:artist, :title)
    end
    def type
      "AnnotationAlert"
    end
  end
end
