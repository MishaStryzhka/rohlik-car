import React, { useEffect, useRef } from 'react';
import { Box, VStack } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { useAuth } from 'hooks';

const MobMenu = ({ isOpen, onClose }) => {
  const menuRef = useRef();
  const { user } = useAuth();

  // Закриття меню при кліку поза його межами
  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <>
      {/* Меню */}
      {isOpen && (
        <Box
          display={{ base: 'block', md: 'none' }}
          ref={menuRef}
          position="absolute"
          top="60px"
          left="0"
          width="100%"
          bg="white"
          zIndex="overlay"
          boxShadow="md"
        >
          <VStack align="start" spacing={4} p={4}>
            <NavLink to="/" onClick={onClose}>
              Home
            </NavLink>
            <NavLink to="/cars" onClick={onClose}>
              Auta
            </NavLink>
            {(user?.role === 'VIP' || user?.role === 'dev') && (
              <NavLink to="/bar-code" onClick={onClose}>
                Čárový kód
              </NavLink>
            )}
            <NavLink to="/packagings" onClick={onClose}>
              Vratné obaly
            </NavLink>
            <NavLink to="/faq" onClick={onClose}>
              FAQ
            </NavLink>
          </VStack>
        </Box>
      )}
    </>
  );
};

export default MobMenu;
