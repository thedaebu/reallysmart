class Api::SessionsController < ApplicationController
    def create
        user = User.find_by_credentials(params[:user][:username], params[:user][:password])
        if user
            login!(user)
            @user = user.slice(:id, :username)
            annotation_alerts = user.annotation_alerts.map do |annotation_alert|
                annotation = annotation_alert.annotation

                temp_annotation_alert = annotation_alert.slice(:created_at, :id, :read)
                temp_annotation_alert[:body] = annotation.body
                temp_annotation_alert[:commenter_name] = annotation_alert.commenter.username
                temp_annotation_alert[:track] = annotation.track.slice(:artist, :title)
                temp_annotation_alert[:type] = "AnnotationAlert"
                temp_annotation_alert
            end
            mentions = user.mentions.map do |mention|
                comment = mention.comment
                commentable_type = comment.commentable_type

                temp_mention = mention.slice(:created_at, :id, :read)
                temp_mention[:body] = commentable_type == "Track" ? "" : comment.commentable.body
                temp_mention[:mentioner_name] = mention.mentioner.username
                temp_mention[:track] = commentable_type == "Track" ? comment.commentable.slice(:artist, :title) : comment.commentable.track.slice(:artist, :title)
                temp_mention[:type] = "Mention"
                temp_mention
            end
            @user[:annotation_alerts] = annotation_alerts
            @user[:mentions] = mentions
            # avatar_url = url_for(user.avatar)

            result = {:user => @user}
            render json: result
        else
            render json: ["Invalid credentials"], status: 401
        end
    end

    def destroy
        if !!current_user
            logout!
            render json: {}
        else
            render json: ['You are not logged in.'], status: 404
        end
    end
end