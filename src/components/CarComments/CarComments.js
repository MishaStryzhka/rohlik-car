import { AddIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { addCarComment } from 'app';
import AddCarCommentForm from 'components/AddCarsCommentForm/AddCarsCommentForm';
import ModalWrapper from 'components/Modal/Modal';
import { db } from '../../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';
import { useAuth } from 'hooks';
import React, { useEffect, useState } from 'react';
import Loader from 'components/Loader/Loader';
import OneComment from './OneComment';

const CarComments = ({ carId }) => {
  const { user } = useAuth();
  const [isOpenModalAddComment, setIsOpenModalAddComment] = useState(false);

  const [comments, setComments] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const carsCollection = collection(db, 'cars', carId, 'comments');
    const unsubscribe = onSnapshot(carsCollection, snapshot => {
      const carCommentsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(carCommentsData);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [carId]);

  const hendleAddComment = commentText => {
    addCarComment({ carId, commentText, user });
    setIsOpenModalAddComment(false);
    alert('Komentář byl přidán!');
  };

  return isLoading ? (
    <Loader />
  ) : (
    <>
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
          {!comments ? (
            <Text textAlign="center">Neznalezen žádný komentář</Text>
          ) : (
            comments.map(comment => (
              <OneComment key={comment.id} carId={carId} {...comment} />
            ))
          )}
        </Box>
      </Box>
      {isOpenModalAddComment && (
        <ModalWrapper
          title="Přidat komentář"
          isOpen={isOpenModalAddComment}
          onClose={() => setIsOpenModalAddComment(false)}
        >
          <AddCarCommentForm onSubmit={hendleAddComment} />
        </ModalWrapper>
      )}
    </>
  );
};

export default CarComments;
