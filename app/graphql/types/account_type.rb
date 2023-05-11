# frozen_string_literal: true

module Types
  class AccountType < Types::BaseObject
    field :annotations, [Types::AnnotationType], null: false
    field :comments, [Types::CommentType], null: false
    field :id, ID, null: false
    field :username, String, null: false
  end
end
