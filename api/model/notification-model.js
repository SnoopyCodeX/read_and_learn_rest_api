import dotenv from 'dotenv';
import Pusher from 'pusher';

class NotificationSender {
    constructor() {}

    async sendTo(recepient, data) {
        try {
            dotenv.config();
            let pusher = new Pusher({
                appId: process.env.PUSHER_APP_ID,
                key: process.env.PUSHER_KEY,
                secret: process.env.PUSHER_SECRET,
                cluster: process.env.PUSHER_CLUSTER,
                useTLS: true
            });
            
            pusher.trigger(recepient, recepient, data);
        } catch(e) {
            console.log("Error: ", e);
        }
    }
}

export default NotificationSender;