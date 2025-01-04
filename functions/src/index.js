import "./config.js"; // Ініціалізація Firebase

import {createNotificationAboutCars} from "./triggers/cars.js";
import {createNotificationsAboutNewUser} from "./triggers/users.js";

export const setNotificationAboutCars = createNotificationAboutCars;
export const setNotificationsAboutNewUser = createNotificationsAboutNewUser;
