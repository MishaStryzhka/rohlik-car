import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

export const updateCarById = async credential => {
  const { carId, ...updatedData } = credential;
  try {
    const carRef = doc(db, 'cars', carId);
    await updateDoc(carRef, updatedData);
    alert(`Автомобіль ${updatedData.name} успішно оновлено.`);
    console.log('Document updated successfully');
  } catch (error) {
    console.error('Error updating car by ID:', error);
    throw error;
  }
};
