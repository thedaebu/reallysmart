class Api::AnnotationsController < ApplicationController
    def show
        annotation = Annotation.find(params[:id])
        @annotation = annotation.as_json
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
        params.require(:annotation).permit(:annotator_id, :annotator_name, :body, :end_index, :start_index, :track_id)
    end
end