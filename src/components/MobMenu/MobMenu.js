import React, { useEffect, useRef } from 'react';
import { IconButton, Box, VStack, useDisclosure } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { NavLink } from 'react-router-dom';
import { useAuth } from 'hooks';

const MobMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toggleMenu = () => (isOpen ? onClose() : onOpen());
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
    <Box display={{ base: 'block', md: 'none' }} ref={menuRef}>
      <IconButton
        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
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
            <NavLink to="/" onClick={onClose}>
              Home
            </NavLink>
            <NavLink to="/cars" onClick={onClose}>
              Cars
            </NavLink>
            {(user?.role === 'VIP' || user?.role === 'dev') && (
              <NavLink to="/bar-code" onClick={onClose}>
                BarCode
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
    </Box>
  );
};

export default MobMenu;
