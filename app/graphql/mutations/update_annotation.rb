class Mutations::UpdateAnnotation < Mutations::BaseMutation
    argument :annotator_id, Integer, required: true
    argument :annotator_name, String, required: true
    argument :body, String, required: true
    argument :end_index, Integer, required: true
    argument :id, ID, required: true
    argument :start_index, Integer, required: true
    argument :track_id, Integer, required: true

    field :annotation, Types::AnnotationType, null: false
    field :errors, [String], null: false

    def resolve(annotator_id:, annotator_name:, body:, end_index:, id:, start_index:, track_id:)
        annotation = Annotation.find(id)
        if annotation.update(annotator_id: annotator_id, annotator_name: annotator_name, body: body, end_index: end_index, start_index: start_index, track_id: track_id)
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