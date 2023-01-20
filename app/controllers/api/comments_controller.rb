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
        created_comment = Comment.new(comment_params)
        if created_comment.save
            create_notifications(created_comment)
            @comment = created_comment.as_json
            @comment[:commenter_name] = created_comment.commenter.username
            @comment[:votes] = {}

            result = {:comment => @comment}
            render json: result
        else
            render json: created_comment.errors.full_messages, status: 422
        end
    end

    def update
        updated_comment = Comment.find(params[:id])
        if updated_comment.update(comment_params)
            @comment = updated_comment.as_json
            @comment[:commenter_name] = updated_comment.commenter.username
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
        params.require(:comment).permit(:body, :commentable_id, :commentable_type, :commenter_id)
    end

    def create_notifications(comment)
        if comment.commentable_type === "Annotation"
            annotation_alert = AnnotationAlert.new(
                annotation_id: comment.commentable.id,
                comment_id: comment.id,
                read: false
            )
            if annotation_alert.annotation.annotator.id != annotation_alert.commenter.id && annotation_alert.save
                user = annotation_alert.annotation.annotator
                broadcast_annotation_alert(user, annotation_alert)
            end
        end
        mentionees = check_for_mentions(comment.body)
        if mentionees.length > 0
            mentionees.each do |mentionee|
                mention = Mention.new(
                    comment_id: comment.id,
                    mentionee_id: User.find_by_username(mentionee).id,
                    mentioner_id: comment.commenter.id,
                    read: false
                )
                if mentionee != comment.commenter.username && mention.save
                    user = mention.mentionee
                    broadcast_mention(user, mention)
                end
            end
        end
    end

    def check_for_mentions(body)
        mentionees = []
        alphanumeric = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        index = 0
        while index < body.length
            if body[index] == "@"
                index += add_mention(alphanumeric, mentionees, index + 1, body)
            end
            index += 1
        end

        mentionees
    end

    def add_mention(alphanumeric, mentionees, start_index, body)
        index = start_index + 1
        while index < body.length
            if alphanumeric.include?(body[index])
                index += 1
            else
                break
            end
        end
        username = body.slice(start_index..index-1)
        if username.length > 5 && User.find_by_username(username)
            mentionees << username
        end

        username.length
    end

    def broadcast_annotation_alert(user, annotation_alert)
        annotation = annotation_alert.annotation

        temp_annotation_alert = annotation_alert.slice(:created_at, :id, :read)
        temp_annotation_alert[:body] = annotation.body
        temp_annotation_alert[:commenter_name] = annotation_alert.commenter.username
        temp_annotation_alert[:track] = annotation.track.slice(:artist, :title)
        temp_annotation_alert[:type] = "AnnotationAlert"

        NotificationChannel.broadcast_to(user, {notification: temp_annotation_alert})
    end

    def broadcast_mention(user, mention)
        comment = mention.comment
        commentable_type = comment.commentable_type

        temp_mention = mention.slice(:created_at, :id, :read)
        temp_mention[:body] = commentable_type == "Track" ? "" : comment.commentable.body
        temp_mention[:commentable_type] = commentable_type
        temp_mention[:mentioner_name] = mention.mentioner.username
        temp_mention[:track] = commentable_type == "Track" ? comment.commentable.slice(:artist, :title) : comment.commentable.track.slice(:artist, :title)
        temp_mention[:type] = "Mention"

        NotificationChannel.broadcast_to(user, {notification: temp_mention})
    end
end