import {onDocumentCreated} from "firebase-functions/firestore";
import {FieldValue} from "firebase-admin/firestore";
import {db} from "../config.js";

export const createNotificationsAboutNewUser = onDocumentCreated(
    "users/{userId}",
    async (event) => {
        const newUserData = event.data?.data();
        const newUserId = event.params.userId;

        console.log(`Новий користувач створений: ${newUserId}`);

        // Отримуємо всіх існуючих користувачів
        const usersSnapshot = await db.collection("users").get();
        const batch = db.batch();

        usersSnapshot.forEach((userDoc) => {
            const userData = userDoc.data();

            // Перевіряємо, чи підписаний користувач на категорію "users"
            if (userData.subscriptions && userData.subscriptions["users"]) {
                const notificationRef = db.collection("notifications").doc();

                batch.set(notificationRef, {
                    userId: userDoc.id,
                    category: "users",
                    message: `Новий користувач зареєструвався: ${newUserData.name || "Анонім"}`,
                    isRead: false,
                    createdAt: FieldValue.serverTimestamp()
                });
            }
        });

        await batch.commit();
        console.log(
            "Сповіщення про нового користувача створені для підписаних."
        );
    }
);
