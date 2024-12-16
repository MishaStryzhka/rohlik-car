import { ArrowBackIcon, EditIcon } from '@chakra-ui/icons';
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
import { updateCarById } from 'app/cars/updateCarById/updateCarById';
import AddCarForm from 'components/AddCarForm/AddCarForm';
import CarComments from 'components/CarComments/CarComments';
// import Loader from 'components/Loader/Loader';
import ModalWrapper from 'components/Modals/Modal';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaBox, FaSnowflake } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { MdVolumeOff } from 'react-icons/md';
import { GiHotSurface } from 'react-icons/gi';
import { motion } from 'framer-motion';

const MotionContainer = motion(Container);

const CarPage = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [startX, setStartX] = useState(0);

  const onClose = () => {
    setIsOpen(false);
    setTimeout(() => navigate(-1), 500);
  };

  // Початок свайпу
  const handleTouchStart = e => {
    console.log(e.touches[0].clientX);
    setStartX(e.touches[0].clientX);
  };

  // Закінчення свайпу
  const handleTouchEnd = e => {
    const endX = e.changedTouches[0].clientX;

    // Якщо рух вгору (координата зменшується), закриваємо меню
    if (startX - endX > 50) {
      onClose();
    }
  };

  useEffect(() => {
    const disableScroll = event => {
      event.preventDefault();
    };

    // Увімкнути блокування прокрутки
    function lockScroll() {
      window.addEventListener('wheel', disableScroll, { passive: false });
      window.addEventListener('touchmove', disableScroll, { passive: false });
    }

    // Вимкнути блокування прокрутки
    function unlockScroll() {
      window.removeEventListener('wheel', disableScroll);
      window.removeEventListener('touchmove', disableScroll);
    }

    lockScroll();

    return () => {
      unlockScroll();
    };
  }, []);

  const [car, setCar] = useState(null);
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
    updateCarById({ carId, ...newDataCar });
    setIsOpenModalEdit(false);
  };

  return isLoading ? (
    <></>
  ) : !car ? (
    <Text>Not found</Text>
  ) : (
    <>
      <Helmet>
        <title>{car.name}</title>
      </Helmet>

      <Box position="sticky" top={0} zIndex="2">
        <MotionContainer
          maxW={'none'}
          h={'100vh'}
          position="absolute"
          top={0}
          style={{
            height: '100vh',
            padding: 0,
            zIndex: 9999,
          }}
          bg="#fff"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          initial={{ left: '-100%' }} // Початковий стан
          animate={isOpen ? { left: 0 } : { left: '-100%' }}
          transition={{ left: { duration: 0.5 } }} // Тривалість анімації
        >
          <Flex alignItems="center" justify="space-between">
            <IconButton
              icon={<ArrowBackIcon />}
              onClick={onClose}
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
            <Flex flexDirection="column">
              <Text>Klimatizace:</Text>
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
            </Flex>
            <Flex flexDirection="column">
              <Text>Topení:</Text>
              <Flex align="center">
                <Icon
                  as={GiHotSurface}
                  boxSize={5}
                  mr={2}
                  color={car?.hasHeating ? 'green.500' : 'gray.200'}
                />
                {'hasHeating' in car ? (
                  <Switch
                    colorScheme="green"
                    isChecked={car?.hasHeating}
                    onChange={() => {}}
                  />
                ) : (
                  <Text fontWeight="bold" color="gray.200">
                    nenalezeno
                  </Text>
                )}
              </Flex>
            </Flex>
            <Flex flexDirection="column">
              <Text>Vestavba (ledničce):</Text>
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
            </Flex>
            <Flex flexDirection="column">
              <Text>Odhlučněné:</Text>
              <Flex align="center">
                <Icon
                  as={MdVolumeOff}
                  boxSize={5}
                  mr={2}
                  color={car?.hasSoundProofed ? 'green.500' : 'gray.200'}
                />
                {'hasSoundProofed' in car ? (
                  <Switch
                    colorScheme="green"
                    isChecked={car?.hasSoundProofed}
                    onChange={() => {}}
                  />
                ) : (
                  <Text fontWeight="bold" color="gray.200">
                    nenalezeno
                  </Text>
                )}
              </Flex>
            </Flex>
            <Text>Styl jízdy: {car.drivingStyle}</Text>
            <Divider my={4} />
            <CarComments carId={carId} />
          </Box>
        </MotionContainer>
      </Box>

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
