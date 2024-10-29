import React, { useState } from 'react';
import {
  IconButton,
  Box,
  Flex,
  VStack,
  HStack,
  Link,
  useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { NavLink } from 'react-router-dom';

const MobMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toggleMenu = () => (isOpen ? onClose() : onOpen());

  return (
    <Box display={{ base: 'block', md: 'none' }}>
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
          </VStack>
        </Box>
      )}
    </Box>
  );
};

export default MobMenu;
