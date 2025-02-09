import { db } from '../../firebase/config';
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  updateDoc,
  getDoc,
} from 'firebase/firestore';

export const addComment = async ({
  collectionName,
  elemId,
  commentText,
  user,
}) => {
  const { userId, name } = user;

  const comment = {
    text: commentText,
    CreatedAt: Timestamp.now(),
    userId,
    name,
  };

  try {
    const carRef = doc(db, collectionName, elemId);
    const commentsRef = collection(db, collectionName, elemId, 'comments');

    // Додаємо коментар
    await addDoc(commentsRef, comment);

    // Отримуємо поточний документ машини
    const carDoc = await getDoc(carRef);

    if (carDoc.exists()) {
      const currentCount = carDoc.data().commentsCount || 0;

      // Оновлюємо поле commentsCount (+1)
      await updateDoc(carRef, {
        commentsCount: currentCount + 1,
      });
    }

    console.log('Comment added successfully and commentsCount updated');
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};
