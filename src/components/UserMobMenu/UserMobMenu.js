import { IconButton, Box, VStack, useDisclosure } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { FaUser } from 'react-icons/fa';
import { useAuth } from 'hooks';
import { useDispatch } from 'react-redux';
import { logOut } from 'redux/auth/operations';
import css from './UserMobMenu.module.css';
import { useEffect, useRef } from 'react';

const UserMobMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toggleMenu = () => (isOpen ? onClose() : onOpen());
  const { user } = useAuth();
  const dispatch = useDispatch();
  const userMenuRef = useRef();

  useEffect(() => {
    const handleClickOutside = event => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <Box display={{ base: 'block', md: 'none' }} ref={userMenuRef}>
      <IconButton
        icon={isOpen ? <CloseIcon /> : <FaUser size="20px" color="green" />}
        onClick={toggleMenu}
        variant="ghost"
        aria-label="Open Menu"
      />

      {/* Меню */}
      {isOpen && (
        <Box
          position="absolute"
          top="60px"
          left="0"
          width="100%"
          bg="white"
          zIndex="overlay"
          boxShadow="md"
        >
          <VStack align="start" spacing={4} p={4}>
            <p>ID: {user.userId}</p>
            <p>
              {user.surname} {user.name}
            </p>
            <p>{user.email}</p>
            <button
              type="button"
              className={css.link}
              onClick={() => dispatch(logOut())}
            >
              Logout
            </button>
          </VStack>
        </Box>
      )}
    </Box>
  );
};

export default UserMobMenu;
