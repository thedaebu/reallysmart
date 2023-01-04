class Api::AnnotationsController < ApplicationController
    def show
        annotation = Annotation.find(params[:id])
        @annotation = annotation.as_json
        @annotation[:annotator_name] = annotation.annotator.username
        @annotation[:votes] = {}
        annotation.votes.each do |vote|
            @annotation[:votes][vote.id] = vote.slice(:id, :voteable_id, :voteable_type, :voter_id)
        end

        result = {:annotation => @annotation}
        render json: result
    end

    def create
        created_annotation = Annotation.new(annotation_params)
        if created_annotation.save
            @annotation = created_annotation.as_json
            @annotation[:annotator_name] = created_annotation.annotator.username
            @annotation[:votes] = {}

            result = {:annotation => @annotation}
            render json: result
        else
            render json: created_annotation.errors.full_messages, status: 422
        end
    end

    def update
        updated_annotation = Annotation.find(params[:id])
        if updated_annotation.update(annotation_params)
            @annotation = updated_annotation.as_json
            @annotation[:annotator_name] = updated_annotation.annotator.username
            @annotation[:votes] = {}
            updated_annotation.votes.each do |vote|
                @annotation[:votes][vote.id] = vote.slice(:id, :voteable_id, :voteable_type, :voter_id)
            end

            result = {:annotation => @annotation}
            render json: result
        else
            render json: updated_annotation.errors.full_messages, status: 422
        end
    end

    def destroy
        annotation = Annotation.find(params[:id])
        if annotation
            annotation.destroy
        else
            render json: ['The annotation does not exist.']
        end
    end

    private
    def annotation_params
        params.require(:annotation).permit(:annotator_id, :body, :end_index, :start_index, :track_id)
    end
end