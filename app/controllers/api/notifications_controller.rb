class Api::NotificationsController < ApplicationController
    def update
        if params[:notification][:type] === "AnnotationAlert"
            annotation_alert = AnnotationAlert.find(params[:id])
            annotation_alert.read = true
            annotation_alert.save
        end
    end
end