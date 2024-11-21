import { IconButton } from '@chakra-ui/react';
import { FaTh, FaThList } from 'react-icons/fa';

const ListViewSwitcher = ({ isGridView, setIsGridView }) => {
  return (
    <IconButton
      icon={isGridView ? <FaThList /> : <FaTh />}
      onClick={() => setIsGridView(pref => !pref)}
      aria-label={
        isGridView
          ? 'Відображення в три стовпчики'
          : 'Відображення в один стовпчик'
      }
      colorScheme={'gray'}
    />
  );
};

export default ListViewSwitcher;
