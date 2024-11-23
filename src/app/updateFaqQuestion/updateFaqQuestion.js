import { db } from '../../firebase/config';
import { doc, updateDoc } from 'firebase/firestore';

export const updateFaqQuestion = async ({ questionId, question }) => {
  try {
    const carRef = doc(db, 'questions', questionId);
    await updateDoc(carRef, question);
    console.log('Question updated successfully');
  } catch (error) {
    console.error('Error updating question:', error);
    throw error;
  }
};
