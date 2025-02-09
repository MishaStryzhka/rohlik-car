import { db } from '../../firebase/config';
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';

export const removeComment = async ({ collectionName, elemId, commentId }) => {
  try {
    const carRef = doc(db, collectionName, elemId);
    const commentRef = doc(db, collectionName, elemId, 'comments', commentId);

    await deleteDoc(commentRef);

    // Отримуємо поточний документ машини
    const carDoc = await getDoc(carRef);

    if (carDoc.exists()) {
      const currentCount = carDoc?.data()?.commentsCount || 0;
      const newCommentsCount = currentCount - 1;

      // Оновлюємо поле commentsCount
      if (newCommentsCount >= 0) {
        await updateDoc(carRef, {
          commentsCount: newCommentsCount,
        });
      }
    }
  } catch (error) {
    console.error('Error updating comment:', error);
    throw error;
  }
};
