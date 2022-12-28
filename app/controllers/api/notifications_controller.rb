class Api::NotificationsController < ApplicationController
    def update
        if params[:notification][:type] === "AnnotationAlert"
            annotation_alert = AnnotationAlert.find(params[:id])
            annotation_alert.read = true
            annotation_alert.save
        else 
            mention = Mention.find(params[:id])
            mention.read = true
            mention.save
        end
    end
end