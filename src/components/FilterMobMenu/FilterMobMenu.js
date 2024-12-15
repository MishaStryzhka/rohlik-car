import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  IconButton,
  VStack,
  Checkbox,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { FaFilterCircleXmark } from 'react-icons/fa6';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const FilterMobMenu = ({
  isOpen,
  onClose,
  typeCars,
  setTypeCars,
  drivingStyle,
  setDrivingStyle,
  hasAirConditioner,
  setHasAirConditioner,
  hasFridge,
  setHasFridge,
  hasHeating,
  setHasHeating,
  hasSoundProofed,
  setHasSoundProofed,
}) => {
  const [startY, setStartY] = useState(0);
  const filterMenuRef = useRef();

  const activeFilters = [
    typeCars,
    drivingStyle,
    hasAirConditioner,
    hasFridge,
    hasHeating,
    hasSoundProofed,
  ].filter(Boolean).length;

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
    setHasHeating(null);
    setHasSoundProofed(null);
    onClose();
  };

  // Початок свайпу
  const handleTouchStart = e => {
    console.log(e.touches[0].clientY);
    setStartY(e.touches[0].clientY);
  };

  // Закінчення свайпу
  const handleTouchEnd = e => {
    const endY = e.changedTouches[0].clientY;

    // Якщо рух вгору (координата зменшується), закриваємо меню
    if (startY - endY > 50) {
      onClose();
    }
  };

  return (
    <MotionBox
      ref={filterMenuRef}
      initial={{ top: '-100%' }} // Початковий стан
      animate={isOpen ? { top: '40px' } : { top: '-100%' }}
      overflow="hidden" // Важливо для приховування контенту
      position="absolute"
      top="40px"
      left="0"
      width="100%"
      height="fit-content"
      bg="white"
      style={{
        borderRadius: '0 0 10px 10px',
        boxShadow: '0px 3px 8px #adb5bd',
      }}
      p={4}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      // transition={{ height: { duration: 0.4 }, opacity: { duration: 0.8 } }} // Тривалість анімації
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
            <MenuItem w="100%" onClick={() => setDrivingStyle('A/B')}>
              A/B
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
        {/* Перемикач для Topení: */}
        <Checkbox
          name="hasHeating"
          isChecked={hasHeating}
          onChange={() => {
            setHasHeating(prev => !prev);
          }}
        >
          Topení:
        </Checkbox>
        {/* Перемикач для вбудованої системи */}
        <Checkbox
          name="hasFridge"
          isChecked={hasFridge}
          onChange={() => setHasFridge(prev => !prev)}
        >
          Vestavba (lednička)
        </Checkbox>
        {/* Перемикач для Odhlučněné */}
        <Checkbox
          name="hasSoundProofed"
          isChecked={hasSoundProofed}
          onChange={() => setHasSoundProofed(prev => !prev)}
        >
          Odhlučněné
        </Checkbox>
      </VStack>
      {/* Tlačítko použití */}
      <Button bgColor="#6da305" color="white" mt={4} w="100%" onClick={onClose}>
        Použít filtry
      </Button>
    </MotionBox>
  );
};

export default FilterMobMenu;
