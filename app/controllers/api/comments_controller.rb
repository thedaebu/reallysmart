class Api::CommentsController < ApplicationController
    def show
        comment = Comment.find(params[:id])
        @comment = comment.as_json
        @comment[:votes] = {}
        comment.votes.each do |vote|
            @comment[:votes][vote.id] = vote.slice(:id, :voteable_id, :voteable_type, :voter_id)
        end

        result = {:comment => @comment}
        render json: result
    end

    def create
        created_comment = Comment.new(comment_params)
        if created_comment.save
            @comment = created_comment

            if created_comment.commentable_type == "Annotation"
                notification = AnnotationNotification.new(
                    annotation_id: @comment.commentable.id,
                    comment_id: @comment.id,
                    commenter_id: @comment.commenter.id,
                    read: false
                )

                if notification.annotator.id != notification.commenter_id && notification.save
                    user = notification.annotator
                    broadcast(user, notification)
                end
            end

            @comment = created_comment.as_json
            @comment[:votes] = {}

            result = {:comment => @comment}
            render json: result
        else
            head :ok

            render json: created_comment.errors.full_messages, status: 422
        end
    end

    def update
        updated_comment = Comment.find(params[:id])
        if updated_comment.update(comment_params)
            @comment = updated_comment.as_json
            @comment[:votes] = {}
            updated_comment.votes.each do |vote|
                @comment[:votes][vote.id] = vote.slice(:id, :voteable_id, :voteable_type, :voter_id)
            end

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
        params.require(:comment).permit(:body, :commentable_id, :commentable_type, :commenter_id, :commenter_name)
    end

    def broadcast(user, notification)
        temp = notification.slice(:created_at, :read)
        temp[:body] = notification.annotation.body
        temp[:commenter] = notification.commenter.username
        temp[:track] = notification.annotation.track.slice(:artist, :title)
        temp

        NotificationChannel.broadcast_to(user,
            {
                notification: temp
            }
        )
    end
end