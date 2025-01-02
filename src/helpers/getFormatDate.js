import { differenceInCalendarDays, format } from 'date-fns';
import { cs } from 'date-fns/locale';

export const getFormatDate = date => {
  let currentDate;

  if (date instanceof Date) {
    currentDate = date; // Якщо вже є JavaScript Date
  } else if (typeof date === 'string') {
    currentDate = new Date(date); // Якщо ISO 8601 рядок
  } else if (date?.toDate) {
    currentDate = date.toDate(); // Якщо Firestore Timestamp
  } else {
    console.error('Unknown date format');
  }

  const today = new Date();
  const daysDifference = differenceInCalendarDays(today, currentDate);

  const formattedDate =
    daysDifference === 0
      ? `dnes v ${format(currentDate, 'HH:mm')}`
      : daysDifference === 1
        ? `včera v ${format(currentDate, 'HH:mm')}`
        : format(currentDate, 'dd.MM.yyyy HH:mm', { locale: cs });

  return formattedDate;
};
