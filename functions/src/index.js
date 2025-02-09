import "./config.js"; // Ініціалізація Firebase

import {createNotificationAboutCars} from "./triggers/cars.js";
import {scheduledFirestoreBackup} from "./triggers/scheduledBackup.js";
import {createNotificationsAboutNewUser} from "./triggers/users.js";

export const setNotificationAboutCars = createNotificationAboutCars;
export const setNotificationsAboutNewUser = createNotificationsAboutNewUser;
export const setFirestoreBackup = scheduledFirestoreBackup;
