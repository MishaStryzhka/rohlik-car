import { db } from '../../firebase/config';
import { deleteDoc, doc } from 'firebase/firestore';

export const removeCarComment = async ({ carId, commentId }) => {
  try {
    const carRef = doc(db, 'cars', carId, 'comments', commentId);
    await deleteDoc(carRef);
    console.log('Comment updated successfully');
  } catch (error) {
    console.error('Error updating comment:', error);
    throw error;
  }
};
