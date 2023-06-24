# frozen_string_literal: true

module Types
  class UserType < Types::BaseObject
    field :annotation_alerts, [Types::AnnotationAlertType], null: false
    field :id, ID, null: false
    field :mentions, [Types::MentionType], null: false
    field :username, String, null: false
  end
end
