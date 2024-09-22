const admin = require('firebase-admin');

const sendNotification = async (req, res) => {
  try {
    const { title, body, token } = req.body;

    // FCM을 통해 알림 전송
    await admin.messaging().send({
      token: token,
      android: {
        data: {
          title,
          body,
        },
      },
      apns: {
        payload: {
          aps: {
            contentAvailable: true,
            sound: 'default',
            alert: {
              title,
              body,
            },
          },
        },
      },
    });

    res.status(200).json({ message: '알림이 성공적으로 전송되었습니다!' });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || '문제가 발생했습니다!' });
  }
};

module.exports = { sendNotification };