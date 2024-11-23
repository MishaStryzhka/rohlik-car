import { db } from '../../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';

export const subscribeToFaqQuestions = callback => {
  const questionsCollection = collection(db, 'questions');

  const unsubscribe = onSnapshot(questionsCollection, snapshot => {
    const questionsData = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(questionsData);
  });

  return unsubscribe;
};
