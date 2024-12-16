import { db } from '../../firebase/config';
import { deleteDoc, doc } from 'firebase/firestore';

export const removeComment = async ({ colectionsName, elemId, commentId }) => {
  try {
    const carRef = doc(db, colectionsName, elemId, 'comments', commentId);
    await deleteDoc(carRef);
    console.log('Comment updated successfully');
  } catch (error) {
    console.error('Error updating comment:', error);
    throw error;
  }
};
