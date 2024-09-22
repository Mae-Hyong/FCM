const admin = require('firebase-admin');
const serviceAccount = require('./path/firebase-admin.json');

const connect = async () => {
  try {
    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      console.log('FCM SDK Initialized');
    }
  } catch (error) {
    console.error('FCM connection error:', error.message);
  }
};

const sendNotification = async (title, body, token) => {
  try {
    const response = await admin.messaging().send({
      token: token,
      notification: {
        title: title,
        body: body,
      },
    });
    console.log('Successfully sent message:', response);
    return response;  // Return response for further handling in app.js
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;  // Propagate error to be handled in app.js
  }
};

// Export the connect function and sendNotification function
module.exports = {
  connect,
  sendNotification,
};