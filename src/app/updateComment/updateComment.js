import { db } from '../../firebase/config';
import { doc, setDoc } from 'firebase/firestore';

export const updateComment = async ({
  collectionName,
  elemId,
  commentId,
  comment,
}) => {
  try {
    const carRef = doc(db, collectionName, elemId, 'comments', commentId);
    await setDoc(carRef, comment);
    console.log('Comment updated successfully');
  } catch (error) {
    console.error('Error updating comment:', error);
    throw error;
  }
};
