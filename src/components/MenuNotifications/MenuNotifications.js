import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import { db } from '../../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';
import React, { forwardRef, useEffect, useState } from 'react';
import { useAuth } from 'hooks';
import { Link } from 'react-router-dom';
import { getFormatDate } from 'helpers/getFormatDate';
import { setReadsStatusById } from 'app';

const MenuNotifications = forwardRef(({ children, onClose, ...props }, ref) => {
  const [notifications, setNotifications] = useState([]);
  console.log('notifications', notifications);
  const { user } = useAuth();

  useEffect(() => {
    const notificationsCollection = collection(db, 'notifications');

    const unsubscribe = onSnapshot(notificationsCollection, snapshot => {
      const notificationsData = [];
      snapshot.docs.forEach(doc => {
        if (user.uid === doc.data().userId) {
          notificationsData.push({ id: doc.id, ...doc.data() });
        }
      });

      // const filteredCars = carsData.filter(car => {
      //   const matchesSearch = car.name.includes(search);
      //   const matchesType = typeCars ? car.type === typeCars : true;
      //   const matchesTypeDrivingStyle = drivingStyle
      //     ? car.drivingStyle === drivingStyle
      //     : true;
      //   const matchesAirConditioner = hasAirConditioner
      //     ? car.hasAirConditioner === true
      //     : true;
      //   const matchesFridge = hasFridge ? car.hasFridge === true : true;
      //   const matchesHeating = hasHeating ? car.hasHeating === true : true;
      //   const matchesSoundProofed = hasSoundProofed
      //     ? car.hasSoundProofed === true
      //     : true;
      //   return (
      //     matchesSearch &&
      //     matchesType &&
      //     matchesAirConditioner &&
      //     matchesFridge &&
      //     matchesTypeDrivingStyle &&
      //     matchesHeating &&
      //     matchesSoundProofed
      //   );
      // });
      setNotifications(notificationsData);
    });

    return () => unsubscribe();
  }, [user.uid]);

  return (
    <Box
      position="absolute"
      top="49px"
      right="10px"
      width="50%"
      bg="white"
      zIndex="overlay"
      boxShadow="md"
      borderRadius="10px"
      border="1px"
      borderColor="#dee2e6"
      ref={ref}
    >
      <VStack align="start" spacing={2} p={2}>
        {notifications.map((not, index) => (
          <Link
            to={`./cars/${not.carId}`}
            onClick={() => {
              onClose();
              setReadsStatusById(not.id);
            }}
            style={{
              display: 'flex',
              width: '100%',
              opacity: `${not.isRead ? 0.5 : 1}`,
            }}
            key={index}
          >
            <Flex
              justifyContent="flex-start"
              direction="column"
              width="100%"
              height="auto"
              border="1px"
              borderColor="#dee2e6"
              p="4px 6px"
              borderRadius={4}
              bg="#f8f9fa"
            >
              <Text fontSize="10px">{not.message}</Text>
              <Box textAlign="end">
                <Text fontSize="8px">{getFormatDate(not.createdAt)}</Text>
              </Box>
            </Flex>
          </Link>
        ))}
      </VStack>
    </Box>
  );
});

export default MenuNotifications;
