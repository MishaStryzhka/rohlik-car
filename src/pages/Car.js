import { AddIcon, ArrowBackIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Container,
  Divider,
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
  const [isOpenModalAddComment, setIsOpenModalAddComment] = useState(false);
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
    updateCarById({ carId, ...newDataCar });
    setIsOpenModalEdit(false);
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
        borderRadius={6}
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
        <Box mt={2}>
          <Text>Typ: {car.type}</Text>
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
          <Text>Styl jízdy: {car.drivingStyle}</Text>
          <Divider my={4} />
          {
            <Box>
              <Flex justify="space-between" alignItems="center">
                <Text>Komentáře k autu: </Text>
                <IconButton
                  size="sm"
                  bg="#6da305"
                  color="white"
                  _hover={{ bg: '#5c8e04' }}
                  icon={<AddIcon />}
                  onClick={() => setIsOpenModalAddComment(true)}
                  aria-label="Open Modal Add Coment"
                  position="relative"
                />
              </Flex>
              <Box>
                {!car?.comments ? (
                  <Text>Neznalezen žádný komentář</Text>
                ) : (
                  car.comments.map((comment, index) => (
                    <Text key={index}>{comment}</Text>
                  ))
                )}
              </Box>
            </Box>
          }
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
      {isOpenModalAddComment && (
        <ModalWrapper
          title="Přidat komentář"
          isOpen={isOpenModalAddComment}
          onClose={() => setIsOpenModalAddComment(false)}
        >
          {/* <AddCarForm value={car} onSubmit={handleEditCar} /> */}
          <Text>AddCarCommentForm</Text>
        </ModalWrapper>
      )}
    </>
  );
};

export default CarPage;
