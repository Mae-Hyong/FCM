// importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// Firebase 초기화 (위에서 사용한 firebaseConfig와 동일하게 설정)
const firebaseConfig = {
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Retrieve Firebase Messaging object
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
    console.log('Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/firebase-logo.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});