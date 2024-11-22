// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD2pc98ZOmoAtwdobffoQqOOS2Cr-EF8os',
  authDomain: 'rohlik-help-courier.firebaseapp.com',
  projectId: 'rohlik-help-courier',
  storageBucket: 'rohlik-help-courier.appspot.com',
  messagingSenderId: '764996411625',
  appId: '1:764996411625:web:b58ee4c5638d9f0c411078',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const storage = getStorage(app);

export { auth, db, storage };
