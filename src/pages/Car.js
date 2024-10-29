import { ArrowBackIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Container,
  Flex,
  Icon,
  IconButton,
  Switch,
  Text,
} from '@chakra-ui/react';
import { getCarById } from 'app';
import { updateCarById } from 'app/updateCarById/updateCarById';
import AddCarForm from 'components/AddCarForm/AddCarForm';
import Loader from 'components/Loader/Loader';
import ModalWrapper from 'components/Modal/Modal';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaBox, FaSnowflake } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

const CarPage = () => {
  const [car, setCar] = useState(null);
  console.log('car', car);
  const { carId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarData = async () => {
      const carData = await getCarById(carId);
      setCar(carData);
      setIsLoading(false);
    };
    fetchCarData();
  }, [carId]);

  const handleEditCar = newDataCar => {
    console.log('newDataCar', newDataCar);
    updateCarById({ carId, ...newDataCar });
  };

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Helmet>
        <title>{car.name}</title>
      </Helmet>

      <Container
        w={'100%'}
        maxW={{ base: '100%', md: '95vw', xl: '80vw' }}
        p={2}
        pt={0}
      >
        <Flex alignItems="center" justify="space-between">
          <IconButton
            icon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            aria-label="Назад"
          />
          <Text>{car.name}</Text>
          <IconButton
            icon={<EditIcon />}
            onClick={() => setIsOpenModalEdit(true)}
            aria-label="Назад"
          />
        </Flex>
        <Box>
          <Text>Type: {car.type}</Text>
          <Text>
            Klimatizace:
            <Flex align="center">
              <Icon
                as={FaSnowflake}
                boxSize={5}
                mr={2}
                color={car.hasAirConditioner ? 'green.500' : 'gray.500'}
              />
              <Switch
                colorScheme="green"
                isChecked={car.hasAirConditioner}
                onChange={() => {}}
              />
            </Flex>
          </Text>
          <Text>
            Vestavba (ledničce):{' '}
            <Flex align="center">
              <Icon
                as={FaBox}
                boxSize={5}
                mr={2}
                color={car.hasFridge ? 'green.500' : 'gray.500'}
              />
              <Switch
                colorScheme="green"
                isChecked={car.hasFridge}
                onChange={() => {}}
              />
            </Flex>
          </Text>
          <Text>drivingStyle: {car.drivingStyle}</Text>
          <Text>comment: {car.comment}</Text>
        </Box>
      </Container>

      {isOpenModalEdit && (
        <ModalWrapper
          isOpen={isOpenModalEdit}
          onClose={() => setIsOpenModalEdit(false)}
        >
          <AddCarForm value={car} onSubmit={handleEditCar} />
        </ModalWrapper>
      )}
    </>
  );
};

export default CarPage;
