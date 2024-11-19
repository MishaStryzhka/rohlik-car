import { IconButton } from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaTh, FaThList } from 'react-icons/fa';

const ListViewSwitcher = () => {
  const [isGridView, setIsGridView] = useState(true);
  return (
    <IconButton
      icon={isGridView ? <FaTh /> : <FaThList />}
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
