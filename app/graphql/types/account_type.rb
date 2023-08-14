# frozen_string_literal: true

module Types
  class AccountType < Types::BaseObject
    field :annotations, [Types::AnnotationType], null: false
    field :comments, [Types::CommentType], null: false
    field :id, ID, null: false
    field :username, String, null: false

    def annotations
      object.annotations
    end
    def comments
      object.comments
    end
    def id
      object.id
    end
    def username
      object.username
    end
  end
end
