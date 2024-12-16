import { db } from '../../firebase/config';
import { Timestamp, addDoc, collection } from 'firebase/firestore';

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
    const carRef = collection(db, collectionName, elemId, 'comments');
    await addDoc(carRef, comment);
    console.log('Comment added successfully');
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};
