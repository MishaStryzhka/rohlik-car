import { ArrowBackIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Container,
  Flex,
  IconButton,
  Image,
  Text,
} from '@chakra-ui/react';
import Loader from 'components/Loader/Loader';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import programmerImage from '../image/programmer_coding_grayscale.png';

const OneReturnablePackaging = () => {
  // eslint-disable-next-line no-unused-vars
  const [packaging, setPackaging] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const { packagingId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarData = async () => {
      //   const carData = await getCarById(packagingId);
      setPackaging(packagingId);
      setIsLoading(false);
    };
    fetchCarData();
  }, [packagingId]);
  return isLoading ? (
    <Loader />
  ) : !packaging ? (
    <Text>Not found</Text>
  ) : (
    <>
      <Helmet>
        <title>{packaging.name}</title>
      </Helmet>

      <Container
        w={'100%'}
        maxW={{ base: '100%', md: '95vw', xl: '80vw' }}
        p={2}
        borderRadius={6}
      >
        <Flex alignItems="center" justify="space-between">
          <IconButton
            icon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            aria-label="Назад"
          />
          <Text>{packaging?.name}</Text>
          <IconButton
            icon={<EditIcon />}
            onClick={() => setIsOpenModalEdit(true)}
            aria-label="Назад"
          />
        </Flex>
        <Flex mt={2} direction="column" align="center" justify="center">
          <div>Pracujeme na tom</div>
          <Box
            mt={4}
            position="relative"
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="300px"
            height="300px"
            borderRadius="full"
            overflow="hidden"
            boxShadow="-1px -1px 50px 15px #6da305 inset"
          >
            <Image
              src={programmerImage}
              alt="Programmer coding"
              objectFit="cover"
              width="100%"
              height="100%"
              zIndex="-1"
            />
          </Box>
        </Flex>
      </Container>

      {/* {isOpenModalEdit && (
        <ModalWrapper
          isOpen={isOpenModalEdit}
          onClose={() => setIsOpenModalEdit(false)}
        >
          <AddCarForm value={car} onSubmit={handleEditCar} />
        </ModalWrapper>
      )} */}
    </>
  );
};

export default OneReturnablePackaging;
