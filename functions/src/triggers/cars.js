import {onDocumentWritten} from "firebase-functions/firestore";
import {FieldValue} from "firebase-admin/firestore";
import {db} from "../config.js";

export const createNotificationAboutCars = onDocumentWritten(
    "cars/{docId}",
    async (event) => {
        const beforeData = event.data?.before.data(); // Data dokumentu před změnou
        const afterData = event.data?.after.data(); // Data dokumentu po změně

        const carId = event.params?.docId;

        // Pokud byl vytvořen nový dokument
        if (!beforeData && afterData) {
            console.log(`Byl přidán nový dokument: ${carId}`);
            await createNotificationsAboutNewCar(afterData, carId);
        }

        // Pokud byl dokument aktualizován
        if (beforeData && afterData) {
            console.log(`Dokument byl aktualizován: ${carId}`);
            await createNotificationsAboutUpdatedCar({
                afterData,
                beforeData,
                carId
            });
        }

        // Pokud byl dokument smazán
        if (beforeData && !afterData) {
            console.log(`Dokument byl smazán: ${carId}`);
            await createNotificationsAboutDeletedCar(afterData, carId);
        }
    }
);

async function createNotificationsAboutNewCar(carData, carId) {
    // Získání seznamu uživatelů
    const querySnapshot = await db.collection("users").get();
    const batch = db.batch();

    querySnapshot.forEach((doc) => {
        const userId = doc.id;

        // Vytvoření odkazu na nový dokument v kolekci notifikací
        const notificationRef = db.collection("notifications").doc();

        batch.set(notificationRef, {
            userId: userId,
            carId: carId,
            message: `Bylo přidáno nové auto: ${carData.name || "bez názvu"}`,
            isRead: false,
            createdAt: new Date().toISOString() // nebo použijte Firebase Timestamp
        });
    });

    // Aplikace všech změn
    await batch.commit();
    console.log("Notifikace byly vytvořeny pro všechny uživatele.");
}

// Mapa pro překlad klíčů na české názvy
const TRANSLATIONS = {
    hasAirConditioner: "Klimatizace",
    hasFridge: "Vestavba (lednička)",
    hasHeating: "Topení",
    hasSoundProofed: "Odhlučněné",
    drivingStyle: "Styl jízdy",
    type: "Typ vozidla",
    name: "Název vozidla"
};

async function createNotificationsAboutUpdatedCar({
    afterData,
    beforeData,
    carId
}) {
    try {
        // Získání seznamu uživatelů
        const querySnapshot = await db.collection("users").get();
        const batch = db.batch();

        const changes = [];

        // Kontrola změn, ignorujeme `commentsCount`
        Object.keys(afterData).forEach((key) => {
            if (
                key !== "commentsCount" &&
                JSON.stringify(afterData[key]) !==
                    JSON.stringify(beforeData[key])
            ) {
                changes.push(`${TRANSLATIONS[key] || key}`);
            }
        });

        if (changes.length === 0) return; // Pokud nejsou žádné změny (nebo změněn jen `commentsCount`), ukončíme funkci

        // Vytvoření textu oznámení
        const message = `Auto ${beforeData.name || "bez názvu"} bylo aktualizováno: ${changes.join(", ")}`;

        querySnapshot.forEach((doc) => {
            const userId = doc.id;

            // Vytvoření odkazu na nový dokument v kolekci notifikací
            const notificationRef = db.collection("notifications").doc();

            batch.set(notificationRef, {
                userId,
                carId,
                message,
                isRead: false,
                createdAt: new Date().toISOString() // nebo použijte Firebase Timestamp
            });
        });

        await batch.commit();
        console.log("Byla vytvořena personalizovaná oznámení pro uživatele.");
    } catch (error) {
        console.error("❌ Помилка при оновленні даних:", error);
    }
}

async function createNotificationsAboutDeletedCar(carData, carId) {
    // Získání seznamu uživatelů
    const querySnapshot = await db.collection("users").get();
    const batch = db.batch();

    querySnapshot.forEach((doc) => {
        const userId = doc.id;

        // Vytvoření odkazu na nový dokument v kolekci notifikací
        const notificationRef = db.collection("notifications").doc();

        batch.set(notificationRef, {
            userId: userId,
            carId: carId,
            message: `Auto bylo odstraněno: ${carData?.name || "bez názvu"}`,
            isRead: false,
            createdAt: FieldValue.serverTimestamp()
        });
    });

    // Aplikace všech změn
    await batch.commit();
    console.log(
        "Notifikace o odstranění auta byly vytvořeny pro všechny uživatele."
    );
}
