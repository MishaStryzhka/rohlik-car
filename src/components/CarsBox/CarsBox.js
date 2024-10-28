import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';
import { Box, Text, Grid, Switch, Flex } from '@chakra-ui/react';
import { FaCar, FaSnowflake, FaBox } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CarsBox = () => {
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
      setCars(carsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Іконка для стилю їзди залежно від значення drivingStyle
  const getDrivingStyle = style => {
    switch (style) {
      case 'A':
        return '#59c959';
      case 'B':
        return '#ecd950';
      case 'C':
        return '#ff5151';
      case '0':
      default:
        return '#e0e0e0';
    }
  };

  return (
    <Box p={4}>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {cars.map(car => (
          <Link to={`/cars/${car.id}`}>
            <Flex
              alignItems="center"
              gap={4}
              key={car.id}
              p={3}
              borderWidth={1}
              borderRadius="md"
              boxShadow="md"
              bg={getDrivingStyle(car.drivingStyle)}
            >
              {/* Name */}
              <Text fontWeight="bold" fontSize="lg">
                {car.name}
              </Text>

              {/* Перемикачі */}
              <Box display="flex" alignItems="center" mt={2}>
                <FaSnowflake color={car.hasAirConditioner ? 'green' : 'gray'} />
                <Switch
                  ml={2}
                  colorScheme="green"
                  isChecked={car.hasAirConditioner}
                  isReadOnly // Робимо перемикачі тільки для перегляду
                />
              </Box>

              <Box display="flex" alignItems="center" mt={2}>
                <FaBox color={car.hasFridge ? 'green' : 'gray'} />
                <Switch
                  ml={2}
                  colorScheme="green"
                  isChecked={car.hasFridge}
                  isReadOnly
                />
              </Box>

              {/* Іконка для стилю їзди */}
              <Box display="flex" alignItems="center" mt={2}>
                <FaCar size="30px" color="green" />
                <Text ml={2} fontSize={26}>
                  {car.drivingStyle}
                </Text>
              </Box>
            </Flex>
          </Link>
        ))}
      </Grid>
    </Box>
  );
};

export default CarsBox;
