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
import { FaSnowflake, FaBox, FaFilter, FaChevronUp } from 'react-icons/fa';
import ListViewSwitcher from 'components/ListViewSwitcher/ListViewSwitcher';
import { GiHotSurface } from 'react-icons/gi';
import { MdVolumeOff } from 'react-icons/md';
import { IoScan } from 'react-icons/io5';
import { TYPES_CAR } from 'data';

const FilterPanel = ({
  isOpenFilterMobMenu,
  setIsOpenFilterMobMenu,
  search,
  setSearch,
  typeCars,
  setTypeCars,
  hasAirConditioner,
  setHasAirConditioner,
  hasFridge,
  setHasFridge,
  setIsOpenModalAddCar,
  isGridView,
  setIsGridView,
  hasHeating,
  setHasHeating,
  hasSoundProofed,
  setHasSoundProofed,
  setIsOpenModalScan,
}) => {
  const handleSelect = type => {
    setTypeCars(type);
  };

  return (
    <Flex gap={2} position="sticky" zIndex="2" paddingBottom="10px" bg="#fff">
      <IconButton
        color="#6da305"
        icon={<IoScan />}
        onClick={() => setIsOpenModalScan(true)}
        aria-label="Open Modal Add Cars"
        position="relative"
      />

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

      <ListViewSwitcher isGridView={isGridView} setIsGridView={setIsGridView} />

      <Box display={{ base: 'flex', xl: 'none' }} gap={2}>
        {/* Кнопка для відкриття фільтр-меню */}

        <IconButton
          icon={isOpenFilterMobMenu ? <FaChevronUp /> : <FaFilter />}
          onClick={() => {
            isOpenFilterMobMenu
              ? setIsOpenFilterMobMenu(false)
              : setIsOpenFilterMobMenu(true);
          }}
          aria-label="Open Filter Menu"
          position="relative"
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
      <Box display={{ base: 'none', xl: 'block' }}>
        <Flex gap={4} align="center">
          {/* Вибір типу авто */}
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} w="80px">
              {typeCars || 'Type'}
            </MenuButton>
            <MenuList minW="80px">
              <MenuItem onClick={() => handleSelect('')}>Type</MenuItem>
              {TYPES_CAR.map((typeCar, index) => (
                <MenuItem key={index} onClick={() => handleSelect(typeCar)}>
                  {typeCar}
                </MenuItem>
              ))}
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
          {/* Перемикач для Topení */}
          <Flex align="center">
            <Icon
              as={GiHotSurface}
              boxSize={5}
              mr={2}
              color={hasHeating ? 'green.500' : 'gray.500'}
            />
            <Switch
              colorScheme="green"
              isChecked={hasHeating}
              onChange={() => setHasHeating(!hasHeating)}
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

          {/* Перемикач для холодильника */}
          <Flex align="center">
            <Icon
              as={MdVolumeOff}
              boxSize={5}
              mr={2}
              color={hasSoundProofed ? 'green.500' : 'gray.500'}
            />
            <Switch
              colorScheme="green"
              isChecked={hasSoundProofed}
              onChange={() => setHasSoundProofed(!hasSoundProofed)}
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
