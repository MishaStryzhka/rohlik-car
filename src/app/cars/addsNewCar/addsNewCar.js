import { db } from '../../../firebase/config';
import { addDoc, collection } from 'firebase/firestore';

export const addsNewCar = async formData => {
  try {
    const docRef = await addDoc(collection(db, 'cars'), formData);
    alert(`Automobil ${formData.name} byl úspěšně přidán.`);
    return docRef;
  } catch (error) {
    alert(`Chyba při přidávání automobilu: ${formData.name}`, error);
    return null;
  }
};
