class Api::AnnotationsController < ApplicationController
  def show
    user = User.find(params[:id])
    if user
      @account = user.slice(:id, :username)
      annotations = user.annotations.map do |annotation|
        temp_annotation = annotation

        temp_annotation[:body] = annotation.body
        temp_annotation[:track] = annotation.track.slice(:artist, :title)

        temp_annotation
      end
      comments = user.comments.map do |comment|
        commentable_type = comment.commentable_type
        temp_comment = comment

        temp_comment[:body] = comment.body
        temp_comment[:commentable_body] = commentable_type == "Track" ? "" : comment.commentable.body
        temp_comment[:commentable_type] = comment.commentable_type
        temp_mention[:track] = commentable_type == "Track" ? comment.commentable.slice(:artist, :title) : comment.commentable.track.slice(:artist, :title)

        temp_comment
      end
      @account[:annotations] = annotations
      @account[:comments] = comments

      result = {:account => @account}
      render json: result
    else
      render json: user.errors.full_messages, status: 422
    end
  end
end