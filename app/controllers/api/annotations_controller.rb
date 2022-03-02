class Api::AnnotationsController < ApplicationController
    def show
        @annotation = Annotation.find(params[:id])
        render :show
    end

    def create
        @annotation = Annotation.new(annotation_params)
        if @annotation.save
            render :show
        else
            render json: @annotation.errors.full_messages, status: 422
        end
    end

    def update
        @annotation = Annotation.find(params[:id])
        if @annotation.update(annotation_params)
            render :show
        else
            render json: @annotation.errors.full_messages, status: 422
        end
    end

    def destroy
        @annotation = Annotation.find(params[:id])
        if @annotation
            @annotation.destroy
        else
            render json: ['The annotation does not exist.']
        end
    end

    private
    def annotation_params
        params.require(:annotation).permit(:annotator, :annotator_id, :body, :end_index, :start_index, :track_id)
    end
end