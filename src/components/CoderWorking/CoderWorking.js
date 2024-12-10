import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import programmerImage from '../../image/programmer_coding_grayscale.png';

const CoderWorking = () => {
  return (
    <Flex mt={2} direction="column" align="center" justify="center">
      <Text
        position="absolute"
        fontSize={20}
        fontWeight="900"
        color="#fff"
        textShadow="0px 0px 5px #6da305"
        textTransform="uppercase"
      >
        Pracujeme na tom
      </Text>
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
        boxShadow="-1px -1px 50px 15px #fff inset"
      >
        <Image
          src={programmerImage}
          alt="Programmer coding"
          objectFit="cover"
          width="100%"
          height="100%"
          zIndex="-1"
          opacity={0.7}
        />
      </Box>
    </Flex>
  );
};

export default CoderWorking;
