import { db } from '../../../firebase/config'; // Підключення до Firebase
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

export const initializeGame = async ({ gameId }) => {
  const initialGrid = Array(8)
    .fill(null)
    .map(() => Array(8).fill({ player: 0, power: 0 }));
  initialGrid[0][0] = { player: 1, power: 1 }; // Гравець 1
  initialGrid[0][7] = { player: 2, power: 1 }; // Гравець 2
  initialGrid[7][0] = { player: 3, power: 1 }; // Гравець 3
  initialGrid[7][7] = { player: 4, power: 1 }; // Гравець 4

  const initialGame = {
    grid: JSON.stringify(initialGrid),
    players: {
      1: { id: 1, name: 'Player 1', active: true, bot: true },
      2: { id: 2, name: 'Player 2', active: true, bot: true },
      3: { id: 3, name: 'Player 3', active: true, bot: true },
      4: { id: 4, name: 'Player 4', active: true, bot: true },
    },
    currentPlayer: 1,
    updatedAt: serverTimestamp(),
  };

  await setDoc(doc(db, 'games', gameId), initialGame);
};
