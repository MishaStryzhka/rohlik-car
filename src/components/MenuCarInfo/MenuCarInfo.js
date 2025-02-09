import { Box, Flex, Icon, Text, VStack } from '@chakra-ui/react';
import React, { forwardRef } from 'react';
import { FaBox, FaSnowflake } from 'react-icons/fa';
import { GiHotSurface } from 'react-icons/gi';
import { MdVolumeOff } from 'react-icons/md';
import colors from 'styles/colors';

const MenuCarInfo = forwardRef(({ children, onClose, ...props }, ref) => {
  return (
    <Box
      position="absolute"
      top="40px"
      right="0px"
      width="50%"
      bg="white"
      zIndex="overlay"
      boxShadow="md"
      borderRadius="10px"
      border="1px"
      borderColor="#dee2e6"
      ref={ref}
    >
      <VStack align="start" spacing={2} p={2} height="160px" overflow="auto">
        <Flex align="center">
          <Icon as={FaSnowflake} boxSize={5} mr={2} color={colors.primary} />
          <Text>Klimatizace</Text>
        </Flex>
        <Flex align="center">
          <Icon as={GiHotSurface} boxSize={5} mr={2} color={colors.primary} />
          <Text>Topení</Text>
        </Flex>
        <Flex align="center">
          <Icon as={FaBox} boxSize={5} mr={2} color={colors.primary} />
          <Text>Vestavba (ledničce)</Text>
        </Flex>
        <Flex align="center">
          <Icon as={MdVolumeOff} boxSize={5} mr={2} color={colors.primary} />
          <Text>Odhlučněné:</Text>
        </Flex>
      </VStack>
    </Box>
  );
});

export default MenuCarInfo;
