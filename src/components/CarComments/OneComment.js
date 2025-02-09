import {
  Box,
  Button,
  Flex,
  IconButton,
  ModalBody,
  ModalFooter,
  Text,
} from '@chakra-ui/react';
import { removeComment, updateComment } from 'app';
import AddCommentForm from 'components/AddCommentForm/AddCommentForm';
import ModalWrapper from 'components/Modals/Modal';
import { getFormatDate } from 'helpers/getFormatDate';
import { useAuth } from 'hooks';
import React, { useState } from 'react';
import { IoIosPerson } from 'react-icons/io';
import { MdDelete, MdOutlineModeEdit } from 'react-icons/md';

const OneComment = ({
  collectionName,
  elemId,
  commentId,
  userId,
  name,
  date,
  CreatedAt,
  text,
}) => {
  const { user } = useAuth();
  const [isOpenModalUpdateComment, setIsOpenModalUpdateComment] =
    useState(false);
  const [isOpenModalConfirmRemove, setIsOpenModalConfirmRemove] =
    useState(false);

  const hendleUpdateComment = ({ elemId, commentId, comment }) => {
    updateComment({ collectionName, elemId, commentId, comment });
    setIsOpenModalUpdateComment(false);
  };

  const hendleRemoveComent = ({ elemId, commentId }) => {
    removeComment({ collectionName, elemId, commentId });
    setIsOpenModalConfirmRemove(false);
    setIsOpenModalUpdateComment(false);
  };
  return (
    <Box
      ml={user.userId === userId ? 'auto' : ''}
      width={'85%'}
      key={commentId}
      border="1px solid #e2e8f0"
      borderRadius="md"
      p={2}
    >
      <Flex justify="space-between" align="center">
        <Flex gap={1}>
          <IoIosPerson size="24" color="#6da305" />
          <Text color="#6da305" fontWeight="bold">
            {name}
          </Text>
        </Flex>
        <Flex gap={2}>
          <Text fontSize="sm" color="gray.500">
            {getFormatDate(date)}
          </Text>
          {user.userId === userId && (
            <IconButton
              height="22px"
              width="22px"
              minW="none"
              bg="#6da305"
              color="white"
              _hover={{ bg: '#5c8e04' }}
              icon={<MdOutlineModeEdit />}
              onClick={() => setIsOpenModalUpdateComment(true)}
              aria-label="Open Modal Update Coment"
              position="relative"
            />
          )}
        </Flex>
      </Flex>
      <Text ml={2} mt={2}>
        {text}
      </Text>

      {isOpenModalUpdateComment && (
        <ModalWrapper
          title="Upravit komentář"
          isOpen={isOpenModalUpdateComment}
          onClose={() => setIsOpenModalUpdateComment(false)}
        >
          <AddCommentForm
            value={{ comment: text }}
            onSubmit={text =>
              hendleUpdateComment({
                elemId,
                commentId,
                comment: { userId, name, CreatedAt: date || CreatedAt, text },
              })
            }
          />
          <Flex justify="end" mt={2}>
            <Button
              w="100%"
              bg="#d3d3d3"
              color="white"
              _hover={{ bg: '#8d8d8d' }}
              onClick={() => setIsOpenModalConfirmRemove(true)}
              aria-label="Open Modal Update Coment"
              position="relative"
              gap={1}
            >
              <MdDelete />
              Vymazat
            </Button>
          </Flex>
        </ModalWrapper>
      )}

      {isOpenModalUpdateComment && (
        <ModalWrapper
          title="Vymazat komentář?"
          isOpen={isOpenModalConfirmRemove}
          onClose={() => setIsOpenModalConfirmRemove(false)}
        >
          <ModalBody>{text}</ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => hendleRemoveComent({ elemId, commentId })}
            >
              Potvrdit
            </Button>
            <Button
              variant="ghost"
              bg="#d3d3d3"
              color="white"
              _hover={{ bg: '#8d8d8d' }}
              onClick={() => setIsOpenModalConfirmRemove(false)}
            >
              Zrušit
            </Button>
          </ModalFooter>
        </ModalWrapper>
      )}
    </Box>
  );
};

export default OneComment;
