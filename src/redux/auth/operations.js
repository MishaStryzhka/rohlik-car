import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth, db } from '../../firebase/config';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';

export const register = createAsyncThunk(
  'auth/registerUser',
  async (credentials, { rejectWithValue }) => {
    const { email, password, id: userId, name, surname } = credentials;
    setPersistence(auth, browserLocalPersistence).catch(error => {
      console.error('Помилка налаштування збереження сесії:', error.message);
    });

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { accessToken, uid } = userCredential.user;

      await setDoc(doc(db, 'users', uid), {
        userId: userId,
        email: email,
        name: name,
        surname: surname,
      });

      const user = { uid: userId, email, name, surname };
      return { user, token: accessToken };
    } catch (error) {
      console.log('error', error);
      return rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async ({ id: userId, pin: password }, thunkAPI) => {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);

      let userDate;
      querySnapshot.forEach(doc => {
        if (doc.data().email) {
          userDate = doc.data();
        } else {
          return thunkAPI.rejectWithValue('Користувача з таким ID не знайдено');
        }
      });

      let userPryvatDate;
      await signInWithEmailAndPassword(auth, userDate.email, password)
        .then(userCredential => {
          userPryvatDate = userCredential.user;
        })
        .catch(error => {
          return thunkAPI.rejectWithValue(error.message);
        });

      const { accessToken, uid } = userPryvatDate;
      const user = {
        uid,
        userId: userDate.userId,
        email: userDate.email,
        name: userDate.name,
        surname: userDate.surname,
      };

      return { user, token: accessToken };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await signOut(auth);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refreshUser',
  async (_, thunkAPI) => {
    try {
      const userPromise = new Promise((resolve, reject) => {
        onAuthStateChanged(auth, user => {
          if (user) {
            resolve({
              uid: user.uid,
              email: user.email,
            });
          } else {
            reject('User is not authenticated');
          }
        });
      });

      const userAuthData = await userPromise;

      const docRef = doc(db, 'users', userAuthData.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userFirestoreData = docSnap.data();

        const user = {
          uid: userAuthData.uid,
          userId: userFirestoreData.userId,
          email: userFirestoreData.email,
          name: userFirestoreData.name,
          surname: userFirestoreData.surname,
        };
        return { user };
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
