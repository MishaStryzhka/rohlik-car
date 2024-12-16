import { uploadPhotos } from 'app/uploadPhotos/uploadPhotos';
import { db } from '../../../firebase/config';
import { Timestamp, addDoc, collection } from 'firebase/firestore';

export const addReturnablePackaging = async ({
  name,
  systemName,
  type,
  comment,
  img,
  isReturnable,
  user,
}) => {
  const { userId, name: userName } = user;

  const [pathImg] = await uploadPhotos({
    path: 'returnable-packaging',
    files: [img],
  });

  const newPackaging = {
    name,
    systemName,
    type,
    comment,
    img: pathImg,
    isReturnable,
    date: Timestamp.now(),
    userId,
    userName,
  };

  try {
    const packagingRef = collection(db, 'returnable-packaging');
    await addDoc(packagingRef, newPackaging);
    console.log('Packaging added successfully');
  } catch (error) {
    console.error('Error adding packaging:', error);
    throw error;
  }
};
