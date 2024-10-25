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

      <Flex>
        <VStack
          w="100%"
          h="calc(100vh - 80px)"
          display="flex"
          direction="row"
          alignItems="center"
          justifyContent="center"
          p="4"
        >
          <Heading as="h1" size="2xl" color="#6DA305" noOfLines={1}>
            Log in "Help-Book".
          </Heading>
          <IconCars width="300" height="300" />
        </VStack>
        <Box
          w="100%"
          h="calc(100vh - 80px)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          p="4"
        >
          <LoginForm />
        </Box>
      </Flex>
    </div>
  );
}
