import { db } from '../../firebase/config';
import { addDoc, collection } from 'firebase/firestore';

export const addsNewCar = async formData => {
  try {
    const docRef = await addDoc(collection(db, 'cars'), formData);
    alert(`Автомобіль ${formData.name} успішно додано.`);
    return docRef;
  } catch (error) {
    alert(`Помилка при додаванні автомобіля: ${formData.name}`, error);
    return null;
  }
};
