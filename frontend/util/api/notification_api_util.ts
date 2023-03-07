import $ from "jquery";
import { UpdatedNotification } from "../../my_types";

export const updateNotification = (notification: UpdatedNotification) => (
    $.ajax({
        data: {
            notification,
            authenticity_token: $('[name="csrf-token"]').attr("content")
        },
        method: "PUT",
        url: `api/notifications/${notification.id.toString()}`
    })
);