# frozen_string_literal: true

module Types
  class TrackType < Types::BaseObject
    field :id, ID, null: false
    field :artist, String, null: false
    field :artwork_path, String, null: false
    field :lyrics, String, null: false
    field :title, String, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
