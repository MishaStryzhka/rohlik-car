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
} from '@chakra-ui/react';
import { IoSearch } from 'react-icons/io5';
import { ChevronDownIcon, AddIcon } from '@chakra-ui/icons';
import { FaSnowflake, FaBox } from 'react-icons/fa';

const FilterPanel = ({
  search,
  setSearch,
  filter,
  setFilter,
  hasAirConditioner,
  setHasAirConditioner,
  hasFridge,
  setHasFridge,
  setIsOpenModalAddCar,
}) => {
  // Функція для обробки вибору типу авто
  const handleSelect = type => {
    setFilter(type);
  };

  return (
    <Flex gap={4}>
      {/* Поле пошуку */}
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <IoSearch color="gray.300" />
        </InputLeftElement>
        <Input
          w={400}
          value={search}
          onChange={e => {
            setSearch(e.target.value.toUpperCase());
          }}
          placeholder="Search"
        />
      </InputGroup>

      <Flex gap={4} align="center">
        {/* Вибір типу авто */}
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} w="80px">
            {filter || 'Type'}
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
          <Icon as={FaBox} boxSize={5} mr={2} />
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
    </Flex>
  );
};

export default FilterPanel;
