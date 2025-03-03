import { Box, Flex, IconButton, Image, Text } from '@chakra-ui/react';
import ModalWrapper from 'components/Modals/Modal';
import React, { useState } from 'react';
import { FaCheck, FaQuestion, FaTimes } from 'react-icons/fa';
import { MdOutlineModeEdit } from 'react-icons/md';
import AddPackagingForm from '../AddPackagingForm/AddPackagingForm';
import { updateReturnablePackaging } from 'app';
import { useAuth } from 'hooks';
import FullScreenGalery from 'components/FullScreenGalery/FullScreenGalery';

const OnePackaging = ({ isGridView, packaging }) => {
  const [isOpenModalUpdatePackaging, setIsOpenModalUpdatePackaging] =
    useState(false);
  const [isLoadingUpdatePackaging, setIsLoadingUpdatePackaging] =
    useState(false);
  const { user } = useAuth();
  const [isOpenFullScreenGalery, setIsOpenFullScreenGalery] = useState(false);
  const [currentIndexImage, setCurrentIndexImage] = useState(null);

  const handleSubmitUpdatePackaging = async newData => {
    setIsLoadingUpdatePackaging(true);
    await updateReturnablePackaging({ id: packaging.id, ...newData, user });
    setIsOpenModalUpdatePackaging(false);
    setIsLoadingUpdatePackaging(false);
  };
  return (
    <>
      {isGridView ? (
        <Flex
          position="relative"
          w={'100%'}
          flexDirection="column"
          alignItems="center"
          justify="space-between"
          gap={1}
        >
          {/* Image */}
          <Image src={packaging.img} objectFit="cover" />

          {/* Check icon  */}
          <Box position="absolute" top={4} left={1}>
            {packaging.isReturnable === 'null' ? (
              <FaQuestion size="24px" color="#c0c8b2" />
            ) : packaging.isReturnable === 'true' ? (
              <FaCheck size="24px" color="#6da305" />
            ) : (
              <FaTimes size="24px" color="red" />
            )}
          </Box>
        </Flex>
      ) : (
        <Flex
          position="relative"
          w={'100%'}
          alignItems="flex-start"
          // justify="space-between"
          gap={4}
          p={{ base: 1, md: 3 }}
          borderWidth={1}
          borderRadius="md"
          boxShadow="md"
          // bg={getColorDrivingStyle(car.drivingStyle)}
        >
          <Box position="absolute" right="5px">
            <IconButton
              height="22px"
              width="22px"
              minW="none"
              bg="#6da305"
              color="white"
              _hover={{ bg: '#5c8e04' }}
              icon={<MdOutlineModeEdit />}
              onClick={e => {
                e.preventDefault();
                setIsOpenModalUpdatePackaging(true);
              }}
              aria-label="Open Modal Update"
              position="relative"
            />
          </Box>

          <Box position="absolute" right="5px" bottom="5px">
            {packaging.isReturnable === 'null' ? (
              <FaQuestion size="24px" color="#c0c8b2" />
            ) : packaging.isReturnable === 'true' ? (
              <FaCheck size="24px" color="#6da305" />
            ) : (
              <FaTimes size="24px" color="red" />
            )}
          </Box>

          {/* Image */}
          <Flex
            justify="center"
            align="center"
            overflow="hidden"
            width={{ base: '100px', md: '130px', xl: '170px' }}
            height={{ base: '100px', md: '130px', xl: '170px' }}
          >
            <Image
              cursor="pointer"
              src={packaging.img}
              objectFit="cover"
              onClick={() => {
                setCurrentIndexImage(0);
                setIsOpenFullScreenGalery(true);
              }}
            />
          </Flex>

          <Flex direction="column">
            {/* Name */}
            <Text
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              width="calc(100% - 20px)"
              fontWeight="bold"
              fontSize="lg"
            >
              {packaging.name}
            </Text>

            {/* System name */}
            {packaging?.systemName && (
              <Text fontWeight="normal" fontSize={10}>
                V systému:
                <span style={{ fontWeight: 'bold' }}>
                  {packaging?.systemName}
                </span>
              </Text>
            )}

            {/* System name */}
            <Text fontWeight="normal" fontSize={10}>
              Komentář:
              {packaging?.comment ? (
                <span style={{ fontWeight: 'bold' }}>{packaging?.comment}</span>
              ) : (
                <span style={{ fontWeight: 'bold' }}>---</span>
              )}
            </Text>
          </Flex>
        </Flex>
      )}
      {isOpenModalUpdatePackaging && (
        <ModalWrapper
          title="Opravit obal"
          isOpen={isOpenModalUpdatePackaging}
          onClose={() => setIsOpenModalUpdatePackaging(false)}
        >
          <AddPackagingForm
            value={{ ...packaging }}
            isLoading={isLoadingUpdatePackaging}
            onSubmit={handleSubmitUpdatePackaging}
          />
        </ModalWrapper>
      )}
      {isOpenFullScreenGalery && (
        <FullScreenGalery
          currentIndex={currentIndexImage}
          images={[packaging.img]}
          closeGalery={() => setIsOpenFullScreenGalery(false)}
        />
      )}
    </>
  );
};

export default OnePackaging;
