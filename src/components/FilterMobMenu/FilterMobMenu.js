import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  IconButton,
  VStack,
  Checkbox,
  Select,
  Button,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
} from '@chakra-ui/react';
import { CloseIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { FaFilter } from 'react-icons/fa';
import { FaFilterCircleXmark } from 'react-icons/fa6';

const FilterMobMenu = ({
  typeCars,
  setTypeCars,
  drivingStyle,
  setDrivingStyle,
  hasAirConditioner,
  setHasAirConditioner,
  hasFridge,
  setHasFridge,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const filterMenuRef = useRef();

  const activeFilters = [
    typeCars,
    drivingStyle,
    hasAirConditioner,
    hasFridge,
  ].filter(Boolean).length;
  console.log('activeFilters', activeFilters);

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        filterMenuRef.current &&
        !filterMenuRef.current.contains(event.target)
      ) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleCleanFilter = () => {
    setTypeCars('');
    setDrivingStyle('');
    setHasAirConditioner(null);
    setHasFridge(null);
  };

  return (
    <Box display={{ base: 'block', md: 'none' }} ref={filterMenuRef}>
      {/* Кнопка для відкриття фільтр-меню */}
      <Box position="relative">
        <IconButton
          icon={isOpen ? <CloseIcon /> : <FaFilter />}
          onClick={isOpen ? onClose : onOpen}
          // variant="outline"
          aria-label="Open Filter Menu"
          position="relative"
        />
        {activeFilters > 0 && (
          <Box
            position="absolute"
            top="-5px"
            right="-5px"
            fontSize="10px"
            color="white"
            bg="red.500"
            borderRadius="full"
            width="15px"
            height="15px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {activeFilters}
          </Box>
        )}
      </Box>

      {/* Фільтр-меню */}
      {isOpen && (
        <Box
          position="absolute"
          top="60px"
          left="0"
          width="100%"
          bg="white"
          zIndex="overlay"
          boxShadow="md"
          p={4}
        >
          <VStack align="start" spacing={4}>
            <Box
              w="100%"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              ml="auto"
              position="relative"
            >
              <Text>Filtry: </Text>
              <IconButton
                size={'md'}
                icon={<FaFilterCircleXmark />}
                onClick={handleCleanFilter}
                aria-label="Clear Filter"
                position="relative"
              />
              {activeFilters > 0 && (
                <Box
                  position="absolute"
                  top="-5px"
                  right="-5px"
                  fontSize="10px"
                  color="white"
                  bg="red.500"
                  borderRadius="full"
                  width="15px"
                  height="15px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  {activeFilters}
                </Box>
              )}
            </Box>

            {/* Вибір типу авто */}
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />} w="100%">
                {typeCars || 'Typ auta:'}
              </MenuButton>
              <MenuList w="100%">
                <MenuItem w="100%" onClick={() => setTypeCars('')}>
                  Vše
                </MenuItem>
                <MenuItem w="100%" onClick={() => setTypeCars('CDV')}>
                  CDV
                </MenuItem>
                <MenuItem w="100%" onClick={() => setTypeCars('CD')}>
                  CD
                </MenuItem>
                <MenuItem w="100%" onClick={() => setTypeCars('D')}>
                  D
                </MenuItem>
                <MenuItem w="100%" onClick={() => setTypeCars('OV')}>
                  OV
                </MenuItem>
                <MenuItem w="100%" onClick={() => setTypeCars('EXP')}>
                  EXP
                </MenuItem>
              </MenuList>
            </Menu>

            {/* Вибір стилю їзди */}
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />} w="100%">
                {drivingStyle || 'Styl jízdy:'}
              </MenuButton>
              <MenuList w="100%">
                <MenuItem w="100%" onClick={() => setDrivingStyle('')}>
                  Vše
                </MenuItem>
                <MenuItem w="100%" onClick={() => setDrivingStyle('A')}>
                  A
                </MenuItem>
                <MenuItem w="100%" onClick={() => setDrivingStyle('B')}>
                  B
                </MenuItem>
                <MenuItem w="100%" onClick={() => setDrivingStyle('C')}>
                  C
                </MenuItem>
                <MenuItem w="100%" onClick={() => setDrivingStyle('0')}>
                  0
                </MenuItem>
              </MenuList>
            </Menu>

            {/* Перемикач для кондиціонера */}
            <Checkbox
              name="hasAirConditioner"
              isChecked={hasAirConditioner}
              onChange={() => {
                setHasAirConditioner(prev => !prev);
              }}
            >
              Klimatizace
            </Checkbox>

            {/* Перемикач для вбудованої системи */}
            <Checkbox
              name="hasVestavba"
              isChecked={hasFridge}
              onChange={() => setHasFridge(prev => !prev)}
            >
              Vestavba (lednička)
            </Checkbox>
          </VStack>
        </Box>
      )}
    </Box>
  );
};

export default FilterMobMenu;
