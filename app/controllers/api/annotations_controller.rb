class Api::AnnotationsController < ApplicationController
    def show
        @annotation = Annotation.select("annotator_id, annotator_name, body, end_index, id, start_index, track_id").find(params[:id])

        result = {:annotation => @annotation}
        render json: result
    end

    def create
        created_annotation = Annotation.new(annotation_params)
        if created_annotation.save
            @annotation = created_annotation.slice(:annotator_id, :annotator_name, :body, :end_index, :id, :start_index, :track_id)

            result = {:annotation => @annotation}
            render json: result
        else
            render json: created_annotation.errors.full_messages, status: 422
        end
    end

    def update
        updated_annotation = Annotation.find(params[:id])
        if updated_annotation.update(annotation_params)
            @annotation = updated_annotation.slice(:annotator_id, :annotator_name, :body, :end_index, :id, :start_index, :track_id)

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