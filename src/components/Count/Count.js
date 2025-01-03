import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';

const Count = ({ children, count }) => {
  return (
    <Box position="relative">
      {children}
      {count !== 0 && (
        <Flex
          position="absolute"
          top="0"
          right="0"
          align="center"
          justify="center"
          bg="#6da305"
          w="15px"
          h="15px"
          borderRadius="50%"
        >
          <Text fontSize="10px" fontWeight="bold" color="white">
            {count}
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default Count;
