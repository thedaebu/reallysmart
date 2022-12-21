import * as NotificationAPIUtil from "./../util/api/notification_api_util";

export const updateNotification = (notification: any) => (
    NotificationAPIUtil.updateNotification(notification)
);