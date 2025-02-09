// run terminal --- node services_functions/updateCarsWithCommentsCount.js

// import admin from "firebase-admin";

// import serviceAccount from "../../rohlik-help-courier-firebase-adminsdk-74qre-16b8342fde.json" assert {type: "json"};

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
// });

// // Тепер можна використовувати Firestore
// const db = admin.firestore();

// async function updateCarsWithCommentsCount() {
//     try {
//         const carsRef = db.collection("cars");
//         const carsSnapshot = await carsRef.get();

//         const batch = db.batch();

//         for (const carDoc of carsSnapshot.docs) {
//             const commentsRef = carDoc.ref.collection("comments");
//             const commentsSnapshot = await commentsRef.get();
//             const commentsCount = commentsSnapshot.size;

//             if (commentsCount > 0) {
//                 batch.update(carDoc.ref, {commentsCount});
//             }
//         }

//         await batch.commit();
//         console.log("Дані оновлено успішно!");
//     } catch (error) {
//         console.error("Помилка при оновленні даних:", error);
//     }
// }

// updateCarsWithCommentsCount();
