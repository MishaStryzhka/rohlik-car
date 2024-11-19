import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';
import { Box, Text, Grid, Flex } from '@chakra-ui/react';
import { FaCar, FaSnowflake, FaBox } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getColorDrivingStyle } from 'helpers/getColorDrivingStyle';
import { GiHotSurface } from 'react-icons/gi';
import { getSortCars } from 'helpers/getSortCars';
import { MdVolumeOff } from 'react-icons/md';

const CarsBox = ({ filters }) => {
  const { search, typeCars, drivingStyle, hasAirConditioner, hasFridge } =
    filters;
  const [cars, setCars] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carsCollection = collection(db, 'cars');

    const unsubscribe = onSnapshot(carsCollection, snapshot => {
      const carsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      const filteredCars = carsData.filter(car => {
        const matchesSearch = car.name.includes(search);
        const matchesType = typeCars ? car.type === typeCars : true;
        const matchesTypeDrivingStyle = drivingStyle
          ? car.drivingStyle === drivingStyle
          : true;
        const matchesAirConditioner = hasAirConditioner
          ? car.hasAirConditioner === true
          : true;
        const matchesFridge = hasFridge ? car.hasFridge === true : true;
        return (
          matchesSearch &&
          matchesType &&
          matchesAirConditioner &&
          matchesFridge &&
          matchesTypeDrivingStyle
        );
      });
      setCars(filteredCars);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [typeCars, drivingStyle, hasAirConditioner, hasFridge, search]);

  return (
    <Grid
      pt={4}
      w={'100%'}
      templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
      gap={{ base: 3, md: 6 }}
    >
      {cars
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(car => (
          <Link key={car.id} to={`/cars/${car.id}`}>
            <Flex
              w={'100%'}
              alignItems="center"
              justify="space-between"
              gap={4}
              p={{ base: 1, md: 3 }}
              borderWidth={1}
              borderRadius="md"
              boxShadow="md"
              bg={getColorDrivingStyle(car.drivingStyle)}
            >
              {/* Name */}
              <Text fontWeight="bold" fontSize="lg">
                {car.name}
              </Text>

              <Box display="flex" gap={3}>
                {/* Перемикачі */}
                <Box display="flex" alignItems="center">
                  <FaSnowflake
                    color={car.hasAirConditioner ? 'green' : 'red'}
                  />
                </Box>

                {'hasHeating' in car && (
                  <Box display="flex" alignItems="center">
                    <GiHotSurface color={car.hasHeating ? 'green' : 'red'} />
                  </Box>
                )}

                <Box display="flex" alignItems="center">
                  <FaBox color={car.hasFridge ? 'green' : 'red'} />
                </Box>

                {'hasSoundProofed' in car && (
                  <Box display="flex" alignItems="center">
                    <MdVolumeOff
                      color={car.hasSoundProofed ? 'green' : 'red'}
                    />
                  </Box>
                )}

                {/* Іконка для стилю їзди */}
                <Box display="flex" alignItems="center" px={1}>
                  <Text fontSize={22}>{car.drivingStyle}</Text>
                </Box>
              </Box>
            </Flex>
          </Link>
        ))}
    </Grid>
  );
};

export default CarsBox;
