import { Helmet } from 'react-helmet';
import { Box, Container, Heading, VStack } from '@chakra-ui/react';
import IconCars from 'components/IconCars';

export default function Home() {
  return (
    <Container
      minH="calc(100vh - 80px)"
      display="flex"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
    >
      <Helmet>
        <title>Help-Book</title>
      </Helmet>
      <VStack
        w={{ base: '100%', md: '650px' }}
        align="center"
        justify="center"
        spacing={4}
      >
        <Heading
          as="h1"
          fontSize={{ base: '24px', md: '48px' }}
          lineHeight={{ base: '2.6', md: '1.5' }}
          color="#6DA305"
        >
          „Váš osobní Help-Book“
        </Heading>
        <Box width={{ base: '150px', md: '300px' }}>
          <IconCars />
        </Box>
      </VStack>
    </Container>
  );
}
