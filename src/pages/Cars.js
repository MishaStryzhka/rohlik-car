import { AddIcon, ChevronDownIcon } from '@chakra-ui/icons';
import {
  Button,
  Container,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Switch,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { IoSearch } from 'react-icons/io5';
import { FaSnowflake, FaBox } from 'react-icons/fa';
import ModalWrapper from 'components/Modal/Modal';
import AddCarForm from 'components/AddCarForm/AddCarForm';
import { addsNewCar } from 'app';
import CarsBox from 'components/CarsBox/CarsBox';

const Cars = () => {
  const [isOpenModalAddCar, setIsOpenModalAddCar] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [hasAirConditioner, setHasAirConditioner] = useState(false);
  const [hasShelves, setHasShelves] = useState(false);

  const handleSelect = value => {
    setFilter(value);
    console.log('Selected Filter:', value); // Лог для перевірки вибраного значення
  };

  const handleSubmitAddCar = async formData => {
    await addsNewCar(formData);
    setIsOpenModalAddCar(false);
  };

  return (
    <>
      <Helmet>
        <title>Cars</title>
      </Helmet>

      <Container maxW={'max-content'}>
        <Flex gap={4}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<IoSearch color="gray.300" />}
            />
            <Input
              w={400}
              value={search}
              onChange={e => {
                setSearch(
                  e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '')
                ); // Оновлюємо стан `search`
                console.log('Search Value:', e.target.value); // Лог значення
              }}
              placeholder="Search"
            />
          </InputGroup>
          <Flex gap={4} align="center">
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />} w="80px">
                {filter || 'Type'}
              </MenuButton>
              <MenuList minW="80px">
                <MenuItem onClick={() => handleSelect('CDV')}>CDV</MenuItem>
                <MenuItem onClick={() => handleSelect('CD')}>CD</MenuItem>
                <MenuItem onClick={() => handleSelect('D')}>D</MenuItem>
                <MenuItem onClick={() => handleSelect('OV')}>OV</MenuItem>
                <MenuItem onClick={() => handleSelect('EXP')}>EXP</MenuItem>
              </MenuList>
            </Menu>
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

            <Flex align="center">
              <Icon as={FaBox} boxSize={5} mr={2} />
              <Switch
                colorScheme="green"
                isChecked={hasShelves}
                onChange={() => setHasShelves(!hasShelves)}
              />
            </Flex>

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
        <CarsBox />
      </Container>

      {isOpenModalAddCar && (
        <ModalWrapper
          isOpen={isOpenModalAddCar}
          onClose={() => setIsOpenModalAddCar(false)}
        >
          <AddCarForm onSubmit={handleSubmitAddCar} />
        </ModalWrapper>
      )}
    </>
  );
};

export default Cars;
