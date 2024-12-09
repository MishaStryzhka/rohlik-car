import { Box, Flex, IconButton, Image, Text } from '@chakra-ui/react';
import ModalWrapper from 'components/Modal/Modal';
import React, { useState } from 'react';
import { FaCheck, FaQuestion, FaTimes } from 'react-icons/fa';
import { MdOutlineModeEdit } from 'react-icons/md';
import AddPackagingForm from '../AddPackagingForm/AddPackagingForm';
import { updateReturnablePackaging } from 'app';
import { useAuth } from 'hooks';
import FullScreenGalery from 'components/FullScreenGalery/FullScreenGalery';

const OnePackaging = ({ isGridView, packaging }) => {
  console.log('packaging', packaging);
  const [isOpenModalUpdatePackaging, setIsOpenModalUpdatePackaging] =
    useState(false);
  const [isLoadingUpdatePackaging, setIsLoadingUpdatePackaging] =
    useState(false);
  const { user } = useAuth();
  const [isOpenFullScreenGalery, setIsOpenFullScreenGalery] = useState(false);
  const [currentIndexImage, setCurrentIndexImage] = useState(null);

  const handleSubmitUpdatePackaging = async newData => {
    setIsLoadingUpdatePackaging(true);
    console.log('e', newData);
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
          p={{ base: 1, md: 3 }}
          borderWidth={1}
          borderRadius="md"
          boxShadow="md"
        >
          {/* Image */}
          <Image
            src={packaging.img}
            width={{ base: '120px', md: '150px', xl: '200px' }}
            height={{ base: '120px', md: '150px', xl: '200px' }}
            objectFit="cover"
          />

          {/* Check icon  */}
          <Box position="absolute" top={1} left={1}>
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
          {/* Check icon  */}
          <Box position="absolute">
            {packaging.isReturnable === 'null' ? (
              <FaQuestion size="24px" color="#c0c8b2" />
            ) : packaging.isReturnable === 'true' ? (
              <FaCheck size="24px" color="#6da305" />
            ) : (
              <FaTimes size="24px" color="red" />
            )}
          </Box>

          {/*  */}
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
                console.log('qwe');
                setCurrentIndexImage(0);
                setIsOpenFullScreenGalery(true);
              }}
            />
          </Flex>

          <Flex direction="column">
            {/* Name */}
            <Text fontWeight="bold" fontSize="lg">
              {packaging.name}
            </Text>

            {/* System name */}
            {packaging?.systemName && (
              <Text fontWeight="normal" fontSize={10}>
                V systému:
                <Text fontWeight="bold">{packaging?.systemName}</Text>
              </Text>
            )}

            {/* System name */}
            <Text fontWeight="normal" fontSize={10}>
              Komentář:
              {packaging?.comment ? (
                <Text fontWeight="bold">{packaging?.comment}</Text>
              ) : (
                <Text fontWeight="bold">---</Text>
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
