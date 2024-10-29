import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

export const updateCarById = async credential => {
  const { carId, ...updatedData } = credential;
  try {
    const docSnap = await setDoc(doc(db, 'cars', carId), updatedData);

    console.log('docSnap', docSnap);

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
