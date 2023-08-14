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
    annotation = Annotation.new(annotation_params)
    if annotation.save
      @annotation = annotation.as_json
      @annotation[:annotator_name] = annotation.annotator.username
      @annotation[:votes] = {}
      broadcast_annotation(annotation, 'POST')

      result = {:annotation => @annotation}
      render json: result
    else
      render json: annotation.errors.full_messages, status: 422
    end
  end

  def update
    annotation = Annotation.find(params[:id])
    if annotation.update(annotation_params)
      @annotation = annotation.as_json
      @annotation[:annotator_name] = annotation.annotator.username
      @annotation[:votes] = {}
      annotation.votes.each do |vote|
        @annotation[:votes][vote.id] = vote.slice(:id, :voteable_id, :voteable_type, :voter_id)
      end
      broadcast_annotation(annotation, 'PUT')

      result = {:annotation => @annotation}
      render json: result
    else
      render json: annotation.errors.full_messages, status: 422
    end
  end

  def destroy
    annotation = Annotation.find(params[:id])
    if annotation
      annotation.destroy
      broadcast_annotation(annotation, 'DELETE')
    else
      render json: ['The annotation does not exist.']
    end
  end

  private
  def annotation_params
    params.require(:annotation).permit(:annotator_id, :body, :end_index, :start_index, :track_id)
  end
end