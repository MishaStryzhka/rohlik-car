import { storage } from '../../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const uploadPhotos = async ({ path = 'all', files }) => {
  const uploadPromises = files.map(file => {
    const storageRef = ref(storage, `images/${path}/${file.name}`);

    return new Promise((resolve, reject) => {
      uploadBytes(storageRef, file).then(snapshot => {
        const downloadUrl = getDownloadURL(snapshot.ref);
        resolve(downloadUrl);
      });
    });
  });

  try {
    const urls = await Promise.all(uploadPromises);
    console.log('urls', urls);
    return urls; // Зберігаємо всі URL-адреси
  } catch (error) {
    console.error('Chyba při nahrávání obrázků:', error);
    alert('Došlo k chybě při nahrávání obrázků.');
    return;
  }
};
