// const functions = require("firebase-functions");
// // const admin = require('firebase-admin');

// // eslint-disable-next-line no-unused-vars
// const {db} = require("../../config");

// // Тригер: коли додається нове сповіщення
// exports.onNotificationCreated = functions.firestore
//     .document(`notification/{notificationId}`)
//     .onCreate(async (snapshot, context) => {
//         const notification = snapshot.data();
//         console.log(`New notification: ${notification.message}`);

//         // Додатковий код, наприклад, надсилання push-повідомлень
//     });
