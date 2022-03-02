class Api::CommentsController < ApplicationController
    def show
        @comment = Comment.find(params[:id])
        render :show
    end

    def create
        @comment = Comment.new(comment_params)
        if @comment.save
            render :show
        else
            render json: @comment.errors.full_messages, status: 422
        end
    end

    def update
        @comment = Comment.find(params[:id])
        if @comment.update(comment_params)
            render :show
        else
            render json: @comment.errors.full_messages, status: 422
        end
    end

    def destroy
        @comment = Comment.find(params[:id])
        if @comment
            @comment.destroy
        else
            render json: ['The comment does not exist']
        end
    end

    private
    def comment_params
        params.require(:comment).permit(:body, :commentable_id, :commentable_type, :commenter_id, :commenter_name,)
    end 
end