module Types
    class VoteableType < Types::BaseUnion
        description "Properties of Voteable"

        possible_types Types::AnnotationType, Types::CommentType

        def self.resolve_type(object, context)
            if object.is_a?(Annotation)
                Types::AnnotationType
            elsif object.is_a?(Comment)
                Types::CommentType
            end
        end
    end
end