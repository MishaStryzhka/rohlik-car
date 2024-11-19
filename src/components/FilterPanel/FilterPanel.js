import React from 'react';
import {
  Flex,
  InputGroup,
  InputLeftElement,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Icon,
  Switch,
  Box,
  IconButton,
} from '@chakra-ui/react';
import { IoSearch } from 'react-icons/io5';
import { ChevronDownIcon, AddIcon } from '@chakra-ui/icons';
import { FaSnowflake, FaBox } from 'react-icons/fa';
import FilterMobMenu from 'components/FilterMobMenu/FilterMobMenu';
// import ListViewSwitcher from 'components/ListViewSwitcher/ListViewSwitcher';

const FilterPanel = ({
  search,
  setSearch,
  typeCars,
  setTypeCars,
  drivingStyle,
  setDrivingStyle,
  hasAirConditioner,
  setHasAirConditioner,
  hasFridge,
  setHasFridge,
  setIsOpenModalAddCar,
}) => {
  const handleSelect = type => {
    setTypeCars(type);
  };

  return (
    <Flex gap={2}>
      {/* Поле пошуку */}
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <IoSearch color="gray.300" />
        </InputLeftElement>
        <Input
          w={{ base: '100%', md: '300px', xl: '500px' }}
          value={search}
          onChange={e => {
            setSearch(e.target.value.toUpperCase());
          }}
          placeholder="Search"
        />
      </InputGroup>

      {/* <ListViewSwitcher /> */}

      <Box display={{ base: 'flex', md: 'none' }} gap={2}>
        <FilterMobMenu
          typeCars={typeCars}
          setTypeCars={setTypeCars}
          drivingStyle={drivingStyle}
          setDrivingStyle={setDrivingStyle}
          hasAirConditioner={hasAirConditioner}
          setHasAirConditioner={setHasAirConditioner}
          hasFridge={hasFridge}
          setHasFridge={setHasFridge}
        />
        <IconButton
          bg="#6da305"
          color="white"
          _hover={{ bg: '#5c8e04' }}
          icon={<AddIcon />}
          onClick={() => setIsOpenModalAddCar(true)}
          aria-label="Open Modal Add Cars"
          position="relative"
        />
      </Box>
      <Box display={{ base: 'none', md: 'block' }}>
        <Flex gap={4} align="center">
          {/* Вибір типу авто */}
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} w="80px">
              {typeCars || 'Type'}
            </MenuButton>
            <MenuList minW="80px">
              <MenuItem onClick={() => handleSelect('')}>Type</MenuItem>
              <MenuItem onClick={() => handleSelect('CDV')}>CDV</MenuItem>
              <MenuItem onClick={() => handleSelect('CD')}>CD</MenuItem>
              <MenuItem onClick={() => handleSelect('D')}>D</MenuItem>
              <MenuItem onClick={() => handleSelect('OV')}>OV</MenuItem>
              <MenuItem onClick={() => handleSelect('EXP')}>EXP</MenuItem>
            </MenuList>
          </Menu>

          {/* Перемикач для кондиціонера */}
          <Flex align="center">
            <Icon
              as={FaSnowflake}
              boxSize={5}
              mr={2}
              color={hasAirConditioner ? 'green.500' : 'gray.500'}
            />
            <Switch
              colorScheme="green"
              isChecked={hasAirConditioner}
              onChange={() => setHasAirConditioner(!hasAirConditioner)}
            />
          </Flex>

          {/* Перемикач для холодильника */}
          <Flex align="center">
            <Icon
              as={FaBox}
              boxSize={5}
              mr={2}
              color={hasFridge ? 'green.500' : 'gray.500'}
            />
            <Switch
              colorScheme="green"
              isChecked={hasFridge}
              onChange={() => setHasFridge(!hasFridge)}
            />
          </Flex>

          {/* Кнопка додавання авто */}
          <Button
            leftIcon={<AddIcon />}
            bg="#6da305"
            color="white"
            _hover={{ bg: '#5c8e04' }}
            onClick={() => setIsOpenModalAddCar(true)}
          >
            přidat auto
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default FilterPanel;
