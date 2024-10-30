import { differenceInCalendarDays, format } from 'date-fns';
import { cs } from 'date-fns/locale';

export const getFormatDate = date => {
  const commentDate = date.toDate();
  const today = new Date();
  const daysDifference = differenceInCalendarDays(today, commentDate);

  const formattedDate =
    daysDifference === 0
      ? `dnes v ${format(commentDate, 'HH:mm')}`
      : daysDifference === 1
      ? `včera v ${format(commentDate, 'HH:mm')}`
      : format(commentDate, 'dd.MM.yyyy HH:mm', { locale: cs });

  return formattedDate;
};
