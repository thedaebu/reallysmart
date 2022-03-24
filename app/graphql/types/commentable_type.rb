module Types
    class CommentableType < Types::BaseUnion
        description "Properties of Commentable"

        possible_types Types::TrackType, Types::AnnotationType

        def self.resolve_type(object, context)
            if object.is_a?(Track)
                Types::TrackType
            elsif object.is_a?(Annotation)
                Types::AnnotationType
            end
        end
    end
end