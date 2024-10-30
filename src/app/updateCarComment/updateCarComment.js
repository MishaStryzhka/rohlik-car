import { db } from '../../firebase/config';
import { doc, setDoc } from 'firebase/firestore';

export const updateCarComment = async ({ carId, commentId, comment }) => {
  try {
    const carRef = doc(db, 'cars', carId, 'comments', commentId);
    await setDoc(carRef, comment);
    console.log('Comment updated successfully');
  } catch (error) {
    console.error('Error updating comment:', error);
    throw error;
  }
};
