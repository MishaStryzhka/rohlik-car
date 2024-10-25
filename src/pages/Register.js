import { Helmet } from 'react-helmet';
import { RegisterForm } from 'components/RegisterForm/RegisterForm';
import { Box, Flex, Heading, VStack } from '@chakra-ui/layout';
import IconCars from 'components/IconCars';

export default function Register() {
  return (
    <div>
      <Helmet>
        <title>Registration</title>
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
            Register in "Help-Book".
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
          <RegisterForm />
        </Box>
      </Flex>
    </div>
  );
}
