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
      const { uid } = userCredential.user;

      await setDoc(doc(db, 'users', uid), {
        userId: userId,
        email: email,
        name: name,
        surname: surname,
        subscriptions: {
          cars: true,
          questions: true,
          'returnable-packaging': true,
        },
      });

      const user = { uid, userId, email, name, surname };
      return { user };
    } catch (error) {
      console.log('error', error);
      return rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async ({ id: userId, password }, thunkAPI) => {
    try {
      // Пошук користувача за userId
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // Якщо користувача не знайдено
        return thunkAPI.rejectWithValue(
          'Zadané ID není platné. Zkontrolujte prosím své údaje.'
        );
      }

      let userDate;
      querySnapshot.forEach(doc => {
        userDate = doc.data();
      });

      if (!userDate?.email) {
        // Якщо у даних користувача немає email
        return thunkAPI.rejectWithValue(
          'Zadané ID není platné. Zkontrolujte prosím své údaje.'
        );
      }

      // Спроба авторизації користувача
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          userDate.email,
          password
        );
        const { accessToken, uid } = userCredential.user;

        // Повернення успішного результату
        const user = {
          uid,
          ...userDate,
        };

        return { user, token: accessToken };
      } catch (error) {
        console.log('error1', error);
        // Помилка при неправильному паролі
        return thunkAPI.rejectWithValue(
          'ID nebo heslo je nesprávné. Zkuste to znovu.'
        );
      }
    } catch (error) {
      console.log('error', error);
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
          ...userFirestoreData,
        };
        return { user };
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
