import $ from "jquery";
import { AnnotationAlert, Mention } from "../../my_types";

export const updateNotification = (notification: AnnotationAlert | Mention) => (
    $.ajax({
        data: {
            notification,
            authenticity_token: $('[name="csrf-token"]').attr("content")
        },
        method: "PUT",
        url: `api/notifications/${notification.id.toString()}`
    })
);