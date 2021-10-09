import dotenv from 'dotenv';
import Pusher from 'pusher';

class NotificationSender {
    _pusher;

    constructor() {
        dotenv.config();
        this._pusher = new Pusher({
            appId: process.env.PUSHER_APP_ID,
            key: process.env.PUSHER_KEY,
            secret: process.env.PUSHER_SECRET,
            cluster: process.env.PUSHER_CLUSTER,
            useTLS: true
        });
    }

    async sendTo(recepient, data) {
        try {
            this._pusher.trigger(recepient, recepient, data);
        } catch(e) {
            console.log("Error: ", e);
        }
    }
}

export const notificationSender = NotificationSender;