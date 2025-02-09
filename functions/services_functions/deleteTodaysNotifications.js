// // run in terminal node services_functions/deleteTodaysNotifications.js

// import admin from "firebase-admin";

// import serviceAccount from "../../rohlik-help-courier-firebase-adminsdk-74qre-16b8342fde.json" assert {type: "json"};

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
// });

// // Тепер можна використовувати Firestore
// const db = admin.firestore();

// import {collection, query, where, getDocs, deleteDoc} from "firebase/firestore";

// async function deleteTodaysNotifications() {
//     try {
//         // const startOfDay = new Date();
//         // startOfDay.setHours(0, 0, 0, 0); // Початок сьогоднішнього дня
//         const startOfDay = "2025-02-08T23:00:00Z";

//         // Отримуємо всі нотифікації, створені сьогодні
//         const notificationsRef = db.collection("notifications");
//         const snapshot = await notificationsRef
//             .where("createdAt", ">=", startOfDay)
//             .get();

//         if (snapshot.empty) {
//             console.log("Сьогодні ніяких нотифікацій не створено.");
//             return;
//         }

//         // Видаляємо знайдені документи
//         const batch = db.batch();
//         snapshot.docs.forEach((doc) => {
//             batch.delete(doc.ref);
//         });

//         await batch.commit();

//         console.log(
//             `✅ Видалено ${snapshot.size} нотифікацій, створених сьогодні.`
//         );
//     } catch (error) {
//         console.error("❌ Помилка при видаленні нотифікацій:", error);
//     }
// }

// deleteTodaysNotifications();
