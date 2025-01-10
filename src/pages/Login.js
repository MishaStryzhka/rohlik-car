import { Helmet } from 'react-helmet';
import { LoginForm } from 'components/LoginForm/LoginForm';
import { Flex, Box, Heading, VStack, Link } from '@chakra-ui/react';
import IconCars from 'components/IconCars';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import ModalWrapper from 'components/Modals/Modal';
import { PaswordRecoveryContext } from 'contexts/PasswordRecovery/PaswordRecoveryContext';
import ModalRecoverPassword from 'components/Modals/ModalRecoverPassword/ModalRecoverPassword';

export default function Login() {
  const { isOpenModalRecoverPassword, setIsOpenModalRecoverPassword } =
    useContext(PaswordRecoveryContext);
  return (
    <>
      <Helmet>
        <title>Přihlášení</title>
      </Helmet>

      <Flex
        direction={{ base: 'column', md: 'row' }}
        h="calc(100vh - 80px)"
        align="center"
        justify={{ base: 'center', md: 'space-evenly' }}
        p={4}
      >
        <VStack
          w={{ base: '100%', md: '550px' }}
          align="center"
          justify="center"
          spacing={4}
        >
          <Heading
            as="h1"
            fontSize={{ base: '24px', md: '48px' }}
            lineHeight={{ base: '2.6', md: '1.5' }}
            color="#6DA305"
            noOfLines={1}
          >
            Přihlásit se "Help-Book"
          </Heading>
          <Box width={{ base: '150px', md: '300px' }}>
            <IconCars />
          </Box>
        </VStack>
        <Box
          w={{ base: '100%', md: '550px' }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          mt={{ base: 6, md: 0 }}
        >
          <LoginForm />
        </Box>
        <Link
          as={NavLink}
          to="/register"
          display="inline-block"
          textDecoration="none"
          padding="12px"
          fontWeight="700"
          color="#6da305"
          _hover={{
            textDecoration: 'underline',
          }}
        >
          Zaregistrovat se
        </Link>
      </Flex>

      {isOpenModalRecoverPassword && (
        <ModalWrapper
          isOpen={isOpenModalRecoverPassword}
          onClose={() => setIsOpenModalRecoverPassword(false)}
          title="Obnovení hesla"
        >
          <ModalRecoverPassword />
        </ModalWrapper>
      )}
    </>
  );
}
