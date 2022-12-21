class Api::NotificationsController < ApplicationController
    def update
        if params[:notification][:type] === "Annotation"
            annotation_notification = AnnotationNotification.find(params[:id])
            annotation_notification.read = true
            annotation_notification.save
        end
    end
end