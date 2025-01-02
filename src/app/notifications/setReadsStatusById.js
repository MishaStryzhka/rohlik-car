import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

export const setReadsStatusById = async notificationId => {
  try {
    const notificationRef = doc(db, 'notifications', notificationId);
    await updateDoc(notificationRef, { isRead: true });
    console.log('Document updated successfully');
  } catch (error) {
    console.error('Error updating notification by ID:', error);
    throw error;
  }
};
