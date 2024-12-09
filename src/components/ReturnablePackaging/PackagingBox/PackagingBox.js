import { Grid } from '@chakra-ui/react';
import { db } from '../../../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import OnePackaging from '../OnePackaging/OnePackaging';

const PackagingBox = ({ filters, isGridView }) => {
  const { search } = filters;
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

  const filteredPackagings = packagings.filter(onePackaging =>
    onePackaging.name.toLowerCase().includes(search.toLowerCase())
  );

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
          {filteredPackagings
            // .sort((a, b) => getSortCars(a, b))
            .map(packaging => (
              <Link key={packaging.id} to={`/packaging/${packaging.id}`}>
                <OnePackaging isGridView={isGridView} packaging={packaging} />
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
          {filteredPackagings
            // .sort((a, b) => getSortCars(a, b))
            .map(packaging => (
              <OnePackaging isGridView={isGridView} packaging={packaging} />
            ))}
        </Grid>
      )}
    </>
  );
};

export default PackagingBox;
