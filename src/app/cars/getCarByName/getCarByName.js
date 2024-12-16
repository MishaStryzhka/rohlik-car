import { db } from '../../../firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';

const getCarByName = async name => {
  try {
    if (!name || typeof name !== 'string') {
      throw new Error('Invalid "name" parameter');
    }

    // Створюємо запит до колекції "cars", шукаючи документ, де поле "name" дорівнює значенню name
    const carsCollection = collection(db, 'cars');
    const q = query(carsCollection, where('name', '==', name));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Повертаємо перший знайдений документ
      const carDoc = querySnapshot.docs[0];
      return { id: carDoc.id, ...carDoc.data() };
    } else {
      console.log(`No car found with name: "${name}"`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching car by name: "${name}". Details:`, error);
    throw error;
  }
};

export default getCarByName;
