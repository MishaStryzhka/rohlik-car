import { Flex, Text } from '@chakra-ui/react';
import { addComment } from 'app';
import { db } from '../../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';
import { useAuth } from 'hooks';
import React, { useEffect, useState } from 'react';
import Loader from 'components/Loader/Loader';
import OneComment from './OneComment';
import TextArea from './TextArea';

const CarComments = ({ carId }) => {
  const { user } = useAuth();
  // eslint-disable-next-line no-unused-vars
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
    addComment({ collectionName: 'cars', elemId: carId, commentText, user });
    setIsOpenModalAddComment(false);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Flex
        direction="column-reverse"
        borderWidth="1px"
        borderRadius="md"
        mt={4}
        mb={4}
        boxShadow="md"
        h={'calc(100% - 65px)'}
      >
        <TextArea hendleAddComment={hendleAddComment} />
        <Flex direction={'column'} gap={2} overflow={'auto'} p={2}>
          {!comments ? (
            <Text textAlign="center">Neznalezen žádný komentář</Text>
          ) : (
            comments
              .sort((a, b) => (a.date || a.CreatedAt) - (b.date || b.CreatedAt))
              .map(comment => {
                return (
                  <OneComment
                    key={comment.id}
                    elemId={carId}
                    commentId={comment.id}
                    userId={comment.userId}
                    name={comment.name}
                    date={comment.date || comment.CreatedAt}
                    text={comment.text}
                  />
                );
              })
          )}
        </Flex>
        {/* <Flex justify="space-between" alignItems="center">
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
        </Flex> */}
      </Flex>
      {/* {isOpenModalAddComment && (
        <ModalWrapper
          title="Přidat komentář"
          isOpen={isOpenModalAddComment}
          onClose={() => setIsOpenModalAddComment(false)}
        >
          <AddCommentForm onSubmit={hendleAddComment} />
        </ModalWrapper>
      )} */}
    </>
  );
};

export default CarComments;
