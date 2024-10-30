import { db } from '../../firebase/config';
import { Timestamp, addDoc, collection } from 'firebase/firestore';

export const addCarComment = async ({ carId, commentText, user }) => {
  const { userId, name } = user;

  const comment = {
    text: commentText,
    date: Timestamp.now(),
    userId,
    name,
  };

  console.log('comment', comment);
  try {
    const carRef = collection(db, 'cars', carId, 'comments');
    await addDoc(carRef, comment);
    console.log('Comment added successfully');
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};
