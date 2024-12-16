import { db } from '../../firebase/config';
import { Timestamp, addDoc, collection } from 'firebase/firestore';

export const addFaqQuestion = async ({
  section,
  question,
  answer,
  images,
  user,
}) => {
  const { userId, name } = user;

  const newQuestion = {
    section,
    question,
    answer,
    images,
    date: Timestamp.now(),
    userId,
    name,
  };

  try {
    const questionRef = collection(db, 'questions');
    await addDoc(questionRef, newQuestion);
    console.log('Question added successfully');
  } catch (error) {
    console.error('Error adding question:', error);
    throw error;
  }
};
