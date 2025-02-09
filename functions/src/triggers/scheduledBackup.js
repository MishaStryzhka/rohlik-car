import firestore from "@google-cloud/firestore";
import {onSchedule} from "firebase-functions/scheduler";
const client = new firestore.v1.FirestoreAdminClient();

const bucket = "gs://help-book-firestore-backups";

export const scheduledFirestoreBackup = onSchedule(
    "every monday 02:00",
    async (event) => {
        try {
            const projectId =
                process.env.GCP_PROJECT || process.env.GCLOUD_PROJECT;

            const databaseName = client.databasePath(projectId, "(default)");

            console.log(`📂 Starting Firestore backup to: ${bucket}`);

            const response = await client.exportDocuments({
                name: databaseName,
                outputUriPrefix: bucket,
                collectionIds: [] // Export all collections
            });

            console.log("📁 Backup response:", response);
            console.log(`✅ Firestore backup completed successfully!`);
        } catch (error) {
            console.error(`❌ Firestore backup failed:`, error);
        }
    }
);
