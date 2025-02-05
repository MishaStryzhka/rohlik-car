import { ArrowBackIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Container, Flex, Icon, IconButton, Text } from '@chakra-ui/react';
import { getCarById } from 'app';
import { updateCarById } from 'app/cars/updateCarById/updateCarById';
import AddCarForm from 'components/AddCarForm/AddCarForm';
import CarComments from 'components/CarComments/CarComments';
// import Loader from 'components/Loader/Loader';
import ModalWrapper from 'components/Modals/Modal';
import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaBox, FaSnowflake } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { MdVolumeOff } from 'react-icons/md';
import { GiCheckMark, GiHotSurface } from 'react-icons/gi';
import { motion } from 'framer-motion';
import { BsInfoCircle } from 'react-icons/bs';
import { RxQuestionMark } from 'react-icons/rx';
import MenuCarInfo from 'components/MenuCarInfo/MenuCarInfo';
import { IoClose } from 'react-icons/io5';
import colors from 'styles/colors';
import { getColorDrivingStyle } from 'helpers/getColorDrivingStyle';

const MotionContainer = motion.create(Container);

const CarPage = () => {
  const [isOpenMenuCarInfo, setIsOpenMenuCarInfo] = useState(false);
  const userMenuCarInfoRef = useRef();
  const userMenuCarInfoButtonRef = useRef();

  const toggleMenuCarInfo = () => {
    isOpenMenuCarInfo
      ? setIsOpenMenuCarInfo(false)
      : setIsOpenMenuCarInfo(true);
  };

  // closing "MenuCarInfo", by pressing from the outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (
        userMenuCarInfoRef.current &&
        !userMenuCarInfoRef.current.contains(event.target) &&
        !userMenuCarInfoButtonRef.current.contains(event.target)
      ) {
        setIsOpenMenuCarInfo(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const [isOpen, setIsOpen] = useState(true);
  const [startX, setStartX] = useState(0);

  const onClose = () => {
    setIsOpen(false);
    setTimeout(() => navigate('/cars'), 500);
  };

  // Початок свайпу
  const handleTouchStart = e => {
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
      // event.preventDefault();
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
    setIsOpen(true);
  }, [car]);

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

  const getResultIcon = (car, value) => {
    // color={car.hasFridge ? colors.primary : 'gray.500'}
    return value in car ? (
      car?.[value] ? (
        <GiCheckMark color={colors.primary} />
      ) : (
        <IoClose color={colors.danger} size={'25px'} />
      )
    ) : (
      <RxQuestionMark color={colors.textSecondary} />
    );
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

      <Box position="sticky" top={0} zIndex="3">
        <MotionContainer
          maxW={'none'}
          h={'calc(100vh - 65px)'}
          position="absolute"
          top={0}
          style={{
            padding: 0,
            zIndex: 9999,
          }}
          bg="#fff"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          initial={{ left: '-100%', opacity: 0 }}
          animate={
            isOpen ? { left: 0, opacity: 1 } : { left: '-100%', opacity: 0 }
          }
          transition={{
            left: { duration: 0.5 },
            opacity: { duration: 0.5 },
          }}
        >
          <Flex alignItems="center" justify="space-between">
            <IconButton
              size={'sm'}
              icon={<ArrowBackIcon />}
              onClick={onClose}
              aria-label="Zpět"
            />
            <Text>{car.name}</Text>
            <Flex gap={2}>
              <IconButton
                ref={userMenuCarInfoButtonRef}
                size={'sm'}
                icon={<BsInfoCircle />}
                onClick={() => toggleMenuCarInfo()}
                aria-label="Informace"
              />
              <IconButton
                size={'sm'}
                icon={<EditIcon />}
                onClick={() => setIsOpenModalEdit(true)}
                aria-label="Upravit auto"
              />
              {isOpenMenuCarInfo && (
                <MenuCarInfo
                  ref={userMenuCarInfoRef}
                  onClose={() => setIsOpenMenuCarInfo(false)}
                />
              )}
            </Flex>
          </Flex>
          <Flex direction="column" mt={2} h={'calc(100% - 40px)'}>
            <Flex justify={'space-around'} align={'center'}>
              <Flex flexDirection="column">
                <Flex align="center">
                  <Icon
                    as={FaSnowflake}
                    boxSize={6}
                    mr={1}
                    color={
                      'hasAirConditioner' in car
                        ? car.hasAirConditioner
                          ? 'green'
                          : colors.danger
                        : colors.textSecondary
                    }
                  />
                  {getResultIcon(car, 'hasAirConditioner')}
                </Flex>
              </Flex>
              <Flex flexDirection="column">
                <Flex align="center">
                  <Icon
                    as={GiHotSurface}
                    boxSize={6}
                    mr={1}
                    color={
                      'hasHeating' in car
                        ? car.hasHeating
                          ? 'green'
                          : colors.danger
                        : colors.textSecondary
                    }
                  />
                  {getResultIcon(car, 'hasHeating')}
                </Flex>
              </Flex>
              <Flex flexDirection="column">
                <Flex align="center">
                  <Icon
                    as={FaBox}
                    boxSize={6}
                    mr={1}
                    color={
                      'hasFridge' in car
                        ? car.hasFridge
                          ? 'green'
                          : colors.danger
                        : colors.textSecondary
                    }
                  />
                  {getResultIcon(car, 'hasFridge')}
                </Flex>
              </Flex>
              <Flex flexDirection="column">
                <Flex align="center">
                  <Icon
                    as={MdVolumeOff}
                    boxSize={6}
                    mr={1}
                    color={
                      'hasSoundProofed' in car
                        ? car.hasSoundProofed
                          ? 'green'
                          : colors.danger
                        : colors.textSecondary
                    }
                  />
                  {getResultIcon(car, 'hasSoundProofed')}
                </Flex>
              </Flex>
              <Flex
                align="center"
                justify="center"
                borderRadius={'md'}
                w="30px"
                h="30px"
                textAlign="center"
                bg={getColorDrivingStyle(car.drivingStyle)}
              >
                <Text>{car.drivingStyle}</Text>
              </Flex>
            </Flex>
            {/* <Divider my={4} /> */}
            <CarComments carId={carId} />
          </Flex>
        </MotionContainer>
      </Box>

      {isOpenModalEdit && (
        <ModalWrapper
          title="Upravit auto"
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
