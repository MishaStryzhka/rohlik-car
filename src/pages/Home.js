import { Helmet } from 'react-helmet';
import { Container, Heading } from '@chakra-ui/react';
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
        <title>Home</title>
      </Helmet>
      <IconCars width="300" height="300" />
      <Heading>Your personal Help-Book.</Heading>
    </Container>
  );
}
