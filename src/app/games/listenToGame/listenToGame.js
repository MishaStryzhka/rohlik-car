import { db } from '../../../firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';

export const listenToGame = (gameId, setGameData) => {
  const gameRef = doc(db, 'games', gameId);

  const unsubscribe = onSnapshot(gameRef, snapshot => {
    if (snapshot.exists()) {
      setGameData(snapshot.data());
    }
  });

  return unsubscribe; // Для відключення слухача
};
