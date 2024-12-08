import { uploadPhotos } from 'app/uploadPhotos/uploadPhotos';
import { db } from '../../../firebase/config';
import { Timestamp, doc, setDoc } from 'firebase/firestore';

export const updateReturnablePackaging = async ({
  id,
  name,
  systemName,
  type,
  comment,
  img,
  isReturnable,
  user,
}) => {
  const { userId, name: userName } = user;

  let pathImg = img;

  if (typeof img !== 'string') {
    [pathImg] = await uploadPhotos({
      path: 'returnable-packaging',
      files: [img],
    });
  }

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
    const packagingRef = doc(db, 'returnable-packaging', id);
    await setDoc(packagingRef, newPackaging);
    console.log('Packaging added successfully');
  } catch (error) {
    console.error('Error adding packaging:', error);
    throw error;
  }
};
