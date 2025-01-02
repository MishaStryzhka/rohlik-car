import { Helmet } from 'react-helmet';
import { RegisterForm } from 'components/RegisterForm/RegisterForm';
import IconCars from 'components/IconCars';
import { Box, Flex, Heading, Link, VStack } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

export default function Register() {
  return (
    <div>
      <Helmet>
        <title>Registrace</title>
      </Helmet>

      <Flex
        direction={{ base: 'column', md: 'row' }}
        h="calc(100vh - 80px)"
        align="center"
        justify={{ base: 'center', md: 'space-evenly' }}
        p={4}
      >
        <Flex
          w={{ base: '100%', md: '550px' }}
          align="flex-end"
          justify="space-around"
          spacing={4}
        >
          <Heading
            as="h2"
            fontSize={{ base: '22px', md: '48px' }}
            lineHeight={{ base: '1.7', md: '1.5' }}
            color="#6DA305"
            textAlign="center"
          >
            Zaregistrujte se <br />
            "Help-Book"
          </Heading>
          <Box width={{ base: '120px', md: '300px' }}>
            <IconCars />
          </Box>
        </Flex>
        <Box
          w={{ base: '100%', md: '550px' }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          mt={{ base: 6, md: 0 }}
        >
          <RegisterForm />
        </Box>
        <Link
          as={NavLink}
          to="/login"
          display="inline-block"
          textDecoration="none"
          padding="12px"
          fontWeight="700"
          color="#6da305"
          _hover={{
            textDecoration: 'underline',
          }}
        >
          Přihlásit se
        </Link>
      </Flex>
    </div>
  );
}
