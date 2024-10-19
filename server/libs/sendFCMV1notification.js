import admin from "firebase-admin";

const key = process.env.FCM_SERVER_KEY
  ? JSON.parse(process.env.FCM_SERVER_KEY)
  : null;

admin.initializeApp({
  credential: admin.credential.cert(key),
});

export async function sendFCMv1Notification(deviceToken, title, body) {
  const message = {
    token: deviceToken,
    notification: {
      title,
      body,
    },
  };

  admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });
}
