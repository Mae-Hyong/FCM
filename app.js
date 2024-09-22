const express = require('express');
const fcm = require('./fcm');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

// Static files served from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware setup
app.use(express.json());

// Initialize FCM
fcm.connect();  // Call connect method of fcm object

// Define a route to test FCM
app.post('/test-notification', async (req, res) => {
  const { title, body, token } = req.body;

  try {
    // Call the sendNotification function from fcm object
    await fcm.sendNotification(title, body, token);
    res.status(200).json({ message: 'Notification sent successfully!' });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ message: 'Failed to send notification.' });
  }
});

// Route setup for notifications
app.use('/notifications', notificationRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});