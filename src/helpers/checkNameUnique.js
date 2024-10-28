import { db } from '../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';

export const checkNameUnique = async name => {
  const carsCollection = collection(db, 'cars');
  const q = query(carsCollection, where('name', '==', name));
  const querySnapshot = await getDocs(q);
  return querySnapshot.empty;
};
