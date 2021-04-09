class Api::AnnotationsController < ApplicationController

    def show
        @annotation = Annotation.find_by(id: params[:id])
    end

    def create
        @annotation = Annotation.create(annotation_params)
        if @annotation.save
            render :show
        else
            render json: @annotation.errors.full_messages, status: 422
        end
    end

    private
    def annotation_params
        params.require(:annotation).permit(:body, :annotator_id, :track_id, :start_index, :end_index)
    end
end
