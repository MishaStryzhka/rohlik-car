// run terminal --- node updateSubscriptions.js

// import admin from "firebase-admin";
// import serviceAccount from "../rohlik-help-courier-firebase-adminsdk-74qre-16b8342fde.json" assert {type: "json"};

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
// });

// // Тепер можна використовувати Firestore
// const db = admin.firestore();

// async function addSubscriptionsToAllUsers() {
//     const querySnapshot = await db.collection("users").get();
//     const batch = db.batch();

//     querySnapshot.forEach((userDoc) => {
//         const userRef = userDoc.ref;

//         // Додати subscriptions до кожного користувача
//         batch.update(userRef, {
//             subscriptions: {
//                 cars: true,
//                 questions: true,
//                 "returnable-packaging": true
//             }
//         });
//     });

//     // Виконання пакетного оновлення
//     await batch.commit();
//     console.log("Усім користувачам додано поле subscriptions.");
// }

// // Виклик функції
// addSubscriptionsToAllUsers()
//     .then(() => console.log("Оновлення завершено"))
//     .catch((error) => console.error("Помилка оновлення:", error));
