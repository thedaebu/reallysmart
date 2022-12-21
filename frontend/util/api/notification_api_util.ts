import $ from "jquery";

export const updateNotification = (notification: any) => (
    $.ajax({
        data: {
            notification,
            authenticity_token: $('[name="csrf-token"]').attr("content")
        },
        method: "PUT",
        url: `api/notifications/${notification.id.toString()}`
    })
);