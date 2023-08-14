class Api::CommentsController < ApplicationController
    def show
      comment = Comment.find(params[:id])
      @comment = comment.as_json
      @comment[:commenter_name] = comment.commenter.username
      @comment[:votes] = {}
      comment.votes.each do |vote|
        @comment[:votes][vote.id] = vote.slice(:id, :voteable_id, :voteable_type, :voter_id)
      end

      result = {:comment => @comment}
      render json: result
    end

    def create
      comment = Comment.new(comment_params)
      if comment.save
        create_notifications(comment)
        @comment = comment.as_json
        @comment[:commenter_name] = comment.commenter.username
        @comment[:votes] = {}
        broadcast_comment(comment, 'POST')

        result = {:comment => @comment}
        render json: result
      else
        render json: comment.errors.full_messages, status: 422
      end
    end

    def update
      comment = Comment.find(params[:id])
      if comment.update(comment_params)
        @comment = comment.as_json
        @comment[:commenter_name] = comment.commenter.username
        @comment[:votes] = {}
        comment.votes.each do |vote|
          @comment[:votes][vote.id] = vote.slice(:id, :voteable_id, :voteable_type, :voter_id)
        end
        broadcast_comment(comment, 'PUT')

        result = {:comment => @comment}
        render json: result
      else
        render json: comment.errors.full_messages, status: 422
      end
    end

    def destroy
      comment = Comment.find(params[:id])
      if comment
        comment.destroy
        broadcast_comment(comment, 'DELETE')
      else
        render json: ['The comment does not exist']
      end
    end

    private
    def comment_params
      params.require(:comment).permit(:body, :commentable_id, :commentable_type, :commenter_id)
    end
end