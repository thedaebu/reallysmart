class Api::CommentsController < ApplicationController
    def show
        @comment = Comment.select("body, commentable_id, commentable_type, commenter_id, commenter_name, id, updated_at").find(params[:id])

        result = {:comment => @comment}
        render json: result
    end

    def create
        created_comment = Comment.new(comment_params)
        if created_comment.save
            @comment = created_comment.slice(:body, :commentable_id, :commentable_type, :commenter_id, :commenter_name, :id, :updated_at)

            result = {:comment => @comment}
            render json: result
        else
            render json: created_comment.errors.full_messages, status: 422
        end
    end

    def update
        updated_comment = Comment.find(params[:id])
        if updated_comment.update(comment_params)
            @comment = updated_comment.slice(:body, :commentable_id, :commentable_type, :commenter_id, :commenter_name, :id, :updated_at)

            result = {:comment => @comment}
            render json: result
        else
            render json: updated_comment.errors.full_messages, status: 422
        end
    end

    def destroy
        comment = Comment.find(params[:id])
        if comment
            comment.destroy
        else
            render json: ['The comment does not exist']
        end
    end

    private
    def comment_params
        params.require(:comment).permit(:body, :commentable_id, :commentable_type, :commenter_id, :commenter_name,)
    end
end