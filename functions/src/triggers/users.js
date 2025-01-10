import {onDocumentCreated} from "firebase-functions/firestore";
import {FieldValue} from "firebase-admin/firestore";
import {db} from "../config.js";

export const createNotificationsAboutNewUser = onDocumentCreated(
    "users/{userId}",
    async (event) => {
        const newUserData = event.data?.data();
        const newUserId = event.params.userId;

        console.log(`Nový uživatel byl vytvořen: ${newUserId}`);

        // Získání všech existujících uživatelů
        const usersSnapshot = await db.collection("users").get();
        const batch = db.batch();

        usersSnapshot.forEach((userDoc) => {
            const userData = userDoc.data();

            // Kontrolujeme, zda je uživatel přihlášen k odběru kategorie "users"
            if (userData.subscriptions && userData.subscriptions["users"]) {
                const notificationRef = db.collection("notifications").doc();

                batch.set(notificationRef, {
                    userId: userDoc.id,
                    category: "users",
                    message: `Nový uživatel se zaregistroval: ${newUserData.name || "Anonym"}`,
                    isRead: false,
                    createdAt: FieldValue.serverTimestamp()
                });
            }
        });

        await batch.commit();
        console.log(
            "Oznámení o novém uživateli byla vytvořena pro odběratele."
        );
    }
);
