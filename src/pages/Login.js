import { Helmet } from 'react-helmet';
import { LoginForm } from 'components/LoginForm/LoginForm';
import { Flex, Box, Heading, VStack } from '@chakra-ui/react';
import IconCars from 'components/IconCars';

export default function Login() {
  return (
    <div>
      <Helmet>
        <title>Login</title>
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
            Log in "Help-Book".
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
      </Flex>
    </div>
  );
}
