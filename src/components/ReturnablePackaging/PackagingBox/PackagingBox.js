import { Flex, Grid, Image, Text } from '@chakra-ui/react';
import { db } from '../../../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import OnePackaging from '../OnePackaging/OnePackaging';

const PackagingBox = ({ filters, isGridView }) => {
  const [packagings, setPackagings] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(null);
  console.log('packagings', packagings);

  useEffect(() => {
    const packagingCollection = collection(db, 'returnable-packaging');

    const unsubscribe = onSnapshot(packagingCollection, snapshot => {
      const packagingData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPackagings(packagingData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      {isGridView ? (
        <Grid
          pt={4}
          w={'100%'}
          templateColumns={{
            base: 'repeat(3, 1fr)',
            md: 'repeat(5, 1fr)',
            xl: 'repeat(8, 1fr)',
          }}
          gap={{ base: 1, md: 6, xl: 2 }}
        >
          {packagings
            // .sort((a, b) => getSortCars(a, b))
            .map(packaging => (
              <Link key={packaging.id} to={`/packaging/${packaging.id}`}>
                <Flex
                  w={'100%'}
                  flexDirection="column"
                  alignItems="center"
                  justify="space-between"
                  gap={1}
                  p={{ base: 1, md: 3 }}
                  borderWidth={1}
                  borderRadius="md"
                  boxShadow="md"
                  // bg={getColorDrivingStyle(car.drivingStyle)}
                >
                  {/* Image */}
                  <Image
                    src={packaging.img}
                    width={{ base: '120px', md: '150px', xl: '200px' }}
                    height={{ base: '120px', md: '150px', xl: '200px' }}
                    objectFit="cover"
                  />

                  {/* Name */}
                  <Text fontWeight="bold" fontSize={14}>
                    {packaging.name}
                  </Text>

                  {/* System name */}
                  <Text fontWeight="bold" fontSize={14}>
                    V systému: {packaging?.systemName}
                  </Text>
                </Flex>
              </Link>
            ))}
        </Grid>
      ) : (
        <Grid
          pt={4}
          w={'100%'}
          templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
          gap={{ base: 3, md: 6 }}
        >
          {packagings
            // .sort((a, b) => getSortCars(a, b))
            .map(packaging => (
              <Link key={packaging.id} to={`/packagings/${packaging.id}`}>
                <OnePackaging isGridView={isGridView} packaging={packaging} />
              </Link>
            ))}
        </Grid>
      )}
    </>
  );
};

export default PackagingBox;
