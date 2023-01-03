# frozen_string_literal: true

module Types
  class TrackInfoType < Types::BaseObject
    field :artist, String, null: false
    field :title, String, null: false
  end
end
