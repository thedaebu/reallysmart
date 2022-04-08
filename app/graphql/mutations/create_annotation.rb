class Mutations::CreateAnnotation < Mutations::BaseMutation
    argument :annotator_id, Integer, required: true
    argument :annotator_name, String, required: true
    argument :body, String, required: true
    argument :end_index, Integer, required: true
    argument :start_index, Integer, required: true
    argument :track_id, Integer, required: true

    field :annotation, Types::AnnotationType, null: false
    field :errors, [String], null: false

    def resolve(annotator_id:, annotator_name:, body:, end_index:, start_index:, track_id:)
        annotation = Annotation.new(annotator_id: annotator_id, annotator_name: annotator_name, body: body, end_index: end_index, start_index: start_index, track_id: track_id)
        if annotation.save()
            {
                annotation: annotation,
                errors: []
            }
        else
            {
                annotation: nil,
                errors: annotation.errors.full_messages
            }
        end
    end
end