import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase/config';

export const getCarById = async carId => {
  try {
    const docRef = doc(db, 'cars', carId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log('No such document!');
    }
  } catch (error) {
    console.error('Error fetching car by ID:', error);
    throw error;
  }
};
